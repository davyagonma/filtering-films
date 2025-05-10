import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

    const allEvents = await db.event.findMany({
        orderBy: { createdAt: "desc" },
        include:{
            user:true
        }
    })

    const result = await Promise.all(
        allEvents.map(async (event) => {
            const tickets: any[] = [];
            const eventName = event.nom;


            const reservations = await db.reservation.findMany({
                where: { eventId: event.id },
            });

            await Promise.all(event.tickets.map(async (ticket: any) => {
                const ticketReservations = reservations.filter(reservation => reservation.type_ticket === ticket.type_de_ticket);
                const participants = await db.user.findMany({
                    where: { id: { in: ticketReservations.map(reservation => reservation.userId), }, },
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

            return { nom: eventName, id: event.id, tickets: [...tickets], organisateur: `${event.user.nom} ${event.user.prenom}`, date_debut:event.date_debut };
        })
    );


    return NextResponse.json({ success: true, events: result, message: "Historique des commandes" }, { status: 200 });

}
