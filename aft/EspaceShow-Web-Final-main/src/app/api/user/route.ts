import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// Get User
export async function GET(req: Request) {
    try {
        const email = req.url.split('=')[1]
        // console.log(email)
        if (!email) {
            return NextResponse.json({ message: "Email is required", success: false }, { status: 400 });
        }
        const user = await db.user.findUnique({
            where: { email: email }});
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        if (user.permission !== 'access') {
            return NextResponse.json({ success: false, message: "Unauthorized. Login first" }, { status: 403 });
        }
        const { password, verificationCode, permission, ...rest } = user
        return NextResponse.json({ message: 'User informations', user: rest, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

// Edit user
export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { nom, prenom, profile, contact, email, pays, ville } = body
        // const email = req.url.split('=')[1]
        if (!email) {
            return NextResponse.json({ message: "Email is required", success: false }, { status: 400 });
        }
        const user = await db.user.update({
            where: { email: email },
            data: { nom, prenom, profile, contact, pays, ville }
        });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
        if (user.permission !== 'access') {
            return NextResponse.json({ success: false, message: "Unauthorized. Login first" }, { status: 403 });
        }

        const existingUser = await db.user.findUnique({
            where: { email: email }
        })
        await db.notification.create({
            data: {
                title: "Mise à jour du profile",
                message: `Vous avez mis à jour les infomations de votre profile avec succés`,
                userId: existingUser?.id!
            }
        })
        const {password, verificationCode, permission, ...rest} = user
        return NextResponse.json({ message: "User updated successfully", user: rest, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}


