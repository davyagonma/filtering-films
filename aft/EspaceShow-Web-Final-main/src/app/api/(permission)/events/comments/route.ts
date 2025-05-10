import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Add comments
export async function POST(req: Request) {
    try {
        const { eventId, userId, comments } = await req.json();
        if (!eventId || !userId || !comments) {
            return NextResponse.json({ message: "Event ID, User ID, and comments are required", success: false }, { status: 400 });
        }

        const event = await db.event.findUnique({ where: { id: eventId } });
        if (!event) {
            return NextResponse.json({ message: "Event not found", success: false }, { status: 404 });
        }

        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        if (user.permission !== 'access') {
            return NextResponse.json({ success: false, message: "Unauthorized. Login first" }, { status: 403 });
        }
        const newComment = await db.comment.create({
            data: {
                eventId: eventId,
                userId: userId,
                comments: comments
            }
        });

        await db.event.update({
            where: { id: eventId },
            data: { commentNbre: { increment: 1 } }
        });

        return NextResponse.json({ message: "Comment created successfully", success: true, comment: newComment }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

// Update comments
export async function PUT(req: Request) {
    try {
        const { eventId, userId, commentId, comments } = await req.json();
        if (!eventId || !userId || !commentId || !comments) {
            return NextResponse.json({ message: "Event ID, User ID, Comment ID, and comments are required", success: false }, { status: 400 });
        }

        const event = await db.event.findUnique({ where: { id: eventId } });
        if (!event) {
            return NextResponse.json({ message: "Event not found", success: false }, { status: 404 });
        }

        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
        if (user.permission !== 'access') {
            return NextResponse.json({ success: false, message: "Unauthorized. Login first" }, { status: 403 });
        }
        const comment = await db.comment.findUnique({ where: { id: commentId } });
        if (!comment) {
            return NextResponse.json({ message: "Comment not found", success: false }, { status: 404 });
        }

        const updatedComment = await db.comment.update({
            where: { id: commentId },
            data: { comments: comments }
        });

        return NextResponse.json({ message: "Comment updated successfully", success: true, comment: updatedComment }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

// Delete comments
export async function DELETE(req: Request) {
    try {
        const { commentId } = await req.json();
        if (!commentId) {
            return NextResponse.json({ message: "Comment ID is required", success: false }, { status: 400 });
        }

        const comment = await db.comment.findUnique({ where: { id: commentId } });
        if (!comment) {
            return NextResponse.json({ message: "Comment not found", success: false }, { status: 404 });
        }

        await db.comment.delete({ where: { id: commentId } });
        await db.event.update({
            where: { id: comment.eventId },
            data: { commentNbre: { decrement: 1 } }
        });

        return NextResponse.json({ message: "Comment deleted successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}


// Fetch comments for a specific event using eventId
export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const params = new URLSearchParams(url.search);
        const eventId = params.get('eventId');
        if (!eventId) {
            return NextResponse.json({ message: "Event ID is required", success: false }, { status: 400 });
        }
        const comments = await db.comment.findMany({ 
            where: { eventId: eventId },  
            orderBy: { createdAt: "desc" }
        });

        const result = await Promise.all(
            comments.map(async (comment) => {
                const user = await db.user.findUnique({ where: { id: comment.userId }});
                return { ...comment, author: `${user?.prenom} ${user?.nom}`, profile:user?.profile };
            })
        );
        return NextResponse.json({ message:'Commentaires et auteurs',result, success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}
