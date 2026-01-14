"use client";

import { useState, useMemo } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function JsonFormatterPage() {
    const [input, setInput] = useState("");
    const [indentSize, setIndentSize] = useState(2);

    const result = useMemo(() => {
        if (!input.trim()) return { output: "", error: null, isValid: null };

        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, indentSize);
            return { output: formatted, error: null, isValid: true };
        } catch (e) {
            return { output: "", error: (e as Error).message, isValid: false };
        }
    }, [input, indentSize]);

    const handleMinify = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
        } catch {
            // Input is invalid, do nothing
        }
    };

    const handleFormat = () => {
        if (result.output) {
            setInput(result.output);
        }
    };

    return (
        <ToolLayout
            title="JSON Formatter"
            description="Format, validate, and minify JSON"
        >
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Input */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Label>Input</Label>
                            {result.isValid !== null && (
                                <Badge variant={result.isValid ? "success" : "destructive"}>
                                    {result.isValid ? "Valid" : "Invalid"}
                                </Badge>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={handleMinify}>
                                Minify
                            </Button>
                            <Button size="sm" onClick={handleFormat} disabled={!result.output}>
                                Format
                            </Button>
                        </div>
                    </div>
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"key": "value"}'
                        className="min-h-[400px] font-mono text-sm"
                    />
                    {result.error && (
                        <p className="text-sm text-destructive">{result.error}</p>
                    )}
                </div>

                {/* Output */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Label>Formatted Output</Label>
                            <div className="flex items-center gap-1">
                                {[2, 4].map((size) => (
                                    <Button
                                        key={size}
                                        size="sm"
                                        variant={indentSize === size ? "default" : "ghost"}
                                        className="h-7 px-2 text-xs"
                                        onClick={() => setIndentSize(size)}
                                    >
                                        {size} spaces
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <CopyButton text={result.output} />
                    </div>
                    <Textarea
                        value={result.output}
                        readOnly
                        placeholder="Formatted JSON will appear here..."
                        className="min-h-[400px] font-mono text-sm bg-muted/30"
                    />
                </div>
            </div>
        </ToolLayout>
    );
}
