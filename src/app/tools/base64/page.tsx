"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Base64Page() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");

    const handleEncode = () => {
        try {
            setError("");
            const encoded = btoa(unescape(encodeURIComponent(input)));
            setOutput(encoded);
            setMode("encode");
        } catch (e) {
            setError("Failed to encode input");
        }
    };

    const handleDecode = () => {
        try {
            setError("");
            const decoded = decodeURIComponent(escape(atob(input)));
            setOutput(decoded);
            setMode("decode");
        } catch (e) {
            setError("Invalid Base64 string");
        }
    };

    return (
        <ToolLayout
            title="Base64"
            description="Encode and decode Base64 strings"
        >
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Input</Label>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleEncode}>
                                Encode
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleDecode}>
                                Decode
                            </Button>
                        </div>
                    </div>
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to encode or Base64 string to decode..."
                        className="min-h-[150px]"
                    />
                </div>

                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>{mode === "encode" ? "Encoded" : "Decoded"} Output</Label>
                        <CopyButton text={output} />
                    </div>
                    <Textarea
                        value={output}
                        readOnly
                        placeholder="Result will appear here..."
                        className="min-h-[150px] bg-muted/30"
                    />
                </div>
            </div>
        </ToolLayout>
    );
}
