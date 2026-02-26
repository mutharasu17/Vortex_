"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import {
    Hexagon, ArrowUpRight, Github, Twitter, Linkedin,
    ChevronRight, Cpu, Eye, Radio, Layers, Zap, Activity,
    Sun, Moon
} from "lucide-react";
import Link from "next/link";
import { useCanvasSequenceEngine } from "@/hooks/useCanvasSequenceEngine";
import framesIndex from "@/data/r_pik_index.json";

gsap.registerPlugin(ScrollTrigger);

// ─── Chapters ────────────────────────────────────────────────────────────────
const CHAPTERS = [
    {
        id: 0, start: 0.00, end: 0.16,
        tag: "00 // INTEL",
        title: "VORTEX\nINTELLIGENCE",
        body: "Pioneering the next frontier of autonomous systems through advanced neural feedback loops and terrestrial intelligence.",
        stats: [{ label: "Status", val: "Active" }, { label: "System", val: "V4" }, { label: "Ops", val: "100%" }],
        accentDark: "#A3472F", accentLight: "#8B3520",
    },
    {
        id: 1, start: 0.16, end: 0.32,
        tag: "01 // AUTONOMY",
        title: "AUTONOMY\nUNDER CONSTRAINT",
        body: "Sensor fusion across LiDAR, stereo vision, and IMU enables real-time decisions where human oversight is impossible. Fail-safe logic is architecturally enforced.",
        stats: [{ label: "Sensors", val: "18" }, { label: "Latency", val: "0.3ms" }, { label: "Uptime", val: "99.98%" }],
        accentDark: "#A3472F", accentLight: "#8B3520",
    },
    {
        id: 2, start: 0.32, end: 0.48,
        tag: "02 // TERRAIN",
        title: "MARS-TERRAIN\nMOBILITY",
        body: "Predictive ground models and active suspension enable traverse of slopes up to 35° in sub-zero Martian conditions with full stability.",
        stats: [{ label: "Max Slope", val: "35°" }, { label: "Speed", val: "12cm/s" }, { label: "Range", val: "40km" }],
        accentDark: "#6FA8FF", accentLight: "#1D4ED8",
    },
    {
        id: 3, start: 0.48, end: 0.64,
        tag: "03 // VISION",
        title: "VISION\nIN DUST",
        body: "Edge neural networks at under 8W deliver robust object detection and probabilistic depth mapping under extreme aerosol scattering.",
        stats: [{ label: "Power", val: "8W" }, { label: "FPS", val: "64" }, { label: "Range", val: "120m" }],
        accentDark: "#A3472F", accentLight: "#8B3520",
    },
    {
        id: 4, start: 0.64, end: 0.80,
        tag: "04 // CONTROL",
        title: "EMBEDDED\nCONTROL",
        body: "Sub-millisecond RTOS control loops manage torque, thermal regulation, and power budgeting with zero cloud dependency and triple redundancy.",
        stats: [{ label: "Loop", val: "0.8ms" }, { label: "Channels", val: "1,200+" }, { label: "Redundancy", val: "3×" }],
        accentDark: "#6FA8FF", accentLight: "#1D4ED8",
    },
    {
        id: 5, start: 0.80, end: 1.00,
        tag: "05 // INTEGRATION",
        title: "SYSTEM\nINTEGRATION",
        body: "Digital-twin simulation and hardware-in-the-loop testing validate every subsystem. Real-time telemetry across 1,200+ data streams.",
        stats: [{ label: "Channels", val: "1.2K" }, { label: "Tests/Day", val: "8,400" }, { label: "MTTF", val: "12yr" }],
        accentDark: "#A3472F", accentLight: "#8B3520",
    },
];

