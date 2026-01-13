"use client";

import { useState, useMemo } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Shield, Key, FileJson, AlertCircle, CheckCircle2, Info } from "lucide-react";

interface JWTPayload {
    [key: string]: unknown;
    exp?: number;
    iat?: number;
    nbf?: number;
    iss?: string;
    sub?: string;
    aud?: string | string[];
    jti?: string;
}

interface JWTHeader {
    alg?: string;
    typ?: string;
    [key: string]: unknown;
}

function decodeBase64Url(str: string): string {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
    return decodeURIComponent(
        atob(padded)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );
}

function formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
}

function getRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = timestamp * 1000 - now;
    const absDiff = Math.abs(diff);

    if (absDiff < 60000) return diff > 0 ? "in less than a minute" : "less than a minute ago";
    if (absDiff < 3600000) {
        const mins = Math.floor(absDiff / 60000);
        return diff > 0 ? `in ${mins} min${mins > 1 ? 's' : ''}` : `${mins} min${mins > 1 ? 's' : ''} ago`;
    }
    if (absDiff < 86400000) {
        const hours = Math.floor(absDiff / 3600000);
        return diff > 0 ? `in ${hours} hour${hours > 1 ? 's' : ''}` : `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    const days = Math.floor(absDiff / 86400000);
    return diff > 0 ? `in ${days} day${days > 1 ? 's' : ''}` : `${days} day${days > 1 ? 's' : ''} ago`;
}

function isExpired(exp: number): boolean {
    return Date.now() > exp * 1000;
}

// Sample JWTs for testing
const SAMPLE_TOKENS = [
    {
        name: "Valid Token",
        description: "A sample valid JWT",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.Vg30z7y4kFJwN3SZ-XuB9f6TJ_S1z2JG0gS4XJNZ-Gc"
    },
    {
        name: "Expired Token",
        description: "A sample expired JWT",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wFzzht-KQ"
    }
];

const CLAIM_DESCRIPTIONS: Record<string, { name: string; description: string }> = {
    iss: { name: "Issuer", description: "Who issued this token" },
    sub: { name: "Subject", description: "Who this token is about (user ID)" },
    aud: { name: "Audience", description: "Who this token is intended for" },
    exp: { name: "Expiration", description: "When this token expires" },
    nbf: { name: "Not Before", description: "When this token becomes valid" },
    iat: { name: "Issued At", description: "When this token was issued" },
    jti: { name: "JWT ID", description: "Unique identifier for this token" },
};

export default function JwtDecoderPage() {
    const [token, setToken] = useState("");

    const decoded = useMemo(() => {
        if (!token.trim()) return null;

        try {
            const parts = token.trim().split(".");
            if (parts.length !== 3) {
                return { error: "Invalid JWT format. A JWT should have 3 parts separated by dots (header.payload.signature)." };
            }

            const header: JWTHeader = JSON.parse(decodeBase64Url(parts[0]));
            const payload: JWTPayload = JSON.parse(decodeBase64Url(parts[1]));

            return { header, payload, signature: parts[2], error: null };
        } catch (e) {
            return { error: "Failed to decode JWT. Make sure it's a valid token." };
        }
    }, [token]);

    const tokenStatus = useMemo(() => {
        if (!decoded || decoded.error) return null;

        const payload = decoded.payload!;
        const now = Date.now() / 1000;

        if (payload.exp && isExpired(payload.exp)) {
            return { status: "expired", message: "This token has expired" };
        }
        if (payload.nbf && payload.nbf > now) {
            return { status: "not-yet-valid", message: "This token is not yet valid" };
        }
        if (payload.exp) {
            return { status: "valid", message: `Valid ${getRelativeTime(payload.exp)}` };
        }
        return { status: "no-expiry", message: "No expiration set" };
    }, [decoded]);

    const loadSample = (sampleToken: string) => {
        setToken(sampleToken);
    };

    return (
        <ToolLayout
            title="JWT Decoder"
            description="Decode and inspect JSON Web Tokens"
        >
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Input Section */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Key className="h-4 w-4" />
                                <CardTitle className="text-sm">Token Input</CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                                {SAMPLE_TOKENS.map((sample) => (
                                    <Button
                                        key={sample.name}
                                        size="sm"
                                        variant="outline"
                                        onClick={() => loadSample(sample.token)}
                                    >
                                        {sample.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Paste your JWT here... (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
                            className="min-h-[100px] font-mono text-sm"
                        />
                    </CardContent>
                </Card>

                {decoded?.error && (
                    <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="py-4">
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{decoded.error}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {decoded && !decoded.error && (
                    <div className="space-y-4">
                        {/* Status Banner */}
                        {tokenStatus && (
                            <Card className={
                                tokenStatus.status === "expired" ? "border-destructive/50 bg-destructive/5" :
                                    tokenStatus.status === "valid" ? "border-emerald-500/50 bg-emerald-500/5" :
                                        "border-yellow-500/50 bg-yellow-500/5"
                            }>
                                <CardContent className="py-3">
                                    <div className="flex items-center gap-2">
                                        {tokenStatus.status === "expired" ? (
                                            <AlertCircle className="h-4 w-4 text-destructive" />
                                        ) : tokenStatus.status === "valid" ? (
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                            <Info className="h-4 w-4 text-yellow-500" />
                                        )}
                                        <span className="text-sm font-medium">{tokenStatus.message}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Decoded Content */}
                        <Tabs defaultValue="payload" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="payload" className="flex items-center gap-2">
                                    <FileJson className="h-3 w-3" />
                                    Payload
                                </TabsTrigger>
                                <TabsTrigger value="header" className="flex items-center gap-2">
                                    <Shield className="h-3 w-3" />
                                    Header
                                </TabsTrigger>
                                <TabsTrigger value="claims" className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    Claims
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="payload" className="mt-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm">Payload (Data)</CardTitle>
                                            <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
                                        </div>
                                        <CardDescription>
                                            The main content of the token containing user data and claims
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <pre className="text-sm font-mono bg-muted/50 rounded-lg p-4 overflow-auto max-h-[300px]">
                                            {JSON.stringify(decoded.payload, null, 2)}
                                        </pre>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="header" className="mt-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm">Header (Algorithm & Type)</CardTitle>
                                            <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
                                        </div>
                                        <CardDescription>
                                            Metadata about the token including signing algorithm
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                {decoded.header?.alg && (
                                                    <div className="space-y-1">
                                                        <Label className="text-xs text-muted-foreground">Algorithm</Label>
                                                        <Badge variant="secondary" className="font-mono">
                                                            {decoded.header.alg}
                                                        </Badge>
                                                    </div>
                                                )}
                                                {decoded.header?.typ && (
                                                    <div className="space-y-1">
                                                        <Label className="text-xs text-muted-foreground">Type</Label>
                                                        <Badge variant="secondary" className="font-mono">
                                                            {decoded.header.typ}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                            <Separator />
                                            <pre className="text-sm font-mono bg-muted/50 rounded-lg p-4 overflow-auto">
                                                {JSON.stringify(decoded.header, null, 2)}
                                            </pre>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="claims" className="mt-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm">Standard Claims</CardTitle>
                                        <CardDescription>
                                            Registered claim details with human-readable values
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {Object.entries(CLAIM_DESCRIPTIONS).map(([key, info]) => {
                                                const value = decoded.payload?.[key];
                                                if (value === undefined) return null;

                                                let displayValue: React.ReactNode = String(value);
                                                let badge: React.ReactNode = null;

                                                if (key === "exp" && typeof value === "number") {
                                                    displayValue = formatDate(value);
                                                    badge = (
                                                        <Badge variant={isExpired(value) ? "destructive" : "success"}>
                                                            {isExpired(value) ? "Expired" : getRelativeTime(value)}
                                                        </Badge>
                                                    );
                                                } else if ((key === "iat" || key === "nbf") && typeof value === "number") {
                                                    displayValue = formatDate(value);
                                                    badge = (
                                                        <span className="text-xs text-muted-foreground">
                                                            {getRelativeTime(value)}
                                                        </span>
                                                    );
                                                }

                                                return (
                                                    <div
                                                        key={key}
                                                        className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                                                    >
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline" className="font-mono text-xs">
                                                                    {key}
                                                                </Badge>
                                                                <span className="text-sm font-medium">{info.name}</span>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">{info.description}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <code className="text-sm font-mono">{displayValue}</code>
                                                            {badge}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {/* Quick Info */}
                        <Card className="bg-muted/30">
                            <CardContent className="py-4">
                                <div className="flex items-start gap-2">
                                    <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div className="text-xs text-muted-foreground">
                                        <p className="font-medium mb-1">About JWT</p>
                                        <p>JWTs consist of three parts: Header (algorithm info), Payload (data), and Signature (verification).
                                            This decoder only reads the token - it cannot verify the signature without the secret key.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
