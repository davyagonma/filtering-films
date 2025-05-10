import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, eventId } = body
        console.log(body)
        if (!userId || !eventId) {
            return NextResponse.json({ message: "User ID and Event ID are required" }, { status: 400 });
        }
        const userLike = await db.userLike.findMany({
            where: {userId, eventId},
        });
        if (userLike.length > 0) {
            return NextResponse.json({ message: "User already liked this event" }, { status: 200 });
        }
        await db.userLike.create({
            data: { userId, eventId },
        })
        await db.event.update({
            where: { id: eventId },
            data: { like: { increment: 1 } },
        });
        return NextResponse.json({ message: "User like set successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

