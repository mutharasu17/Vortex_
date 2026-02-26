'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';

const SplineEngine = dynamic(() => import('./internal-spline'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black/5 flex items-center justify-center animate-pulse" />,
});

interface SplineSceneProps {
    scene: string;
    className?: string;
    interactive?: boolean;
}

// ── Global shared mouse state ─────────────────────────────────────────────────
// Single listener for the whole page; all Spline instances read from here.
const globalMouse = { x: -1, y: -1, ready: false };

let _globalListenerAdded = false;
function ensureGlobalMouseListener() {
    if (_globalListenerAdded || typeof window === 'undefined') return;
    _globalListenerAdded = true;
    window.addEventListener('mousemove', (e: MouseEvent) => {
        globalMouse.x = e.clientX;
        globalMouse.y = e.clientY;
        globalMouse.ready = true;
    }, { passive: true, capture: true });
    // Also capture touchmove as compat
    window.addEventListener('pointermove', (e: PointerEvent) => {
        if (e.pointerType === 'mouse') return; // covered by mousemove
        globalMouse.x = e.clientX;
        globalMouse.y = e.clientY;
        globalMouse.ready = true;
    }, { passive: true, capture: true });
}

export const SplineScene = memo(function SplineScene({ scene, className, interactive = false }: SplineSceneProps) {
    const [shouldRender, setShouldRender] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);

    const didInit = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const stableScene = useMemo(() => scene, [scene]);
    const splineApp = useRef<any>(null);
    const rafRef = useRef<number | null>(null);
    const blockLeaveRef = useRef<(() => void) | null>(null);

    const handleLoad = useCallback((spline: any) => {
        splineApp.current = spline;
        setHasLoaded(true);
    }, []);

    // ── Continuous 60fps tracking loop ────────────────────────────────────────
    // Spline's built-in Mouse Track resets to idle whenever it stops receiving
    // mousemove events. We feed the LAST known cursor position on every frame
    // so the robot always stays pointed at where the user left their cursor.
    useEffect(() => {
        if (!interactive || !hasLoaded || !isIntersecting) {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            return;
        }

        ensureGlobalMouseListener();

        const canvas = () => splineApp.current?.canvas as HTMLCanvasElement | null | undefined;

        // Suppress mouseleave/pointerleave on the canvas so Spline never enters
        // its idle/reset state even when the real cursor moves over overlaid HTML.
        const suppressLeave = (e: Event) => {
            e.stopImmediatePropagation();
        };
        const c = canvas();
        if (c) {
            c.addEventListener('mouseleave', suppressLeave, { capture: true });
            c.addEventListener('pointerleave', suppressLeave, { capture: true });
            c.addEventListener('mouseout', suppressLeave, { capture: true });
            blockLeaveRef.current = () => {
                c.removeEventListener('mouseleave', suppressLeave, { capture: true });
                c.removeEventListener('pointerleave', suppressLeave, { capture: true });
                c.removeEventListener('mouseout', suppressLeave, { capture: true });
            };
        }

        const sendPos = () => {
            if (!globalMouse.ready) return;
            const cv = canvas();
            if (!cv) return;

            // Mouse Event — primary type Spline listens to for cursor tracking
            cv.dispatchEvent(new MouseEvent('mousemove', {
                clientX: globalMouse.x,
                clientY: globalMouse.y,
                screenX: globalMouse.x,
                screenY: globalMouse.y,
                bubbles: true,   // let Spline's document-level fallback also work
                cancelable: false,
                composed: true,
                view: window,
            }));
        };

        const loop = () => {
            sendPos();
            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
            blockLeaveRef.current?.();
            blockLeaveRef.current = null;
        };
    }, [interactive, hasLoaded, isIntersecting]);

    // ── Intersection Observer — lazy mount + loop gating ─────────────────────
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting && !didInit.current) {
                    didInit.current = true;
                    setShouldRender(true);
                }
            },
            { threshold: 0.001, rootMargin: '800px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                backgroundColor: 'transparent',
                transform: 'translateZ(0)',
                willChange: 'transform',
                contain: 'strict',
            }}
        >
            {shouldRender && (
                <div
                    className="w-full h-full transition-opacity duration-1000"
                    style={{
                        opacity: hasLoaded ? 1 : 0,
                        pointerEvents: interactive ? 'auto' : 'none',
                    }}
                >
                    <SplineEngine
                        scene={stableScene}
                        onLoad={handleLoad}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            pointerEvents: interactive ? 'auto' : 'none',
                            transform: 'translateZ(0)',
                        }}
                    />
                </div>
            )}

            {!hasLoaded && shouldRender && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent z-0 pointer-events-none">
                    <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
});
