// a get route with search params userId who return all userHistory for this user
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search);
    const userId = params.get('userId');

    if (!userId) {
        return NextResponse.json({ message: "User id is required", success: false }, { status: 400 });
    }

    try {
        const userHistory = await db.userHistory.findMany({
            where: { userId: userId },
            orderBy: { heure: "desc" }
        });
        return NextResponse.json({ message: "Historique des commandes", success: true, userHistory });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error fetching user history" }, { status: 500 });
    }
}