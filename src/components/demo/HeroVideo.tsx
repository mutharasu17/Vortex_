"use client";

import { motion } from "framer-motion";

export const HeroVideo = () => {
    const basePath = process.env.NODE_ENV === "production" ? "/Vortex_" : "";

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0B0F14]">
            {/* Background soft glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(111,168,255,0.05),transparent_70%)]" />

            <div className="relative z-10 text-center space-y-8 max-w-4xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#A3472F]/30 bg-[#A3472F]/5 mb-4">
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#A3472F]">Vortex Robotics Lab</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9]">
                        MARS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600">ROBOTICS LAB</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 font-light tracking-wide max-w-2xl mx-auto">
                        Autonomous Robotics • AI Systems • Embedded Intelligence. Engineering the next generation of exploration hardware.
                    </p>
                </motion.div>

                {/* Center Video Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/5 shadow-2xl group"
                >
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent opacity-40" />
                    <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

                    {/* Subtle Grain Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                    >
                        <source src={`${basePath}/vortex_111.mp4`} type="video/mp4" />
                    </video>

                    {/* HUD Details */}
                    <div className="absolute bottom-6 left-8 z-20 hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-[#A3472F] rounded-full animate-pulse" />
                            <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">Stream: NX-904 Active</span>
                        </div>
                    </div>
                    <div className="absolute bottom-6 right-8 z-20 hidden md:block">
                        <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">64FPS // 4K // RT-01</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex gap-4 justify-center pt-8"
                >
                    <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:scale-105 transition-all">
                        View Projects
                    </button>
                    <button className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-white/5 transition-all">
                        Research Notes
                    </button>
                </motion.div>
            </div>

            {/* Scroll Hint */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
            >
                <span className="text-[8px] font-black tracking-[0.5em] uppercase text-white">Initialize Story</span>
                <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
};
