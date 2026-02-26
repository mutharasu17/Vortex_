"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.12,           // slightly snappier than default 0.1
            duration: 1.3,        // slightly faster than 1.5
            smoothWheel: true,
            wheelMultiplier: 1.0, // 1:1 wheel-to-scroll ratio
            touchMultiplier: 2.0, // more responsive on touch/trackpad
        }}>
            {children}
        </ReactLenis>
    );
}
