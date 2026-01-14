import { constructMetadata } from "@/lib/metadata";
import NpmCheckerPage from "./client";

export const metadata = constructMetadata({
    title: "NPM Package Checker",
    description: "Check NPM package details, versions, and dependencies. Fast repository and package insights.",
    path: "/tools/npm-checker",
});

export default function Page() {
    return <NpmCheckerPage />;
}
