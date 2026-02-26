"use client";

import React from "react";
import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/spline-scene";
import { ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import Link from "next/link";

export function HeroSplit() {
    return (
        <div className="relative w-full min-h-screen bg-white dark:bg-black overflow-hidden flex items-center pt-20">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 text-[10px] font-bold uppercase tracking-widest"
                        >
                            <Zap className="w-3 h-3 fill-cyan-500" />
                            Next-Gen Intelligence
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-neutral-900 dark:text-white">
                            Vortex <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
                                Aerospace
                            </span>
                        </h1>

                        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light max-w-lg leading-relaxed">
                            Pioneering the future of humanoid robotics. Our companions combine
                            state-of-the-art AI with unparalleled mechanical precision to
                            create a truly symbiotic relationship.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-[10px] flex items-center gap-3"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link href="/demo">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white font-bold uppercase tracking-widest text-[10px]"
                            >
                                Watch Demo
                            </motion.button>
                        </Link>
                    </div>

                    {/* Quick Stats/Features */}
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-black/5 dark:border-white/5">
                        <div>
                            <p className="text-2xl font-black text-neutral-900 dark:text-white">0.3ms</p>
                            <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Latency</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-neutral-900 dark:text-white">12B+</p>
                            <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Parameters</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-neutral-900 dark:text-white">99.9%</p>
                            <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Reliability</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content: 3D Robot */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-[600px] lg:h-[800px] w-full"
                >
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl rounded-full" />

                    <SplineScene
                        scene="https://prod.spline.design/kW5uRDFS7SDm3Jbq/scene.splinecode"
                        className="w-full h-full"
                        interactive={true}
                    />

                    {/* Floating HUD Element */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-0 p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl z-20 space-y-3 hidden md:block"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-black">System Online</span>
                        </div>
                        <div className="h-1 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-cyan-500" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background text decoration */}
            <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none">
                <h2 className="text-[20vw] font-black leading-none translate-y-1/2">VORTEX</h2>
            </div>
        </div>
    );
}
