import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

const prisma = new PrismaClient()

// Schema validation for web chat messages
const webChatSchema = z.object({
    message: z.string().min(1, "Message is required"),
    sessionId: z.string().optional(),
    visitorId: z.string().optional(),
})

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const { message, sessionId, visitorId } = webChatSchema.parse(body)

        // Find the channel associated with this web widget
        const channel = await prisma.channel.findFirst({
            where: {
                id: params.id,
                type: "web",
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
            return NextResponse.json({ error: "Channel not found" }, { status: 404 })
        }

        // Create or retrieve chat session
        let session
        if (sessionId) {
            session = await prisma.chatSession.findUnique({
                where: { id: sessionId },
            })

            if (!session) {
                return NextResponse.json({ error: "Session not found" }, { status: 404 })
            }
        } else {
            session = await prisma.chatSession.create({
                data: {
                    botId: channel.botId,
                    userId: visitorId || "anonymous-web",
                },
            })
        }

        // Store the user message
        await prisma.chatMessage.create({
            data: {
                content: message,
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

        const result = await streamText({
            model: openai("gpt-4o"),
            system: systemPrompt,
            prompt: message,
        })

        // Store the bot response
        await prisma.chatMessage.create({
            data: {
                content: await result.text,
                role: "assistant",
                sessionId: session.id,
            },
        })

        return result.toDataStreamResponse()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }

        console.error("Error in web chat:", error)
        return NextResponse.json({ error: "Failed to process chat" }, { status: 500 })
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const url = new URL(request.url)
        const sessionId = url.searchParams.get("sessionId")

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
        }

        const session = await prisma.chatSession.findUnique({
            where: {
                id: sessionId,
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        })

        if (!session) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 })
        }

        return NextResponse.json(session.messages)
    } catch (error) {
        console.error("Error fetching chat history:", error)
        return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 })
    }
}

