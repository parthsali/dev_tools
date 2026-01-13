"use client";

import Link from "next/link";
import { Zap, Cpu, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
    return (
        <footer className="relative bg-background border-t border-border mt-auto overflow-hidden">
            <div className="relative flex flex-col items-center py-12">
                {/* Main Attribution */}
                <p className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-muted-foreground/80 mb-4 sm:mb-40 z-10 transition-all hover:text-foreground">
                    <span className="opacity-50">[</span>
                    Engineered for developers
                    <div className="relative flex items-center justify-center w-5 h-5">
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                        <Zap className="h-3 w-3 text-blue-500 fill-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </div>
                    by
                    <Link
                        href={siteConfig.author.github}
                        target="_blank"
                        className="font-bold text-primary hover:text-primary/80 transition-all hover:scale-105"
                    >
                        {siteConfig.author.name}
                    </Link>
                    <span className="opacity-50">]</span>
                </p>

                {/* Technical Details Sidebar-ish text */}
                <div className="absolute top-8 left-8 hidden lg:block z-10 space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-tighter">
                        <Cpu className="h-3 w-3" />
                        <span>System Status: {siteConfig.system.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-tighter">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Security: {siteConfig.system.security}</span>
                    </div>
                </div>

                {/* Cool Background Text */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] pointer-events-none select-none">
                    <h2 className="text-[12vw] font-black leading-none tracking-tighter opacity-10 blur-[1px] dark:opacity-[0.03]">
                        {siteConfig.name.toUpperCase()}
                    </h2>
                    <div className="absolute inset-0 flex items-center justify-center translate-y-[-10%] opacity-20">
                        <h2 className="text-[12vw] font-black leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px currentColor' }}>
                            {siteConfig.name.toUpperCase()}
                        </h2>
                    </div>
                </div>

                {/* Small indicator */}
                <div className="absolute bottom-4 right-8 hidden lg:flex items-center gap-4 text-[10px] font-mono text-muted-foreground/30 uppercase tracking-[0.2em] z-10">
                    <span>Build Status: Success</span>
                    <div className="h-1 w-1 rounded-full bg-emerald-500/50 animate-pulse" />
                    <span>v{siteConfig.version}</span>
                </div>
            </div>
        </footer>
    );
}
