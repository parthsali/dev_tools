import { constructMetadata } from "@/lib/metadata";
import HashGeneratorPage from "./client";

export const metadata = constructMetadata({
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes online. Secure and fast hashing tool.",
    path: "/tools/hash-generator",
});

export default function Page() {
    return <HashGeneratorPage />;
}
