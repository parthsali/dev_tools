"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const GITHUB_REPO = "https://github.com/parthsali/devtools";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight font-mono text-foreground">dev_tools</span>
                </Link>

                <div className="flex items-center gap-1">
                    <Link
                        href="/guides"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mr-4"
                    >
                        guides
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="hover:bg-transparent dark:hover:bg-transparent"
                    >
                        <a
                            href={GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Repository"
                        >
                            <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
                        </a>
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
