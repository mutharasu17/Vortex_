'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Hexagon, LogOut, LayoutDashboard, User, Menu, X, ChevronRight } from 'lucide-react'
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useAuth } from '@/context/AuthContext'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
    const { user, logOut } = useAuth();
    const { trackButtonClick } = useAnalytics();
    const router = useRouter();
    const { scrollY, scrollYProgress } = useScroll();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const handleLogout = async () => {
        trackButtonClick('navbar_logout');
        await logOut();
        router.push('/');
    };

    const navItems = [
        { name: 'Experience', href: '/#experience' },
        { name: 'Technology', href: '/#technology' },
        { name: 'Design', href: '/#design' },
        { name: 'Demo', href: '/demo' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out px-6 py-4",
                    isScrolled ? "md:top-4 md:px-10" : "top-0 px-8"
                )}
            >
                <div className={cn(
                    "mx-auto max-w-7xl relative flex items-center justify-between transition-all duration-500 ease-in-out",
                    isScrolled
                        ? "bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                        : "bg-transparent py-4"
                )}>
                    {/* Logo Section */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                        onClick={() => trackButtonClick('navbar_logo')}
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: [0, 90, 180, 270, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <Hexagon className="w-7 h-7 text-black dark:text-white fill-black/5 dark:fill-white/5 group-hover:fill-cyan-500/10 transition-colors relative z-10" />
                        </div>
                        <span className="text-xl font-black tracking-[0.3em] text-black dark:text-white uppercase">
                            Vortex
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        <div className="flex items-center bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-full p-1 border border-black/5 dark:border-white/5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onMouseEnter={() => setHoveredPath(item.href)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    className="relative px-6 py-2 text-[10px] font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 uppercase z-10"
                                >
                                    {item.name}
                                    {hoveredPath === item.href && (
                                        <motion.div
                                            layoutId="nav-hover"
                                            className="absolute inset-0 bg-white dark:bg-white/10 rounded-full -z-10 shadow-sm"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {user && (
                            <Link
                                href="/dashboard"
                                className="ml-4 px-5 py-2 text-[10px] font-bold tracking-[0.2em] text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors duration-300 uppercase flex items-center gap-2"
                                onClick={() => trackButtonClick('navbar_dashboard')}
                            >
                                <LayoutDashboard className="w-3 h-3" />
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>

                        {!user ? (
                            <Link
                                href="/login"
                                className="group relative"
                                onClick={() => trackButtonClick('navbar_login')}
                            >
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500" />
                                <div className="relative px-7 py-2.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.25em] rounded-full flex items-center gap-2 transition-transform active:scale-95">
                                    Connect
                                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="hidden lg:flex flex-col items-end mr-2">
                                    <span className="text-[10px] font-black text-black dark:text-white uppercase tracking-wider">
                                        {user.displayName || user.email?.split('@')[0]}
                                    </span>
                                    <span className="text-[7px] text-cyan-500 uppercase tracking-[0.2em] font-bold">
                                        Active Operator
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="p-2.5 bg-neutral-100 dark:bg-white/5 hover:bg-red-500/10 dark:hover:bg-red-500/20 text-neutral-500 hover:text-red-500 rounded-xl transition-all border border-black/5 dark:border-white/10"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-4 h-4" />
                                </motion.button>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-black dark:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Backdrop/Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            className="md:hidden absolute top-full left-6 right-6 mt-4 bg-white/90 dark:bg-black/90 backdrop-blur-3xl rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-2xl z-[90]"
                        >
                            <div className="p-8 flex flex-col gap-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-black tracking-[0.2em] text-neutral-400 hover:text-black dark:hover:text-white uppercase transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="h-px bg-black/5 dark:bg-white/10 w-full" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase tracking-widest text-neutral-500">Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-[110] origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </>
    )
}
