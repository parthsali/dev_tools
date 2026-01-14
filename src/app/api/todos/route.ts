import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";
import { getPagination, paginateArray, filterAndSortArray } from "@/lib/api-utils";

const dataPath = path.join(process.cwd(), "src/data/todos.json");

export async function GET(request: NextRequest) {
    try {
        const json = await fs.readFile(dataPath, "utf-8");
        const allTodos = JSON.parse(json);

        // Filter and Sort
        const filteredTodos = filterAndSortArray(allTodos, request);

        // Pagination
        const { page, limit } = getPagination(request);
        const paginatedTodos = paginateArray(filteredTodos, page, limit);

        return Response.json({
            todos: paginatedTodos,
            total: filteredTodos.length,
            page,
            limit,
            totalPages: Math.ceil(filteredTodos.length / limit)
        }, { status: 200 });
    } catch (error) {
        console.error("Error reading todos:", error);
        return Response.json({ message: "Failed to load todos" }, { status: 500 });
    }
}
