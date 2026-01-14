"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Check, Copy, ArrowRight, Search } from "lucide-react";

// Common symbols organized by category
const SYMBOL_CATEGORIES = [
    {
        name: "Common",
        symbols: [
            { char: "&", entity: "&amp;", name: "Ampersand" },
            { char: "<", entity: "&lt;", name: "Less than" },
            { char: ">", entity: "&gt;", name: "Greater than" },
            { char: '"', entity: "&quot;", name: "Quote" },
            { char: "'", entity: "&#39;", name: "Apostrophe" },
            { char: " ", entity: "&nbsp;", name: "Non-breaking space" },
        ]
    },
    {
        name: "Currency",
        symbols: [
            { char: "$", entity: "&#36;", name: "Dollar" },
            { char: "€", entity: "&euro;", name: "Euro" },
            { char: "£", entity: "&pound;", name: "Pound" },
            { char: "¥", entity: "&yen;", name: "Yen" },
            { char: "₹", entity: "&#8377;", name: "Rupee" },
            { char: "¢", entity: "&cent;", name: "Cent" },
            { char: "₿", entity: "&#8383;", name: "Bitcoin" },
        ]
    },
    {
        name: "Math",
        symbols: [
            { char: "±", entity: "&plusmn;", name: "Plus/Minus" },
            { char: "×", entity: "&times;", name: "Multiply" },
            { char: "÷", entity: "&divide;", name: "Divide" },
            { char: "≠", entity: "&ne;", name: "Not equal" },
            { char: "≤", entity: "&le;", name: "Less or equal" },
            { char: "≥", entity: "&ge;", name: "Greater or equal" },
            { char: "∞", entity: "&infin;", name: "Infinity" },
            { char: "√", entity: "&radic;", name: "Square root" },
            { char: "π", entity: "&pi;", name: "Pi" },
            { char: "∑", entity: "&sum;", name: "Sum" },
        ]
    },
    {
        name: "Arrows",
        symbols: [
            { char: "←", entity: "&larr;", name: "Left arrow" },
            { char: "→", entity: "&rarr;", name: "Right arrow" },
            { char: "↑", entity: "&uarr;", name: "Up arrow" },
            { char: "↓", entity: "&darr;", name: "Down arrow" },
            { char: "↔", entity: "&harr;", name: "Left-right arrow" },
            { char: "⇐", entity: "&lArr;", name: "Double left" },
            { char: "⇒", entity: "&rArr;", name: "Double right" },
            { char: "⇑", entity: "&uArr;", name: "Double up" },
            { char: "⇓", entity: "&dArr;", name: "Double down" },
        ]
    },
    {
        name: "Legal & Symbols",
        symbols: [
            { char: "©", entity: "&copy;", name: "Copyright" },
            { char: "®", entity: "&reg;", name: "Registered" },
            { char: "™", entity: "&trade;", name: "Trademark" },
            { char: "§", entity: "&sect;", name: "Section" },
            { char: "¶", entity: "&para;", name: "Paragraph" },
            { char: "†", entity: "&dagger;", name: "Dagger" },
            { char: "‡", entity: "&Dagger;", name: "Double dagger" },
            { char: "•", entity: "&bull;", name: "Bullet" },
            { char: "…", entity: "&hellip;", name: "Ellipsis" },
        ]
    },
    {
        name: "Punctuation",
        symbols: [
            { char: "–", entity: "&ndash;", name: "En dash" },
            { char: "—", entity: "&mdash;", name: "Em dash" },
            { char: "'", entity: "&lsquo;", name: "Left quote" },
            { char: "'", entity: "&rsquo;", name: "Right quote" },
            { char: "«", entity: "&laquo;", name: "Left guillemet" },
            { char: "»", entity: "&raquo;", name: "Right guillemet" },
        ]
    },
    {
        name: "Special",
        symbols: [
            { char: "♠", entity: "&spades;", name: "Spade" },
            { char: "♣", entity: "&clubs;", name: "Club" },
            { char: "♥", entity: "&hearts;", name: "Heart" },
            { char: "♦", entity: "&diams;", name: "Diamond" },
            { char: "★", entity: "&#9733;", name: "Star filled" },
            { char: "☆", entity: "&#9734;", name: "Star outline" },
            { char: "✓", entity: "&#10003;", name: "Check mark" },
            { char: "✗", entity: "&#10007;", name: "X mark" },
        ]
    },
];

