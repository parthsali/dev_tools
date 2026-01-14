import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";
import { getPagination, paginateArray, filterAndSortArray } from "@/lib/api-utils";

const dataPath = path.join(process.cwd(), "src/data/users.json");

export async function GET(request: NextRequest) {
    try {
        const json = await fs.readFile(dataPath, "utf-8");
        const allUsers = JSON.parse(json);

        // Filter and Sort
        const filteredUsers = filterAndSortArray(allUsers, request);

        // Pagination
        const { page, limit } = getPagination(request);
        const paginatedUsers = paginateArray(filteredUsers, page, limit);

        return Response.json({
            users: paginatedUsers,
            total: filteredUsers.length,
            page,
            limit,
            totalPages: Math.ceil(filteredUsers.length / limit)
        }, { status: 200 });
    } catch (error) {
        console.error("Error reading users:", error);
        return Response.json({ message: "Failed to load users" }, { status: 500 });
    }
}
