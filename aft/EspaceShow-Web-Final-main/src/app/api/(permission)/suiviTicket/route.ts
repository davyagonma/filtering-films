import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const events = await db.event.findMany({
            select: {
                id: true,
                nom: true,
                date_debut: true,
                user: {
                    select: {
                        nom: true,
                        prenom: true
                    }
                },
                reservations:{
                    select: {
                        type_ticket: true
                    }
                }
            }
        });

        return NextResponse.json({ success: true, events }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}