import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const users = await db.user.findMany()
        const events = await db.event.findMany()
        const uniqueOrganizerIds = events.map(event => event.userId).filter((value, index, self) => self.indexOf(value) === index);
        const reservations = await db.reservation.findMany()
        const balance = await db.userAccount.findMany({
            select: { balance: true, commission: true }
        })
        const totalBalance = balance.reduce((acc, curr) => acc + curr.balance, 0);
        const minBalance = balance.reduce((min, curr) => curr.balance < min ? curr.balance : min, Infinity);
        const totalCommission = balance.reduce((acc, curr) => acc + curr.commission, 0);
        const minCommission = balance.reduce((min, curr) => curr.commission < min ? curr.commission : min, Infinity);

        const data = [
            {
                title: 'Total Evénements',
                value: events.length,
            },
            {
                title: 'Nombre total de billets vendus',
                value: reservations.length,
            },
            {
                title: 'Total Vente quotidienne',
                value: minBalance,
            },
            {
                title: 'Total comission quotidienne',
                value: minCommission,
            },
            {
                title: 'Nombre total d\'utilisateurs',
                value: users.length,
            },
            {
                title: 'Nombre total d\'organisateurs',
                value: uniqueOrganizerIds.length,
            },
            {
                title: 'Vente globale',
                value: totalBalance,
            },
            {
                title: 'Commission globale',
                value: totalCommission,
            },
    ]
        return NextResponse.json({ success: true, data}, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}