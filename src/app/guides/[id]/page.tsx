"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Copy, Check, Terminal, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { guideContents, type GuideStep } from "@/config/guides";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-6 w-6 shrink-0"
        >
            {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
            ) : (
                <Copy className="h-3 w-3" />
            )}
        </Button>
    );
}

function StepCard({ step, index }: { step: GuideStep; index: number }) {
    return (
        <div className="relative pl-8 pb-8 last:pb-0">
            {/* Timeline */}
            <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                {index + 1}
            </div>
            <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border last:hidden" />

            <div className="space-y-3">
                <h3 className="font-medium">{step.title}</h3>

                {step.description && (
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                )}

                {step.command && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border">
                        <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
                        <code className="flex-1 font-mono text-sm overflow-x-auto">{step.command}</code>
                        <CopyButton text={step.command} />
                    </div>
                )}

                {step.code && (
                    <div className="rounded-lg border overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b">
                            <div className="flex items-center gap-2">
                                <FileCode className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{step.code.language}</span>
                            </div>
                            <CopyButton text={step.code.content} />
                        </div>
                        <ScrollArea className="max-h-[300px]">
                            <pre className="p-3 font-mono text-sm overflow-x-auto">
                                <code>{step.code.content}</code>
                            </pre>
                        </ScrollArea>
                    </div>
                )}

                {step.note && (
                    <p className="text-xs text-muted-foreground italic">💡 {step.note}</p>
                )}
            </div>
        </div>
    );
}

export default function GuidePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const guide = guideContents[id];

    if (!guide) {
        notFound();
    }

    const Icon = guide.icon;

    return (
        <div className="min-h-[calc(100vh-3.5rem)]">
            {/* Header */}
            <div className="border-b bg-background/50 backdrop-blur-sm sticky top-14 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="shrink-0">
                            <Link href="/guides">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="sr-only">Back to guides</span>
                            </Link>
                        </Button>
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-lg font-semibold tracking-tight truncate">
                                    {guide.title}
                                </h1>
                                <p className="text-sm text-muted-foreground truncate">
                                    {guide.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {guide.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Prerequisites & References */}
                    <div className="grid gap-4 sm:grid-cols-2 mb-8">
                        {guide.prerequisites && guide.prerequisites.length > 0 && (
                            <Card>
                                <CardHeader className="py-3">
                                    <CardTitle className="text-sm">Prerequisites</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <ul className="text-sm space-y-1">
                                        {guide.prerequisites.map((prereq, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                                                {prereq}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {guide.references && guide.references.length > 0 && (
                            <Card>
                                <CardHeader className="py-3">
                                    <CardTitle className="text-sm">References</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <ul className="text-sm space-y-1">
                                        {guide.references.map((ref, i) => (
                                            <li key={i}>
                                                <a
                                                    href={ref.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-primary hover:underline"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    {ref.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <Separator className="mb-8" />

                    {/* Steps */}
                    <div className="space-y-0">
                        {guide.steps.map((step, index) => (
                            <StepCard key={index} step={step} index={index} />
                        ))}
                    </div>

                    {/* Footer */}
                    <Separator className="my-8" />
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Found this guide helpful?
                        </p>
                        <Button variant="outline" asChild>
                            <Link href="/guides">
                                Browse More Guides
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
