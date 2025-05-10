import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search);
    const search = params.get('query');
    try {
        if (!search) {
            return NextResponse.json({ message: "Search query is required", success: true, result:[] }, { status: 200 });
        }
        const events = await db.event.findMany({
            where: {
                admin_validate: true,
                date_fin: { gte: new Date().toISOString().split('T')[0] }
            },
            orderBy: { createdAt: "desc" },
            select: { id: true, nom: true}
        })
        let filteredEvents = [];
        for (let event of events) {
            if (event.nom.toLowerCase().includes(search.toLowerCase())) {
                filteredEvents.push(event);
            }
        }
        return NextResponse.json({ success: true, result: filteredEvents }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }

}