"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Send, Loader2, Plus, Trash2, Save, Settings, Variable, Clock, CheckCircle2, XCircle } from "lucide-react";
import { RichInput } from "./components/rich-input";
import { RichTextarea } from "./components/rich-textarea";

interface KeyValue {
    key: string;
    value: string;
    enabled: boolean;
}

interface ApiResponse {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
    time: number;
}

interface SavedVariables {
    baseUrl: string;
    headers: KeyValue[];
    variables: KeyValue[];
}

const STORAGE_KEY = "devtools_api_tester";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

const METHOD_COLORS: Record<string, string> = {
    GET: "text-emerald-500",
    POST: "text-blue-500",
    PUT: "text-amber-500",
    PATCH: "text-purple-500",
    DELETE: "text-red-500",
};

const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "success";
    if (status >= 400 && status < 500) return "warning";
    if (status >= 500) return "destructive";
    return "secondary";
};

export default function ApiTesterPage() {
    const [method, setMethod] = useState<typeof HTTP_METHODS[number]>("GET");
    const [url, setUrl] = useState("");
    const [body, setBody] = useState("");
    const [headers, setHeaders] = useState<KeyValue[]>([
        { key: "Content-Type", value: "application/json", enabled: true }
    ]);
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Variables
    const [baseUrl, setBaseUrl] = useState("");
    const [savedVariables, setSavedVariables] = useState<KeyValue[]>([]);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Variable autocomplete
    const [showVariablePopover, setShowVariablePopover] = useState(false);
    const [variableSearchTerm, setVariableSearchTerm] = useState("");
    const [activeInputRef, setActiveInputRef] = useState<"url" | "body" | null>(null);
    const [cursorPosition, setCursorPosition] = useState(0);

    const urlInputRef = useRef<HTMLInputElement>(null);
    const bodyInputRef = useRef<HTMLTextAreaElement>(null);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const data: SavedVariables = JSON.parse(saved);
                setBaseUrl(data.baseUrl || "");
                if (data.headers?.length) setHeaders(data.headers);
                if (data.variables?.length) setSavedVariables(data.variables);
            } catch (e) {
                console.error("Failed to load saved data");
            }
        }
    }, []);

    // Save to localStorage
    const handleSave = () => {
        const data: SavedVariables = { baseUrl, headers, variables: savedVariables };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSettingsOpen(false);
    };

    // Get enabled variables for autocomplete
    const enabledVariables = useMemo(() => {
        return savedVariables.filter(v => v.enabled && v.key);
    }, [savedVariables]);

    // Replace variables in string
    const replaceVariables = (str: string): string => {
        let result = str;
        savedVariables.forEach((v) => {
            if (v.enabled && v.key) {
                result = result.replace(new RegExp(`{{${v.key}}}`, "g"), v.value);
            }
        });
        return result;
    };

    // Handle input change with variable detection
    const handleInputChange = (value: string, type: "url" | "body") => {
        if (type === "url") {
            setUrl(value);
        } else {
            setBody(value);
        }

        // Check for {{ pattern
        const lastOpenBrace = value.lastIndexOf("{{");
        const lastCloseBrace = value.lastIndexOf("}}");

        if (lastOpenBrace > lastCloseBrace) {
            // We're inside {{ }}, show autocomplete
            const searchTerm = value.slice(lastOpenBrace + 2);
            if (!searchTerm.includes(" ") && enabledVariables.length > 0) {
                setVariableSearchTerm(searchTerm);
                setActiveInputRef(type);
                setShowVariablePopover(true);
                setCursorPosition(lastOpenBrace);
            }
        } else {
            setShowVariablePopover(false);
        }
    };

    // Insert variable
    const insertVariable = (variableName: string) => {
        const insertText = `{{${variableName}}}`;

        if (activeInputRef === "url") {
            const before = url.slice(0, cursorPosition);
            const after = url.slice(cursorPosition).replace(/^{{[^}]*/, "");
            setUrl(before + insertText + after);
            setTimeout(() => urlInputRef.current?.focus(), 0);
        } else if (activeInputRef === "body") {
            const before = body.slice(0, cursorPosition);
            const after = body.slice(cursorPosition).replace(/^{{[^}]*/, "");
            setBody(before + insertText + after);
            setTimeout(() => bodyInputRef.current?.focus(), 0);
        }

        setShowVariablePopover(false);
    };

    const handleSend = async () => {
        if (!url.trim()) {
            setError("URL is required");
            return;
        }

        setLoading(true);
        setError("");
        setResponse(null);

        const fullUrl = replaceVariables(baseUrl + url);
        const startTime = Date.now();

        try {
            const requestHeaders: Record<string, string> = {};
            headers.forEach((h) => {
                if (h.enabled && h.key) {
                    requestHeaders[h.key] = replaceVariables(h.value);
                }
            });

            const options: RequestInit = {
                method,
                headers: requestHeaders,
            };

            if (method !== "GET" && body.trim()) {
                options.body = replaceVariables(body);
            }

            const res = await fetch(fullUrl, options);
            const endTime = Date.now();

            const responseHeaders: Record<string, string> = {};
            res.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });

            let responseBody = "";
            try {
                const text = await res.text();
                try {
                    responseBody = JSON.stringify(JSON.parse(text), null, 2);
                } catch {
                    responseBody = text;
                }
            } catch {
                responseBody = "Unable to read response body";
            }

            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: responseHeaders,
                body: responseBody,
                time: endTime - startTime,
            });
        } catch (e) {
            setError((e as Error).message || "Request failed");
        }

        setLoading(false);
    };

    const addHeader = () => {
        setHeaders([...headers, { key: "", value: "", enabled: true }]);
    };

    const removeHeader = (index: number) => {
        setHeaders(headers.filter((_, i) => i !== index));
    };

    const updateHeader = (index: number, field: keyof KeyValue, value: string | boolean) => {
        const updated = [...headers];
        updated[index] = { ...updated[index], [field]: value };
        setHeaders(updated);
    };

    const addVariable = () => {
        setSavedVariables([...savedVariables, { key: "", value: "", enabled: true }]);
    };

    const removeVariable = (index: number) => {
        setSavedVariables(savedVariables.filter((_, i) => i !== index));
    };

    const updateVariable = (index: number, field: keyof KeyValue, value: string | boolean) => {
        const updated = [...savedVariables];
        updated[index] = { ...updated[index], [field]: value };
        setSavedVariables(updated);
    };

    return (
        <ToolLayout
            title="API Tester"
            description="Test HTTP APIs with environment variables"
        >
            <div className="space-y-4">
                {/* URL Bar */}
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex gap-2">
                            <Select value={method} onValueChange={(v) => setMethod(v as typeof method)}>
                                <SelectTrigger className="w-28">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {HTTP_METHODS.map((m) => (
                                        <SelectItem key={m} value={m}>
                                            <span className={`font-mono font-bold ${METHOD_COLORS[m]}`}>{m}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex-1 relative">
                                {baseUrl && (
                                    <Badge variant="secondary" className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono">
                                        {baseUrl.length > 20 ? baseUrl.slice(0, 20) + "..." : baseUrl}
                                    </Badge>
                                )}
                                <RichInput
                                    variables={enabledVariables}
                                    ref={urlInputRef}
                                    value={url}
                                    onChange={(e) => handleInputChange(e.target.value, "url")}
                                    placeholder="/api/endpoint or full URL"
                                    className={`font-mono ${baseUrl ? "pl-[calc(0.5rem+var(--base-url-width))]" : ""}`}
                                    style={{ "--base-url-width": baseUrl ? `${Math.min(baseUrl.length * 0.5, 10)}rem` : "0" } as React.CSSProperties}
                                    onKeyDown={(e) => e.key === "Enter" && !showVariablePopover && handleSend()}
                                />

                                {/* Variable Autocomplete Popover */}
                                {showVariablePopover && activeInputRef === "url" && enabledVariables.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 z-50">
                                        <Card className="shadow-lg">
                                            <CardContent className="p-2">
                                                <p className="text-xs text-muted-foreground mb-2 px-2">
                                                    Available variables
                                                </p>
                                                {enabledVariables
                                                    .filter(v => v.key.toLowerCase().includes(variableSearchTerm.toLowerCase()))
                                                    .map((v) => (
                                                        <button
                                                            key={v.key}
                                                            onClick={() => insertVariable(v.key)}
                                                            className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted text-left"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Variable className="h-3 w-3 text-muted-foreground" />
                                                                <span className="font-mono text-sm">{`{{${v.key}}}`}</span>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                                                                {v.value}
                                                            </span>
                                                        </button>
                                                    ))}
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </div>

                            <Button onClick={handleSend} disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                <span className="ml-2 hidden sm:inline">Send</span>
                            </Button>

                            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle>Environment Settings</DialogTitle>
                                        <DialogDescription>
                                            Configure base URL and variables. Use <code className="bg-muted px-1 rounded">{`{{variable}}`}</code> in requests.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Base URL</Label>
                                            <Input
                                                value={baseUrl}
                                                onChange={(e) => setBaseUrl(e.target.value)}
                                                placeholder="https://api.example.com"
                                                className="font-mono"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label>Variables</Label>
                                                <Button size="sm" variant="ghost" onClick={addVariable}>
                                                    <Plus className="h-3 w-3 mr-1" /> Add
                                                </Button>
                                            </div>
                                            <ScrollArea className="h-48 border rounded-lg p-2">
                                                {savedVariables.length === 0 ? (
                                                    <p className="text-sm text-muted-foreground text-center py-4">
                                                        No variables. Click "Add" to create one.
                                                    </p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {savedVariables.map((v, i) => (
                                                            <div key={i} className="flex gap-2 items-center">
                                                                <Switch
                                                                    checked={v.enabled}
                                                                    onCheckedChange={(checked) => updateVariable(i, "enabled", checked)}
                                                                />
                                                                <Input
                                                                    value={v.key}
                                                                    onChange={(e) => updateVariable(i, "key", e.target.value)}
                                                                    placeholder="key"
                                                                    className="flex-1 font-mono"
                                                                />
                                                                <Input
                                                                    value={v.value}
                                                                    onChange={(e) => updateVariable(i, "value", e.target.value)}
                                                                    placeholder="value"
                                                                    className="flex-1 font-mono"
                                                                />
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    onClick={() => removeVariable(i)}
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </ScrollArea>
                                        </div>

                                        <Button onClick={handleSave} className="w-full">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save to Browser
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Quick variable pills with tooltips */}
                        {enabledVariables.length > 0 && (
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                                <Variable className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Variables:</span>
                                <div className="flex flex-wrap gap-1">
                                    {enabledVariables.slice(0, 5).map((v) => (
                                        <Tooltip key={v.key}>
                                            <TooltipTrigger asChild>
                                                <Badge variant="secondary" className="font-mono text-xs cursor-help">
                                                    {v.key}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="font-mono text-xs">
                                                <span className="text-muted-foreground">{v.key} = </span>
                                                <span>{v.value || "(empty)"}</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                    {enabledVariables.length > 5 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{enabledVariables.length - 5} more
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {error && (
                    <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="py-3">
                            <div className="flex items-center gap-2 text-destructive">
                                <XCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Request */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Request</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="body">
                                <TabsList className="w-full">
                                    <TabsTrigger value="body" className="flex-1">Body</TabsTrigger>
                                    <TabsTrigger value="headers" className="flex-1">
                                        Headers
                                        <Badge variant="secondary" className="ml-1">{headers.filter(h => h.enabled).length}</Badge>
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="body" className="mt-3 relative">
                                    <RichTextarea
                                        variables={enabledVariables}
                                        ref={bodyInputRef}
                                        value={body}
                                        onChange={(e) => handleInputChange(e.target.value, "body")}
                                        placeholder='{"key": "value"}'
                                        className="min-h-[200px] font-mono text-sm"
                                    />

                                    {/* Variable Autocomplete for Body */}
                                    {showVariablePopover && activeInputRef === "body" && enabledVariables.length > 0 && (
                                        <div className="absolute top-12 left-4 z-50">
                                            <Card className="shadow-lg w-64">
                                                <CardContent className="p-2">
                                                    <p className="text-xs text-muted-foreground mb-2 px-2">
                                                        Insert variable
                                                    </p>
                                                    {enabledVariables
                                                        .filter(v => v.key.toLowerCase().includes(variableSearchTerm.toLowerCase()))
                                                        .map((v) => (
                                                            <button
                                                                key={v.key}
                                                                onClick={() => insertVariable(v.key)}
                                                                className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted text-left"
                                                            >
                                                                <span className="font-mono text-sm">{`{{${v.key}}}`}</span>
                                                            </button>
                                                        ))}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="headers" className="mt-3 space-y-2">
                                    <ScrollArea className="h-[176px]">
                                        <div className="space-y-2 pr-4">
                                            {headers.map((h, i) => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <Switch
                                                        checked={h.enabled}
                                                        onCheckedChange={(checked) => updateHeader(i, "enabled", checked)}
                                                    />
                                                    <Input
                                                        value={h.key}
                                                        onChange={(e) => updateHeader(i, "key", e.target.value)}
                                                        placeholder="Header"
                                                        className="flex-1 font-mono text-sm"
                                                    />
                                                    <Input
                                                        value={h.value}
                                                        onChange={(e) => updateHeader(i, "value", e.target.value)}
                                                        placeholder="Value"
                                                        className="flex-1 font-mono text-sm"
                                                    />
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => removeHeader(i)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    <Button size="sm" variant="outline" onClick={addHeader} className="w-full">
                                        <Plus className="h-3 w-3 mr-1" /> Add Header
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Response */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm">Response</CardTitle>
                                {response && (
                                    <div className="flex items-center gap-2">
                                        <Badge variant={getStatusColor(response.status) as "success" | "warning" | "destructive" | "secondary"}>
                                            {response.status} {response.statusText}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {response.time}ms
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="response-body">
                                <TabsList className="w-full">
                                    <TabsTrigger value="response-body" className="flex-1">Body</TabsTrigger>
                                    <TabsTrigger value="response-headers" className="flex-1">
                                        Headers
                                        {response && <Badge variant="secondary" className="ml-1">{Object.keys(response.headers).length}</Badge>}
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="response-body" className="mt-3">
                                    <ScrollArea className="h-[200px] rounded-lg border bg-muted/30">
                                        <pre className="p-3 font-mono text-sm whitespace-pre-wrap">
                                            {response?.body || <span className="text-muted-foreground">Send a request to see the response...</span>}
                                        </pre>
                                    </ScrollArea>
                                    {response?.body && <CopyButton text={response.body} className="mt-2" />}
                                </TabsContent>

                                <TabsContent value="response-headers" className="mt-3">
                                    <ScrollArea className="h-[200px] rounded-lg border">
                                        {response?.headers && Object.entries(response.headers).length > 0 ? (
                                            <div className="divide-y">
                                                {Object.entries(response.headers).map(([key, value]) => (
                                                    <div key={key} className="flex gap-2 p-2 text-sm">
                                                        <span className="font-medium font-mono min-w-0 truncate">{key}:</span>
                                                        <span className="text-muted-foreground truncate">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="p-3 text-sm text-muted-foreground">No headers</p>
                                        )}
                                    </ScrollArea>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                    💡 Type <code className="bg-muted px-1 rounded">{`{{`}</code> to see available variables. Settings are saved in your browser.
                </p>
            </div>
        </ToolLayout>
    );
}
