'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
    scene: string
    className?: string
    /** If true, pointer events are passed through to the Spline canvas (enables mouse tracking) */
    interactive?: boolean
}

export function SplineScene({ scene, className, interactive = false }: SplineSceneProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.01 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    if (hasError) {
        return (
            <div className={className + " flex items-center justify-center bg-neutral-900 text-neutral-500 text-xs italic"}>
                Experimental 3D failed to initialize.
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                touchAction: 'pan-y',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {isVisible && (
                <Suspense
                    fallback={
                        <div className="w-full h-full flex items-center justify-center bg-transparent">
                            <span className="loader"></span>
                        </div>
                    }
                >
                    <Spline
                        scene={scene}
                        onLoad={() => setHasLoaded(true)}
                        onError={() => setHasError(true)}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            opacity: hasLoaded ? 1 : 0,
                            transition: 'opacity 0.6s ease',
                        }}
                    />
                </Suspense>
            )}
        </div>
    )
}
