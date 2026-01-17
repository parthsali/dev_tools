import { NextResponse } from "next/server";
import quotesData from "@/data/quotes.json";

const quotes = quotesData as Array<{
    id: number;
    quote: string;
    author: string;
    category: string;
    likes: number;
    shares: number;
}>;

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const quote = quotes.find((q) => q.id === id);

    if (!quote) {
        return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(quote);
}