export default function HtmlEntitiesPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"escape" | "unescape">("escape");
    const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
    const [symbolSearch, setSymbolSearch] = useState("");

    const escapeHtml = (text: string): string => {
        const map: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };
        return text.replace(/[&<>"']/g, (char) => map[char]);
    };

    const unescapeHtml = (text: string): string => {
        const el = document.createElement("div");
        el.innerHTML = text;
        return el.textContent || el.innerText || "";
    };

    const handleEscape = () => {
        setOutput(escapeHtml(input));
        setMode("escape");
    };

    const handleUnescape = () => {
        setOutput(unescapeHtml(input));
        setMode("unescape");
    };

    const copySymbol = async (text: string, type: "char" | "entity") => {
        await navigator.clipboard.writeText(text);
        setCopiedSymbol(text);
        setTimeout(() => setCopiedSymbol(null), 1500);
    };

    const filteredCategories = SYMBOL_CATEGORIES.map(cat => ({
        ...cat,
        symbols: cat.symbols.filter(s =>
            s.name.toLowerCase().includes(symbolSearch.toLowerCase()) ||
            s.char.includes(symbolSearch) ||
            s.entity.toLowerCase().includes(symbolSearch.toLowerCase())
        )
    })).filter(cat => cat.symbols.length > 0);

    return (
        <ToolLayout
            title="HTML Entities"
            description="Escape/unescape HTML and copy common symbols"
        >
            <div className="space-y-6">
                <Tabs defaultValue="converter" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="converter">Converter</TabsTrigger>
                        <TabsTrigger value="symbols">Symbol Library</TabsTrigger>
                    </TabsList>

                    <TabsContent value="converter" className="mt-4 space-y-4">
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Input */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Input</CardTitle>
                                    <CardDescription>
                                        Enter text to escape or escaped HTML to unescape
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={'Enter text like: Hello <World> & "Friends"'}
                                        className="min-h-[200px] font-mono text-sm"
                                    />
                                    <div className="flex gap-2">
                                        <Button onClick={handleEscape} className="flex-1">
                                            Escape HTML
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                        <Button onClick={handleUnescape} variant="outline" className="flex-1">
                                            Unescape HTML
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Output */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-sm">Output</CardTitle>
                                            <CardDescription>
                                                {mode === "escape" ? "Escaped" : "Unescaped"} result
                                            </CardDescription>
                                        </div>
                                        {output && <CopyButton text={output} />}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={output}
                                        readOnly
                                        placeholder="Result will appear here..."
                                        className="min-h-[200px] font-mono text-sm bg-muted/30"
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Reference */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Quick Reference</CardTitle>
                                <CardDescription>
                                    Characters that must be escaped in HTML
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                    {SYMBOL_CATEGORIES[0].symbols.map((item) => (
                                        <div
                                            key={item.entity}
                                            className="flex items-center gap-2 p-2 rounded-lg border bg-muted/30"
                                        >
                                            <span className="text-xl font-mono w-8 text-center">{item.char === " " ? "␣" : item.char}</span>
                                            <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                                            <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 truncate">
                                                {item.entity}
                                            </code>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="symbols" className="mt-4 space-y-4">
                        {/* Search */}
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={symbolSearch}
                                onChange={(e) => setSymbolSearch(e.target.value)}
                                placeholder="Search symbols..."
                                className="pl-9"
                            />
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Click on any symbol or entity to copy it to clipboard
                        </p>

                        <ScrollArea className="h-[500px]">
                            <div className="space-y-6 pr-4">
                                {filteredCategories.map((category) => (
                                    <div key={category.name}>
                                        <div className="flex items-center gap-2 mb-3 sticky top-0 bg-background py-2">
                                            <Badge variant="secondary">{category.name}</Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {category.symbols.length} symbols
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                            {category.symbols.map((symbol) => (
                                                <div
                                                    key={symbol.entity}
                                                    className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors group"
                                                >
                                                    <button
                                                        onClick={() => copySymbol(symbol.char, "char")}
                                                        className="text-2xl font-mono w-10 h-10 flex items-center justify-center rounded-lg bg-background border hover:border-primary transition-colors relative"
                                                    >
                                                        {symbol.char === " " ? "␣" : symbol.char}
                                                        {copiedSymbol === symbol.char && (
                                                            <span className="absolute inset-0 flex items-center justify-center bg-background rounded-lg">
                                                                <Check className="h-4 w-4 text-emerald-500" />
                                                            </span>
                                                        )}
                                                    </button>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">{symbol.name}</p>
                                                        <button
                                                            onClick={() => copySymbol(symbol.entity, "entity")}
                                                            className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                                                        >
                                                            {symbol.entity}
                                                            {copiedSymbol === symbol.entity ? (
                                                                <Check className="h-3 w-3" />
                                                            ) : (
                                                                <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>
        </ToolLayout>
    );
}
