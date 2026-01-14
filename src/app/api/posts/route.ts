import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";
import { getPagination, paginateArray, filterAndSortArray } from "@/lib/api-utils";

const dataPath = path.join(process.cwd(), "src/data/posts.json");

export async function GET(request: NextRequest) {
    try {
        const json = await fs.readFile(dataPath, "utf-8");
        const allPosts = JSON.parse(json);

        // Filter and Sort
        const filteredPosts = filterAndSortArray(allPosts, request);

        // Pagination
        const { page, limit } = getPagination(request);
        const paginatedPosts = paginateArray(filteredPosts, page, limit);

        return Response.json({
            posts: paginatedPosts,
            total: filteredPosts.length,
            page,
            limit,
            totalPages: Math.ceil(filteredPosts.length / limit)
        }, { status: 200 });
    } catch (error) {
        console.error("Error reading posts:", error);
        return Response.json({ message: "Failed to load posts" }, { status: 500 });
    }
}
