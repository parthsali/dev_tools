"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Tool } from "@/config/tools";

interface ToolCardProps {
    tool: Tool;
    index?: number;
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
    const Icon = tool.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                duration: 0.2,
                layout: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }
            }}
        >
            <Link
                href={tool.href}
                className="group block h-full rounded-xl border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-sm"
            >
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                        <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-medium leading-tight truncate">{tool.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {tool.description}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
