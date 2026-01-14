"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function hashText(text: string, algorithm: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGeneratorPage() {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState<{
        sha1: string;
        sha256: string;
        sha384: string;
        sha512: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!input.trim()) return;

        setLoading(true);
        try {
            const [sha1, sha256, sha384, sha512] = await Promise.all([
                hashText(input, "SHA-1"),
                hashText(input, "SHA-256"),
                hashText(input, "SHA-384"),
                hashText(input, "SHA-512"),
            ]);
            setHashes({ sha1, sha256, sha384, sha512 });
        } catch (e) {
            console.error("Failed to generate hashes", e);
        }
        setLoading(false);
    };

    return (
        <ToolLayout
            title="Hash Generator"
            description="Generate MD5, SHA-1, SHA-256 hashes"
        >
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Input Text</Label>
                        <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
                            {loading ? "Generating..." : "Generate Hashes"}
                        </Button>
                    </div>
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to hash..."
                        className="min-h-[120px]"
                    />
                </div>

                {hashes && (
                    <Card>
                        <CardHeader className="py-4">
                            <CardTitle className="text-base">Hash Results</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            {[
                                { name: "SHA-1", value: hashes.sha1 },
                                { name: "SHA-256", value: hashes.sha256 },
                                { name: "SHA-384", value: hashes.sha384 },
                                { name: "SHA-512", value: hashes.sha512 },
                            ].map((hash) => (
                                <div key={hash.name} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs text-muted-foreground">{hash.name}</Label>
                                        <CopyButton text={hash.value} />
                                    </div>
                                    <code className="block font-mono text-xs p-2 rounded-lg bg-muted/50 break-all">
                                        {hash.value}
                                    </code>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                <p className="text-xs text-muted-foreground text-center">
                    Note: MD5 is not supported by the Web Crypto API due to security concerns.
                    All hashing is done locally in your browser.
                </p>
            </div>
        </ToolLayout>
    );
}
