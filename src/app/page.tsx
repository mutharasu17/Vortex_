"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/navbar";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { cn } from "@/lib/utils";
import { HeroScrollDemo } from "@/components/hero-scroll-demo";
import { HeroSplit } from "@/components/hero-split";
import { SplineScene } from "@/components/ui/spline-scene";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { GlowingEffectDemo } from "@/components/glowing-effect-demo";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { RobotShowcaseCard } from "@/components/ui/robot-showcase-card";
import { UltraLuxuryCompanions } from "@/components/ui/ultra-luxury-companions";
import Link from "next/link";
import { SidePopGreeting } from "@/components/ui/side-pop-greeting";

const cardStackItems: CardStackItem[] = [
  {
    id: 1,
    title: "Mars Colony Builder",
    description: "Autonomous construction units building the first human habitats on the red planet with zero human intervention.",
    imageSrc: "/robot-mars-explorer.png",
  },
  {
    id: 3,
    title: "Assembly Intelligence",
    description: "Self-replicating production lines where robots manufacture the next generation of themselves.",
    imageSrc: "/robot-assembly.png",
  },
  {
    id: 4,
    title: "AI Companion K-9",
    description: "Emotionally intelligent robot dogs designed for companionship and home security.",
    imageSrc: "/robot-dog-new.png",
  },
  {
    id: 5,
    title: "Feline Sentinel",
    description: "Elegant robotic cats with independent exploration AI and self-charging capability.",
    imageSrc: "/robot-cat-new.png",
  },
];

/* FloatingParticles now imported from @/components/ui/floating-particles (GPU-accelerated CSS) */

