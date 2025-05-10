import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const userId = req.url.split('=')[1];
        if (!userId) {
            return NextResponse.json({ message: "User ID is required", success: false }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { id: userId }
        });

        if (!user || user.permission !== 'access') {
            return NextResponse.json({ message: "Unauthorized. User does not have access permission.", success: false }, { status: 403 });
        }

        const events = await db.event.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "desc" }
        });

        const eventsWithReservations = await Promise.all(events.map(async (event) => {
            const reservations = await db.reservation.findMany({
                where: { eventId: event.id },
            });
            return { ...event, ticket_vendus:reservations.length};
        }));

        return NextResponse.json({ events: eventsWithReservations, success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}
