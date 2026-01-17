import { NextResponse, NextRequest } from "next/server";
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
    const category = searchParams.get("category");

    // Filter quotes by category if provided
    let filteredQuotes = quotes;
    if (category) {
        filteredQuotes = quotes.filter(
            (q) => q.category.toLowerCase() === category.toLowerCase()
        );

        // If no quotes found for the category, return error
        if (filteredQuotes.length === 0) {
            return NextResponse.json(
                {
                    error: "No quotes found for this category",
                    availableCategories: [
                        "motivation",
                        "wisdom",
                        "life",
                        "success",
                        "education",
                        "peace",
                    ],
                },
                { status: 404 }
            );
        }
    }

    // Get a random quote from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    return NextResponse.json(randomQuote);
}
