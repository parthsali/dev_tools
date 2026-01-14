import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const dataPath = path.join(process.cwd(), "src/data/todos.json");
        const json = await fs.readFile(dataPath, "utf-8");
        const todos = JSON.parse(json);

        const todo = todos.find((t: any) => t.id === Number(id));
        if (!todo) {
            return Response.json({ message: "Todo not found" }, { status: 404 });
        }

        return Response.json(todo, { status: 200 });
    } catch (error) {
        console.error("Error reading todo by id:", error);
        return Response.json({ message: "Internal error" }, { status: 500 });
    }
}
