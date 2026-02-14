import React, { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
    motion,
    useMotionValue,
    useMotionTemplate,
    useAnimationFrame
} from "framer-motion";

interface InfiniteGridHeroProps {
    firstName: string;
    lastName: string;
    tagline: string;
    profileImage: string | null;
    rotatingWords?: string[];
    rotatingPrefix?: string;
}

export const InfiniteGridHero = ({ firstName, lastName, tagline, profileImage, rotatingWords = [], rotatingPrefix = '' }: InfiniteGridHeroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Rotating words state
    const [wordIndex, setWordIndex] = useState(0);
    const words = useMemo(() => rotatingWords, [rotatingWords]);

    useEffect(() => {
        if (words.length === 0) return;
        const timeout = setTimeout(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [wordIndex, words]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const gridOffsetX = useMotionValue(0);
    const gridOffsetY = useMotionValue(0);

    const speedX = 0.5;
    const speedY = 0.5;

    useAnimationFrame(() => {
        const currentX = gridOffsetX.get();
        const currentY = gridOffsetY.get();
        gridOffsetX.set((currentX + speedX) % 40);
        gridOffsetY.set((currentY + speedY) % 40);
    });

    const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-background"
            )}
        >
            {/* Base grid - subtle background */}
            <div className="absolute inset-0 z-0 opacity-[0.03]">
                <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
            </div>

            {/* Mouse-following grid reveal */}
            <motion.div
                className="absolute inset-0 z-0 opacity-30"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
            </motion.div>

            {/* Gradient orbs */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute right-[-10%] top-[-10%] w-[35%] h-[35%] rounded-full bg-orange-500/20 dark:bg-orange-600/15 blur-[100px]" />
                <div className="absolute right-[15%] top-[5%] w-[15%] h-[15%] rounded-full bg-violet-500/20 blur-[80px]" />
                <div className="absolute left-[-5%] bottom-[-10%] w-[30%] h-[30%] rounded-full bg-blue-500/20 dark:bg-blue-600/15 blur-[100px]" />
            </div>

            {/* Main content - Split layout: name left, photo right */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 flex items-center min-h-screen pb-48">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8">
                    {/* Left: Name + Tagline */}
                    <div className="flex-1">
                        {/* Name */}
                        <h1
                            className="text-foreground"
                            style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontStyle: 'italic',
                                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                                fontWeight: 800,
                                lineHeight: 0.9,
                                letterSpacing: '-0.03em',
                            }}
                        >
                            <motion.span
                                className="block"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {firstName}
                            </motion.span>
                            <motion.span
                                className="block"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {lastName}
                            </motion.span>
                        </h1>

                        {/* Tagline */}
                        <motion.p
                            className="text-foreground mt-12 md:mt-16 max-w-[420px] text-lg md:text-xl"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                lineHeight: 1.5,
                                letterSpacing: '0.01em',
                                textAlign: 'justify',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {tagline}
                        </motion.p>
                    </div>

                    {/* Right: Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                        className="flex-shrink-0"
                    >
                        <div
                            className="w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden shadow-xl"
                        >
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt={`${firstName} ${lastName}`}
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: '80% 100%' }}
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex flex-col items-center justify-center text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    }}
                                >
                                    <span className="text-3xl mb-1">📷</span>
                                    <span className="text-xs opacity-80">Add Photo</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Rotating Words — pinned near bottom of viewport */}
                {words.length > 0 && (
                    <motion.div
                        className="absolute bottom-32 md:bottom-40 left-0 right-0 text-center z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {rotatingPrefix && (
                            <span
                                className="text-muted-foreground text-lg md:text-2xl font-medium block mb-2"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                {rotatingPrefix}
                            </span>
                        )}
                        <div className="relative h-10 md:h-14 flex items-center justify-center overflow-hidden">
                            {words.map((word, index) => (
                                <motion.span
                                    key={index}
                                    className="absolute text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={
                                        wordIndex === index
                                            ? { y: 0, opacity: 1 }
                                            : { y: wordIndex > index ? -60 : 60, opacity: 0 }
                                    }
                                    transition={{ type: "spring", stiffness: 50 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// Keep the original Component export for standalone demo usage
export const Component = () => {
    const [count, setCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const gridOffsetX = useMotionValue(0);
    const gridOffsetY = useMotionValue(0);

    const speedX = 0.5;
    const speedY = 0.5;

    useAnimationFrame(() => {
        const currentX = gridOffsetX.get();
        const currentY = gridOffsetY.get();
        gridOffsetX.set((currentX + speedX) % 40);
        gridOffsetY.set((currentY + speedY) % 40);
    });

    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
            )}
        >
            <div className="absolute inset-0 z-0 opacity-[0.05]">
                <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
            </div>
            <motion.div
                className="absolute inset-0 z-0 opacity-40"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
            </motion.div>

            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/40 dark:bg-orange-600/20 blur-[120px]" />
                <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/30 blur-[100px]" />
                <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/40 dark:bg-blue-600/20 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto space-y-6 pointer-events-none">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
                        The Infinite Grid
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Move your cursor to reveal the active grid layer. <br />
                        The pattern scrolls infinitely in the background.
                    </p>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    <button
                        onClick={() => setCount(count + 1)}
                        className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all shadow-md active:scale-95"
                    >
                        Interact ({count})
                    </button>
                    <button
                        className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:bg-secondary/80 transition-all active:scale-95"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

const GridPattern = ({ offsetX, offsetY }: { offsetX: any, offsetY: any }) => {
    return (
        <svg className="w-full h-full">
            <defs>
                <motion.pattern
                    id="grid-pattern"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    x={offsetX}
                    y={offsetY}
                >
                    <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-muted-foreground"
                    />
                </motion.pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
    );
};
