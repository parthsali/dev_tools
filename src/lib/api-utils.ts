import { NextRequest, NextResponse } from "next/server";

export interface PaginationParams {
    page: number;
    limit: number;
}

export function getPagination(request: NextRequest): PaginationParams {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("_page") || searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("_limit") || searchParams.get("limit") || "50"), 100);

    return {
        page: isNaN(page) || page < 1 ? 1 : page,
        limit: isNaN(limit) || limit < 1 ? 50 : limit,
    };
}

export function paginateArray<T>(array: T[], page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
}

export function filterAndSortArray<T>(array: T[], request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    let result = [...array];

    // Search
    const query = searchParams.get("q")?.toLowerCase();
    if (query) {
        result = result.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(query)
        );
    }

    // Filtering by fields
    searchParams.forEach((value, key) => {
        // Skip internal params
        if (["_page", "page", "_limit", "limit", "_sort", "sort", "_order", "order", "q"].includes(key)) {
            return;
        }

        result = result.filter((item: any) => {
            const itemValue = item[key];
            if (itemValue === undefined) return true; // Ignore if field doesn't exist

            if (typeof itemValue === "string") {
                return itemValue.toLowerCase().includes(value.toLowerCase());
            }
            if (typeof itemValue === "number") {
                return itemValue === Number(value);
            }
            if (typeof itemValue === "boolean") {
                return String(itemValue) === value;
            }
            return false;
        });
    });

    // Sorting
    const sortField = searchParams.get("_sort") || searchParams.get("sort");
    const order = (searchParams.get("_order") || searchParams.get("order"))?.toLowerCase() === "desc" ? -1 : 1;

    if (sortField) {
        result.sort((a: any, b: any) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];

            if (fieldA === undefined || fieldB === undefined) return 0;

            if (fieldA < fieldB) return -1 * order;
            if (fieldA > fieldB) return 1 * order;
            return 0;
        });
    }

    return result;
}

/**
 * Simple & Effective In-Memory Sliding Window Rate Limiter.
 * No external libraries, no Redis, no overhead.
 */

interface RateLimitResponse {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

const rateLimitStore = new Map<string, number[]>();

export async function checkRateLimit(
    request: NextRequest,
    limit: number = 10,
    windowMs: number = 60000
): Promise<RateLimitResponse> {
    const ip = (request as any).ip || request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get existing timestamps for this IP
    let timestamps = rateLimitStore.get(ip) || [];

    // 1. Prune: Remove timestamps older than the window
    timestamps = timestamps.filter(t => t > windowStart);

    // 2. Check: Is the user within the limit?
    const isAllowed = timestamps.length < limit;

    if (isAllowed) {
        timestamps.push(now);
    }

    // 3. Update: Store the new state
    rateLimitStore.set(ip, timestamps);

    return {
        success: isAllowed,
        limit,
        remaining: Math.max(0, limit - timestamps.length),
        reset: now + windowMs,
    };
}

export function createErrorResponse(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}
