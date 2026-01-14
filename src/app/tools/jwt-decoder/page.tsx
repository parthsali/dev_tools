import { constructMetadata } from "@/lib/metadata";
import JwtDecoderPage from "./client";

export const metadata = constructMetadata({
    title: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens (JWT) online. View header, payload, and signature details.",
    path: "/tools/jwt-decoder",
});

export default function Page() {
    return <JwtDecoderPage />;
}
