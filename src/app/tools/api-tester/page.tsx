import { constructMetadata } from "@/lib/metadata";
import ApiTesterPage from "./client";

export const metadata = constructMetadata({
    title: "API Tester",
    description: "Test HTTP APIs with environment variables. A powerful REST API client for developers.",
    path: "/tools/api-tester",
});

export default function Page() {
    return <ApiTesterPage />;
}
