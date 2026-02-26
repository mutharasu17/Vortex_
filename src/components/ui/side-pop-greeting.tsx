'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TextShimmer } from './text-shimmer';

export function SidePopGreeting() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Greeting positioned to the right of the robot's head */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, x: 40 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    y: [0, -10, 0] // Floating effect
                }}
                transition={{
                    scale: { type: "spring", stiffness: 200, damping: 20, delay: 1.5 },
                    opacity: { duration: 0.5, delay: 1.5 },
                    x: { duration: 0.5, delay: 1.5 },
                    y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }
                }}
                className="absolute top-[20%] right-[10%] md:block hidden z-50"
            >
                <div className="relative">
                    {/* Cyan/Teal Gradient HUD Box */}
                    <div className="bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-2xl rounded-2xl p-5 px-8 shadow-[0_20px_50px_rgba(6,182,212,0.2)]">
                        <TextShimmer
                            duration={1.2}
                            className='text-xl md:text-2xl font-semibold tracking-tight [--base-color:theme(colors.cyan.400)] [--base-gradient-color:white] dark:[--base-color:theme(colors.cyan.400)] dark:[--base-gradient-color:theme(colors.cyan.100)]'
                        >
                            Hi, how are you?
                        </TextShimmer>
                    </div>

                    {/* Technical Indicator Dots */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
                        <div className="w-1 h-1 rounded-full bg-cyan-500/20" />
                    </div>

                    {/* Digital Corner Bracket */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-md" />
                </div>
            </motion.div>
        </div>
    );
}
