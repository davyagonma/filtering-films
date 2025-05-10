import { db } from "@/lib/db";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, oldPassword, newPassword } = await req.json();
        if (!email || !oldPassword || !newPassword) {
            return NextResponse.json({ message: "Email, old password, and new password are required" }, { status: 400 });
        }

        const existingUser = await db.user.findUnique({ where: { email: email } });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (existingUser.permission !== 'access') {
            return NextResponse.json({ success: false, message: "Unauthorized. Login first" }, { status: 403 });
        }

        const passwordMatch = await compare(oldPassword, existingUser.password!);
        if (!passwordMatch) {
            return NextResponse.json({ message: "Old password is incorrect" }, { status: 401 });
        }

        const hashedNewPassword = await hash(newPassword, 10);
        await db.user.update({
            where: { email: email },
            data: { password: hashedNewPassword }
        });

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
