import { constructMetadata } from "@/lib/metadata";
import HomePage from "./home";

export const metadata = constructMetadata({
    title: "DevTools - Developer Utilities",
    description: "A collection of essential developer tools. Regex tester, JSON formatter, Base64 encoder, and more.",
    path: "/",
});

export default function Page() {
    return <HomePage />;
}
