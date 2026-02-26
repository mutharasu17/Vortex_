"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Hexagon } from "lucide-react";
import Link from "next/link";

export const ContactFooter = () => {
    return (
        <section className="bg-[#0B0F14] border-t border-white/5 py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start pb-32 border-b border-white/5">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                                LET&apos;S <br />
                                <span className="text-[#A3472F]">EVOLVE</span>
                            </h2>
                            <p className="text-neutral-500 font-light text-lg max-w-sm">
                                Open for collaborations on autonomous systems, edge AI, and planetary exploration hardware.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="text-[10px] font-black tracking-[0.4em] uppercase text-neutral-600">Connect // Nodes</div>
                            <div className="flex gap-4">
                                {[
                                    { icon: Github, href: "https://github.com" },
                                    { icon: Twitter, href: "https://twitter.com" },
                                    { icon: Linkedin, href: "https://linkedin.com" }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(163, 71, 47, 0.1)", borderColor: "rgba(163, 71, 47, 0.3)" }}
                                        className="p-4 rounded-full border border-white/5 bg-white/[0.02] text-neutral-400 hover:text-[#A3472F] transition-all"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="text-[10px] font-black tracking-[0.4em] uppercase text-neutral-600">Secure Transmission</div>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col md:flex-row gap-6">
                                <input
                                    type="text"
                                    placeholder="OPERATOR NAME"
                                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono tracking-widest text-white focus:border-[#A3472F]/50 outline-none transition-all"
                                />
                                <input
                                    type="email"
                                    placeholder="EMAIL ADDRESS"
                                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono tracking-widest text-white focus:border-[#A3472F]/50 outline-none transition-all"
                                />
                            </div>
                            <textarea
                                placeholder="MESSAGE PAYLOAD"
                                rows={4}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono tracking-widest text-white focus:border-[#A3472F]/50 outline-none transition-all resize-none"
                            ></textarea>
                            <button className="group relative w-full py-5 bg-[#A3472F] text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-full overflow-hidden hover:scale-[1.02] transition-all active:scale-[0.98]">
                                <span className="relative z-10">Send Transmission</span>
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0 bg-white/10"
                                />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-24 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[#A3472F]/10 border border-[#A3472F]/20">
                            <Hexagon className="w-6 h-6 text-[#A3472F]" />
                        </div>
                        <div>
                            <span className="block text-xl font-black text-white tracking-widest uppercase">VORTEX</span>
                            <span className="block text-[8px] font-black tracking-[0.5em] text-neutral-600 uppercase">Aerospace // Robotics</span>
                        </div>
                    </div>

                    <div className="flex gap-12">
                        {['Research', 'Projects', 'Manifesto', 'Status'].map(link => (
                            <a key={link} href="#" className="text-[10px] font-black tracking-[0.3em] text-neutral-500 hover:text-white uppercase transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="text-[8px] font-mono text-neutral-700 tracking-[0.2em] uppercase">
                        © 2026 Vortex Systems. All dimensions in mm.
                    </div>
                </div>
            </div>
        </section>
    );
};
