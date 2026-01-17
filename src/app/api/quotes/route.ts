import { NextRequest, NextResponse } from "next/server";
import quotesData from "@/data/quotes.json";

const quotes = quotesData as Array<{
    id: number;
    quote: string;
    author: string;
    category: string;
    likes: number;
    shares: number;
}>;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const category = searchParams.get("category");

    let filtered = [...quotes];

    // Filter by category if provided
    if (category) {
        filtered = filtered.filter((q) => q.category.toLowerCase() === category.toLowerCase());
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedQuotes = filtered.slice(start, end);

    return NextResponse.json({
        quotes: paginatedQuotes,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
    });
}
