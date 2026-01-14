export const siteConfig = {
    name: "DevTools",
    title: "DevTools - Developer Utilities",
    description: "Ultimate collection of developer tools and guides. Regex tester, JSON formatter, Base64 encoder, and more.",
    version: "1.0.0",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://tools.parthsali.com",
    ogImage: "https://tools.parthsali.com/og.jpg",
    links: {
        twitter: "https://twitter.com/parthsali",
        github: "https://github.com/parthsali/tools",
    },
    author: {
        name: "Parth Sali",
        twitter: "@parthsali",
        github: "https://github.com/parthsali",
    },
    keywords: [
        "developer tools",
        "regex tester",
        "json formatter",
        "base64",
        "url encoder",
        "jwt decoder",
        "web development",
        "programming",
        "utilities"
    ],
    system: {
        status: "Optimal",
        security: "Encrypted",
    }
};

export type SiteConfig = typeof siteConfig;
