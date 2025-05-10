import { db } from "@/lib/db";
import { SendEmail } from "@/utils/email";
import { environmentUrl } from "@/utils/url";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { nom, prenom, email, type_ticket, eventId, userId, moyen, price } = await req.json();
        if (!nom || !prenom || !email || !type_ticket || !eventId || !userId || !moyen || !price) {
            return NextResponse.json({ message: "All fields are required", success: false }, { status: 400 });
        }

        const existingEvent = await db.event.findUnique({ where: { id: eventId } });
        if (!existingEvent) {
            return NextResponse.json({ message: "Event not found", success: false }, { status: 404 });
        }
        const existingUser = await db.user.findUnique({ where: { email: email } });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
        if (existingUser.permission !== 'access') {
            return NextResponse.json({ success: false, message: "Unauthorized. Login first" }, { status: 403 });
        }

        const uuid = uuidv4()

        await db.reservation.create({
            data: { nom, prenom, email, type_ticket, eventId, userId, uuid, price }
        });

        await db.userAccount.update({
            where: { eventId },
            data: { balance: { increment: price * 1 - price * 1 * 0.1 }, commission: { increment: price * 1 * 0.1 } }
        })

        const res = await db.reservation.findMany({
            where: { userId: userId, eventId: eventId, email: email, uuid: uuid },
            select: { id: true }
        })

        if (res.length === 0) {
            return NextResponse.json({ message: "No reservation found", success: false }, { status: 404 });
        }
        // create UserHistory with reference= res[0].id and heure = hours of now 00:00 into string
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0') + ':' + currentDate.getSeconds().toString().padStart(2, '0');

        await db.userHistory.create({
            data: {
                userId: userId, reference: res[0].id, message: `Vous avez réservé un ticket "${type_ticket}" d'une valeur de ${price} FCFA, pour l'événement "${existingEvent.nom}". Un lien vous a été envoyé via mail. Consultez-le pour retrouver votre ticket à tout moment.`, avatar: existingEvent.cover, link: `${environmentUrl()}/mon-ticket?userId=${userId}&eventId=${eventId}&reservationId=${res[0].id}`, heure: hours
            }
        })

        await db.notification.create({
            data: {
                title: "Réservation de ticket",
                message: `
                    Bonjour ${nom} ${prenom}, 
                    Vous avez réservé un ticket pour l'événement "${existingEvent.nom}".
                    Un mail vous a été envoyé et il contient l'accès vers votre ticket.
                    Merci de votre confiance et à bientôt,
                    L'équipe d'Espace Show +
                `,
                userId: userId
            }
        })

        await SendEmail(email, 'Réservation de ticket', `
            Bonjour ${nom} ${prenom},\n
            Vous avez réservé un ticket pour l'événement "${existingEvent.nom}".\n\n
            Vous pouvez récupérer votre ticket à l'adresse suivante :${environmentUrl()}/mon-ticket?userId=${userId}&eventId=${eventId}&reservationId=${res[0].id}\n
            Merci de votre confiance et à bientôt,\n
            L'équipe d'Espace Show +
        `)
        return NextResponse.json({ message: "Reservation added successfully", success: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

export async function GET(req: Request) {
    // User reservation by id
    if (req.url.split('=')[1]) {
        const userId = req.url.split('=')[1];
        try {
            const user = await db.user.findUnique({
                where: { id: userId }
            });

            if (!user || user.permission !== 'access') {
                return NextResponse.json({ message: "Unauthorized. User does not have access permission.", success: false }, { status: 403 });
            }
            const userReservations = await db.reservation.findMany({
                where: { userId: userId }
            });
            return NextResponse.json({ userReservations, success: true }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
        }

    } else {
        // All reservations
        try {
            const reservations = await db.reservation.findMany();
            return NextResponse.json({ reservations, success: true }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
        }
    }

}
