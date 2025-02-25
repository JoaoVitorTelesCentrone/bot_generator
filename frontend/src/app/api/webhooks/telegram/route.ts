import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const prisma = new PrismaClient()

// Schema for Telegram update
const telegramUpdateSchema = z.object({
    update_id: z.number(),
    message: z
        .object({
            message_id: z.number(),
            from: z.object({
                id: z.number(),
                first_name: z.string(),
                username: z.string().optional(),
            }),
            chat: z.object({
                id: z.number(),
                type: z.string(),
            }),
            date: z.number(),
            text: z.string().optional(),
        })
        .optional(),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const update = telegramUpdateSchema.parse(body)

        // Skip if no message or text
        if (!update.message || !update.message.text) {
            return NextResponse.json({ status: "success" })
        }

        const chatId = update.message.chat.id.toString()
        const userId = update.message.from.id.toString()
        const messageText = update.message.text

        // Find the channel associated with this Telegram bot
        const channel = await prisma.channel.findFirst({
            where: {
                type: "telegram",
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
            console.error("No bot found for Telegram")
            return NextResponse.json({ status: "error", message: "No bot configured" })
        }

        // Create or retrieve chat session
        let session = await prisma.chatSession.findFirst({
            where: {
                botId: channel.botId,
                userId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        if (!session) {
            session = await prisma.chatSession.create({
                data: {
                    botId: channel.botId,
                    userId: userId,
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

        // Send the response back to Telegram
        await sendTelegramMessage(chatId, botResponse)

        return NextResponse.json({ status: "success" })
    } catch (error) {
        console.error("Error processing Telegram webhook:", error)
        return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
    }
}

async function sendTelegramMessage(chatId: string, message: string) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        })

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error sending Telegram message:", error)
        throw error
    }
}

