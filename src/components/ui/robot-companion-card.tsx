"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, FileText, ArrowUpRight, Zap } from "lucide-react";

type Spec = {
    label: string;
    value: string;
    pct: number;
    color: string;
};

type RobotCompanionCardProps = {
    name: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    badge: string;
    series: string;
    statusLabel: string;
    statusColor: "emerald" | "cyan";
    modelCode: string;
    originalPrice: string;
    price: string;
    description: React.ReactNode;
    specs: Spec[];
    accentGradient: string;          // CSS gradient string for buttons/accents
    glowColor: string;               // rgba colour for box-shadow glow
    priceGradient: string;           // CSS gradient for price text
    delay?: number;
};

export function RobotCompanionCard({
    name,
    subtitle,
    imageSrc,
    imageAlt,
    badge,
    series,
    statusLabel,
    statusColor,
    modelCode,
    originalPrice,
    price,
    description,
    specs,
    accentGradient,
    glowColor,
    priceGradient,
    delay = 0,
}: RobotCompanionCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    /* ── 3-D tilt tracking ── */
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
    const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }
    function handleMouseLeave() {
        x.set(0); y.set(0);
        setHovered(false);
    }

    const statusRing = statusColor === "emerald"
        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
        : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]";
    const statusText = statusColor === "emerald" ? "text-emerald-400" : "text-cyan-400";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1200 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-2xl overflow-hidden bg-black border border-white/5 cursor-pointer"
        >
            {/* ── Animated neon border ── */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                style={{
                    background: "transparent",
                    boxShadow: hovered
                        ? `0 0 0 1px ${glowColor.replace("0.3", "0.6")}, 0 0 40px ${glowColor}, inset 0 0 40px ${glowColor.replace("0.3", "0.05")}`
                        : `0 0 0 1px rgba(255,255,255,0.06)`,
                    transition: "box-shadow 0.5s ease",
                }}
            />

            {/* ── Scan-line sweep ── */}
            <motion.div
                className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none"
                style={{
                    background: `linear-gradient(90deg, transparent 0%, ${glowColor.replace("0.3", "0.8")} 50%, transparent 100%)`,
                    opacity: hovered ? 0.7 : 0.3,
                }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* ── Image with holographic overlay ── */}
            <div className="relative aspect-[16/9] overflow-hidden">
                {/* Base image */}
                <motion.img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                    animate={{ scale: hovered ? 1.08 : 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Holographic foil overlay */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: hovered ? 0.35 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: `linear-gradient(135deg,
              rgba(6,182,212,0.2) 0%,
              rgba(129,140,248,0.3) 25%,
              rgba(251,191,36,0.15) 50%,
              rgba(6,182,212,0.2) 75%,
              rgba(129,140,248,0.3) 100%)`,
                        backgroundSize: "400% 400%",
                    }}
                />

                {/* Top vignette */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent z-10" />
                {/* Bottom fade into card body */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent z-10" />

                {/* Badge top-left */}
                <div className="absolute top-4 left-4 z-20">
                    <motion.div
                        animate={hovered ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md"
                    >
                        <Zap className="w-2.5 h-2.5 text-cyan-400" />
                        <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-300 font-bold">{badge}</span>
                    </motion.div>
                </div>

                {/* Series tag top-right */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-semibold">{series}</span>
                    </div>
                </div>
            </div>

            {/* ── Card body ── */}
            <div className="p-7 md:p-8 space-y-5">

                {/* Status + model code */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${statusRing}`} />
                        <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${statusText}`}>{statusLabel}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 font-mono">{modelCode}</span>
                </div>

                {/* Name + price */}
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">{name}</h3>
                        <p className="text-xs text-neutral-500 mt-0.5 font-light">{subtitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-[11px] text-neutral-600 line-through mb-0.5">{originalPrice}</p>
                        <motion.p
                            className="text-2xl font-black tracking-tight"
                            animate={hovered ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.4 }}
                            style={{ background: priceGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                        >
                            {price}
                        </motion.p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-neutral-400 text-[13.5px] font-light leading-relaxed">{description}</p>

                {/* ── Animated horizontal spec bars ── */}
                <div className="space-y-3 pt-1">
                    {specs.map((spec, i) => (
                        <div key={spec.label} className="space-y-1">
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-semibold">{spec.label}</span>
                                <span
                                    className="text-[11px] font-bold"
                                    style={{ color: spec.color }}
                                >
                                    {spec.value}
                                </span>
                            </div>
                            <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: spec.color }}
                                    initial={{ scaleX: 0, originX: 0 }}
                                    whileInView={{ scaleX: spec.pct / 100 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── CTA buttons ── */}
                <div className="flex gap-3 pt-1">
                    {/* Primary — Add to Cart */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        className="group relative flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.28em] overflow-hidden transition-shadow duration-300"
                        style={{
                            background: accentGradient,
                            boxShadow: hovered ? `0 8px 32px ${glowColor}` : "none",
                        }}
                    >
                        {/* Shimmer */}
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                        <ShoppingCart className="w-3.5 h-3.5 relative z-10" />
                        <span className="relative z-10">Add to Cart</span>
                    </motion.button>

                    {/* Secondary — View Specs */}
                    <motion.button
                        whileHover={{ scale: 1.03, borderColor: glowColor }}
                        whileTap={{ scale: 0.96 }}
                        className="group flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/8 text-neutral-400 text-[10px] font-bold uppercase tracking-[0.28em] transition-all duration-300 hover:text-white"
                    >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Specs</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
