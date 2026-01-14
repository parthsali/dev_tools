import { constructMetadata } from "@/lib/metadata";
import UuidGeneratorPage from "./client";

export const metadata = constructMetadata({
    title: "UUID Generator",
    description: "Generate random UUIDs (v4) online. Bulk generate unique identifiers quickly.",
    path: "/tools/uuid-generator",
});

export default function Page() {
    return <UuidGeneratorPage />;
}
