'use client';

import Spline from '@splinetool/react-spline';
import React from 'react';

/* ── Error Boundary to catch Spline runtime deserialization crashes ── */
class SplineErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.warn('[Spline] Runtime error caught:', error.message);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-2xl">
                    <div className="text-center space-y-3 px-6">
                        <div className="w-10 h-10 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
                            3D Scene Unavailable
                        </p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function InternalSpline({ scene, onLoad, onMouseDown, style }: any) {
    return (
        <SplineErrorBoundary>
            <Spline
                scene={scene}
                onLoad={(spline) => onLoad?.(spline)}
                onMouseDown={onMouseDown}
                style={style}
            />
        </SplineErrorBoundary>
    );
}
