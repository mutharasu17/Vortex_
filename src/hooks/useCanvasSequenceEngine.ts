import { useEffect, useRef, useState, useCallback } from 'react';

interface UseCanvasSequenceEngineProps {
    frameCount: number;
    framePathPattern: (index: number) => string;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const useCanvasSequenceEngine = ({
    frameCount,
    framePathPattern,
    canvasRef,
}: UseCanvasSequenceEngineProps) => {
    const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
    const [isReady, setIsReady] = useState(false);
    const lastRenderedIndex = useRef<number>(1);
    const [loadedCount, setLoadedCount] = useState(0);

    // Initial priority load
    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = canvasRef.current.offsetWidth;
                canvasRef.current.height = canvasRef.current.offsetHeight;
                if (lastRenderedIndex.current) {
                    // Force re-render of current frame after resize
                    const eventFrame = lastRenderedIndex.current;
                    // Slight delay helps prevent flash
                    requestAnimationFrame(() => renderFrame(eventFrame));
                }
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // We defer removing the listener since this is just a quick setup
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [canvasRef]);

    useEffect(() => {
        let mounted = true;
        const priorityWindow = 12;

        const loadFirstFrame = () => {
            const img = new Image();
            img.src = framePathPattern(1);
            img.onload = () => {
                if (mounted) {
                    imagesRef.current.set(1, img);
                    renderFrame(1);
                }
            };
        };
        loadFirstFrame();

        // Safety timeout: force ready after 3 seconds
        const safetyTimer = setTimeout(() => {
            if (mounted) setIsReady(true);
        }, 3000);

        const preloadInitial = async () => {
            const priorityPromises = [];
            for (let i = 1; i <= Math.min(priorityWindow, frameCount); i++) {
                const img = new Image();
                img.src = framePathPattern(i);
                imagesRef.current.set(i, img);
                priorityPromises.push(new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                }));
            }

            await Promise.all(priorityPromises);
            if (mounted) {
                setIsReady(true);
                setLoadedCount(priorityWindow);
                clearTimeout(safetyTimer);
            }

            if (mounted) {
                let current = priorityWindow + 1;
                const loadNext = () => {
                    if (!mounted || current > frameCount) return;
                    if (imagesRef.current.size < 400) {
                        const img = new Image();
                        img.src = framePathPattern(current);
                        imagesRef.current.set(current, img);
                        current++;
                        setTimeout(loadNext, 40);
                    }
                };
                loadNext();
            }
        };

        preloadInitial();

        return () => {
            mounted = false;
            clearTimeout(safetyTimer);
        };
    }, [frameCount, framePathPattern]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false }); // Optimization for opaque frames
        if (!ctx) return;

        let img = imagesRef.current.get(index);

        // If not loaded or broken, try to find nearest loaded frame to avoid flicker
        if (!img || !img.complete || img.naturalWidth === 0) {
            // Priority load this specific frame now
            let targetImg = img;
            if (!targetImg) {
                targetImg = new Image();
                targetImg.src = framePathPattern(index);
                imagesRef.current.set(index, targetImg);
            }

            // Once loaded, redraw if this is still the current frame the user is viewing
            targetImg.onload = () => {
                if (lastRenderedIndex.current === index) {
                    requestAnimationFrame(() => renderFrame(index));
                }
            };

            // Search for nearest loaded frame
            let nearest = null;
            for (let offset = 1; offset < 10; offset++) {
                const prev = imagesRef.current.get(index - offset);
                if (prev && prev.complete && prev.naturalWidth > 0) { nearest = prev; break; }
                const next = imagesRef.current.get(index + offset);
                if (next && next.complete && next.naturalWidth > 0) { nearest = next; break; }
            }

            if (nearest) {
                img = nearest;
            } else {
                lastRenderedIndex.current = index; // Update last hit index so onload captures it
                return; // Fallback to avoid blank
            }
        }

        lastRenderedIndex.current = index;

        // Cover scaling logic
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        ctx.drawImage(img, x, y, newWidth, newHeight);

        // Predictive loading: Load a few frames ahead in the direction of scroll
        const ahead = 15;
        for (let i = 1; i <= ahead; i++) {
            const nextIdx = index + i;
            if (nextIdx <= frameCount && !imagesRef.current.has(nextIdx)) {
                const nextImg = new Image();
                nextImg.src = framePathPattern(nextIdx);
                imagesRef.current.set(nextIdx, nextImg);
            }
        }

        // Garbage collection: Remove images that are far from current index
        // Keep a window of 200 images total
        if (imagesRef.current.size > 200) {
            for (const [key] of imagesRef.current) {
                if (Math.abs(key - index) > 100) {
                    imagesRef.current.delete(key);
                }
            }
        }
    }, [frameCount, framePathPattern, canvasRef]);

    return { isReady, loadedCount, renderFrame };
};

