import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const reservations = await db.reservation.findMany({
            include: { event: true, user: true }
        })
        return NextResponse.json({ success: true, reservations }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
    }
}