"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplineScene } from "@/components/ui/spline-scene";
import { Shield, Zap, Heart, Cpu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function UltraLuxuryCompanions() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const features = [
        {
            icon: <Heart className="w-5 h-5" />,
            title: "Emotional Resonance",
            description: "Advanced neural modeling allows for genuine emotional bonds and character growth.",
            color: "from-pink-500/20 to-rose-500/20",
            textColor: "text-rose-400"
        },
        {
            icon: <Cpu className="w-5 h-5" />,
            title: "Bio-Synthetic Core",
            description: "Next-generation processors that mimic human synaptic responses for fluid movement.",
            color: "from-cyan-500/20 to-blue-500/20",
            textColor: "text-cyan-400"
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Guardian Protocol",
            description: "Integrated security measures ensure the safety of your home and loved ones.",
            color: "from-emerald-500/20 to-teal-500/20",
            textColor: "text-emerald-400"
        }
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-[120vh] bg-white dark:bg-black overflow-hidden flex items-center py-20 transition-colors duration-500"
        >
            {/* ── Background Elements ── */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
                <div className="absolute inset-0 opacity-20 dark:opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)",
                        backgroundSize: "40px 40px"
                    }}
                />
                {/* For dark mode grid */}
                <div className="absolute inset-0 opacity-0 dark:opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
                        backgroundSize: "40px 40px"
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* ── Left Content: Narrative ── */}
                <motion.div
                    style={{ opacity }}
                    className="space-y-12"
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-px w-12 bg-cyan-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500">The Future of Care</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter leading-[0.9]"
                        >
                            Robot <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-400 dark:to-neutral-600">
                                Companions
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg text-neutral-600 dark:text-neutral-400 font-light max-w-lg leading-relaxed pt-4"
                        >
                            Experience a new era of robotics where intelligence meets empathy.
                            Our companions are designed not just to serve, but to understand,
                            connecting with you on a level once thought impossible.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                                whileHover={{ x: 10, backgroundColor: "rgba(0,0,0,0.02)" }}
                                className="group p-6 rounded-2xl border border-black/[0.05] dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] transition-all flex gap-6"
                            >
                                <div className={cn("p-4 rounded-xl bg-gradient-to-br transition-transform group-hover:scale-110", feature.color, feature.textColor)}>
                                    {feature.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">{feature.title}</h3>
                                    <p className="text-sm text-neutral-500 leading-relaxed font-light">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="group flex items-center gap-8 py-4 px-8 rounded-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-xl shadow-black/5 dark:shadow-none"
                    >
                        Explore the Collection
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                </motion.div>

                {/* ── Right Content: 3D Module ── */}
                <div className="relative h-[80vh] w-full lg:h-[90vh]">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_60%)] pointer-events-none" />

                    <motion.div
                        style={{ y: y1 }}
                        className="w-full h-full relative"
                    >
                        <SplineScene
                            scene="https://prod.spline.design/kW5uRDFS7SDm3Jbq/scene.splinecode"
                            className="w-full h-full"
                            interactive={true}
                        />
                    </motion.div>

                    {/* Floating Data UI Overlay Removed */}

                    {/* Bottom Floating Stats */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute bottom-10 -left-10 md:left-0 p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl z-20 grid grid-cols-2 gap-8 hidden md:grid min-w-[300px] transition-colors duration-500"
                    >
                        <div>
                            <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mb-1">Materials</p>
                            <p className="text-sm font-bold text-black dark:text-white">Nano-Cell Titanium</p>
                        </div>
                        <div>
                            <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mb-1">IQ Score</p>
                            <p className="text-sm font-bold text-black dark:text-white">Infinite-B</p>
                        </div>
                        <div>
                            <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mb-1">Sync Latency</p>
                            <p className="text-sm font-bold text-black dark:text-white">0.3ms</p>
                        </div>
                        <div>
                            <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mb-1">Model</p>
                            <p className="text-sm font-bold text-black dark:text-white">AURORA V.2</p>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* ── Section Background text ── */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02] transform translate-y-1/2">
                <h2 className="text-[30vw] font-black tracking-tighter whitespace-nowrap leading-none text-black dark:text-white">
                    COMPANION
                </h2>
            </div>
        </section>
    );
}
