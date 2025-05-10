import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search);
    const email = params.get('email');

    if (!email) {
        return NextResponse.json({ message: "Email is required", success: false }, { status: 400 });
    }

    const user = await db.user.findUnique({
        where: { email }
    })
    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const allEventsForUser = await db.event.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" }
    })

    const result = await Promise.all(
        allEventsForUser.map(async (event) => {
            const tickets: any[] = [];
            const eventName = event.nom;

            const reservations = await db.reservation.findMany({
                where: { eventId: event.id },
            });

            if (!reservations || reservations.length === 0) {
                return { nom: eventName, id: event.id, tickets };
            }

            await Promise.all(event.tickets.map(async (ticket: any) => {
                const ticketReservations = reservations.filter(reservation => reservation.type_ticket === ticket.type_de_ticket);
                const participants = await db.user.findMany({
                    where: { id: { in: ticketReservations.map(reservation => reservation.userId),},},
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        profile: true
                    }
                });

                tickets.push({
                    type: ticket.type_de_ticket,
                    nombre: ticketReservations.length,
                    montant: ticketReservations.length * parseFloat(ticket.prix_ticket),
                    participants: await Promise.all(ticketReservations.map(async (reservation) => {
                        const participant = await db.user.findUnique({
                            where: { id: reservation.userId },
                            select: {
                                id: true,
                                nom: true,
                                prenom: true,
                                profile: true
                            }
                        });
                        return {
                            ...participant,
                            createdAt: reservation.createdAt
                        };
                    })),
                });
                // console.log(participants)
            }));

            return { nom: eventName, id: event.id, tickets: [...tickets] };
        })
    );


    return NextResponse.json({ success: true, history: result, message:"Historique des commandes des organisateurs" }, { status: 200 });

}
