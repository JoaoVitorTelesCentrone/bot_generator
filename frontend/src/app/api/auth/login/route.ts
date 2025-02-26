import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { sign } from "jsonwebtoken"

const prisma = new PrismaClient()

// Schema validation for login
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedData = loginSchema.parse(body)

        // Find the user
        const user = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        })

        if (!user || !user.password) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
        }

        // Generate JWT token
        const token = sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.NEXTAUTH_SECRET || "your-fallback-secret",
            { expiresIn: "7d" },
        )

        // Return user data and token
        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }

        console.error("Login error:", error)
        return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 })
    }
}

