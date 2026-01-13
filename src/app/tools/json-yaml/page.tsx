"use client";

import { useState, useEffect } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowRight, ArrowLeftRight, Wand2, AlertCircle, CheckCircle2 } from "lucide-react";

// Robust YAML parser/stringifier
function jsonToYaml(obj: unknown, indent = 0): string {
    const spaces = "  ".repeat(indent);

    if (obj === null) return "null";
    if (obj === undefined) return "";
    if (typeof obj === "boolean") return obj ? "true" : "false";
    if (typeof obj === "number") return String(obj);
    if (typeof obj === "string") {
        // Check if string needs quoting
        if (
            obj.includes("\n") ||
            obj.includes(":") ||
            obj.includes("#") ||
            obj.includes("'") ||
            obj.includes('"') ||
            obj.startsWith(" ") ||
            obj.endsWith(" ") ||
            obj === "" ||
            /^[0-9]/.test(obj) ||
            ["true", "false", "null", "yes", "no", "on", "off"].includes(obj.toLowerCase())
        ) {
            return `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
        }
        return obj;
    }

    if (Array.isArray(obj)) {
        if (obj.length === 0) return "[]";
        return obj
            .map((item) => {
                const value = jsonToYaml(item, indent + 1);
                if (typeof item === "object" && item !== null && !Array.isArray(item)) {
                    const lines = value.split("\n");
                    return `${spaces}- ${lines[0].trim()}\n${lines.slice(1).map(l => spaces + "  " + l.trim()).join("\n")}`.trim();
                }
                return `${spaces}- ${value}`;
            })
            .join("\n");
    }

    if (typeof obj === "object") {
        const entries = Object.entries(obj);
        if (entries.length === 0) return "{}";
        return entries
            .map(([key, value]) => {
                const yamlValue = jsonToYaml(value, indent + 1);
                // Quote key if needed
                const quotedKey = /[:\s#\[\]{},]/.test(key) ? `"${key}"` : key;

                if (typeof value === "object" && value !== null) {
                    if (Array.isArray(value) && value.length === 0) {
                        return `${spaces}${quotedKey}: []`;
                    }
                    if (!Array.isArray(value) && Object.keys(value).length === 0) {
                        return `${spaces}${quotedKey}: {}`;
                    }
                    return `${spaces}${quotedKey}:\n${yamlValue}`;
                }
                return `${spaces}${quotedKey}: ${yamlValue}`;
            })
            .join("\n");
    }

    return String(obj);
}

function yamlToJson(yaml: string): unknown {
    const lines = yaml.split("\n");
    const result: Record<string, unknown> = {};
    const stack: { obj: Record<string, unknown> | unknown[]; indent: number; key?: string }[] = [
        { obj: result, indent: -2 },
    ];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim() || line.trim().startsWith("#")) continue;

        const indent = line.search(/\S/);
        const content = line.trim();

        // Pop stack until we find parent
        while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
            stack.pop();
        }

        const parent = stack[stack.length - 1].obj;

        // Array item
        if (content.startsWith("- ")) {
            const value = content.slice(2).trim();
            if (Array.isArray(parent)) {
                if (value.includes(": ")) {
                    // Inline object in array
                    const colonIndex = value.indexOf(": ");
                    const key = value.slice(0, colonIndex).replace(/^["']|["']$/g, "");
                    const val = parseYamlValue(value.slice(colonIndex + 2));
                    const newObj: Record<string, unknown> = { [key]: val };
                    parent.push(newObj);
                    stack.push({ obj: newObj, indent: indent + 2 });
                } else {
                    parent.push(parseYamlValue(value));
                }
            }
            continue;
        }

        // Key-value pair
        const colonIndex = content.indexOf(":");
        if (colonIndex > 0) {
            const key = content.slice(0, colonIndex).trim().replace(/^["']|["']$/g, "");
            const value = content.slice(colonIndex + 1).trim();

            if (!value || value === "") {
                // Check if next line is array or object
                const nextLine = lines[i + 1];
                if (nextLine && nextLine.trim().startsWith("-")) {
                    const arr: unknown[] = [];
                    (parent as Record<string, unknown>)[key] = arr;
                    stack.push({ obj: arr, indent, key });
                } else if (nextLine && nextLine.search(/\S/) > indent) {
                    const obj: Record<string, unknown> = {};
                    (parent as Record<string, unknown>)[key] = obj;
                    stack.push({ obj, indent, key });
                } else {
                    (parent as Record<string, unknown>)[key] = null;
                }
            } else {
                (parent as Record<string, unknown>)[key] = parseYamlValue(value);
            }
        }
    }

    return result;
}

function parseYamlValue(value: string): unknown {
    if (value === "null" || value === "~" || value === "") return null;
    if (value === "true" || value === "yes" || value === "on") return true;
    if (value === "false" || value === "no" || value === "off") return false;
    if (/^-?\d+$/.test(value)) return parseInt(value, 10);
    if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        return value.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, '"');
    }
    if (value === "[]") return [];
    if (value === "{}") return {};
    return value;
}

// Sample data for testing
const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA",
    "zip": "10001"
  },
  "hobbies": ["reading", "coding", "gaming"],
  "projects": [
    {
      "name": "Project Alpha",
      "status": "completed",
      "year": 2023
    },
    {
      "name": "Project Beta",
      "status": "in-progress",
      "year": 2024
    }
  ],
  "metadata": {
    "createdAt": "2024-01-15T10:30:00Z",
    "tags": ["developer", "senior", "full-stack"]
  }
}`;

export default function JsonYamlPage() {
    const [direction, setDirection] = useState<"json-to-yaml" | "yaml-to-json">("json-to-yaml");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [validationStatus, setValidationStatus] = useState<"valid" | "invalid" | null>(null);

    // Validate input on change
    useEffect(() => {
        if (!input.trim()) {
            setValidationStatus(null);
            return;
        }

        if (direction === "json-to-yaml") {
            try {
                JSON.parse(input);
                setValidationStatus("valid");
            } catch {
                setValidationStatus("invalid");
            }
        } else {
            // Basic YAML validation
            try {
                yamlToJson(input);
                setValidationStatus("valid");
            } catch {
                setValidationStatus("invalid");
            }
        }
    }, [input, direction]);

    const handleConvert = () => {
        setError("");
        setOutput("");

        if (!input.trim()) {
            setError("Please enter some content to convert");
            return;
        }

        try {
            if (direction === "json-to-yaml") {
                const parsed = JSON.parse(input);
                const yaml = jsonToYaml(parsed);
                setOutput(yaml);
            } else {
                const parsed = yamlToJson(input);
                setOutput(JSON.stringify(parsed, null, 2));
            }
        } catch (e) {
            setError(direction === "json-to-yaml"
                ? "Invalid JSON. Please check your input."
                : "Invalid YAML. Please check your input.");
        }
    };

    const handleFormat = () => {
        if (direction === "json-to-yaml") {
            try {
                const parsed = JSON.parse(input);
                setInput(JSON.stringify(parsed, null, 2));
                setError("");
            } catch (e) {
                setError("Cannot format: Invalid JSON");
            }
        }
    };

    const loadSample = () => {
        if (direction === "json-to-yaml") {
            setInput(SAMPLE_JSON);
        } else {
            setInput(jsonToYaml(JSON.parse(SAMPLE_JSON)));
        }
        setError("");
        setOutput("");
    };

    const swapContent = () => {
        if (output) {
            setInput(output);
            setOutput("");
            setDirection(direction === "json-to-yaml" ? "yaml-to-json" : "json-to-yaml");
        }
    };

    return (
        <ToolLayout
            title="JSON ↔ YAML"
            description="Convert between JSON and YAML formats"
        >
            <div className="space-y-4">
                {/* Direction Toggle */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <ToggleGroup
                        type="single"
                        value={direction}
                        onValueChange={(v) => {
                            if (v) {
                                setDirection(v as typeof direction);
                                setInput("");
                                setOutput("");
                                setError("");
                            }
                        }}
                        className="bg-muted p-1 rounded-lg"
                    >
                        <ToggleGroupItem
                            value="json-to-yaml"
                            className="data-[state=on]:bg-background data-[state=on]:shadow-sm px-4"
                        >
                            JSON → YAML
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="yaml-to-json"
                            className="data-[state=on]:bg-background data-[state=on]:shadow-sm px-4"
                        >
                            YAML → JSON
                        </ToggleGroupItem>
                    </ToggleGroup>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={loadSample}>
                            Load Sample
                        </Button>
                        {output && (
                            <Button variant="outline" size="sm" onClick={swapContent}>
                                <ArrowLeftRight className="h-3 w-3 mr-1" />
                                Swap
                            </Button>
                        )}
                    </div>
                </div>

                {/* Editor Grid */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Input */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-sm">
                                        {direction === "json-to-yaml" ? "JSON" : "YAML"} Input
                                    </CardTitle>
                                    {validationStatus && (
                                        <Badge variant={validationStatus === "valid" ? "success" : "destructive"}>
                                            {validationStatus === "valid" ? (
                                                <><CheckCircle2 className="h-3 w-3 mr-1" /> Valid</>
                                            ) : (
                                                <><AlertCircle className="h-3 w-3 mr-1" /> Invalid</>
                                            )}
                                        </Badge>
                                    )}
                                </div>
                                {direction === "json-to-yaml" && (
                                    <Button variant="ghost" size="sm" onClick={handleFormat}>
                                        <Wand2 className="h-3 w-3 mr-1" />
                                        Format
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={direction === "json-to-yaml"
                                    ? '{"name": "value", "nested": {"key": "value"}}'
                                    : 'name: value\nnested:\n  key: value'}
                                className="min-h-[350px] font-mono text-sm"
                            />
                            <Button onClick={handleConvert} className="w-full">
                                Convert
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Output */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm">
                                    {direction === "json-to-yaml" ? "YAML" : "JSON"} Output
                                </CardTitle>
                                {output && <CopyButton text={output} />}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={output}
                                readOnly
                                placeholder="Converted output will appear here..."
                                className="min-h-[350px] font-mono text-sm bg-muted/30"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Error Display */}
                {error && (
                    <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="py-3">
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Info */}
                <p className="text-xs text-muted-foreground text-center">
                    💡 Supports complex nested objects and arrays. Click "Format" to beautify JSON input.
                </p>
            </div>
        </ToolLayout>
    );
}
