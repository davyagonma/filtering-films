import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const { eventId } = await req.json();
        if (!eventId) {
            return NextResponse.json({ message: "Event ID is required", success: false }, { status: 400 });
        }

        const event = await db.event.findUnique({ where: { id: eventId } });
        console.log(event)
        if (!event) {
            return NextResponse.json({ message: "Event not found", success: false }, { status: 404 });
        }

        let likes = event.like!
        if (isNaN(likes)) {
            return NextResponse.json({ message: "Invalid like count", success: false }, { status: 400 });
        }

        await db.event.update({
            where: { id: eventId },
            data: { like: { increment: 1 } }
        });

        return NextResponse.json({ message: "Like count updated successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

