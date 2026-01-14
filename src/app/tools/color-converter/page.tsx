import { constructMetadata } from "@/lib/metadata";
import ColorConverterPage from "./client";

export const metadata = constructMetadata({
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, and CMYK formats. Real-time color picker and converter.",
    path: "/tools/color-converter",
});

export default function Page() {
    return <ColorConverterPage />;
}
