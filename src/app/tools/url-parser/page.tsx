"use client";

import { useState, useMemo } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Globe, Link2, Hash, Search, Server, Lock, FolderOpen, AlertCircle, Plus, Trash2 } from "lucide-react";

// Sample URLs for testing
const SAMPLE_URLS = [
    "https://api.example.com:8080/v1/users?page=1&limit=10&sort=name#section",
    "https://www.google.com/search?q=hello+world&hl=en",
    "https://github.com/user/repo/blob/main/src/index.ts",
];

type ParsedUrl = {
    success: true;
    href: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    origin: string;
    params: { key: string; value: string }[];
    pathSegments: string[];
    username?: string;
    password?: string;
    isSecure: boolean;
} | {
    success: false;
    error: string;
};

export default function UrlParserPage() {
    const [url, setUrl] = useState("");
    const [editedParams, setEditedParams] = useState<{ key: string; value: string }[]>([]);
    const [isBuilding, setIsBuilding] = useState(false);
    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    const parsed = useMemo<ParsedUrl | null>(() => {
        if (!url.trim()) return null;

        try {
            const urlObj = new URL(url);
            const params: { key: string; value: string }[] = [];
            urlObj.searchParams.forEach((value, key) => {
                params.push({ key, value });
            });

            // Extract path segments
            const pathSegments = urlObj.pathname.split("/").filter(Boolean);

            return {
                success: true,
                href: urlObj.href,
                protocol: urlObj.protocol.replace(":", ""),
                host: urlObj.host,
                hostname: urlObj.hostname,
                port: urlObj.port || (urlObj.protocol === "https:" ? "443" : "80"),
                pathname: urlObj.pathname,
                search: urlObj.search,
                hash: urlObj.hash,
                origin: urlObj.origin,
                params,
                pathSegments,
                username: urlObj.username,
                password: urlObj.password,
                isSecure: urlObj.protocol === "https:",
            };
        } catch (e) {
            return { success: false, error: "Invalid URL format. Make sure to include the protocol (e.g., https://)" };
        }
    }, [url]);

    const loadSample = (sampleUrl: string) => {
        setUrl(sampleUrl);
        setIsBuilding(false);
    };

    const startBuilding = () => {
        if (parsed && parsed.success) {
            setEditedParams([...parsed.params]);
            setIsBuilding(true);
        }
    };

    const addParam = () => {
        setEditedParams([...editedParams, { key: "", value: "" }]);
    };

    const removeParam = (index: number) => {
        setEditedParams(editedParams.filter((_, i) => i !== index));
    };

    const updateParam = (index: number, field: "key" | "value", value: string) => {
        const updated = [...editedParams];
        updated[index] = { ...updated[index], [field]: value };
        setEditedParams(updated);
    };

    const applyParams = () => {
        if (parsed && parsed.success) {
            try {
                const urlObj = new URL(parsed.origin + parsed.pathname);
                editedParams.forEach((p) => {
                    if (p.key) {
                        urlObj.searchParams.set(p.key, p.value);
                    }
                });
                if (parsed.hash) {
                    urlObj.hash = parsed.hash;
                }
                setUrl(urlObj.href);
                setIsBuilding(false);
            } catch (e) {
                // Ignore
            }
        }
    };

    return (
        <ToolLayout
            title="URL Parser"
            description="Parse, analyze, and build URLs"
        >
            <div className="max-w-3xl mx-auto space-y-6">
                {/* URL Input */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <CardTitle className="text-sm">URL</CardTitle>
                            </div>
                            <div className="flex gap-1">
                                {SAMPLE_URLS.slice(0, 2).map((sample, i) => (
                                    <Button
                                        key={i}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => loadSample(sample)}
                                        className="text-xs"
                                    >
                                        Example {i + 1}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Input
                            value={url}
                            onChange={(e) => { setUrl(e.target.value); setIsBuilding(false); }}
                            placeholder="https://example.com:8080/path?query=value#hash"
                            className="font-mono"
                        />
                    </CardContent>
                </Card>

                {parsed && parsed.success === false && (
                    <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="py-3">
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{parsed.error}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {parsed && parsed.success && (
                    <Tabs defaultValue="components" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="components">Components</TabsTrigger>
                            <TabsTrigger value="params">
                                Parameters
                                {parsed.params.length > 0 && (
                                    <Badge variant="secondary" className="ml-1">{parsed.params.length}</Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="build">Build</TabsTrigger>
                        </TabsList>

                        <TabsContent value="components" className="mt-4 space-y-4">
                            {/* Visual URL Breakdown */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">URL Structure</CardTitle>
                                    <CardDescription>Visual breakdown of the URL components</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="font-mono text-sm bg-muted/50 rounded-lg p-4 overflow-x-auto">
                                        <span className="text-blue-500">{parsed.protocol}://</span>
                                        {parsed.username && (
                                            <span className="text-purple-500">{parsed.username}:{parsed.password}@</span>
                                        )}
                                        <span className="text-emerald-500">{parsed.hostname}</span>
                                        {parsed.port && parsed.port !== "80" && parsed.port !== "443" && (
                                            <span className="text-amber-500">:{parsed.port}</span>
                                        )}
                                        <span className="text-pink-500">{parsed.pathname}</span>
                                        {parsed.search && <span className="text-cyan-500">{parsed.search}</span>}
                                        {parsed.hash && <span className="text-orange-500">{parsed.hash}</span>}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <Badge variant={parsed.isSecure ? "success" : "warning"}>
                                            <Lock className="h-3 w-3 mr-1" />
                                            {parsed.isSecure ? "Secure (HTTPS)" : "Not Secure (HTTP)"}
                                        </Badge>
                                        {parsed.params.length > 0 && (
                                            <Badge variant="secondary">
                                                <Search className="h-3 w-3 mr-1" />
                                                {parsed.params.length} parameter{parsed.params.length !== 1 ? "s" : ""}
                                            </Badge>
                                        )}
                                        {parsed.hash && (
                                            <Badge variant="secondary">
                                                <Hash className="h-3 w-3 mr-1" />
                                                Fragment
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Component Details */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Components</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {[
                                            { icon: Link2, label: "Full URL", value: parsed.href, color: "text-foreground" },
                                            { icon: Server, label: "Origin", value: parsed.origin, color: "text-muted-foreground" },
                                            { icon: Globe, label: "Protocol", value: parsed.protocol, color: "text-blue-500" },
                                            { icon: Server, label: "Host", value: parsed.host, color: "text-emerald-500" },
                                            { icon: Server, label: "Hostname", value: parsed.hostname, color: "text-emerald-500" },
                                            { icon: Hash, label: "Port", value: parsed.port, color: "text-amber-500" },
                                            { icon: FolderOpen, label: "Pathname", value: parsed.pathname, color: "text-pink-500" },
                                        ].map((item) => (
                                            <div
                                                key={item.label}
                                                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">{item.label}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <code className={`font-mono text-sm ${item.color}`}>
                                                        {item.value || "(empty)"}
                                                    </code>
                                                    {item.value && <CopyButton text={item.value} />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Path Segments */}
                                    {parsed.pathSegments.length > 0 && (
                                        <>
                                            <Separator className="my-4" />
                                            <div className="space-y-2">
                                                <Label className="text-xs text-muted-foreground">Path Segments</Label>
                                                <div className="flex flex-wrap gap-1">
                                                    {parsed.pathSegments.map((segment, i) => (
                                                        <Badge key={i} variant="outline" className="font-mono">
                                                            /{segment}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="params" className="mt-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-sm">Query Parameters</CardTitle>
                                            <CardDescription>
                                                {parsed.params.length > 0
                                                    ? `${parsed.params.length} parameter${parsed.params.length !== 1 ? "s" : ""} found`
                                                    : "No query parameters in this URL"}
                                            </CardDescription>
                                        </div>
                                        {parsed.search && <CopyButton text={parsed.search} />}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {parsed.params.length > 0 ? (
                                        <div className="space-y-2">
                                            {parsed.params.map((param, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                                                >
                                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                                        <Badge variant="outline" className="font-mono shrink-0">
                                                            {param.key}
                                                        </Badge>
                                                        <span className="text-muted-foreground">=</span>
                                                        <code className="font-mono text-sm truncate text-cyan-600 dark:text-cyan-400">
                                                            {param.value || <span className="italic text-muted-foreground">(empty)</span>}
                                                        </code>
                                                    </div>
                                                    <div className="flex items-center gap-1 shrink-0">
                                                        <CopyButton text={param.value} />
                                                        <CopyButton text={`${param.key}=${param.value}`} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-muted-foreground py-8">
                                            This URL has no query parameters
                                        </p>
                                    )}

                                    {/* Hash/Fragment */}
                                    {parsed.hash && (
                                        <>
                                            <Separator className="my-4" />
                                            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                                                <div className="flex items-center gap-2">
                                                    <Hash className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">Fragment</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <code className="font-mono text-sm text-orange-500">
                                                        {parsed.hash}
                                                    </code>
                                                    <CopyButton text={parsed.hash} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="build" className="mt-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-sm">URL Builder</CardTitle>
                                            <CardDescription>Edit query parameters and rebuild the URL</CardDescription>
                                        </div>
                                        {!isBuilding && (
                                            <Button size="sm" onClick={startBuilding}>
                                                Edit Parameters
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {isBuilding ? (
                                        <div className="space-y-4">
                                            <ScrollArea className="h-48">
                                                <div className="space-y-2 pr-4">
                                                    {editedParams.map((param, i) => (
                                                        <div key={i} className="flex gap-2">
                                                            <Input
                                                                value={param.key}
                                                                onChange={(e) => updateParam(i, "key", e.target.value)}
                                                                placeholder="key"
                                                                className="flex-1 font-mono"
                                                            />
                                                            <Input
                                                                value={param.value}
                                                                onChange={(e) => updateParam(i, "value", e.target.value)}
                                                                placeholder="value"
                                                                className="flex-1 font-mono"
                                                            />
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                onClick={() => removeParam(i)}
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>

                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" onClick={addParam} className="flex-1">
                                                    <Plus className="h-3 w-3 mr-1" /> Add Parameter
                                                </Button>
                                                <Button size="sm" onClick={applyParams} className="flex-1">
                                                    Apply Changes
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-center text-muted-foreground py-8">
                                            Click "Edit Parameters" to modify the URL's query string
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </ToolLayout>
    );
}
