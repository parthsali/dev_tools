import { constructMetadata } from "@/lib/metadata";
import RegexTesterPage from "./client";

export const metadata = constructMetadata({
    title: "Regex Tester",
    description: "Test and debug regular expressions (in JS) with real-time highlighting and matching.",
    path: "/tools/regex-tester",
});

export default function Page() {
    return <RegexTesterPage />;
}
