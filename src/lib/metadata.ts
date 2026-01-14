import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadata {
    title: string;
    description: string;
    image?: string;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    path?: string;
}

export function constructMetadata({
    title,
    description,
    image,
    icons,
    noIndex = false,
    path = "",
}: PageMetadata): Metadata {
    const url = `${siteConfig.url}${path}`;
    const ogImage = image || `${siteConfig.url}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || siteConfig.description)}`;

    return {
        title: {
            template: `%s | ${siteConfig.name}`,
            default: title,
        },
        description: description || siteConfig.description,
        openGraph: {
            title,
            description: description || siteConfig.description,
            url: url,
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: description || siteConfig.description,
            images: [ogImage],
            creator: siteConfig.author.twitter,
        },
        icons,
        metadataBase: new URL(siteConfig.url),
        authors: [
            {
                name: siteConfig.author.name,
                url: siteConfig.author.github,
            },
        ],
        creator: siteConfig.author.name,
        keywords: siteConfig.keywords,
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        alternates: {
            canonical: url,
        },
    };
}
