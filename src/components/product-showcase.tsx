'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const samples = [
    {
        title: "Precision Engineering",
        description: "Every servo, joint, and neural pathway is calibrated to sub-millimeter accuracy. Our robotic hands can thread a needle while lifting 50kg.",
        image: "/robot-precision.png",
        stats: [
            { label: "Accuracy", value: "0.01mm" },
            { label: "Response", value: "2ms" },
            { label: "Force", value: "500N" },
        ]
    },
    {
        title: "Assembly Intelligence",
        description: "Self-replicating production lines powered by AI. Each robot helps build the next generation, improving with every iteration.",
        image: "/robot-assembly.png",
        stats: [
            { label: "Output", value: "200/day" },
            { label: "Uptime", value: "99.9%" },
            { label: "Defects", value: "0.001%" },
        ]
    }
]

export function ProductShowcase() {
    return (
        <section className="py-24 space-y-32">
            {samples.map((item, index) => {
                const ref = useRef(null)
                const { scrollYProgress } = useScroll({
                    target: ref,
                    offset: ["start end", "end start"],
                })
                const y = useTransform(scrollYProgress, [0, 1], [80, -80])
                const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
                const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95])

                return (
                    <motion.div
                        ref={ref}
                        key={item.title}
                        style={{ opacity, scale }}
                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                    >
                        <div className="flex-1 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <p className="text-xs uppercase tracking-[0.5em] text-cyan-500 dark:text-cyan-400 mb-3 font-semibold">
                                    Module {String(index + 1).padStart(2, '0')}
                                </p>
                                <h3 className="text-4xl md:text-5xl font-light text-neutral-900 dark:text-white uppercase tracking-widest leading-tight">{item.title}</h3>
                            </motion.div>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-[1px] w-24 bg-gradient-to-r from-cyan-500 to-transparent origin-left"
                            />

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-neutral-400 max-w-md leading-relaxed text-lg"
                            >
                                {item.description}
                            </motion.p>

                            {/* Stats Row */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex gap-8 pt-4"
                            >
                                {item.stats.map((stat, i) => (
                                    <div key={stat.label} className="space-y-1">
                                        <motion.p
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                                            className="text-2xl font-bold text-neutral-900 dark:text-white"
                                        >
                                            {stat.value}
                                        </motion.p>
                                        <p className="text-xs uppercase tracking-widest text-neutral-500">{stat.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div
                            style={{ y }}
                            className="flex-1 relative aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl group"
                        >
                            {/* Animated glow overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                            {/* Scan line animation */}
                            <motion.div
                                initial={{ top: "-10%" }}
                                whileInView={{
                                    top: ["0%", "100%"],
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 2,
                                    delay: 0.5,
                                    ease: "linear",
                                }}
                                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 opacity-60"
                            />

                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </motion.div>
                )
            })}
        </section>
    )
}
