import { constructMetadata } from "@/lib/metadata";
import TimestampPage from "./client";

export const metadata = constructMetadata({
    title: "Unix Timestamp Converter",
    description: "Convert Unix timestamps to readable dates and vice-versa. Support for seconds, milliseconds, and ISO format.",
    path: "/tools/timestamp",
});

export default function Page() {
    return <TimestampPage />;
}
