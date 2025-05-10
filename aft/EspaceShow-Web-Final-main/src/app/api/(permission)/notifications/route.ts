import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // Get all notifications for a specific user or unread notifications if no user id is provided
    if (req.url.split('=')[1]) {
        const userId = req.url.split('=')[1];
        try {
            const notifications = await db.notification.findMany({
                where: { userId: userId },
                orderBy: { createdAt: 'desc' }
            });
            if (!notifications.length) {
                return NextResponse.json({ notifications, success: true, message: "No notifications found for this user" }, { status: 200 });
            }
            
            const notifs:any = []

            notifications.map((notif, idx) => {
                notifs.push({...notif, heure: notif.createdAt.toString().split(' ')[4]})
            })         

            return NextResponse.json({ success: true, notifications:notifs }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
        }
    } else {
        try {
            const notifications = await db.notification.findMany({
                where: { read: false }
            });
            return NextResponse.json({ notifications, success: true }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
        }
    }
}

// Delete single notification or delete all notifications for user
export async function DELETE(req: Request) {
    if (req.url.split('=')[1]) {
        try {
            const body = await req.json();
            const notificationId = req.url.split('=')[1]
            const { userId} = body;
            // Check if userId and notificationId are provided
            if (!notificationId) {
                return NextResponse.json({ success: false, message: "User id and notification id are required" }, { status: 400 });
            }
            // Check if the user exists
            const existingUser = await db.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
            }
            // Delete the specific notification
            await db.notification.delete({
                where: { id: notificationId, userId: userId }
            });

            return NextResponse.json({ success: true, message: "Notification deleted successfully" }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
        }
    } else {
        try {
            const body = await req.json();
            const { userId } = body;
            // Check if userId is provided
            if (!userId) {
                return NextResponse.json({ success: false, message: "User id is required" }, { status: 400 });
            }
            // Check if the user exists
            const existingUser = await db.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
            }
            // Delete all notifications for the user
            await db.notification.deleteMany({
                where: { userId: userId }
            });

            return NextResponse.json({ success: true, message: "All notifications deleted successfully" }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
        }
    }
}


// Mark a single notification as read
export async function PUT(req: Request) {
    const url = new URL(req.url);
    const notificationId = url.searchParams.get('notificationId');
    if (notificationId) {
        try {
            // Set read to true for the specific notification
            await db.notification.update({
                where: { id: notificationId },
                data: { read: true }
            });

            return NextResponse.json({ success: true, message: "Notification marked as read" }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
        }
    } else {
        try {
            const body = await req.json();
            const { userId } = body;
            // Check if userId is provided
            if (!userId) {
                return NextResponse.json({ success: false, message: "User id is required" }, { status: 400 });
            }
            // Check if the user exists
            const existingUser = await db.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
            }
            // Set read to true for all notifications of the user
            await db.notification.updateMany({
                where: { userId: userId },
                data: { read: true }
            });

            return NextResponse.json({ success: true, message: "All notifications marked as read" }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
        }
    }
}

