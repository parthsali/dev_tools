"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface DiffLine {
    type: "added" | "removed" | "unchanged";
    content: string;
    lineNumber: { left?: number; right?: number };
}

function computeDiff(left: string, right: string): DiffLine[] {
    const leftLines = left.split("\n");
    const rightLines = right.split("\n");
    const result: DiffLine[] = [];

    // Simple LCS-based diff
    const lcs = computeLCS(leftLines, rightLines);
    let leftIdx = 0;
    let rightIdx = 0;
    let lcsIdx = 0;

    while (leftIdx < leftLines.length || rightIdx < rightLines.length) {
        if (lcsIdx < lcs.length && leftLines[leftIdx] === lcs[lcsIdx] && rightLines[rightIdx] === lcs[lcsIdx]) {
            result.push({
                type: "unchanged",
                content: leftLines[leftIdx],
                lineNumber: { left: leftIdx + 1, right: rightIdx + 1 },
            });
            leftIdx++;
            rightIdx++;
            lcsIdx++;
        } else if (rightIdx < rightLines.length && (lcsIdx >= lcs.length || rightLines[rightIdx] !== lcs[lcsIdx])) {
            if (leftIdx < leftLines.length && leftLines[leftIdx] !== lcs[lcsIdx]) {
                result.push({
                    type: "removed",
                    content: leftLines[leftIdx],
                    lineNumber: { left: leftIdx + 1 },
                });
                leftIdx++;
            }
            if (rightIdx < rightLines.length && (lcsIdx >= lcs.length || rightLines[rightIdx] !== lcs[lcsIdx])) {
                result.push({
                    type: "added",
                    content: rightLines[rightIdx],
                    lineNumber: { right: rightIdx + 1 },
                });
                rightIdx++;
            }
        } else if (leftIdx < leftLines.length && (lcsIdx >= lcs.length || leftLines[leftIdx] !== lcs[lcsIdx])) {
            result.push({
                type: "removed",
                content: leftLines[leftIdx],
                lineNumber: { left: leftIdx + 1 },
            });
            leftIdx++;
        } else {
            break;
        }
    }

    return result;
}

function computeLCS(a: string[], b: string[]): string[] {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const result: string[] = [];
    let i = m;
    let j = n;
    while (i > 0 && j > 0) {
        if (a[i - 1] === b[j - 1]) {
            result.unshift(a[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return result;
}

export default function DiffCheckerPage() {
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");

    const diff = useMemo(() => computeDiff(left, right), [left, right]);

    const stats = useMemo(() => {
        const added = diff.filter((d) => d.type === "added").length;
        const removed = diff.filter((d) => d.type === "removed").length;
        const unchanged = diff.filter((d) => d.type === "unchanged").length;
        return { added, removed, unchanged };
    }, [diff]);

    return (
        <ToolLayout
            title="Diff Checker"
            description="Compare two text blocks side by side"
        >
            <div className="space-y-4">
                {/* Input */}
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Original</Label>
                        <Textarea
                            value={left}
                            onChange={(e) => setLeft(e.target.value)}
                            placeholder="Paste original text here..."
                            className="min-h-[200px] font-mono text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Modified</Label>
                        <Textarea
                            value={right}
                            onChange={(e) => setRight(e.target.value)}
                            placeholder="Paste modified text here..."
                            className="min-h-[200px] font-mono text-sm"
                        />
                    </div>
                </div>

                {/* Stats */}
                {(left || right) && (
                    <div className="flex items-center justify-center gap-4">
                        <Badge variant="success">+{stats.added} added</Badge>
                        <Badge variant="destructive">-{stats.removed} removed</Badge>
                        <Badge variant="secondary">{stats.unchanged} unchanged</Badge>
                    </div>
                )}

                <Separator />

                {/* Diff Output */}
                {diff.length > 0 && (
                    <div className="space-y-2">
                        <Label>Diff Result</Label>
                        <ScrollArea className="h-[400px] rounded-lg border">
                            <div className="font-mono text-sm">
                                {diff.map((line, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${line.type === "added"
                                                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                                : line.type === "removed"
                                                    ? "bg-red-500/10 text-red-700 dark:text-red-300"
                                                    : ""
                                            }`}
                                    >
                                        <div className="w-16 flex-shrink-0 px-2 py-1 text-xs text-muted-foreground border-r bg-muted/30 flex justify-between">
                                            <span>{line.lineNumber.left || ""}</span>
                                            <span>{line.lineNumber.right || ""}</span>
                                        </div>
                                        <div className="w-6 flex-shrink-0 px-2 py-1 text-center font-bold">
                                            {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                                        </div>
                                        <div className="flex-1 px-2 py-1 whitespace-pre-wrap break-all">
                                            {line.content || " "}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
