import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const prisma = new PrismaClient()

// Schema for WhatsApp webhook verification
const verifySchema = z.object({
    mode: z.string(),
    verify_token: z.string(),
    challenge: z.string(),
})

// Schema for WhatsApp message
const messageSchema = z.object({
    object: z.string(),
    entry: z.array(
        z.object({
            id: z.string(),
            changes: z.array(
                z.object({
                    value: z.object({
                        messaging_product: z.string(),
                        metadata: z.object({
                            phone_number_id: z.string(),
                            display_phone_number: z.string(),
                        }),
                        contacts: z
                            .array(
                                z.object({
                                    profile: z.object({
                                        name: z.string(),
                                    }),
                                    wa_id: z.string(),
                                }),
                            )
                            .optional(),
                        messages: z
                            .array(
                                z.object({
                                    from: z.string(),
                                    id: z.string(),
                                    timestamp: z.string(),
                                    text: z
                                        .object({
                                            body: z.string(),
                                        })
                                        .optional(),
                                    type: z.string(),
                                }),
                            )
                            .optional(),
                    }),
                }),
            ),
        }),
    ),
})

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const mode = url.searchParams.get("hub.mode")
        const token = url.searchParams.get("hub.verify_token")
        const challenge = url.searchParams.get("hub.challenge")

        const validatedData = verifySchema.parse({
            mode,
            verify_token: token,
            challenge,
        })

        // Verify the webhook
        if (validatedData.mode === "subscribe" && validatedData.verify_token === process.env.WHATSAPP_VERIFY_TOKEN) {
            return new Response(validatedData.challenge, { status: 200 })
        }

        return new Response("Verification failed", { status: 403 })
    } catch (error) {
        console.error("Error verifying webhook:", error)
        return new Response("Error verifying webhook", { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedData = messageSchema.parse(body)

        // Process each message
        for (const entry of validatedData.entry) {
            for (const change of entry.changes) {
                const value = change.value

                // Skip if no messages
                if (!value.messages || value.messages.length === 0) {
                    continue
                }

                for (const message of value.messages) {
                    // Skip if not text message
                    if (message.type !== "text" || !message.text) {
                        continue
                    }

                    const phoneNumberId = value.metadata.phone_number_id
                    const from = message.from
                    const messageText = message.text.body

                    // Find the channel associated with this WhatsApp number
                    const channel = await prisma.channel.findFirst({
                        where: {
                            type: "whatsapp",
                            config: {
                                path: ["phoneNumberId"],
                                equals: phoneNumberId,
                            },
                            isActive: true,
                        },
                        include: {
                            bot: {
                                include: {
                                    trainingData: true,
                                },
                            },
                        },
                    })

                    if (!channel) {
                        console.error("No bot found for this WhatsApp number")
                        continue
                    }

                    // Create or retrieve chat session
                    let session = await prisma.chatSession.findFirst({
                        where: {
                            botId: channel.botId,
                            userId: from,
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    })

                    if (!session) {
                        session = await prisma.chatSession.create({
                            data: {
                                botId: channel.botId,
                                userId: from,
                            },
                        })
                    }

                    // Store the user message
                    await prisma.chatMessage.create({
                        data: {
                            content: messageText,
                            role: "user",
                            sessionId: session.id,
                        },
                    })

                    // Prepare context from training data
                    const relevantTrainingData = channel.bot.trainingData
                        .slice(0, 5) // Simplified - in a real app, you'd use vector search
                        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
                        .join("\n\n")

                    // Generate bot response using OpenAI
                    const systemPrompt = `You are a helpful customer support bot named ${channel.bot.name}.
          Use the following information to answer user questions:
          ${relevantTrainingData}
          
          If you don't know the answer, say "I don't have that information yet."
          Be concise and helpful.`

                    const { text: botResponse } = await generateText({
                        model: openai("gpt-4o"),
                        system: systemPrompt,
                        prompt: messageText,
                    })

                    // Store the bot response
                    await prisma.chatMessage.create({
                        data: {
                            content: botResponse,
                            role: "assistant",
                            sessionId: session.id,
                        },
                    })

                    // Send the response back to WhatsApp
                    await sendWhatsAppMessage(phoneNumberId, from, botResponse)
                }
            }
        }

        return NextResponse.json({ status: "success" })
    } catch (error) {
        console.error("Error processing webhook:", error)
        return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
    }
}

async function sendWhatsAppMessage(phoneNumberId: string, to: string, message: string) {
    try {
        const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to,
                type: "text",
                text: {
                    preview_url: false,
                    body: message,
                },
            }),
        })

        if (!response.ok) {
            throw new Error(`WhatsApp API error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error sending WhatsApp message:", error)
        throw error
    }
}

