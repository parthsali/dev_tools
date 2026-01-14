"use client";

import { useState, useMemo } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check, Copy, Zap } from "lucide-react";

// Common regex patterns for developers
const COMMON_PATTERNS = [
    {
        category: "Validation",
        patterns: [
            { name: "Email", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", test: "user@example.com", description: "Validates email addresses" },
            { name: "URL", pattern: "^(https?:\\/\\/)?(www\\.)?[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(\\/\\S*)?$", test: "https://example.com/path", description: "Validates URLs with optional protocol" },
            { name: "Phone (International)", pattern: "^\\+?[1-9]\\d{1,14}$", test: "+1234567890", description: "International phone format (E.164)" },
            { name: "Phone (US)", pattern: "^\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}$", test: "(555) 123-4567", description: "US phone format" },
            { name: "IP Address (v4)", pattern: "^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$", test: "192.168.1.1", description: "IPv4 addresses" },
        ]
    },
    {
        category: "Password",
        patterns: [
            { name: "Min 8 chars", pattern: "^.{8,}$", test: "password123", description: "At least 8 characters" },
            { name: "Uppercase + Lowercase", pattern: "^(?=.*[a-z])(?=.*[A-Z]).{8,}$", test: "Password1", description: "8+ chars with upper and lowercase" },
            { name: "Strong Password", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", test: "Pass@123!", description: "8+ chars, upper, lower, number, special" },
            { name: "No Spaces", pattern: "^\\S+$", test: "NoSpacesHere", description: "No whitespace allowed" },
        ]
    },
    {
        category: "Numbers",
        patterns: [
            { name: "Integer", pattern: "^-?\\d+$", test: "-123", description: "Positive or negative integers" },
            { name: "Decimal", pattern: "^-?\\d*\\.?\\d+$", test: "-123.45", description: "Decimal numbers" },
            { name: "Percentage", pattern: "^\\d{1,3}(\\.\\d+)?%?$", test: "99.5%", description: "Percentage values" },
            { name: "Credit Card", pattern: "^\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}$", test: "1234-5678-9012-3456", description: "Credit card format" },
        ]
    },
    {
        category: "Text",
        patterns: [
            { name: "Alphanumeric", pattern: "^[a-zA-Z0-9]+$", test: "abc123", description: "Only letters and numbers" },
            { name: "Slug", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", test: "my-url-slug", description: "URL-friendly slugs" },
            { name: "Username", pattern: "^[a-zA-Z][a-zA-Z0-9_]{2,15}$", test: "user_123", description: "3-16 chars, starts with letter" },
            { name: "Hex Color", pattern: "^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$", test: "#FF5733", description: "Hex color codes" },
        ]
    },
    {
        category: "Date & Time",
        patterns: [
            { name: "Date (YYYY-MM-DD)", pattern: "^\\d{4}-\\d{2}-\\d{2}$", test: "2024-01-15", description: "ISO date format" },
            { name: "Date (DD/MM/YYYY)", pattern: "^\\d{2}\\/\\d{2}\\/\\d{4}$", test: "15/01/2024", description: "European date format" },
            { name: "Time (24h)", pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$", test: "14:30", description: "24-hour time format" },
            { name: "DateTime ISO", pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:\\d{2})?$", test: "2024-01-15T14:30:00Z", description: "ISO 8601 datetime" },
        ]
    },
];

const FLAGS_OPTIONS = [
    { value: "g", label: "Global", description: "Find all matches" },
    { value: "i", label: "Case Insensitive", description: "Ignore case" },
    { value: "m", label: "Multiline", description: "^ and $ match line start/end" },
    { value: "s", label: "Dotall", description: ". matches newlines" },
];

export default function RegexTesterPage() {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState<string[]>(["g"]);
    const [testString, setTestString] = useState("");
    const [copiedPattern, setCopiedPattern] = useState<string | null>(null);

    const flagString = flags.join("");

    const result = useMemo(() => {
        if (!pattern || !testString) return { matches: [], error: null };

        try {
            const regex = new RegExp(pattern, flagString);
            const matches: { match: string; index: number; groups: string[] }[] = [];
            let match;

            if (flagString.includes("g")) {
                while ((match = regex.exec(testString)) !== null) {
                    matches.push({
                        match: match[0],
                        index: match.index,
                        groups: match.slice(1),
                    });
                    if (!match[0].length) regex.lastIndex++;
                }
            } else {
                match = regex.exec(testString);
                if (match) {
                    matches.push({
                        match: match[0],
                        index: match.index,
                        groups: match.slice(1),
                    });
                }
            }

            return { matches, error: null };
        } catch (e) {
            return { matches: [], error: (e as Error).message };
        }
    }, [pattern, flagString, testString]);

    const highlightedText = useMemo(() => {
        if (!pattern || !testString || result.error) return testString;

        try {
            const regex = new RegExp(pattern, flagString.includes("g") ? flagString : flagString + "g");
            const parts: { text: string; isMatch: boolean }[] = [];
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(testString)) !== null) {
                if (match.index > lastIndex) {
                    parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false });
                }
                parts.push({ text: match[0], isMatch: true });
                lastIndex = match.index + match[0].length;
                if (!match[0].length) regex.lastIndex++;
            }

            if (lastIndex < testString.length) {
                parts.push({ text: testString.slice(lastIndex), isMatch: false });
            }

            return parts;
        } catch {
            return testString;
        }
    }, [pattern, flagString, testString, result.error]);

    const applyPattern = (p: { pattern: string; test: string }) => {
        setPattern(p.pattern);
        setTestString(p.test);
    };

    const copyPattern = async (p: string) => {
        await navigator.clipboard.writeText(p);
        setCopiedPattern(p);
        setTimeout(() => setCopiedPattern(null), 1500);
    };

    return (
        <ToolLayout
            title="Regex Tester"
            description="Test regular expressions with live highlighting and common patterns"
        >
            <Tabs defaultValue="tester" className="space-y-4">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="tester">Tester</TabsTrigger>
                    <TabsTrigger value="patterns">Common Patterns</TabsTrigger>
                </TabsList>

                <TabsContent value="tester" className="space-y-4">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Input Section */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Pattern</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
                                            <Input
                                                value={pattern}
                                                onChange={(e) => setPattern(e.target.value)}
                                                placeholder="[a-z]+"
                                                className="pl-7 pr-7 font-mono"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
                                        </div>
                                        <CopyButton text={`/${pattern}/${flagString}`} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">Flags</Label>
                                        <ToggleGroup
                                            type="multiple"
                                            value={flags}
                                            onValueChange={setFlags}
                                            className="justify-start"
                                        >
                                            {FLAGS_OPTIONS.map((flag) => (
                                                <ToggleGroupItem
                                                    key={flag.value}
                                                    value={flag.value}
                                                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                                                >
                                                    {flag.value}
                                                </ToggleGroupItem>
                                            ))}
                                        </ToggleGroup>
                                        <p className="text-xs text-muted-foreground">
                                            {flags.map(f => FLAGS_OPTIONS.find(o => o.value === f)?.description).join(", ") || "No flags selected"}
                                        </p>
                                    </div>

                                    {result.error && (
                                        <p className="text-sm text-destructive">{result.error}</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Test String</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={testString}
                                        onChange={(e) => setTestString(e.target.value)}
                                        placeholder="Enter text to test against your pattern..."
                                        className="min-h-[180px] font-mono text-sm"
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Output Section */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm">Result</CardTitle>
                                        <Badge variant={result.matches.length > 0 ? "success" : "secondary"}>
                                            {result.matches.length} match{result.matches.length !== 1 ? "es" : ""}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="min-h-[180px] rounded-lg border bg-muted/30 p-3 font-mono text-sm whitespace-pre-wrap break-all">
                                        {typeof highlightedText === "string" ? (
                                            highlightedText || <span className="text-muted-foreground">Result will appear here...</span>
                                        ) : (
                                            highlightedText.map((part, i) =>
                                                part.isMatch ? (
                                                    <mark key={i} className="bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded px-0.5">
                                                        {part.text}
                                                    </mark>
                                                ) : (
                                                    <span key={i}>{part.text}</span>
                                                )
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {result.matches.length > 0 && (
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm">Match Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[180px]">
                                            <div className="space-y-2">
                                                {result.matches.map((m, i) => (
                                                    <div key={i} className="flex items-center justify-between gap-3 p-2 rounded-lg bg-muted/50">
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <Badge variant="outline" className="shrink-0">#{i + 1}</Badge>
                                                            <code className="font-mono text-sm truncate">{m.match}</code>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-muted-foreground shrink-0">
                                                                @{m.index}
                                                            </span>
                                                            <CopyButton text={m.match} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="patterns" className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                        Click on any pattern to use it in the tester, or copy it directly.
                    </p>
                    <Accordion type="multiple" className="space-y-2">
                        {COMMON_PATTERNS.map((category) => (
                            <AccordionItem key={category.category} value={category.category} className="border rounded-lg px-4">
                                <AccordionTrigger className="hover:no-underline">
                                    <span className="font-medium">{category.category}</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid gap-2 pt-2">
                                        {category.patterns.map((p) => (
                                            <div
                                                key={p.name}
                                                className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-sm">{p.name}</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                                                    <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1 block truncate">
                                                        /{p.pattern}/
                                                    </code>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => applyPattern(p)}
                                                    >
                                                        <Zap className="h-3 w-3 mr-1" />
                                                        Use
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => copyPattern(p.pattern)}
                                                    >
                                                        {copiedPattern === p.pattern ? (
                                                            <Check className="h-3 w-3" />
                                                        ) : (
                                                            <Copy className="h-3 w-3" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </TabsContent>
            </Tabs>
        </ToolLayout>
    );
}
