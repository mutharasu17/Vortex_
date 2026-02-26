'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { SplineScene } from './spline-scene';

interface InteractiveRobotSplineProps {
    scene: string;
    className?: string;
}

function toEmbedUrl(scene: string): string {
    const match = scene.match(/spline\.design\/([a-zA-Z0-9]+)/);
    if (match) {
        return `https://my.spline.design/${match[1]}/`;
    }
    return scene;
}

export const InteractiveRobotSpline = memo(function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.01, rootMargin: '300px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                contain: 'layout style paint',
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            {isVisible && (
                <SplineScene
                    scene={scene}
                    className="w-full h-full"
                    interactive={true}
                />
            )}
        </div>
    );
});
