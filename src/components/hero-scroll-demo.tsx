"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SplineScene } from "@/components/ui/spline-scene";
import { motion } from "framer-motion";
import { SidePopGreeting } from "@/components/ui/side-pop-greeting";

export function HeroScrollDemo() {
    return (
        <div className="flex flex-col overflow-hidden bg-white dark:bg-black pb-24 relative">
            {/* Ambient glow behind hero text */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <ContainerScroll
                titleComponent={
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="text-4xl font-semibold text-neutral-900 dark:text-white">
                                Vortex Aerospace <br />
                                <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-cyan-700 to-cyan-500/50 dark:from-white dark:via-cyan-100 dark:to-cyan-500/50">
                                    Next-Gen Robotics
                                </span>
                            </h1>
                        </motion.div>
                    </>
                }
            >
                <div className="w-full h-full bg-neutral-100 dark:bg-zinc-900 relative overflow-hidden">
                    {/* Scale up & shift to frame the robot's head close-up */}
                    <div
                        className="absolute inset-0"
                        style={{
                            transform: 'scale(2) translateY(15%)',
                            transformOrigin: 'center center',
                        }}
                    >
                        <SplineScene
                            scene="https://prod.spline.design/kW5uRDFS7SDm3Jbq/scene.splinecode"
                            className="w-full h-full"
                            interactive={true}
                        />
                    </div>
                </div>
                <SidePopGreeting />
            </ContainerScroll >
        </div >
    );
}
