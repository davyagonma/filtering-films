import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ message: "Email is required", success: false }, { status: 400 });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Invalid email. Please use a valid email; Ex:abc@xyz.com", success: false }, { status: 400 });
        }

        const existingSubscriber = await db.subscriber.findUnique({ where: { email: email } });
        if (existingSubscriber) {
            return NextResponse.json({ message: "You have already subscribed to the newsletter. Thanks you very much", success: true }, { status: 200 });
        }

        await db.subscriber.create({
            data: { email }
        });

        return NextResponse.json({ message: "Subscription successful", success: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const subscribers = await db.subscriber.findMany();
        return NextResponse.json({ subscribers, success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}
