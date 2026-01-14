import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const dataPath = path.join(process.cwd(), "src/data/products.json");
        const json = await fs.readFile(dataPath, "utf-8");
        const products = JSON.parse(json);

        const product = products.find((p: any) => p.id === Number(id));
        if (!product) {
            return Response.json({ message: "Product not found" }, { status: 404 });
        }

        return Response.json(product, { status: 200 });
    } catch (error) {
        console.error("Error reading product by id:", error);
        return Response.json({ message: "Internal error" }, { status: 500 });
    }
}
