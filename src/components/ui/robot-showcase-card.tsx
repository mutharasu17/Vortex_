"use client";

import { memo, useRef, useState, useCallback } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useInView,
} from "framer-motion";
import { ShoppingCart, ArrowUpRight, Zap, Shield, Star } from "lucide-react";

type Spec = {
    label: string;
    value: string;
    pct: number;
    color: string;
};

type RobotShowcaseCardProps = {
    index: number;
    name: string;
    fullName: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    badge: string;
    edition: string;
    statusLabel: string;
    statusColor: string;
    modelCode: string;
    originalPrice: string;
    price: string;
    tagline: string;
    description: string;
    highlight: string;
    specs: Spec[];
    accentColor: string;
    glowRgb: string;
    features: string[];
    reverse?: boolean;
};

// Pre-calculate save % once (not on every render)
function calcSavePct(price: string, original: string) {
    const p = parseInt(price.replace(/\D/g, ""));
    const o = parseInt(original.replace(/\D/g, ""));
    return Math.round((1 - p / o) * 100);
}

export const RobotShowcaseCard = memo(function RobotShowcaseCard({
    index,
    name,
    subtitle,
    imageSrc,
    imageAlt,
    badge,
    edition,
    statusLabel,
    statusColor,
    modelCode,
    originalPrice,
    price,
    tagline,
    description,
    highlight,
    specs,
    accentColor,
    features,
    reverse = false,
}: RobotShowcaseCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [hovered, setHovered] = useState(false);

    /* ─── Lightweight tilt — tight spring so it settles fast ─── */
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    // Higher damping = settles faster = less "rubber-band" jank
    const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 250, damping: 40 });
    const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 250, damping: 40 });

    // Parallax image — reduced travel distance to cut repaints
    const imageX = useSpring(useTransform(mx, [-0.5, 0.5], [reverse ? 8 : -8, reverse ? -8 : 8]), { stiffness: 120, damping: 35 });
    const imageY = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 35 });

    const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    }, [mx, my]);

    const onLeave = useCallback(() => {
        mx.set(0); my.set(0); setHovered(false);
    }, [mx, my]);

    const savePct = calcSavePct(price, originalPrice);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={onLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 1200, willChange: "transform" }}
            className="relative w-full rounded-3xl overflow-hidden bg-[#080808] border border-white/[0.06] group"
        >
            {/* Border glow — CSS transition is cheaper than Framer animate */}
            <div
                className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-shadow duration-500"
                style={{
                    boxShadow: hovered
                        ? `0 0 0 1px ${accentColor}55, 0 0 50px ${accentColor}1a`
                        : `0 0 0 1px rgba(255,255,255,0.04)`,
                }}
            />

            {/* Scan line — pure CSS animation, no JS */}
            <div
                className="scan-line-showcase pointer-events-none absolute left-0 right-0 h-px z-20"
                style={{ background: `linear-gradient(90deg, transparent, ${accentColor}bb, transparent)` }}
            />

            {/* Layout */}
            <div className={`flex flex-col lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""} min-h-[500px]`}>

                {/* ── IMAGE PANEL ── */}
                <div className="relative lg:w-[55%] aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <div className={`absolute inset-0 z-10 pointer-events-none ${reverse
                        ? "bg-gradient-to-l from-[#080808] via-transparent to-transparent"
                        : "bg-gradient-to-r from-[#080808] via-transparent to-transparent"
                        }`} />
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080808] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#080808]/60 to-transparent z-10 pointer-events-none" />

                    {/* Parallax wrapper — GPU layer via will-change */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ x: imageX, y: imageY, scale: 1.1, willChange: "transform" }}
                    >
                        <img
                            src={process.env.NODE_ENV === "production" && imageSrc.startsWith('/') ? `/Vortex_${imageSrc}` : imageSrc}
                            alt={imageAlt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out"
                            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
                        />
                    </motion.div>

                    {/* Holographic foil — CSS transition, not Framer animate */}
                    <div
                        className="absolute inset-0 z-[11] pointer-events-none transition-opacity duration-500"
                        style={{
                            opacity: hovered ? 0.25 : 0,
                            background: `linear-gradient(135deg, ${accentColor}33 0%, rgba(129,140,248,0.18) 30%, rgba(251,191,36,0.08) 55%, ${accentColor}33 80%)`,
                        }}
                    />

                    {/* Badge */}
                    <div className="absolute top-5 left-5 z-20">
                        <div
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur-md border"
                            style={{ borderColor: `${accentColor}44`, background: `${accentColor}18` }}
                        >
                            <Zap className="w-3 h-3" style={{ color: accentColor }} />
                            <span className="text-[9px] uppercase tracking-[0.45em] font-bold" style={{ color: accentColor }}>
                                {badge}
                            </span>
                        </div>
                    </div>

                    {/* Edition pill */}
                    <div className="absolute top-5 right-5 z-20">
                        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-semibold">{edition}</span>
                        </div>
                    </div>

                    {/* Number watermark */}
                    <div
                        className="absolute bottom-4 right-6 z-[12] font-black text-[120px] leading-none select-none pointer-events-none"
                        style={{ color: `${accentColor}10` }}
                    >
                        0{index + 1}
                    </div>
                </div>

                {/* ── CONTENT PANEL ── */}
                <div className={`relative flex flex-col justify-center lg:w-[45%] p-8 md:p-12 space-y-5 z-20 ${reverse ? "lg:pr-14" : "lg:pl-14"}`}>

                    {/* Status + model */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }}
                            />
                            <span className="text-[10px] uppercase tracking-[0.45em] font-bold" style={{ color: statusColor }}>
                                {statusLabel}
                            </span>
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-white/25">{modelCode}</span>
                    </div>

                    {/* Name */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: accentColor }}>{tagline}</p>
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[0.9]">{name}</h3>
                        <p className="text-sm text-white/35 mt-2 font-light tracking-wide">{subtitle}</p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span
                            className="text-4xl font-black"
                            style={{ background: `linear-gradient(135deg, #fff 0%, ${accentColor} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                        >
                            {price}
                        </span>
                        <span className="text-sm text-white/25 line-through">{originalPrice}</span>
                        <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ background: `${accentColor}20`, color: accentColor }}>
                            SAVE {savePct}%
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-white/45 text-[13.5px] leading-relaxed font-light">
                        {description}{" "}
                        <span className="text-white/80 font-medium">{highlight}</span>.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                        {features.map((f) => (
                            <div key={f} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03]">
                                <Shield className="w-2.5 h-2.5 text-white/30" />
                                <span className="text-[10px] text-white/40 font-medium tracking-wider">{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Spec bars */}
                    <div className="space-y-3">
                        {specs.map((spec, i) => (
                            <div key={spec.label}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[9px] uppercase tracking-[0.35em] text-white/30 font-semibold">{spec.label}</span>
                                    <span
                                        className="text-[12px] font-bold tabular-nums transition-opacity duration-300"
                                        style={{ color: spec.color, opacity: isInView ? 1 : 0, transitionDelay: `${0.4 + i * 0.1}s` }}
                                    >
                                        {spec.value}
                                    </span>
                                </div>
                                <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: `linear-gradient(90deg, ${spec.color}88, ${spec.color})`, willChange: "transform" }}
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={isInView ? { scaleX: spec.pct / 100 } : {}}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 pt-1">
                        <button
                            className="group relative flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-transform duration-200 active:scale-95 hover:scale-[1.02]"
                            style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}77)` }}
                        >
                            {/* shimmer — pure CSS */}
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                            <ShoppingCart className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">Add to Cart</span>
                            <div className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                <Star className="w-2.5 h-2.5 text-white" fill="white" />
                            </div>
                        </button>

                        <button
                            className="w-14 h-14 flex items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-all duration-200 hover:text-white hover:bg-white/[0.06] hover:scale-[1.04] active:scale-95"
                            style={{ borderColor: hovered ? `${accentColor}55` : undefined }}
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
