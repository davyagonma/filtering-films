import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {email, otp} = body
        console.log(body)
        if (!email || !otp) {
            return NextResponse.json({ success: false, message: "Email and code are required" }, { status: 400 });
        }
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        if (user.verificationCode !== otp) {
            return NextResponse.json({ success: false, message: "Verification code does not match" }, { status: 400 });
        } 
        await db.user.update({
            where: { email },
            data: { emailVerified: true }
        });
        return NextResponse.json({ success: true, message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

