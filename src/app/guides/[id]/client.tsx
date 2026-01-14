"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Copy, Check, Terminal, FileCode, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { guideContents, type GuideStep } from "@/config/guides";
import { GuidePreferencesProvider, useGuidePreferences } from "@/components/guides/guide-preferences";

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

function MarkdownText({ content }: { content: string }) {
    if (!content) return null;

    // Basic markdown parsing
    const parts = content.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);

    return (
        <p className="text-sm text-muted-foreground leading-relaxed">
            {parts.map((part, i) => {
                // Link
                const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                if (linkMatch) {
                    return (
                        <a
                            key={i}
                            href={linkMatch[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
                        >
                            {linkMatch[1]}
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    );
                }

                // Inline code
                const codeMatch = part.match(/^`([^`]+)`$/);
                if (codeMatch) {
                    return (
                        <code key={i} className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-xs">
                            {codeMatch[1]}
                        </code>
                    );
                }

                // Bold
                const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
                if (boldMatch) {
                    return <strong key={i} className="font-semibold text-foreground">{boldMatch[1]}</strong>;
                }

                return part;
            })}
        </p>
    );
}

// Simple syntax highlighter for TS/JS
function SyntaxHighlighter({ code, language }: { code: string; language: string }) {
    const highlighted = useMemo(() => {
        if (!['ts', 'tsx', 'js', 'jsx', 'javascript', 'typescript'].includes(language)) {
            return code;
        }

        let html = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Use a placeholder attribute 'sl_class' to avoid matching 'class' keyword later

        // Comments
        html = html.replace(/(\/\/.*$)/gm, '<span sl_class="text-muted-foreground italic">$1</span>');

        // Strings (fixed replacement pattern)
        html = html.replace(/("|'|`)(?:(?=(\\?))\2.)*?\1/g, '<span sl_class="text-green-600 dark:text-green-400">$&</span>');

        // Keywords
        html = html.replace(/\b(import|from|export|default|function|const|let|var|return|if|else|switch|case|break|interface|type|class|extends|implements|public|private|protected|async|await|try|catch|throw|new|this|typeof|void)\b/g,
            '<span sl_class="text-purple-600 dark:text-purple-400 font-medium">$1</span>');

        // Built-in Types
        html = html.replace(/\b(string|number|boolean|any|void|null|undefined|React|Promise|NextResponse|Request|Response)\b/g,
            '<span sl_class="text-yellow-600 dark:text-yellow-400">$1</span>');

        // Functions calls
        html = html.replace(/\b([a-zA-Z0-9_]+)(?=\()/g, '<span sl_class="text-blue-600 dark:text-blue-400">$1</span>');

        // Restore 'class' attribute
        html = html.replace(/sl_class="/g, 'class="');

        return html;
    }, [code, language]);

    return (
        <pre
            className="p-4 font-mono text-sm overflow-x-auto leading-relaxed"
            data-lenis-prevent
        >
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
    );
}

function CommandBlock({ command }: { command: NonNullable<GuideStep['command']> }) {
    const { packageManager, setPackageManager, os, setOs } = useGuidePreferences();

    // If string, render simple
    if (typeof command === 'string') {
        return (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border group hover:border-primary/50 transition-colors">
                <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
                <code className="flex-1 font-mono text-sm overflow-x-auto">{command}</code>
                <CopyButton text={command} />
            </div>
        );
    }

    // Identify available options in this specific command block
    const availablePkgManagers = ['npm', 'pnpm', 'yarn', 'bun'].filter(k => k in command) as string[];
    const availableOs = ['mac', 'windows', 'linux'].filter(k => k in command) as string[];

    // Determine what to show based on global preference + availability
    // Priority: Global Preference -> First Available -> Default
    let activeKey = 'default';

    // Check Package Managers
    if (availablePkgManagers.length > 0) {
        if (availablePkgManagers.includes(packageManager)) {
            activeKey = packageManager;
        } else {
            activeKey = availablePkgManagers[0];
        }
    }
    // Check OS (if no package manager matched or present)
    else if (availableOs.length > 0) {
        if (availableOs.includes(os)) {
            activeKey = os;
        } else {
            activeKey = availableOs[0];
        }
    }

    const showTabs = availablePkgManagers.length > 1 || availableOs.length > 1;

    return (
        <div className="w-full">
            {showTabs && (
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                        {availablePkgManagers.length > 0 && availablePkgManagers.map(mgr => (
                            <Button
                                key={mgr}
                                variant={activeKey === mgr ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setPackageManager(mgr as any)}
                                className={`h-7 px-3 text-xs capitalize ${activeKey === mgr ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground'}`}
                            >
                                {mgr}
                            </Button>
                        ))}

                        {availablePkgManagers.length > 0 && availableOs.length > 0 && (
                            <Separator orientation="vertical" className="h-4 mx-2" />
                        )}

                        {availableOs.length > 0 && availableOs.map(sys => (
                            <Button
                                key={sys}
                                variant={activeKey === sys ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setOs(sys as any)}
                                className={`h-7 px-3 text-xs capitalize ${activeKey === sys ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground'}`}
                            >
                                {sys === 'mac' ? 'macOS' : sys === 'windows' ? 'Windows' : 'Linux'}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border group hover:border-primary/50 transition-colors">
                <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
                {/* @ts-expect-error - key access is safe here */}
                <code className="flex-1 font-mono text-sm overflow-x-auto">{command[activeKey] || command.default}</code>
                {/* @ts-expect-error - key access is safe here */}
                <CopyButton text={command[activeKey] || command.default || ""} />
            </div>
        </div>
    );
}

function StepCard({ step, index }: { step: GuideStep; index: number }) {
    return (
        <div className="relative pl-8 pb-12 last:pb-0 group">
            {/* Timeline */}
            <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-muted border-2 border-background group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors text-xs font-mono font-bold text-muted-foreground group-hover:text-primary z-10">
                {index + 1}
            </div>
            <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border group-last:hidden" />

            <div className="space-y-4 pt-0.5">
                <div>
                    <h3 className="font-medium text-base mb-1">{step.title}</h3>

                    {step.description && (
                        <MarkdownText content={step.description} />
                    )}
                </div>

                {step.command && (
                    <div className="mt-2">
                        <CommandBlock command={step.command} />
                    </div>
                )}

                {step.code && (
                    <div className="rounded-lg border bg-card overflow-hidden mt-3 shadow-sm">
                        <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b">
                            <div className="flex items-center gap-2">
                                <FileCode className="h-3 w-3 text-blue-500" />
                                {step.code.fileName && (
                                    <span className="text-xs font-mono text-foreground font-medium">{step.code.fileName}</span>
                                )}
                                {!step.code.fileName && (
                                    <span className="text-xs text-muted-foreground uppercase">{step.code.language}</span>
                                )}
                            </div>
                            <CopyButton text={step.code.content} />
                        </div>
                        <ScrollArea className="max-h-[400px]">
                            <SyntaxHighlighter code={step.code.content} language={step.code.language} />
                        </ScrollArea>
                    </div>
                )}

                {step.note && (
                    <div className="flex items-start gap-2 text-sm text-amber-600/90 dark:text-amber-500/90 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-200/50 dark:border-amber-900/50">
                        <span className="shrink-0 text-lg leading-none">💡</span>
                        <span className="mt-0.5">{step.note}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function GuideContent({ id }: { id: string }) {
    const guide = guideContents[id];

    if (!guide) {
        notFound();
    }

    const Icon = guide.icon;

    return (
        <div className="min-h-[calc(100vh-3.5rem)] pb-20 relative bg-background">
            {/* Header */}
            <div className="border-b bg-background/80 backdrop-blur-md sticky top-14 z-40 supports-backdrop-filter:bg-background/60">
                <div className="container mx-auto px-4 py-4 max-w-7xl">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="shrink-0 rounded-full">
                            <Link href="/guides">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="sr-only">Back to guides</span>
                            </Link>
                        </Button>
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                                <Icon className="h-5 w-5" />
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

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="xl:grid xl:grid-cols-[1fr_280px] xl:gap-12 relative">

                    {/* Main Content Column */}
                    <div className="min-w-0 space-y-12">
                        {/* Centered within the main column for readability */}
                        <div className="max-w-2xl mx-auto">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-12 justify-center">
                                {guide.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-muted/50 hover:bg-muted font-normal">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Steps */}
                            <div className="space-y-0 relative">
                                {guide.steps.map((step, index) => (
                                    <StepCard key={index} step={step} index={index} />
                                ))}
                            </div>

                            {/* Footer */}
                            <Separator className="my-12" />
                            <div className="text-center p-8 bg-muted/20 rounded-3xl border border-dashed">
                                <p className="text-muted-foreground mb-4">
                                    Found this guide helpful? Check out more tools and guides.
                                </p>
                                <Button variant="outline" asChild>
                                    <Link href="/guides">
                                        Browse All Guides
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column - Only visible on XL screens */}
                    <div className="hidden xl:block relative">
                        {/* Fixed sidebar content container using sticky */}
                        <div className="sticky top-40 space-y-6">
                            {/* Prerequisites */}
                            {guide.prerequisites && guide.prerequisites.length > 0 && (
                                <Card className="border-l-4 border-l-primary/50 shadow-sm bg-background/50 backdrop-blur">
                                    <CardHeader className="py-3 px-4 border-b bg-muted/20">
                                        <div className="flex items-center gap-2">
                                            <Monitor className="h-4 w-4 text-muted-foreground" />
                                            <CardTitle className="text-sm font-medium">Prerequisites</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <ul className="text-xs space-y-2.5 text-muted-foreground">
                                            {guide.prerequisites.map((prereq, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <div className="h-1.5 w-1.5 mt-1 rounded-full bg-primary/50 shrink-0" />
                                                    <span>{prereq}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}

                            {/* References */}
                            {guide.references && guide.references.length > 0 && (
                                <Card className="border-l-4 border-l-blue-500/50 shadow-sm bg-background/50 backdrop-blur">
                                    <CardHeader className="py-3 px-4 border-b bg-muted/20">
                                        <div className="flex items-center gap-2">
                                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            <CardTitle className="text-sm font-medium">References</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <ul className="space-y-2">
                                            {guide.references.map((ref, i) => (
                                                <li key={i}>
                                                    <a
                                                        href={ref.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
                                                    >
                                                        <span className="truncate flex-1">{ref.label}</span>
                                                        <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function GuidePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <GuidePreferencesProvider>
            <GuideContent id={id} />
        </GuidePreferencesProvider>
    );
}
