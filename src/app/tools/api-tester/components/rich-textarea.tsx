"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface KeyValue {
    key: string;
    value: string;
    enabled: boolean;
}

interface RichTextareaProps extends Omit<React.ComponentProps<typeof Textarea>, "value" | "onChange"> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    variables: KeyValue[];
}

export const RichTextarea = React.forwardRef<HTMLTextAreaElement, RichTextareaProps>(
    ({ className, variables, value, onChange, style, ...props }, ref) => {
        const internalRef = React.useRef<HTMLTextAreaElement>(null);
        React.useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

        const [content, setContent] = React.useState<React.ReactNode[]>([]);

        // Parse content for highlighting
        React.useEffect(() => {
            const text = value || "";
            const parts = text.split(/(\{\{[^}]+\}\})/g);

            const newContent = parts.map((part, index) => {
                const match = part.match(/^\{\{([^}]+)\}\}$/);
                if (match) {
                    const varKey = match[1];
                    const variable = variables.find(v => v.key === varKey && v.enabled);

                    // If it looks like a variable, highlight it
                    // If it matches a known variable, color it differently or just showing tooltip is enough
                    const isKnown = !!variable;

                    return (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <span
                                    className={cn(
                                        "font-bold cursor-help inline-block rounded-sm px-0.5 -mx-0.5 transition-colors pointer-events-auto",
                                        isKnown
                                            ? "text-blue-600 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-500/20"
                                            : "text-amber-600 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/20"
                                    )}
                                    onClick={() => {
                                        // Focus the textarea when clicking the highlight, maintaining cursor position logic is hard
                                        // but focusing is essential to continue typing.
                                        internalRef.current?.focus();
                                    }}
                                >
                                    {part}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                className="max-w-xs break-all z-50 shadow-lg border bg-popover text-popover-foreground"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="font-mono font-bold text-xs">{part}</span>
                                    {isKnown ? (
                                        <span className="font-mono text-xs opacity-90 text-wrap">{variable.value}</span>
                                    ) : (
                                        <span className="text-xs text-muted-foreground italic">Variable not found</span>
                                    )}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    );
                }
                // For normal text, we just render it. 
                // We need to handle newlines properly because we are in a whitespace-pre-wrap div.
                return <span key={index}>{part}</span>;
            });

            setContent(newContent);
        }, [value, variables]);

        const backdropRef = React.useRef<HTMLDivElement>(null);

        const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
            if (backdropRef.current) {
                backdropRef.current.scrollTop = e.currentTarget.scrollTop;
                backdropRef.current.scrollLeft = e.currentTarget.scrollLeft;
            }
            props.onScroll?.(e);
        };

        return (
            <div className="relative group grid place-items-stretch w-full">
                {/* Backdrop Layer - Renders Highlights */}
                <div
                    ref={backdropRef}
                    className={cn(
                        // Base styles matching Textarea
                        "absolute inset-0 z-0 overflow-hidden whitespace-pre-wrap wrap-break-word bg-background",
                        // Padding and Border alignment
                        "px-3 py-2 border border-transparent rounded-lg",
                        // Font styles
                        "text-sm font-mono",
                        // Pointer events: Container is none, children (spans) are auto (managed in children)
                        // Wait, if container is pointer-events-none, children can be pointer-events-auto
                        "pointer-events-none",
                        className
                    )}
                    style={style}
                    aria-hidden="true"
                >
                    {/* Content */}
                    <span className="text-foreground pointer-events-none select-none">
                        {/* 
                          We render the content. 
                          Issues: 
                          1. Text alignment with existing text in textarea.
                          2. Color differentiation.
                        */}
                    </span>
                    {content}

                    {/* 
                       Add a zero-width space or break to ensure trailing newlines are respects in height if needed, 
                       but Textarea usually handles empty lines. 
                       We add a character to ensure line height matches if empty?
                    */}
                    <br className="select-none" />
                </div>

                {/* Editing Layer - Transparent Text */}
                <Textarea
                    ref={internalRef}
                    value={value}
                    onChange={onChange}
                    onScroll={handleScroll}
                    className={cn(
                        // Ensure it sits on top
                        "relative z-10",
                        // Text needs to be transparent so we see the backdrop
                        "text-transparent bg-transparent",
                        // Caret and Selection
                        "caret-foreground selection:bg-blue-500/20 selection:text-transparent",
                        // Important: Background must be transparent to show backdrop (which has the bg-background)
                        // But Textarea component has bg-background by default. We override it.
                        // Also we need to keep the border/ring on the textarea or the backdrop?
                        // Best: Textarea handles border/ring/focus.
                        // So Textarea bg must be transparent.
                        // Backdrop bg should be 'bg-background'.
                        className
                    )}
                    style={style}
                    {...props}
                />
            </div>
        );
    }
);
RichTextarea.displayName = "RichTextarea";
