import { guideContents, guides } from "@/config/guides";
import { constructMetadata } from "@/lib/metadata";
import GuidePage from "./client";

export function generateStaticParams() {
    return guides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const guide = guideContents[id];
    if (!guide) return {};

    return constructMetadata({
        title: `${guide.title} Setup Guide`,
        description: guide.description,
        path: `/guides/${id}`,
    });
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return <GuidePage params={params} />;
}
