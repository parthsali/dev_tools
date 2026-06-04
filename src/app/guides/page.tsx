import { constructMetadata } from "@/lib/metadata";
import GuidesPage from "./client";

export const metadata = constructMetadata({
    title: "Setup Guides",
    description: "In-depth, step-by-step setup guides for Next.js, Express, tRPC, Prisma, Docker, Clerk, Hono.js, Winston logging, and more. Copy-paste commands with full TypeScript code examples.",
    path: "/guides",
});

export default function Page() {
    return <GuidesPage />;
}
