import { constructMetadata } from "@/lib/metadata";
import JsonYamlPage from "./client";

export const metadata = constructMetadata({
    title: "JSON ↔ YAML Converter",
    description: "Convert between JSON and YAML formats instantly. Preserve structure and data types with ease.",
    path: "/tools/json-yaml",
});

export default function Page() {
    return <JsonYamlPage />;
}
