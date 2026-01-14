"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] container max-w-6xl mx-auto px-4 py-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
            >
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-muted">
                        <FileQuestion className="h-12 w-12 text-muted-foreground" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight font-mono">404</h1>
                    <h2 className="text-xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-[42rem] mx-auto text-sm">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <Button asChild variant="default">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
