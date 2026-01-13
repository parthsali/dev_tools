"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface KeyValue {
    key: string;
    value: string;
    enabled: boolean;
}

interface RichInputProps extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variables: KeyValue[];
}

export const RichInput = React.forwardRef<HTMLInputElement, RichInputProps>(
    ({ className, variables, value, onChange, style, ...props }, ref) => {
        const internalRef = React.useRef<HTMLInputElement>(null);

        React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

        const [content, setContent] = React.useState<React.ReactNode[]>([]);

        React.useEffect(() => {
            const text = value || "";
            const parts = text.split(/(\{\{[^}]+\}\})/g);

            const newContent = parts.map((part, index) => {
                const match = part.match(/^\{\{([^}]+)\}\}$/);
                if (match) {
                    const varKey = match[1];
                    const variable = variables.find(v => v.key === varKey && v.enabled);
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
                                    onClick={() => internalRef.current?.focus()}
                                >
                                    {part}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
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
                return <span key={index}>{part}</span>;
            });

            setContent(newContent);
        }, [value, variables]);

        const backdropRef = React.useRef<HTMLDivElement>(null);

        const handleScroll = (e: React.UIEvent<HTMLInputElement>) => {
            if (backdropRef.current) {
                backdropRef.current.scrollLeft = e.currentTarget.scrollLeft;
            }
            props.onScroll?.(e);
        };

        return (
            <div className="relative group w-full">
                {/* Backdrop */}
                <div
                    ref={backdropRef}
                    className={cn(
                        "absolute inset-0 z-0 overflow-hidden whitespace-nowrap bg-background",
                        "px-3 py-2 border border-transparent rounded-lg",
                        "text-sm font-mono",
                        "pointer-events-none",
                        className
                    )}
                    style={style}
                    aria-hidden="true"
                >
                    {content}
                </div>

                {/* Input */}
                <Input
                    ref={internalRef}
                    value={value}
                    onChange={onChange}
                    onScroll={handleScroll}
                    data-lenis-prevent
                    className={cn(
                        "relative z-10 text-transparent bg-transparent caret-foreground selection:bg-blue-500/20 selection:text-transparent",
                        className
                    )}
                    style={style}
                    {...props}
                />
            </div>
        );
    }
);
RichInput.displayName = "RichInput";
