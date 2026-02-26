"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
    className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className={cn("w-16 h-8 rounded-full bg-neutral-200 dark:bg-zinc-950/50 border border-transparent", className)} />
    }

    const isDark = resolvedTheme === "dark"

    return (
        <div
            className={cn(
                "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
                isDark
                    ? "bg-zinc-950 border border-zinc-800"
                    : "bg-neutral-100 border border-zinc-200",
                className
            )}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            role="button"
            tabIndex={0}
        >
            <div className="flex justify-between items-center w-full relative">
                <div
                    className={cn(
                        "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 z-10",
                        isDark
                            ? "transform translate-x-0 bg-zinc-800 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                            : "transform translate-x-8 bg-white shadow-sm"
                    )}
                >
                    {isDark ? (
                        <Moon
                            className="w-4 h-4 text-white"
                            strokeWidth={1.5}
                        />
                    ) : (
                        <Sun
                            className="w-4 h-4 text-orange-500"
                            strokeWidth={1.5}
                        />
                    )}
                </div>

                {/* Static background icons */}
                <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
                    <Sun
                        className={cn("w-4 h-4 transition-opacity", !isDark ? "opacity-0" : "text-gray-600")}
                        strokeWidth={1.5}
                    />
                    <Moon
                        className={cn("w-4 h-4 transition-opacity", isDark ? "opacity-0" : "text-gray-400")}
                        strokeWidth={1.5}
                    />
                </div>
            </div>
        </div>
    )
}
