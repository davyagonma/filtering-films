import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search);
    const eventId = params.get('eventId');

    try {
        if (!eventId) {
            return NextResponse.json({ message: "Event ID is required", success: false }, { status: 400 });
        }
        const event = await db.event.findUnique({
            where: { id: eventId!, admin_validate: true },
            select: { tickets: true }
        })
        if (!event) {
            return NextResponse.json({ success: false, message: "Aucun événement correspondant à cet eventId" }, { status: 404 })
        }

        const ticket = event.tickets.map((ticket: any) => {
            return ticket.type_de_ticket
        })

        const tickets = event.tickets.map((ticket: any) => {
            return [ticket.type_de_ticket, ticket.prix_ticket]
        })
        return NextResponse.json({ success: true, ticket, details:tickets}, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Une erreur s'est produite" }, { status: 500 })
    }
}