'use client';

import { memo } from 'react';

/**
 * GPU-accelerated floating particles using pure CSS animations.
 * Replaces the old Framer Motion version which ran 20+ JS-driven
 * animation loops on the main thread, causing scroll jank.
 *
 * Each particle uses CSS `@keyframes` with `transform: translate3d`
 * which the browser composites on the GPU — zero main-thread cost.
 */

const particlePositions = [
    { left: 5, top: 12 }, { left: 15, top: 45 }, { left: 25, top: 78 },
    { left: 35, top: 23 }, { left: 45, top: 56 }, { left: 55, top: 89 },
    { left: 65, top: 34 }, { left: 75, top: 67 }, { left: 85, top: 8 },
    { left: 95, top: 41 }, { left: 10, top: 73 }, { left: 20, top: 18 },
    { left: 30, top: 51 }, { left: 40, top: 84 }, { left: 50, top: 29 },
    { left: 60, top: 62 }, { left: 70, top: 95 }, { left: 80, top: 38 },
    { left: 90, top: 71 }, { left: 3, top: 54 },
];

export const FloatingParticles = memo(function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {particlePositions.map((pos, i) => {
                const duration = 3 + (i % 5) * 0.8;
                const delay = (i % 7) * 0.3;

                return (
                    <div
                        key={i}
                        className="floating-particle"
                        style={{
                            left: `${pos.left}%`,
                            top: `${pos.top}%`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        }}
                    />
                );
            })}
        </div>
    );
});
