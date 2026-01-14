import { constructMetadata } from "@/lib/metadata";
import UrlEncoderPage from "./client";

export const metadata = constructMetadata({
    title: "URL Encoder/Decoder",
    description: "Securely encode and decode URL strings. Convert special characters to URL-safe format.",
    path: "/tools/url-encoder",
});

export default function Page() {
    return <UrlEncoderPage />;
}
