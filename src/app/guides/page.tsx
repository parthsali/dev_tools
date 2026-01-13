"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { guides } from "@/config/guides";

export default function GuidesPage() {
    const [search, setSearch] = useState("");

    const filteredGuides = guides.filter(
        (guide) =>
            guide.title.toLowerCase().includes(search.toLowerCase()) ||
            guide.description.toLowerCase().includes(search.toLowerCase()) ||
            guide.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="min-h-[calc(100vh-3.5rem)]">
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
                            <h1 className="text-xl font-semibold tracking-tight">Setup Guides</h1>
                            <p className="text-sm text-muted-foreground">
                                Step-by-step guides for common development setups
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search guides..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Guides Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredGuides.map((guide, index) => {
                        const Icon = guide.icon;
                        return (
                            <motion.div
                                key={guide.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Link
                                    href={`/guides/${guide.id}`}
                                    className="group block h-full rounded-xl border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-medium leading-tight">{guide.title}</h3>
                                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                                {guide.description}
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-1">
                                                {guide.tags.slice(0, 3).map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredGuides.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-muted-foreground">No guides found matching "{search}"</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
