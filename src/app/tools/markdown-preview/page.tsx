import { constructMetadata } from "@/lib/metadata";
import MarkdownPreviewPage from "./client";

export const metadata = constructMetadata({
    title: "Markdown Preview",
    description: "Real-time Markdown editor and preview tool. Write and see your markdown rendered instantly.",
    path: "/tools/markdown-preview",
});

export default function Page() {
    return <MarkdownPreviewPage />;
}
