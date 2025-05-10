import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { randomInt } from "crypto";
import { SendEmail } from "@/utils/email";
import { hash } from "bcrypt";

// Send password verfication code to user
export async function GET(req: Request) {
    try {
        const email = req.url.split('=')[1];
        if (!email) {
            return NextResponse.json({ message: "Email is required", sucess:false }, { status: 400 });
        }

        const existingUser = await db.user.findUnique({ where: { email: email } });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found", sucess: false }, { status: 404 });
        }

        const verificationCode = randomInt(10000, 99999).toString();
        await db.user.update({
            where: { email: email },
            data: { verificationCode: verificationCode }
        });
        await SendEmail(email, "Forgot password verification code", `Your verification code is: ${verificationCode}`);

        return NextResponse.json({ message: "Verification code sent successfully", sucess: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", sucess: false }, { status: 500 });
    }
}


// compare user entry code with stored code
export async function POST(req: Request) {
    try {
        const { email, code } = await req.json();
        console.log(email, code)
        if (!email || !code) {
            return NextResponse.json({ message: "Email and code are required", success: false }, { status: 400 });
        }

        const existingUser = await db.user.findUnique({ where: { email: email } });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        if (existingUser.verificationCode !== code) {
            return NextResponse.json({ message: "Invalid verification code", success: false }, { status: 400 });
        }

        return NextResponse.json({ message: "Verification successfull", success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

// update user password
export async function PUT(req: Request) {
    try {
        const { email, password } = await req.json();
        if (!email ||!password) {
            return NextResponse.json({ message: "Email and password are required", success: false }, { status: 400 });
        }

        const existingUser = await db.user.findUnique({ where: { email: email } });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
        
        const hashedPassword = await hash(password, 10);
        await db.user.update({
            where: { email: email },
            data: { password: hashedPassword }
        });

        return NextResponse.json({ message: "Password updated successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

