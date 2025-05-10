import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const userId = req.url.split('=')[1];
    if (!userId) {
        return NextResponse.json({ message: "User id is required", success: false }, { status: 404 });
    }
    const user = await db.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    try {
        const transactionsHistory = await db.transactionHistory.findMany({
            where: { userId: userId},
            // include: { user: true },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ transactionsHistory, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}