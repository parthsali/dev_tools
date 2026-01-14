import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const dataPath = path.join(process.cwd(), "src/data/posts.json");
        const json = await fs.readFile(dataPath, "utf-8");
        const posts = JSON.parse(json);

        const post = posts.find((p: any) => p.id === Number(id));
        if (!post) {
            return Response.json({ message: "Post not found" }, { status: 404 });
        }

        return Response.json(post, { status: 200 });
    } catch (error) {
        console.error("Error reading post by id:", error);
        return Response.json({ message: "Internal error" }, { status: 500 });
    }
}
