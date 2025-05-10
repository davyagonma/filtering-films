import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    if (req.url.split('=')[1]) {
        const userId = req.url.split('=')[1];
        try {
            const notifications = await db.notification.findMany({
                where: {userId,read: false }
            });
            return NextResponse.json({ length:notifications.length, success: true }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
        }
    }
}