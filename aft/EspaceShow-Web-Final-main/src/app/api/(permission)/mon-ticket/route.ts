import { db } from "@/lib/db";
import { NextResponse } from "next/server";
var format = require('date-format');
import QRCode from 'qrcode'

interface Ticket {
    prix_ticket: string,
    type_de_ticket: string,
    nombre_de_place: string
}

export async function GET(req: Request) {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search);
    const eventId = params.get('eventId');
    const userId = params.get('userId');
    const reservationId = params.get('reservationId');

    try {
        if (!eventId || !userId) {
            return NextResponse.json({ message: "Event ID or User ID is required", success: false }, { status: 400 });
        }
        const reservation = await db.reservation.findUnique({
            where: { id: reservationId! }
        });
        
        const reservations = await db.reservation.findMany(
            {where: {eventId}}
        )

        if (!reservation) {
            return NextResponse.json({ success: false, message: "Vous n'avez pas réservation" }, { status: 404 });
        }
        // if (reservation.isPrint) {
        //     return NextResponse.json({ success: false, message: "Ce billet a déjà été imprimée" }, { status: 403 });
        // }
        const event = await db.event.findUnique({
            where: { id: eventId!, admin_validate: true }
        })
        const user = await db.user.findUnique({
            where: { id: userId! }
        });
        if (!user || user.permission !== 'access') {
            return NextResponse.json({ success: false, message: "L'utilisateur avec cet identifiant n'a pas pu être trouvé" }, { status: 403 });
        }
        if (!event) {
            return NextResponse.json({ success: false, message: "Ce événement n'existe plus" }, { status: 404 })
        }
        const owner = await db.user.findUnique({
            where: {id:event.userId}
        })
        if (!owner) {
            return NextResponse.json({ success: false, message: "L'organisateur de cet événement n'est plus sur la plateforme" }, { status: 403 });
        }
        const { description, mots_cles, tickets, like, admin_validate, date_debut, date_fin, place_totale_disponible, createdAt, updatedAt, ...rest } = event
        let price = "";
        (tickets as any).forEach((t: Ticket) => {
            if (t.type_de_ticket.toLowerCase() === reservation.type_ticket.toLowerCase()) {
                price = t.prix_ticket;
            };
        });
    
        const qrcode = await generateQrCode(event.code, reservationId!)
        return NextResponse.json({ success: true, url:qrcode, numero:reservations.length, event: rest, date_commande: getDateLocale(format(format.asString(format.ISO8601_WITH_TZ_OFFSET_FORMAT, reservation.createdAt))), organisateur: `${owner.prenom} ${owner.nom}`, debut: getDate(date_debut), fin: getDate(date_fin), reservation, prix_ticket: price }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Une erreur s'est produite" }, { status: 500 })
    }
}
// 2024-09-15
const getDate = (date: string) => {
    const moisShort: string[] = ["Jan", "Fév", "Mars", "Avril", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const dateDebutSplit = date.split("-");
    const jour = dateDebutSplit[2];
    const mois = moisShort[parseInt(dateDebutSplit[1]) - 1];
    const annee = dateDebutSplit[0];
    return { date: `${jour} ${mois}`, annee: `${annee}` };
}

const getDateLocale = (date: string) => {
    const moisShort: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const dateDebutSplit = date.split("T")[0].split('-');
    const annee = dateDebutSplit[0];
    const mois = moisShort[parseInt(dateDebutSplit[1]) - 1]
    const jour = dateDebutSplit[2];
    return `${jour} ${mois} ${annee} `;
}

const generateQrCode = async (code:string, id:string) => {
    try {
        console.log(`${code}-${id}`)
        return await QRCode.toDataURL(`${code}-${id}`, {errorCorrectionLevel:"H"})
    } catch (err) {
        console.error(err)
        return null
    }
}


// Put request to set reservation.isScan to true
export async function PUT(req: Request) {
    const { reservationId } = await req.json();
    // console.log(reservationId)
    try {
        if (!reservationId) {
            return NextResponse.json({ message: "Reservation ID is required", success: false }, { status: 400 });
        }
        await db.reservation.update({
            where: { id: reservationId! },
            data: { isScan: true }
        });
        return NextResponse.json({ success: true, message: "Billet imprimé avec succès" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Une erreur s'est produite" }, { status: 500 })
    }
}

export async function POST (req:Request){
    try {
        const body = await req.json()
        const {id} = body
        const reservation = await db.reservation.findUnique({
            where: { id }
        })

        if (!reservation) {
            return NextResponse.json({ success: true, message: "Réservation non trouvée" }, { status: 200 });
        }

        const event = await db.event.findUnique({
            where: { id: reservation.eventId }
        })

        if (!event) {
            return NextResponse.json({ success: false, message: "Cet événement n'existe plus" }, { status: 404 })
        }

        if (!reservation.isScan) {
            return NextResponse.json({ success: true, scan:'non', message: "Billet non imprimé" }, { status: 200 });
        }

        return NextResponse.json({ success: true, scan:'oui', message: "Billet imprimé" }, { status: 200 });
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Une erreur s'est produite" }, { status: 500 })
    }
} 