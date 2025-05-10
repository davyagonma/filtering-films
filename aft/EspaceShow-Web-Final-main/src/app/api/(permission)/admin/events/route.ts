import { db } from "@/lib/db"
import { SendEmail } from "@/utils/email"
import { NextResponse } from "next/server"

// Event validating by admin
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { eventId, statusText, raison } = body
        console.log(body)
        // Check if eventId is provided
        if (!eventId || !statusText || !raison) {
            return NextResponse.json({ success: false, message: "Event id, reason and status text are required" }, { status: 400 })
        }
        // Check if the event exists

        const existingEvent = await db.event.findUnique({ where: { id: eventId } })
        if (!existingEvent) {
            return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
        }

        if (raison !== 'ras') {
            const user = await db.user.findUnique({
                where: { id: existingEvent.userId },
                select: { email: true }
            })

            await db.event.update({
                where: { id: eventId },
                data: { status: statusText }
            })
            await db.notification.create({
                data: {
                    title: "Évenement rejeté",
                    message: `L'évenement identifié avec la clé: ${eventId} a été rejeté par l'équipe de Espace-Show-Plus.`,
                    userId: existingEvent.userId
                }
            })
            await SendEmail(user?.email!, `Événement rejeté`,`Votre événement ${existingEvent.nom} est rejeté pour les raisons suivantes: <br/> <br/> ${raison}`)
            return NextResponse.json({ success: false, message: "rejet de l'événement" }, { status: 200 })
        }
        
        // Update the event to set admin_validate to true
        await db.event.update({
            where: { id: eventId },
            data: { admin_validate: true, status: statusText }
        })
        
        // Create a notification for the user
        await db.notification.create({
            data: {
                title: "Évenement validé",
                message: `L'évenement identifié avec la clé: ${eventId} a bien été validé par l'équipe de Espace-Show-Plus.`,
                userId: existingEvent.userId
            }
        })

        const user = await db.user.findUnique({
            where: { id: existingEvent.userId }
        })
        
        await SendEmail(user?.email!, "Évenement validé", `L'événement "${existingEvent.nom}" est validé. <br/> <br/> <br/> <b style="font-size:22px;">Clé: ${existingEvent.id}</b> <br/><br/><br/> Gardez cette information en confidentialité. Vous en aurez besoin pour verifier la validité des tickets de cet événement.`)
        return NextResponse.json({ success: true, message: `Event ${statusText} successfully` }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }
}


// Get all events where admin_validate is false
export async function GET(req: Request) {
    try {
        const events = await db.event.findMany({
            where: { admin_validate: false },
            orderBy: { createdAt: 'desc' },
            include: { user: true }
        })
        return NextResponse.json({ success: true, events }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }
}