"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-background border-t border-border mt-auto overflow-hidden">
            <div className="relative flex flex-col items-center py-8">
                <p className="flex items-center gap-1 text-sm text-muted-foreground mb-6 sm:mb-36 z-10">
                    Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by <Link href="https://github.com/parthsali" target="_blank" className="font-medium hover:text-foreground transition-colors">Parth</Link> for developers
                </p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%]">
                    <h2 className="text-[14rem] text-background font-black leading-none tracking-tighter select-none pointer-events-none whitespace-nowrap drop-shadow-xl dark:drop-shadow-card">
                        DEVTOOLS
                    </h2>
                </div>
            </div>
        </footer>
    );
}
