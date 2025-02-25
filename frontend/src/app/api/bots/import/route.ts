import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

// Schema for bot import
const botImportSchema = z.object({
    bot: z.object({
        name: z.string().min(1, "Bot name is required"),
        description: z.string().optional(),
        welcomeMessage: z.string().optional(),
        primaryColor: z.string().optional(),
        isActive: z.boolean().optional(),
    }),
    channels: z
        .array(
            z.object({
                type: z.string(),
                config: z.record(z.string(), z.any()).optional(),
                isActive: z.boolean().optional(),
            }),
        )
        .optional(),
    trainingData: z
        .array(
            z.object({
                question: z.string().min(1, "Question is required"),
                answer: z.string().min(1, "Answer is required"),
                category: z.string().optional(),
            }),
        )
        .optional(),
    flow: z.any().optional(),
})

export async function POST(request: Request) {
    try {
        const session = await getServerSession()

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = botImportSchema.parse(body)

        // Create the bot
        const bot = await prisma.bot.create({
            data: {
                name: validatedData.bot.name,
                description: validatedData.bot.description,
                welcomeMessage: validatedData.bot.welcomeMessage,
                primaryColor: validatedData.bot.primaryColor,
                isActive: validatedData.bot.isActive ?? true,
                user: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        })

        // Create channels if provided
        if (validatedData.channels && validatedData.channels.length > 0) {
            await Promise.all(
                validatedData.channels.map((channel) =>
                    prisma.channel.create({
                        data: {
                            type: channel.type,
                            config: channel.config || {},
                            isActive: channel.isActive ?? true,
                            botId: bot.id,
                        },
                    }),
                ),
            )
        }

        // Create training data if provided
        if (validatedData.trainingData && validatedData.trainingData.length > 0) {
            await Promise.all(
                validatedData.trainingData.map((data) =>
                    prisma.trainingData.create({
                        data: {
                            question: data.question,
                            answer: data.answer,
                            category: data.category || "General",
                            botId: bot.id,
                        },
                    }),
                ),
            )
        }

        // Save flow if provided
        if (validatedData.flow) {
            await prisma.$executeRaw`
        INSERT INTO bot_flows (bot_id, flow_data)
        VALUES (${bot.id}, ${JSON.stringify(validatedData.flow)})
      `
        }

        return NextResponse.json(
            {
                message: "Bot imported successfully",
                botId: bot.id,
            },
            { status: 201 },
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }

        console.error("Error importing bot:", error)
        return NextResponse.json({ error: "Failed to import bot" }, { status: 500 })
    }
}

