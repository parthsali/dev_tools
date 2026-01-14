import { constructMetadata } from "@/lib/metadata";
import HttpStatusPage from "./client";

export const metadata = constructMetadata({
    title: "HTTP Status Codes Registry",
    description: "Comprehensive list of HTTP status codes with detailed descriptions and meanings.",
    path: "/tools/http-status",
});

export default function Page() {
    return <HttpStatusPage />;
}
