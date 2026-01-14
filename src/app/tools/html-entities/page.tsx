import { constructMetadata } from "@/lib/metadata";
import HtmlEntitiesPage from "./client";

export const metadata = constructMetadata({
    title: "HTML Entities Encoder/Decoder",
    description: "Escape and unescape HTML entities. Convert special characters to HTML entities and vice-versa.",
    path: "/tools/html-entities",
});

export default function Page() {
    return <HtmlEntitiesPage />;
}
