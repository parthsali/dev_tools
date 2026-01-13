"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const isDark = resolvedTheme === "dark";

    const handleToggle = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            aria-label="Toggle theme"
            className="relative hover:bg-transparent dark:hover:bg-transparent"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? -90 : 0,
                    scale: isDark ? 0 : 1,
                    opacity: isDark ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute"
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? 0 : 90,
                    scale: isDark ? 1 : 0,
                    opacity: isDark ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute"
            >
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
        </Button>
    );
}
