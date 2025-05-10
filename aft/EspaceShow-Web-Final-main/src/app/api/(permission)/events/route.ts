import { db } from "@/lib/db"
import { SendEmail } from "@/utils/email"
import { unlinkSync } from "fs"
import { NextResponse } from "next/server"
import { join } from "path"
import { v4 as uuidv4 } from 'uuid';


// Add event
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, code, nom, categorie, pays, ville, adresse, description, date_debut, date_fin, heure, mots_cles, cover, tickets, place_totale_disponible } = body
        // Check if all required fields are provided
        if (!code || !nom || !categorie || !pays || !ville || !adresse || !description || !date_debut || !date_fin || !heure || !mots_cles || !cover || !tickets || !place_totale_disponible || !userId) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
        }
        // Check if the user exists
        const existingUser = await db.user.findUnique({ where: { id: userId } })
        if (!existingUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }
        if (existingUser.permission !== 'access') {
            return NextResponse.json({ success: false, message: "Unauthorized. Login first" }, { status: 403 });
        }
        // Create the event
        const uuid = uuidv4()

        await db.event.create({
            data: {
                code, nom, categorie, pays, ville, adresse, description, date_debut, date_fin, heure, mots_cles, cover, tickets, place_totale_disponible, userId,
                availableRetraitDate: new Date(new Date(date_fin).getTime() + 24 * 60 * 60 * 1000),
                uuid: uuid
            }
        })
        const findCurrentEventId = await db.event.findUnique({
            where: {
                uuid
            },
            select: {
                id: true
            }
        })
        // console.log(findCurrentEventId?.id)
        await db.userAccount.create({
            data: { userId: userId, eventId: findCurrentEventId?.id!, balance:0, commission:0}
        })

        await db.notification.create({
            data: {
                title: "Nouvel événement",
                message: `Vous avez créé l'événement "${nom}". Un mail vous sera envoyé après sa validation par l'équipe de Espace-Show +.`,
                userId: userId
            }
        })

        await SendEmail(existingUser.email!, "Nouvel événement", `Vous avez créé l'événement "${nom}". Un mail vous sera envoyé après sa validation par l'équipe de Espace-Show +.`)

        return NextResponse.json({ success: true, message: "Event created successfully" }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }
}

export async function GET(req: Request) {
    // Get event by id
    if (req.url.split("=")[1]) {
        const eventId = req.url.split("=")[1]
        try {
            const event = await db.event.findUnique({
                where: { id: eventId, admin_validate: true }
            })
            if (!event) {
                return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
            }
            return NextResponse.json({ success: true, event }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
        }
    } else {
        // Get all event validated by admin
        try {
            const events = await db.event.findMany({
                where: { admin_validate: true, date_fin: { gte: new Date().toISOString().split('T')[0]} },
                orderBy: { createdAt: "desc" },
                include: { user: true }
            })
            // console.log(events)
            return NextResponse.json({ success: true, events }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
        }
    }
}

// Update event by Id
export async function PUT(req:Request) {
    const url = new URL(req.url)
    const eventId = url.searchParams.get("eventId")
    const body = await req.json()
    const { userId, code, nom, categorie, pays, ville, adresse, description, date_debut, date_fin, heure, mots_cles, cover, tickets, place_totale_disponible } = body
    try {
        if (!eventId) {
            return NextResponse.json({ success: false, message: "Event ID is required" }, { status: 400 })
        }
        const img = await db.event.findUnique({
            where: { id: eventId },
            select: { cover: true }
        })
        if (cover && cover !== img?.cover) {
            unlinkSync(join(process.cwd(), "public", img?.cover!))
        }
        await db.event.update({
            where: { id: eventId },
            data: {
                code, nom, categorie, pays, ville, adresse, description, date_debut, date_fin, heure, mots_cles, cover, tickets, place_totale_disponible, admin_validate:false, status:'en cours'
            }
        })

        const existingUser = await db.user.findUnique({ where: { id: userId } })

        await db.notification.create({
            data: {
                title: "Modification événement",
                message: `Vous avez modifié l'événement "${nom}". Un mail vous sera envoyé après sa nouvelle validation par l'équipe de Espace-Show +.`,
                userId: userId
            }
        })

        await SendEmail(existingUser?.email!, "Modification d'événement", `Vous avez modifié l'événement "${nom}". Un mail vous sera envoyé après une nouvelle validation par l'équipe de Espace-Show +.`)

        return NextResponse.json({ success: true, message: "Event updated successfully" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }

}

// Delete event by Id
export async function DELETE(req: Request) {
    try {
        const eventId = req.url.split("=")[1]
        // Check if the event exists
        const existingEvent = await db.event.findUnique({ where: { id: eventId } })
        if (!existingEvent) {
            return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
        }
        // Delete the event
        const cover = existingEvent.cover
        if (cover) {
            unlinkSync(join(process.cwd(), "public", cover))
        }

        await db.event.delete({ where: { id: eventId } })
        // Delete all reservations associated with the event
        await db.reservation.deleteMany({
            where: { eventId: eventId }
        });

        return NextResponse.json({ success: true, message: "Event deleted successfully" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }
}