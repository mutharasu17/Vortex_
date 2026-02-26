"use client";

import { motion } from "framer-motion";
import { projectData } from "@/data/demoData";
import { ArrowUpRight } from "lucide-react";

export const ProjectsGrid = () => {
    return (
        <section className="py-32 px-6 bg-[#0B0F14] relative overflow-hidden">
            {/* Background Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-[#A3472F]" />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#A3472F]">Archive // 2026</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">PROJECTS</h2>
                    </div>
                    <p className="text-neutral-500 font-light max-w-xs text-sm leading-relaxed">
                        A selection of research projects and industrial applications focused on high-stakes robotics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectData.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -10 }}
                            className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#A3472F]/30 hover:bg-[#A3472F]/5 transition-all duration-500"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[#A3472F]/10 transition-colors">
                                    <project.icon className="w-6 h-6 text-neutral-400 group-hover:text-[#A3472F] transition-colors" />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-neutral-700 group-hover:text-[#A3472F] transition-all" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:translate-x-1 transition-transform">
                                {project.title}
                            </h3>
                            <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">
                                {project.description}
                            </p>

                            <div className="flex gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 text-neutral-400 group-hover:border-[#A3472F]/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
