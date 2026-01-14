import { constructMetadata } from "@/lib/metadata";
import DataGeneratorPage from "./client";

export const metadata = constructMetadata({
    title: "Mock Data Generator",
    description: "Generate random mock data for your projects. Names, emails, addresses, and more in JSON format.",
    path: "/tools/data-generator",
});

export default function Page() {
    return <DataGeneratorPage />;
}
