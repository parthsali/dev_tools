import { constructMetadata } from "@/lib/metadata";
import JsonFormatterPage from "./client";

export const metadata = constructMetadata({
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data. Free online JSON beautifier and validator for developers.",
    path: "/tools/json-formatter",
});

export default function Page() {
    return <JsonFormatterPage />;
}