const PROJECTS = [
    { title: "Rover Nav Stack", desc: "Autonomous pathway planning for multi-terrain surfaces.", tags: ["AI", "Robotics"], icon: Cpu },
    { title: "Vision Avoidance", desc: "Real-time obstacle detection via stereoscopic depth at 64fps.", tags: ["Vision", "Edge AI"], icon: Eye },
    { title: "Motor Control", desc: "Sub-ms servo loops for articulated robotic limbs.", tags: ["Embedded", "Ctrl"], icon: Zap },
    { title: "Digital Twin", desc: "Physics simulation for pre-mission hardware validation.", tags: ["Sim", "Pipeline"], icon: Layers },
    { title: "Telemetry Dashboard", desc: "Real-time monitoring of 1,200+ sensor channels remotely.", tags: ["Web", "Systems"], icon: Radio },
    { title: "Dataset Tooling", desc: "Automated labeling, augmentation and QA for robotics data.", tags: ["AI", "Tooling"], icon: Activity },
];

export default function DemoPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : true; // Default to dark on server for consistency
    const lenis = useLenis();

    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [lenis]);

    useEffect(() => {
        console.log("VORTEX: Demo Page Mounted");
        const sync = () => ScrollTrigger.update();
        window.addEventListener("scroll", sync, { passive: true });
        ScrollTrigger.defaults({ scroller: window });

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            window.removeEventListener("scroll", sync);
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <main
            className={`relative overflow-x-hidden transition-colors duration-700 ${isDark ? "bg-[#0B0F14] text-[#F3F4F6]" : "bg-white text-[#0B0F14]"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <SiteHeader isDark={isDark} />
            <HeroStory isDark={isDark} />
            <CanvasScrollStory isDark={isDark} />
            <VideoShowcase isDark={isDark} />
            <ProjectsGrid isDark={isDark} />
            <SystemAnalysis isDark={isDark} />
            <ContactSection isDark={isDark} />
            <SiteFooter isDark={isDark} />
        </main>
    );
}

type ThemeProps = { isDark: boolean };

function SiteHeader({ isDark }: ThemeProps) {
    const { setTheme, resolvedTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const fn = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const toggleTheme = () => {
        const next = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(next);
    };

    const glassBg = isDark
        ? "bg-[#0B0F14]/40 backdrop-blur-xl border border-white/10 shadow-2xl"
        : "bg-white/40 backdrop-blur-xl border border-black/[0.08] shadow-lg shadow-black/5";

    const navTextBase = isDark ? "text-neutral-500 hover:text-white hover:bg-white/5" : "text-neutral-400 hover:text-[#0B0F14] hover:bg-black/5";
    const connectBorder = isDark ? "border-white/10 hover:border-[#A3472F]/50" : "border-black/10 hover:border-[#8B3520]/50";
    const logoText = isDark ? "text-white" : "text-[#0B0F14]";

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-6 py-4"
        >
            <div className={`flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-2xl transition-all duration-500
        ${scrolled ? glassBg : "bg-transparent"}`}>

                <Link href="/" className="flex items-center gap-3">
                    <Hexagon className="w-6 h-6 text-[#A3472F]" />
                    <span className={`text-sm font-black tracking-[0.3em] uppercase ${logoText}`}
                        style={{ fontFamily: "'Space Grotesk',sans-serif" }}>VORTEX</span>
                </Link>

                <nav className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 border backdrop-blur-md transition-colors duration-500
          ${isDark ? "bg-white/[0.04] border-white/5" : "bg-black/[0.03] border-black/[0.06]"}`}>
                    {["Experience", "Projects", "Contact"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`}
                            className={`px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors rounded-full ${navTextBase}`}>
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className={`p-2.5 rounded-full border transition-all duration-300
              ${isDark ? "border-white/10 bg-white/5 text-white/60 hover:text-white"
                                : "border-black/10 bg-black/[0.04] text-black/40 hover:text-[#0B0F14]"}`}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {mounted && (
                                <motion.span
                                    key={isDark ? "moon" : "sun"}
                                    initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                                    transition={{ duration: 0.25 }}
                                    className="block"
                                >
                                    {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    <Link href="/login" className="group relative">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#A3472F] to-orange-400/40 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
                        <div className={`relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.25em] rounded-full flex items-center gap-2 transition-all border ${connectBorder}
              ${isDark ? "bg-white/5 text-white" : "bg-black/[0.04] text-[#0B0F14]"}`}>
                            Connect <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}

function HeroStory({ isDark }: ThemeProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        console.log("VORTEX: HeroStory Init", { video: !!videoRef.current, src: videoRef.current?.querySelector('source')?.src });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=120%",
                    pin: true,
                    scrub: true,
                },
            });

            // Initial state for video container
            gsap.set(videoContainerRef.current, {
                xPercent: -50,
                yPercent: -50,
                left: "50%",
                top: "140%",
                width: "60vw",
                height: "35vh",
                borderRadius: "80px",
                rotationX: 12, // Subtle 3D tilt
                transformPerspective: 1500,
            });

            // Start with text moving up and narrowing
            tl.to(contentRef.current, {
                y: -600,
                opacity: 0,
                scaleX: 0.05,
                transformOrigin: "center top",
                filter: "blur(100px)",
                duration: 1,
                ease: "power3.in"
            }, 0)
                // Stage 1: Lift into view with tilting correction
                .to(videoContainerRef.current, {
                    top: "70%",
                    rotationX: 5,
                    width: "75vw",
                    height: "50vh",
                    duration: 1,
                    ease: "power2.out"
                }, 0.2)
                // Stage 2: EXPLOADE into full screen (Apple Style)
                .to(videoContainerRef.current, {
                    top: "50%",
                    left: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    width: "100.2vw",
                    height: "100.2vh",
                    rotationX: 0,
                    borderRadius: "0px",
                    ease: "expo.inOut",
                    duration: 2
                }, 0.8)
                .fromTo(videoRef.current,
                    { scale: 1.8, filter: "brightness(0.4) contrast(1.3)" },
                    { scale: 1.0, filter: "brightness(1) contrast(1)", ease: "expo.inOut", duration: 2 },
                    0.8
                )
                .to(overlayRef.current, {
                    opacity: 0,
                    backgroundColor: "transparent",
                    ease: "power2.inOut",
                    duration: 1.2
                }, 1.2);
        });

        return () => ctx.revert();
    }, []);

    const titleColor = isDark ? "text-white" : "text-[#0B0F14]";
    const subTextColor = isDark ? "text-neutral-400" : "text-neutral-500";

    return (
        <section ref={sectionRef} className="relative h-[150vh] w-full overflow-hidden bg-[#0B0F14]">
            {/* Background Video Container - Positioning handled by GSAP to prevent drift */}
            <div
                ref={videoContainerRef}
                className="absolute z-10 overflow-hidden shadow-2xl"
                style={{
                    width: "80vw",
                    height: "50vh",
                    borderRadius: "40px",
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                >
                    <source src={`${process.env.NODE_ENV === "production" ? "/Vortex_" : ""}/vortex_111.mp4`} type="video/mp4" />
                </video>
                <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            </div>

            {/* Content overlay - Starts high above the video */}
            <div ref={contentRef} className="absolute top-0 left-0 w-full pt-40 flex flex-col items-center justify-start text-center px-6 pointer-events-none z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    {/* Professional Vortex Brand Mark */}
                    <div className="relative mb-12 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative group cursor-pointer"
                        >
                            {/* Animated Energy Rings */}
                            <div className="absolute inset-0 -m-4 rounded-full border border-[#A3472F]/20 animate-[ping_3s_linear_infinite]" />
                            <div className="absolute inset-0 -m-8 rounded-full border border-[#A3472F]/10 animate-[ping_4s_linear_infinite]" />

                            <Hexagon className="w-16 h-16 text-[#A3472F] drop-shadow-[0_0_15px_rgba(163,71,47,0.4)] transition-transform duration-500 group-hover:scale-110" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, letterSpacing: "0.2em" }}
                            animate={{ opacity: 1, letterSpacing: "0.8em" }}
                            transition={{ delay: 0.3, duration: 1.8 }}
                            className="mt-6 text-[10px] font-black uppercase text-[#A3472F]/60"
                        >
                            Vortex
                        </motion.div>
                    </div>

                    <h1
                        ref={titleRef}
                        className={`text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter leading-[0.85] uppercase mb-6 ${titleColor}`}
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Neural<br /><span className="text-[#A3472F]">Intelligence</span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        className={`max-w-xl mx-auto text-base md:text-lg font-light tracking-wide mb-12 ${subTextColor}`}
                    >
                        Pioneering the next frontier of autonomous systems through advanced neural feedback loops and adaptive robotic intuition.
                    </p>

                    {/* Technical Specification Chips */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white/40">Latency</span>
                            <span className="text-xl font-light tracking-tight text-white">0.42ms</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white/40">Sync</span>
                            <span className="text-xl font-light tracking-tight text-white">99.9%</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white/40">Frequency</span>
                            <span className="text-xl font-light tracking-tight text-white">5.8 GHz</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 overflow-hidden">
                <motion.div
                    animate={{ opacity: [1, 0] }}
                    className="flex flex-col items-center"
                >
                    <span className="text-[8px] font-bold tracking-[0.4em] text-white/30 uppercase">Initiate Sequence</span>
                    <div className="w-px h-10 bg-gradient-to-b from-[#A3472F] to-transparent mt-2" />
                </motion.div>
            </div>
        </section>
    );
}

function CanvasScrollStory({ isDark }: ThemeProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const totalFrames = framesIndex.length;
    const framePathPattern = useCallback((index: number) => {
        const safeIndex = Math.max(0, Math.min(index - 1, totalFrames - 1));
        const basePath = process.env.NODE_ENV === "production" ? "/Vortex_" : "";
        return `${basePath}/r_pik/${framesIndex[safeIndex]}`;
    }, [totalFrames]);

    const { isReady, renderFrame } = useCanvasSequenceEngine({
        frameCount: totalFrames,
        framePathPattern,
        canvasRef
    });

    const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);
    const frameIdxRef = useRef({ current: 0, chapter_id: 0 });
    const progressVal = useMotionValue(0);
    const smoothProgress = useSpring(progressVal, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        if (!sectionRef.current || totalFrames === 0) return;

        const scrollDist = totalFrames * 6; // Increased space for smoother scroll
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${scrollDist}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const p = self.progress;
                    // Always update progress values for UI
                    progressVal.set(p);

                    // Render frame if ready
                    if (isReady) {
                        const idx = Math.min(Math.round(p * (totalFrames - 1)), totalFrames - 1);
                        const safeFrameIdx = idx + 1;
                        if (safeFrameIdx !== frameIdxRef.current.current) {
                            frameIdxRef.current.current = safeFrameIdx;
                            renderFrame(safeFrameIdx);
                        }
                    }

                    // Update chapters
                    const currentChapter = CHAPTERS.find(c => p >= c.start && p < c.end) || CHAPTERS[0];
                    if (currentChapter.id !== frameIdxRef.current.chapter_id) {
                        frameIdxRef.current.chapter_id = currentChapter.id;
                        setActiveChapter(currentChapter);
                    }

                    // Update visual effect (vignette)
                    const cp = (p - currentChapter.start) / (currentChapter.end - currentChapter.start);
                    const baseRadius = isDark ? 25 : 55;
                    sectionRef.current?.style.setProperty('--v-radius', `${baseRadius + (15 * Math.sin(cp * Math.PI))}%`);
                },
            });
        });
        return () => ctx.revert();
    }, [isReady, isDark, renderFrame, totalFrames]);

    const accent = isDark ? activeChapter.accentDark : activeChapter.accentLight;

    return (
        <section ref={sectionRef} id="research" className="relative h-screen w-full overflow-hidden bg-[#0B0F14]">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(circle at center, transparent var(--v-radius, 45%), rgba(0,0,0,0.6) 100%)` }} />

            <div className="absolute inset-0 z-20 flex items-center justify-end pointer-events-none px-8 md:px-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeChapter.id}
                        initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-md space-y-8 flex flex-col items-end text-right"
                    >
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black tracking-[0.5em] uppercase" style={{ color: accent }}>{activeChapter.tag}</span>
                            <div className="h-px w-16" style={{ backgroundColor: accent }} />
                        </div>
                        <ChapterTitle title={activeChapter.title} progress={smoothProgress} textMain="text-white" />
                        <p className="text-base font-light leading-relaxed max-w-sm text-neutral-300">{activeChapter.body}</p>
                        <div className="grid grid-cols-3 gap-4 w-full">
                            {activeChapter.stats.map((s, idx) => (
                                <ChapterStat key={s.label} s={s} idx={idx} progress={smoothProgress} isDark={true} />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
                <ScrollProgressBar progress={smoothProgress} />
                <ScrollSeqCounter progress={smoothProgress} total={totalFrames} />
            </div>
        </section>
    );
}

function ChapterTitle({ title, progress, textMain }: any) {
    const y = useTransform(progress, (p: number) => (p % 0.2) * -100);
    return <motion.h2 className={`text-5xl font-black uppercase tracking-tighter italic ${textMain}`} style={{ y }}>{title}</motion.h2>;
}

function ChapterStat({ s, idx, progress, isDark }: any) {
    const y = useTransform(progress, (p: number) => (p % 0.2) * -(idx * 20 + 20));
    return (
        <motion.div className={`border rounded-xl p-3 backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`} style={{ y }}>
            <p className="text-base font-black text-right">{s.val}</p>
            <p className="text-[7px] uppercase tracking-widest text-neutral-500 text-right">{s.label}</p>
        </motion.div>
    );
}

function ScrollProgressBar({ progress }: any) {
    const width = useTransform(progress, (p: number) => `${p * 100}%`);
    return <div className="w-64 h-[2px] bg-white/5 overflow-hidden rounded-full"><motion.div className="h-full bg-[#A3472F]" style={{ width }} /></div>;
}

function ScrollSeqCounter({ progress, total }: any) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        return progress.on("change", (latest: number) => {
            if (ref.current) {
                const idx = Math.min(Math.round(latest * (total - 1)), total - 1);
                ref.current.textContent = `${Math.round(latest * 100)}% — SEQ ${String(idx + 1).padStart(4, "0")} / ${total}`;
            }
        });
    }, [progress, total]);
    return <span ref={ref} className="text-[8px] font-mono tracking-[0.5em] uppercase text-neutral-600 mt-2">0% — SEQ 0001 / {total}</span>;
}

