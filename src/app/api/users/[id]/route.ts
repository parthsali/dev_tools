import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        // Load and parse your JSON
        const dataPath = path.join(process.cwd(), "src/data/users.json");
        const json = await fs.readFile(dataPath, "utf-8");
        const users = JSON.parse(json);

        // Convert id to number
        const user = users.find((u: any) => u.id === Number(id));

        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        return Response.json(user, { status: 200 });
    } catch (error) {
        console.error("Error reading user by id:", error);
        return Response.json({ message: "Internal error" }, { status: 500 });
    }
}
