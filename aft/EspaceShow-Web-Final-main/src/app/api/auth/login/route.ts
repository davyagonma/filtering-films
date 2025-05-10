import { db } from "@/lib/db"
import { compare } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json({ message: "The both email and password are required" }, { status: 500 })
        }
        const existingUser = await db.user.findUnique({ where: { email: email } })

        if (!existingUser?.emailVerified) {
            return NextResponse.json({ message: "The email is not verified" }, { status: 409 })
        }

        if (!existingUser) {
            return NextResponse.json({ message: "The user with this email is not exist. Try register first" }, { status: 404 })
        }
        if (existingUser.password) {
            const passwordMatch = await compare(password, existingUser.password)
            if (!passwordMatch) {
                return NextResponse.json({ message: "Wrong password" }, { status: 401 })
            }
        }
        if (existingUser.permission === "bloquer") {
            return NextResponse.json({ message: "Votre compte est bloqué. Contactez les admins" }, { status: 403 })
        }
        await db.user.update({
            where: { email },
            data: { permission: "access" }
        });
        
        const { password: newUserPassword, verificationCode, permission, ...rest } = existingUser
        return NextResponse.json({ message: "Login successfull", user: rest, permission:'access'}, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}