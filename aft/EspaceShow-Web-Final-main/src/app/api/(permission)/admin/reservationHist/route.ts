import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {
        const reservations = await db.reservation.findMany(
            {select: {
                id: true,
                type_ticket: true,
                price:true,
                nom:true,
                prenom:true,
                createdAt: true,
                payement:true,
                event: {
                    select: {
                        id: true,
                        nom: true,
                        code:true
                    }
                }
            }}
        )
        return NextResponse.json({ success: true, reservations }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}