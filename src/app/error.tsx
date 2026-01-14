"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] container max-w-6xl mx-auto px-4 py-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
            >
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-destructive/10">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight font-mono">Oops!</h1>
                    <h2 className="text-xl font-semibold">Something went wrong</h2>
                    <p className="text-muted-foreground max-w-[42rem] mx-auto text-sm">
                        An unexpected error occurred. We apologize for the inconvenience.
                        {error.digest && (
                            <span className="block mt-2 text-xs font-mono opacity-50">Digest: {error.digest}</span>
                        )}
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => reset()} variant="outline">
                        Try again
                    </Button>
                    <Button asChild variant="default">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
