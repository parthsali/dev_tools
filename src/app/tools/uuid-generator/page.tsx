"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw } from "lucide-react";

function generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default function UuidGeneratorPage() {
    const [uuids, setUuids] = useState<string[]>([generateUUID()]);
    const [count, setCount] = useState("1");
    const [uppercase, setUppercase] = useState(false);
    const [noDashes, setNoDashes] = useState(false);

    const formatUuid = (uuid: string): string => {
        let result = uuid;
        if (noDashes) result = result.replace(/-/g, "");
        if (uppercase) result = result.toUpperCase();
        return result;
    };

    const handleGenerate = () => {
        const num = parseInt(count) || 1;
        const newUuids = Array.from({ length: Math.min(num, 100) }, () => generateUUID());
        setUuids(newUuids);
    };

    const allUuids = uuids.map(formatUuid).join("\n");

    return (
        <ToolLayout
            title="UUID Generator"
            description="Generate random UUIDs"
        >
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Controls */}
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-base">Options</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label>Count</Label>
                                <Select value={count} onValueChange={setCount}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 5, 10, 25, 50, 100].map((n) => (
                                            <SelectItem key={n} value={n.toString()}>
                                                {n} UUID{n > 1 ? "s" : ""}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-3">
                                <Switch
                                    id="uppercase"
                                    checked={uppercase}
                                    onCheckedChange={setUppercase}
                                />
                                <Label htmlFor="uppercase" className="cursor-pointer">
                                    Uppercase
                                </Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <Switch
                                    id="no-dashes"
                                    checked={noDashes}
                                    onCheckedChange={setNoDashes}
                                />
                                <Label htmlFor="no-dashes" className="cursor-pointer">
                                    No dashes
                                </Label>
                            </div>
                        </div>

                        <Button onClick={handleGenerate} className="w-full">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Generate
                        </Button>
                    </CardContent>
                </Card>

                {/* Results */}
                <Card>
                    <CardHeader className="py-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                                Generated UUID{uuids.length > 1 ? "s" : ""}
                            </CardTitle>
                            <CopyButton text={allUuids} />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <ScrollArea className="h-[300px] rounded-lg border">
                            <div className="p-3 space-y-1">
                                {uuids.map((uuid, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted/50 group"
                                    >
                                        <code className="font-mono text-sm">{formatUuid(uuid)}</code>
                                        <CopyButton
                                            text={formatUuid(uuid)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                <p className="text-xs text-muted-foreground text-center">
                    UUIDs are generated using the v4 standard (random)
                </p>
            </div>
        </ToolLayout>
    );
}