const partnerLogos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk",
  },
];
export default function Home() {
  const robotSectionRef = useRef(null);
  const { scrollYProgress: robotScrollProgress } = useScroll({
    target: robotSectionRef,
    offset: ["start end", "end start"],
  });
  const robotParallaxY = useTransform(robotScrollProgress, [0, 1], [60, -60]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
      },
    },
  };

  /* filter:blur() is expensive — only animate transform + opacity for smoother perf */
  const textRevealVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* ── Hero Section with Scroll Animation ── */}
      <section className="relative w-full">
        <HeroScrollDemo />
      </section>

      {/* ── Robot Intelligence Narrative Section ── */}
      <section
        ref={robotSectionRef}
        className="relative py-32 md:py-40 px-6 border-t border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-zinc-950/50 overflow-hidden"
      >
        <FloatingParticles />


        <div className="max-w-7xl mx-auto space-y-32">
          {/* Text + 3D Robot */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            <div className="space-y-8">

              <motion.h2
                variants={textRevealVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tighter uppercase leading-[0.9]"
              >
                The Core of <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-600 bg-clip-text text-transparent">
                  Intelligence
                </span>
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="h-[1px] w-32 bg-gradient-to-r from-cyan-500 to-transparent mx-auto"
              />

              <motion.p
                variants={itemVariants}
                className="text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto"
              >
                We don&apos;t just build robots. We sculpt instances of intelligence.
                Every neural pathway is hand-tuned. Every servo calibrated to
                sub-millimeter precision. This is robotics elevated to art.
              </motion.p>

              {/* Animated stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-4 w-full"
              >
                {[
                  { value: "12B", label: "Parameters" },
                  { value: "0.3ms", label: "Latency" },
                  { value: "99.99%", label: "Uptime" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                    className="text-center p-4 rounded-xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-none"
                  >
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Interactive 3D Robot */}
            <motion.div
              style={{ y: robotParallaxY }}
              className="relative aspect-square w-full max-w-[550px] mx-auto"
            >
              {/* Glowing backdrop — CSS animation, no JS per frame */}
              <div
                className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl rounded-full animate-pulse"
                style={{ willChange: 'opacity' }}
              />

              <div
                className="relative h-full w-full overflow-hidden rounded-3xl border border-black/5 dark:border-white/5"
                style={{ touchAction: "pan-y" }}
              >
                <InteractiveRobotSpline
                  scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                  className="w-full h-full"
                />
              </div>

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
            </motion.div>
          </motion.div>

          {/* Card Stack Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <CardStack
              items={cardStackItems}
              initialIndex={0}
              autoAdvance
              intervalMs={2000}
              pauseOnHover
              showDots
            />
          </motion.div>
        </div>
      </section>

      {/* ── Trusted Partners · Logo Cloud ── */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-white dark:bg-black">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className={cn(
            "-z-10 -top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[120vmin] w-[120vmin] rounded-b-full",
            "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
            "blur-[30px]"
          )}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl"
        >
          <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
            <span className="text-muted-foreground">Trusted by industry leaders.</span>
            <br />
            <span className="font-semibold">Powering the future of robotics.</span>
          </h2>

          <div className="mx-auto my-5 h-px max-w-sm bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

          <LogoCloud logos={partnerLogos} />

          <div className="mt-5 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </motion.div>
      </section>

      {/* ── Robot Companions · Ultra Luxury 3D Edition ── */}
      <UltraLuxuryCompanions />


      {/* ── Call to Action - Robot Revolution CTA ── */}
      {/*
        POINTER TRACKING FIX:
        - The Spline canvas lives in z-0 and receives ALL mouse events
        - Every single foreground layer uses pointer-events-none
        - Only the buttons get pointer-events-auto
        - This means mouse moves over the entire section move the 3D robot
      */}
      <section
        className="relative overflow-hidden bg-white dark:bg-black"
        style={{ height: "100vh", minHeight: "700px", touchAction: "pan-y" }}
      >
        {/* ━━━ LAYER 0: Full-screen Spline 3D Robot (captures ALL mouse events) ━━━ */}
        {/* ━━━ LAYER 0: Full-screen Spline 3D Robot (captures ALL mouse events) ━━━ */}
        <motion.div
          className="absolute inset-0 z-[5] pointer-events-auto"
          style={{ touchAction: "pan-y" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SplineScene
            scene="https://prod.spline.design/IGm0zH9UGZ0ewAx1/scene.splinecode"
            className="absolute inset-0 w-full h-full"
            interactive={true}
          />
        </motion.div>

        {/* ━━━ LAYER 1: Gradient overlays — ALL pointer-events-none ━━━ */}
        {/* Bottom-left soft dark zone only — robot dominates the rest */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 15% 85%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 40%, transparent 75%)",
          }}
        />
        {/* Top vignette */}
        <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-[1]"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }} />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-[1]"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
        {/* Very faint cyan rim around robot area — center right */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 40% 55% at 65% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)",
          }}
        />

        {/* ━━━ LAYER 2: HIGH-VIS REVOLUTION WATERMARK (SHIFTED TOP) ━━━ */}
        <div className="absolute inset-0 z-[2] pointer-events-none select-none flex items-start justify-center overflow-hidden pt-[18vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.p
              animate={{
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="font-black uppercase leading-none whitespace-nowrap tracking-[0.2em] text-center"
              style={{
                fontSize: "clamp(5rem, 14vw, 18rem)",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(6,182,212,0.15) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                willChange: "opacity",
              }}
            >
              REVOLUTION
            </motion.p>
          </motion.div>
        </div>

        {/* ━━━ LAYER 3: Text Panel — NO inset-0 wrapper, only occupies its own area ━━━ */}
        <div className="absolute bottom-28 left-10 md:left-20 max-w-xs z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Headline — hover scales + glows */}
            <motion.div
              whileHover={{
                scale: 1.08,
                filter: "drop-shadow(0 0 30px rgba(6,182,212,0.7))",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto cursor-pointer mb-4"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white leading-[0.95]">
                Ready to
              </h2>
              <h2
                className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95]"
                style={{
                  background: "linear-gradient(120deg, #67e8f9, #38bdf8, #818cf8, #67e8f9)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientShift 4s ease infinite",
                }}
              >
                Evolve?
              </h2>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="h-px w-10 mb-4 origin-left"
              style={{ background: "linear-gradient(90deg, #06b6d4, transparent)" }}
            />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-[12px] text-neutral-500 leading-relaxed mb-5 font-light"
            >
              Pre-order your Vortex unit today.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 }}
              className="flex gap-3 pointer-events-auto mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(6,182,212,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 text-white text-[9px] font-bold uppercase tracking-[0.25em] rounded-full"
                style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}
              >
                Pre-Order
              </motion.button>
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "rgba(6,182,212,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 border border-white/15 text-white text-[9px] font-bold uppercase tracking-[0.25em] rounded-full transition-colors duration-300"
                >
                  Watch Demo
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="flex gap-10 pt-6 border-t border-white/5">
              {[
                { v: "12B+", l: "PARAMS" },
                { v: "0.3MS", l: "LATENCY" },
                { v: "Q3'26", l: "SHIP" },
              ].map((s) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-sm font-black text-neutral-900 dark:text-white tracking-tight">{s.v}</p>
                  <p className="text-[7px] uppercase tracking-[0.4em] text-neutral-500 font-bold">{s.l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ━━━ LAYER 4: Corner UI elements (HUD Style) ━━━ */}

        {/* Top Corners: Status & Version */}
        <div className="absolute top-10 inset-x-10 md:inset-x-16 z-20 pointer-events-none flex justify-between items-start hidden md:flex">
        </div>

        {/* Bottom Strip: Footer Elements Only (No Stats here to avoid overlap) */}
        <div className="absolute bottom-8 inset-x-10 md:inset-x-16 z-20 pointer-events-none">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
            {/* Attribution */}
            <div className="opacity-40 text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-300 font-bold">© 2026 Vortex Systems</p>
              <p className="text-[7px] uppercase tracking-[0.3em] text-neutral-600 mt-1">Sculpting the Future of Robotics</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-10 pointer-events-auto">
              {["Twitter", "Instagram", "LinkedIn", "GitHub"].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ y: -3, color: "#22d3ee", textShadow: "0 0 15px rgba(34,211,238,0.5)" }}
                  className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold transition-all duration-300"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Manual Override Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <p className="text-[6px] uppercase tracking-[2em] text-white/20 whitespace-nowrap">
            [ Manual Override Enabled ]
          </p>
        </div>
      </section>


    </main>
  );
}
