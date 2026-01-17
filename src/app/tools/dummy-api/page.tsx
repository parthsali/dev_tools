import { constructMetadata } from "@/lib/metadata";
import DummyApiClient from "./client"

export const metadata = constructMetadata({
    title: "Mock REST API - 1000+ Indian Test Data Endpoints",
    description: "DevTools Mock REST API for testing and prototyping. Get 1000+ users, posts, products, orders, comments, companies, and quotes with Indian names, addresses, and phone numbers.",
    path: "/tools/dummy-api",
});

export default function DummyApiPage() {
    return <DummyApiClient />;
}
