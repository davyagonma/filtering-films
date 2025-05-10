import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const lastFiveEvents = await db.event.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            select:{
                nom:true,
                status:true
            }
        });
        return NextResponse.json({ success: true, lastFiveEvents }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}