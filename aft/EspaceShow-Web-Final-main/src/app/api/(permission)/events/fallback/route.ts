import { db } from "@/lib/db";
import { SendEmail } from "@/utils/email";
import { NextResponse } from "next/server";

// Annuler le paiement ici et rembourser tous les users ayant acheté un ticket
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { eventId } = body
        console.log(eventId)
        if (!eventId) {
            return NextResponse.json({ message: "Event ID is required", success: false }, { status: 400 });
        }


        await db.event.update({
            where: { id: eventId },
            data: { status: 'cancelled' }
        });

        // Récupérer toutes les réservations pour l'événement
        const reservations = await db.reservation.findMany({
            where: { eventId },
            include: { user: true }
        });
        const current = await db.event.findUnique({
            where: { id: eventId }
        });

        for (const reservation of reservations) {
            await SendEmail(reservation?.user.email!, "Information importante concernant l'annulation de votre événement", `
                Bonjour ${reservation.user.nom} ${reservation.user.prenom}, <br/>

                Nous vous contactons suite à l'annulation de l'événement ${current?.nom} pour lequel vous avez acheté un ticket. <br/>

                Nous vous invitons à nous contacter directement sur WhatsApp au <a href="https://wa.me/22946113031">+22946113031</a> afin de faire votre demande de remboursement.<br/>

                Pour faciliter le traitement, merci de nous fournir les informations suivantes lors de votre message : <br/> <br/>
                - Votre nom complet <br/>
                - L'image de votre ticket <br/>
                - Votre méthode de paiement préférée pour le remboursement <br/>
                - Votre pièce d'identité valide <br/> <br/>

                Nous nous excusons pour la gêne occasionnée et restons à votre disposition pour toute question.<br/> <br/>

                Merci pour votre compréhension. <br/> <br/>

                Cordialement,<br/> 
                L'équipe Espace Show +
            `);
        }

        return NextResponse.json({ success: true, data: reservations, message: "Event annulé successfully" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}