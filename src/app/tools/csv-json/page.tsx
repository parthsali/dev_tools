import { constructMetadata } from "@/lib/metadata";
import CsvJsonPage from "./client";

export const metadata = constructMetadata({
    title: "CSV ↔ JSON Converter",
    description: "Convert between CSV and JSON formats instantly. Clean, fast, and easy to use data converter.",
    path: "/tools/csv-json",
});

export default function Page() {
    return <CsvJsonPage />;
}
