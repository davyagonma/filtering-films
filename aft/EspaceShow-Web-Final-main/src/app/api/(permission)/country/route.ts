import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {
        const events = await db.event.findMany({
            select: {
                pays:true,
                ville: true,
            },
        });
        if (!events) return NextResponse.json({ message: "No events found", success: false }, { status: 404 });

        const distinctPays = getDistinctPays(events);

        return NextResponse.json({ pays: distinctPays, success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to get events", success: false }, { status: 500 });
    }
}

function getDistinctPays(events: { pays: string; ville: string }[]): { pays: string; villes: string[] }[] {
    const distinctPays: { pays: string; villes: string[] }[] = [];
    events.forEach((event) => {
        const existingPaysIndex = distinctPays.findIndex(p => p.pays === event.pays);
        if (existingPaysIndex === -1) {
            distinctPays.push({ pays: event.pays, villes: [event.ville] });
        } else {
            if (!distinctPays[existingPaysIndex].villes.includes(event.ville)) {
                distinctPays[existingPaysIndex].villes.push(event.ville);
            }
        }
    });
    return distinctPays;
}