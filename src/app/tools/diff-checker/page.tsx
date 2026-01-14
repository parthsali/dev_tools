import { constructMetadata } from "@/lib/metadata";
import DiffCheckerPage from "./client";

export const metadata = constructMetadata({
    title: "Diff Checker",
    description: "Compare two pieces of text and find differences. Clean and intuitive side-by-side comparison tool.",
    path: "/tools/diff-checker",
});

export default function Page() {
    return <DiffCheckerPage />;
}
