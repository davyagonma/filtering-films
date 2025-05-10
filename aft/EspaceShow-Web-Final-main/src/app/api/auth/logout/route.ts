import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }
        const existingUser = await db.user.findUnique({ where: { email: email } });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        await db.user.update({
            where: { email },
            data: { permission: "denied" }
        });
        return NextResponse.json({ message: "User logout successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
