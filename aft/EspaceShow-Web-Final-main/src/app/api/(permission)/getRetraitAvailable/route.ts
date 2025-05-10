import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
        return NextResponse.json({ success: false, message: "User id is required" }, { status: 400 })
    }

    try {
        const today = new Date()
        const events = await db.event.findMany({
            where: {
                userId: userId,
                availableRetraitDate: {
                    lte: today
                },
                retrait: false
            },
            select: {
                id: true,
                nom: true
            }
        })
        if (!events.length) {
            return NextResponse.json({ success: true, message: "No available retrait for this user", retraitDispo: events }, { status: 200 })
        }

        const retrait = await Promise.all(events.map(async (event) => {
            const userAccount = await db.userAccount.findUnique({
                where: {
                    userId: userId,
                    eventId: event.id
                }
            })
            
            return { eventId: event.id, nom: event.nom, retrait: {retraitId:userAccount?.id, soldeBrut:userAccount?.balance, commission:userAccount?.commission, createdAt: userAccount?.createdAt, updatedAt: userAccount?.updatedAt} }
        }))

        return NextResponse.json({ success: true, retraitDispo: [...retrait] }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }
}
