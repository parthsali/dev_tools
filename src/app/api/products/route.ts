import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";
import { getPagination, paginateArray, filterAndSortArray } from "@/lib/api-utils";

const dataPath = path.join(process.cwd(), "src/data/products.json");

export async function GET(request: NextRequest) {
    try {
        const json = await fs.readFile(dataPath, "utf-8");
        const allProducts = JSON.parse(json);

        // Filter and Sort
        const filteredProducts = filterAndSortArray(allProducts, request);

        // Pagination
        const { page, limit } = getPagination(request);
        const paginatedProducts = paginateArray(filteredProducts, page, limit);

        return Response.json({
            products: paginatedProducts,
            total: filteredProducts.length,
            page,
            limit,
            totalPages: Math.ceil(filteredProducts.length / limit)
        }, { status: 200 });
    } catch (error) {
        console.error("Error reading products:", error);
        return Response.json({ message: "Failed to load products" }, { status: 500 });
    }
}
