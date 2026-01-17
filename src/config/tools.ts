import {
    Regex,
    Key,
    Binary,
    FileJson,
    ArrowLeftRight,
    Clock,
    Palette,
    Globe,
    GitCompare,
    Hash,
    Wand2,
    FileText,
    Package,
    Send,
    Code2,
    Database,
    BookOpen,
    Server,
    type LucideIcon,
} from "lucide-react";

export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    category: string;
    href: string;
}

export interface ToolCategory {
    id: string;
    name: string;
    tools: Tool[];
}

export const tools: Tool[] = [
    {
        id: "dummy-api",
        name: "Mock REST API",
        description: "1000+ Indian test data endpoints",
        icon: Server,
        category: "http",
        href: "/tools/dummy-api",
    },
    {
        id: "api-tester",
        name: "API Tester",
        description: "Test HTTP APIs with variables",
        icon: Send,
        category: "http",
        href: "/tools/api-tester",
    },
    {
        id: "base64",
        name: "Base64",
        description: "Encode & decode Base64 strings",
        icon: Binary,
        category: "encoders",
        href: "/tools/base64",
    },
    {
        id: "color-converter",
        name: "Color Converter",
        description: "Convert HEX, RGB, and HSL colors",
        icon: Palette,
        category: "colors",
        href: "/tools/color-converter",
    },
    {
        id: "csv-json",
        name: "CSV ↔ JSON",
        description: "Convert between CSV and JSON",
        icon: ArrowLeftRight,
        category: "converters",
        href: "/tools/csv-json",
    },
    {
        id: "data-generator",
        name: "Data Generator",
        description: "Generate random mock data",
        icon: Database,
        category: "generators",
        href: "/tools/data-generator",
    },
    {
        id: "diff-checker",
        name: "Diff Checker",
        description: "Compare text differences",
        icon: GitCompare,
        category: "text",
        href: "/tools/diff-checker",
    },
    {
        id: "hash-generator",
        name: "Hash Generator",
        description: "Generate MD5 & SHA hashes",
        icon: Hash,
        category: "crypto",
        href: "/tools/hash-generator",
    },
    {
        id: "html-entities",
        name: "HTML Entities",
        description: "Escape & unescape HTML entities",
        icon: Code2,
        category: "encoders",
        href: "/tools/html-entities",
    },
    {
        id: "http-status",
        name: "HTTP Status Codes",
        description: "HTTP status code reference",
        icon: BookOpen,
        category: "http",
        href: "/tools/http-status",
    },
    {
        id: "json-yaml",
        name: "JSON ↔ YAML",
        description: "Convert between JSON & YAML",
        icon: ArrowLeftRight,
        category: "converters",
        href: "/tools/json-yaml",
    },
    {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format & validate JSON data",
        icon: FileJson,
        category: "formatters",
        href: "/tools/json-formatter",
    },
    {
        id: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode & inspect JWT tokens",
        icon: Key,
        category: "encoders",
        href: "/tools/jwt-decoder",
    },
    {
        id: "lorem-ipsum",
        name: "Lorem Ipsum",
        description: "Generate placeholder text",
        icon: FileText,
        category: "generators",
        href: "/tools/lorem-ipsum",
    },
    {
        id: "markdown-preview",
        name: "Markdown Preview",
        description: "Real-time Markdown preview",
        icon: FileText,
        category: "text",
        href: "/tools/markdown-preview",
    },
    {
        id: "npm-checker",
        name: "NPM Checker",
        description: "Check NPM package versions",
        icon: Package,
        category: "packages",
        href: "/tools/npm-checker",
    },
    {
        id: "regex-tester",
        name: "Regex Tester",
        description: "Test & debug regular expressions",
        icon: Regex,
        category: "text",
        href: "/tools/regex-tester",
    },
    {
        id: "timestamp",
        name: "Timestamp",
        description: "Convert Unix timestamps",
        icon: Clock,
        category: "datetime",
        href: "/tools/timestamp",
    },
    {
        id: "url-encoder",
        name: "URL Encoder",
        description: "Encode & decode URL strings",
        icon: Globe,
        category: "encoders",
        href: "/tools/url-encoder",
    },
    {
        id: "url-parser",
        name: "URL Parser",
        description: "Parse & analyze URLs",
        icon: Globe,
        category: "http",
        href: "/tools/url-parser",
    },
    // {
    //     id: "uuid-generator",
    //     name: "UUID Generator",
    //     description: "Generate random UUIDs",
    //     icon: Wand2,
    //     category: "generators",
    //     href: "/tools/uuid-generator",
    // },
];

export const categories: ToolCategory[] = [
    {
        id: "text",
        name: "Text & Regex",
        tools: tools.filter((t) => t.category === "text"),
    },
    {
        id: "encoders",
        name: "Encoders & Decoders",
        tools: tools.filter((t) => t.category === "encoders"),
    },
    {
        id: "formatters",
        name: "Formatters",
        tools: tools.filter((t) => t.category === "formatters"),
    },
    {
        id: "converters",
        name: "Converters",
        tools: tools.filter((t) => t.category === "converters"),
    },
    {
        id: "datetime",
        name: "Date & Time",
        tools: tools.filter((t) => t.category === "datetime"),
    },
    {
        id: "colors",
        name: "Colors",
        tools: tools.filter((t) => t.category === "colors"),
    },
    {
        id: "http",
        name: "HTTP & API",
        tools: tools.filter((t) => t.category === "http"),
    },
    {
        id: "crypto",
        name: "Crypto & Hash",
        tools: tools.filter((t) => t.category === "crypto"),
    },

    {
        id: "generators",
        name: "Generators",
        tools: tools.filter((t) => t.category === "generators"),
    },
    {
        id: "packages",
        name: "Package Tools",
        tools: tools.filter((t) => t.category === "packages"),
    },
];
