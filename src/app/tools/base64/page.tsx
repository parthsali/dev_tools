import { constructMetadata } from "@/lib/metadata";
import Base64Page from "./client";

export const metadata = constructMetadata({
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings online. Simple, fast, and secure Base64 converter tool.",
    path: "/tools/base64",
});

export default function Page() {
    return <Base64Page />;
}
