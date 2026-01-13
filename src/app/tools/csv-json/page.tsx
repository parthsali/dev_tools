"use client";

import { useState, useEffect } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowRight, ArrowLeftRight, Wand2, AlertCircle, CheckCircle2, Table } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

function csvToJson(csv: string): unknown[] {
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const result: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const values = parseCSVLine(lines[i]);
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim() || "";
        });
        result.push(obj);
    }

    return result;
}

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            result.push(current);
            current = "";
        } else {
            current += char;
        }
    }
    result.push(current);

    return result;
}

function jsonToCsv(json: unknown[]): string {
    if (!Array.isArray(json) || json.length === 0) return "";

    const headers = Object.keys(json[0] as Record<string, unknown>);
    const lines: string[] = [headers.join(",")];

    for (const item of json) {
        const values = headers.map((header) => {
            const value = String((item as Record<string, unknown>)[header] ?? "");
            if (value.includes(",") || value.includes('"') || value.includes("\n")) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        lines.push(values.join(","));
    }

    return lines.join("\n");
}

function formatJson(json: string): string {
    return JSON.stringify(JSON.parse(json), null, 2);
}

// Sample data
const SAMPLE_CSV = `name,email,age,city,role
John Doe,john@example.com,30,New York,Developer
Jane Smith,jane@example.com,25,Los Angeles,Designer
Bob Johnson,bob@example.com,35,Chicago,Manager
Alice Brown,alice@example.com,28,Seattle,Engineer
Charlie Wilson,charlie@example.com,32,Austin,Analyst`;

const SAMPLE_JSON = `[
  {"name": "John Doe", "email": "john@example.com", "age": "30", "city": "New York", "role": "Developer"},
  {"name": "Jane Smith", "email": "jane@example.com", "age": "25", "city": "Los Angeles", "role": "Designer"},
  {"name": "Bob Johnson", "email": "bob@example.com", "age": "35", "city": "Chicago", "role": "Manager"}
]`;

export default function CsvJsonPage() {
    const [direction, setDirection] = useState<"csv-to-json" | "json-to-csv">("csv-to-json");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [validationStatus, setValidationStatus] = useState<"valid" | "invalid" | null>(null);
    const [previewData, setPreviewData] = useState<{ headers: string[]; rows: string[][] } | null>(null);

    // Validate and preview input
    useEffect(() => {
        if (!input.trim()) {
            setValidationStatus(null);
            setPreviewData(null);
            return;
        }

        if (direction === "csv-to-json") {
            try {
                const lines = input.trim().split("\n");
                if (lines.length >= 1) {
                    const headers = parseCSVLine(lines[0]);
                    const rows = lines.slice(1, 6).map(line => parseCSVLine(line)); // Preview first 5 rows
                    setPreviewData({ headers, rows });
                    setValidationStatus("valid");
                }
            } catch {
                setValidationStatus("invalid");
                setPreviewData(null);
            }
        } else {
            try {
                const parsed = JSON.parse(input);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    const headers = Object.keys(parsed[0]);
                    const rows = parsed.slice(0, 5).map((item: Record<string, unknown>) =>
                        headers.map(h => String(item[h] ?? ""))
                    );
                    setPreviewData({ headers, rows });
                    setValidationStatus("valid");
                } else {
                    setValidationStatus("invalid");
                    setPreviewData(null);
                }
            } catch {
                setValidationStatus("invalid");
                setPreviewData(null);
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
            if (direction === "csv-to-json") {
                const result = csvToJson(input);
                if (result.length === 0) {
                    setError("No data to convert. Make sure CSV has headers and at least one data row.");
                    return;
                }
                setOutput(JSON.stringify(result, null, 2));
            } else {
                const parsed = JSON.parse(input);
                if (!Array.isArray(parsed)) {
                    setError("JSON must be an array of objects");
                    return;
                }
                if (parsed.length === 0) {
                    setError("JSON array is empty");
                    return;
                }
                setOutput(jsonToCsv(parsed));
            }
        } catch (e) {
            setError(direction === "csv-to-json"
                ? "Invalid CSV format. Check your input."
                : "Invalid JSON. Must be an array of objects.");
        }
    };

    const handleFormat = () => {
        if (direction === "json-to-csv") {
            try {
                setInput(formatJson(input));
                setError("");
            } catch {
                setError("Cannot format: Invalid JSON");
            }
        }
    };

    const loadSample = () => {
        setInput(direction === "csv-to-json" ? SAMPLE_CSV : SAMPLE_JSON);
        setError("");
        setOutput("");
    };

    const swapContent = () => {
        if (output) {
            setInput(output);
            setOutput("");
            setDirection(direction === "csv-to-json" ? "json-to-csv" : "csv-to-json");
        }
    };

    return (
        <ToolLayout
            title="CSV ↔ JSON"
            description="Convert between CSV and JSON formats"
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
                                setPreviewData(null);
                            }
                        }}
                        className="bg-muted p-1 rounded-lg"
                    >
                        <ToggleGroupItem
                            value="csv-to-json"
                            className="data-[state=on]:bg-background data-[state=on]:shadow-sm px-4"
                        >
                            CSV → JSON
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="json-to-csv"
                            className="data-[state=on]:bg-background data-[state=on]:shadow-sm px-4"
                        >
                            JSON → CSV
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
                                        {direction === "csv-to-json" ? "CSV" : "JSON"} Input
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
                                {direction === "json-to-csv" && (
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
                                placeholder={direction === "csv-to-json"
                                    ? 'name,email,age\nJohn,john@example.com,30\nJane,jane@example.com,25'
                                    : '[{"name": "John", "email": "john@example.com", "age": 30}]'}
                                className="min-h-[280px] font-mono text-sm"
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
                                    {direction === "csv-to-json" ? "JSON" : "CSV"} Output
                                </CardTitle>
                                {output && <CopyButton text={output} />}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={output}
                                readOnly
                                placeholder="Converted output will appear here..."
                                className="min-h-[280px] font-mono text-sm bg-muted/30"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Data Preview Table */}
                {previewData && previewData.headers.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Table className="h-4 w-4" />
                                <CardTitle className="text-sm">Data Preview</CardTitle>
                                <Badge variant="secondary">
                                    {previewData.rows.length} of {input.trim().split("\n").length - 1} rows
                                </Badge>
                            </div>
                            <CardDescription>First 5 rows of your data</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="w-full">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b bg-muted/50">
                                            {previewData.headers.map((header, i) => (
                                                <th key={i} className="px-3 py-2 text-left font-medium whitespace-nowrap">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.rows.map((row, i) => (
                                            <tr key={i} className="border-b last:border-0">
                                                {row.map((cell, j) => (
                                                    <td key={j} className="px-3 py-2 text-muted-foreground whitespace-nowrap max-w-[200px] truncate">
                                                        {cell || <span className="italic text-muted-foreground/50">empty</span>}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                )}

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
                    💡 CSV should have headers in the first row. JSON must be an array of objects.
                </p>
            </div>
        </ToolLayout>
    );
}
