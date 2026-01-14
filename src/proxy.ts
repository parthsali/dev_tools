import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "./lib/api-utils";

export async function proxy(request: NextRequest) {
    // Only apply rate limiting to API routes
    if (request.nextUrl.pathname.startsWith("/api")) {
        const rateLimitResult = await checkRateLimit(request);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                {
                    error: "Too many requests",
                    message: "You have exceeded the rate limit. Please try again later."
                },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": rateLimitResult.limit.toString(),
                        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
                        "X-RateLimit-Reset": rateLimitResult.reset.toString(),
                    }
                }
            );
        }

        const response = NextResponse.next();

        // Add rate limit headers to successful requests too
        response.headers.set("X-RateLimit-Limit", rateLimitResult.limit.toString());
        response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
        response.headers.set("X-RateLimit-Reset", rateLimitResult.reset.toString());

        return response;
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/api/:path*",
};
