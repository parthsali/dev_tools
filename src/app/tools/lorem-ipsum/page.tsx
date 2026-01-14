import { constructMetadata } from "@/lib/metadata";
import LoremIpsumPage from "./client";

export const metadata = constructMetadata({
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs. Choose paragraphs, sentences, or words.",
    path: "/tools/lorem-ipsum",
});

export default function Page() {
    return <LoremIpsumPage />;
}
