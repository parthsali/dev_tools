import { constructMetadata } from "@/lib/metadata";
import GuidesPage from "./client";

export const metadata = constructMetadata({
    title: "Setup Guides",
    description: "Step-by-step developer guides for tools, frameworks, and environments.",
    path: "/guides",
});

export default function Page() {
    return <GuidesPage />;
}
