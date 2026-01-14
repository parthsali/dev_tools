import { constructMetadata } from "@/lib/metadata";
import UrlParserPage from "./client";

export const metadata = constructMetadata({
    title: "URL Parser & Analyzer",
    description: "Parse and analyze URLs into components: protocol, host, port, path, and query parameters.",
    path: "/tools/url-parser",
});

export default function Page() {
    return <UrlParserPage />;
}