function VideoShowcase({ isDark }: ThemeProps) {
    const basePath = process.env.NODE_ENV === "production" ? "/Vortex_" : "";
    const videos = [
        { src: `${basePath}/vortex_l/vortex_l1.mp4`, title: "Neural Linkage", desc: "High-bandwidth data stream simulation across inter-planetary nodes." },
        { src: `${basePath}/vortex_l/vortex_l2.mp4`, title: "Atmospheric Entry", desc: "Thermal shielding and structural integrity analysis during Martian insertion." }
    ];

    return (
        <section className={`py-40 px-6 ${isDark ? "bg-[#0B0F14]" : "bg-neutral-50"}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row-reverse justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl text-right">
                        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Experimental<br /><span className="text-[#A3472F]">Simulations</span>
                        </h2>
                        <p className="text-xl text-neutral-500 font-light leading-relaxed">
                            Cross-domain validation of autonomous behaviors through high-fidelity physics-based environments.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.4em] uppercase text-[#A3472F] bg-[#A3472F]/5 px-6 py-3 rounded-full border border-[#A3472F]/20">
                        <div className="w-2 h-2 rounded-full bg-[#A3472F] animate-pulse" />
                        <span>Live Feed</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {videos.map((v, i) => (
                        <motion.div
                            key={v.src}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative"
                        >
                            <div className="relative aspect-video overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5 bg-black">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                                >
                                    <source src={v.src} type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                <div className="absolute bottom-10 left-10 right-10">
                                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{v.title}</h3>
                                    <p className="text-base text-white/50 font-light max-w-sm">{v.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectsGrid({ isDark }: ThemeProps) {
    return (
        <section id="projects" className={`py-40 px-6 ${isDark ? "bg-[#0B0F14]" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto text-center mb-24">
                <h2 className="text-6xl font-black uppercase tracking-tighter">Core Technologies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PROJECTS.map((p, i) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-10 rounded-[2.5rem] border transition-all duration-500 backdrop-blur-xl ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white/40 border-black/5 shadow-xl shadow-black/5"}`}
                    >
                        <p.icon className="w-8 h-8 mb-8 text-[#A3472F]" />
                        <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                        <p className="text-neutral-500 font-light">{p.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function ContactSection({ isDark }: ThemeProps) {
    return (
        <section id="contact" className={`py-40 px-6 ${isDark ? "bg-[#0B0F14]" : "bg-neutral-50"}`}>
            <div className="max-w-4xl mx-auto text-center space-y-10">
                <h2 className="text-7xl font-black uppercase tracking-tighter">Join the Expedition</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-12 py-5 bg-[#A3472F] text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px]"
                >
                    Contact Lab
                </motion.button>
            </div>
        </section>
    );
}

function SystemAnalysis({ isDark }: ThemeProps) {
    const skills = [
        { name: "Neural Processing", value: 98 },
        { name: "Spatial Awareness", value: 94 },
        { name: "Kinetic Precision", value: 99 },
        { name: "Adaptive Logic", value: 92 }
    ];

    return (
        <section className={`py-40 px-6 ${isDark ? "bg-[#0B0F14]" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-6 flex items-center gap-3"
                        >
                            <div className="w-10 h-[1px] bg-[#A3472F]" />
                            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#A3472F]">Core Capabilities</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.9]">
                            System Analysis <br /> & Performance
                        </h2>
                        <p className="text-neutral-500 text-lg max-w-lg mb-16 leading-relaxed">
                            A professional assessment of the Genesis neural architecture, demonstrating the intersection of advanced machine learning and robotic precision across core operational domains.
                        </p>

                        <div className="space-y-10">
                            {skills.map((skill, i) => (
                                <div key={skill.name} className="group">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">{skill.name}</span>
                                        <span className="text-[11px] font-mono text-[#A3472F]">{skill.value}%</span>
                                    </div>
                                    <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 2.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8B3520] to-[#A3472F]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative aspect-square max-w-[500px] mx-auto flex items-center justify-center">
                            {/* Animated HUD Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-white/[0.03] rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-12 border border-[#A3472F]/10 rounded-full border-dashed"
                            />

                            <div className="relative z-10">
                                <Hexagon className="w-48 h-48 text-[#A3472F] opacity-10 animate-pulse" />
                            </div>

                            {/* Floating Metadata Chips */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 right-0 p-6 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl"
                            >
                                <span className="text-[9px] uppercase font-bold tracking-[0.2em] block text-neutral-500 mb-2">Processing Load</span>
                                <span className="text-2xl font-light tracking-tight">14.82 <span className="text-xs text-neutral-600">TF</span></span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-10 left-0 p-6 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl"
                            >
                                <span className="text-[9px] uppercase font-bold tracking-[0.2em] block text-neutral-500 mb-2">Neural Density</span>
                                <span className="text-2xl font-light tracking-tight">0.993 <span className="text-xs text-neutral-600">ρ</span></span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SiteFooter({ isDark }: ThemeProps) {
    return (
        <footer className={`py-20 px-6 border-t ${isDark ? "bg-[#0B0F14] border-white/5" : "bg-white border-black/5"}`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex items-center gap-4">
                    <Hexagon className="w-8 h-8 text-[#A3472F]" />
                    <span className="text-sm font-black tracking-[0.4em] uppercase">Vortex Systems</span>
                </div>
                <div className="flex gap-8">
                    <Github className="w-5 h-5 text-neutral-500 hover:text-white transition-colors cursor-pointer" />
                    <Twitter className="w-5 h-5 text-neutral-500 hover:text-white transition-colors cursor-pointer" />
                    <Linkedin className="w-5 h-5 text-neutral-500 hover:text-white transition-colors cursor-pointer" />
                </div>
                <p className="text-[10px] text-neutral-600 uppercase tracking-[0.5em]">© 2026 Vortex Robotics Lab. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
