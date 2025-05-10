import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const users = await db.user.findMany({
            where: {
                NOT: {
                    events: {
                        some: {}
                    }
                }
            }
        });
        return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}


// PUT request to update user status (denied as default, bloquer)
export async function PUT(req:Request) {
    try {
        const body = await req.json()
        const {action, id} = body
        if (!action ||!id) {
            return NextResponse.json({ message: "Action and ID are required", success: false }, { status: 400 });
        }
        if (action === 'bloquer') {
            await db.user.update({
                where: { id },
                data: { permission: "bloquer" }
            });
        } else{
            await db.user.update({
                where: { id },
                data: { permission: "denied" }
            });
        }
        return NextResponse.json({ message: "Status updated successfully", success: true }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }

}

// DELETE request to delete user
export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { action, id } = body
        if (!action || !id) {
            return NextResponse.json({ message: "action and id are required", success: false }, { status: 400 });
        }
        await db.user.delete({
            where: { id: id }
        });
        
        return NextResponse.json({ message: "User deleted successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}