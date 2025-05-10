import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const users = await db.user.findMany({
            where: {
                events: {
                    some: {}
                }
            }
        });
        return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}