import { NextResponse } from "next/server";
import commentsData from "@/data/comments.json";

const comments = commentsData as Array<{
    id: number;
    body: string;
    postId: number;
    userId: number;
    likes: number;
    createdAt: string;
}>;

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const comment = comments.find((c) => c.id === id);

    if (!comment) {
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(comment);
}
