"use client";

import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ToolLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
            <div className="border-b bg-background/50 backdrop-blur-sm sticky top-14 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="shrink-0">
                            <Link href="/">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="sr-only">Back to tools</span>
                            </Link>
                        </Button>
                        <div className="min-w-0">
                            <h1 className="text-xl font-semibold tracking-tight truncate">{title}</h1>
                            <p className="text-sm text-muted-foreground truncate">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 container mx-auto px-4 py-6">
                {children}
            </div>
        </div>
    );
}

interface CopyButtonProps {
    text: string;
    className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
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
            className={className}
        >
            {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
            ) : (
                <Copy className="h-4 w-4" />
            )}
        </Button>
    );
}
