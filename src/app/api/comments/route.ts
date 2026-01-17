import { NextRequest, NextResponse } from "next/server";
import commentsData from "@/data/comments.json";

const comments = commentsData as Array<{
    id: number;
    body: string;
    postId: number;
    userId: number;
    likes: number;
    createdAt: string;
}>;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const postId = searchParams.get("postId");
    const userId = searchParams.get("userId");

    let filtered = [...comments];

    // Filter by postId if provided
    if (postId) {
        filtered = filtered.filter((c) => c.postId === parseInt(postId));
    }

    // Filter by userId if provided
    if (userId) {
        filtered = filtered.filter((c) => c.userId === parseInt(userId));
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedComments = filtered.slice(start, end);

    return NextResponse.json({
        comments: paginatedComments,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
    });
}
