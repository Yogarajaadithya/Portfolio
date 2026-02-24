import React, { useEffect, useRef, useCallback, useState } from 'react';

interface RgbColor {
    r: number;
    g: number;
    b: number;
}

interface NavItem {
    id: string;
    label: string;
    href?: string;
    target?: string;
    onClick?: () => void;
}

interface HeroSectionProps {
    heading?: string;
    tagline?: string;
    buttonText?: string;
    buttonHref?: string;
    imageUrl?: string;
    videoUrl?: string;
    navItems?: NavItem[];
    cardContent?: React.ReactNode;
}

const parseRgbColor = (colorString: string): RgbColor | null => {
    if (!colorString) return null;
    const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (match) {
        return {
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10),
        };
    }
    return null;
};

const PlayIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19L19 12L8 5Z" />
    </svg>
);

const defaultNavItems: NavItem[] = [];

const HeroSection = ({
    heading = 'Something you really want',
    tagline = "You can't live without this product. I'm sure of it.",
    buttonText = 'Get Started',
    buttonHref,
    imageUrl,
    videoUrl,
    navItems = defaultNavItems,
    cardContent,
}: HeroSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const targetRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const mousePosRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
    const isMouseInsideRef = useRef(false);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showVideo, setShowVideo] = useState(false);

    const resolvedCanvasColorsRef = useRef<{ strokeStyle: RgbColor }>({
        strokeStyle: { r: 10, g: 10, b: 10 },
    });

    useEffect(() => {
        const tempElement = document.createElement('div');
        tempElement.style.display = 'none';
        document.body.appendChild(tempElement);

        const updateResolvedColors = () => {
            tempElement.style.color = 'var(--foreground)';
            const computedFgColor = getComputedStyle(tempElement).color;
            const parsedFgColor = parseRgbColor(computedFgColor);
            if (parsedFgColor) {
                resolvedCanvasColorsRef.current.strokeStyle = parsedFgColor;
            } else {
                const isDarkMode = document.documentElement.classList.contains('dark');
                resolvedCanvasColorsRef.current.strokeStyle = isDarkMode
                    ? { r: 250, g: 250, b: 250 }
                    : { r: 10, g: 10, b: 10 };
            }
        };
        updateResolvedColors();

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'class' &&
                    mutation.target === document.documentElement
                ) {
                    updateResolvedColors();
                    break;
                }
            }
        });
        observer.observe(document.documentElement, { attributes: true });

        return () => {
            observer.disconnect();
            if (tempElement.parentNode) tempElement.parentNode.removeChild(tempElement);
        };
    }, []);

    const drawArrow = useCallback(() => {
        if (!canvasRef.current || !targetRef.current || !ctxRef.current || !containerRef.current) return;
        if (!isMouseInsideRef.current) return;

        const ctx = ctxRef.current;
        const mouse = mousePosRef.current;
        const x0 = mouse.x;
        const y0 = mouse.y;
        if (x0 === null || y0 === null) return;

        // Target position relative to container
        const containerRect = containerRef.current.getBoundingClientRect();
        const rect = targetRef.current.getBoundingClientRect();
        const cx = rect.left - containerRect.left + rect.width / 2;
        const cy = rect.top - containerRect.top + rect.height / 2;

        const a = Math.atan2(cy - y0, cx - x0);
        const x1 = cx - Math.cos(a) * (rect.width / 2 + 12);
        const y1 = cy - Math.sin(a) * (rect.height / 2 + 12);

        const midX = (x0 + x1) / 2;
        const midY = (y0 + y1) / 2;
        const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
        const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
        const controlX = midX;
        const controlY = midY + offset * t;

        const r = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
        const opacity = Math.min(1.0, (r - Math.max(rect.width, rect.height) / 2) / 500);

        const arrowColor = resolvedCanvasColorsRef.current.strokeStyle;
        ctx.strokeStyle = `rgba(${arrowColor.r}, ${arrowColor.g}, ${arrowColor.b}, ${opacity})`;
        ctx.lineWidth = 2;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(controlX, controlY, x1, y1);
        ctx.setLineDash([10, 5]);
        ctx.stroke();
        ctx.restore();

        const angle = Math.atan2(y1 - controlY, x1 - controlX);
        const headLength = 10 * (ctx.lineWidth / 1.5);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 - headLength * Math.cos(angle - Math.PI / 6), y1 - headLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 - headLength * Math.cos(angle + Math.PI / 6), y1 - headLength * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || !targetRef.current) return;

        ctxRef.current = canvas.getContext('2d');

        const updateCanvasSize = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const handleMouseEnter = () => { isMouseInsideRef.current = true; };
        const handleMouseLeave = () => {
            isMouseInsideRef.current = false;
            mousePosRef.current = { x: null, y: null };
        };

        window.addEventListener('resize', updateCanvasSize);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        updateCanvasSize();

        const animateLoop = () => {
            const ctx = ctxRef.current;
            if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawArrow();
            animationFrameIdRef.current = requestAnimationFrame(animateLoop);
        };
        animateLoop();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
        };
    }, [drawArrow]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement && videoUrl) {
            const handleVideoEnd = () => {
                setShowVideo(false);
                videoElement.currentTime = 0;
            };
            if (showVideo) {
                videoElement.play().catch(() => setShowVideo(false));
                videoElement.addEventListener('ended', handleVideoEnd);
            } else {
                videoElement.pause();
            }
            return () => { videoElement.removeEventListener('ended', handleVideoEnd); };
        }
    }, [showVideo, videoUrl]);

    const handlePlayButtonClick = () => { if (videoUrl) setShowVideo(true); };

    return (
        <div ref={containerRef} className="relative bg-zinc-50 text-zinc-900 min-h-[75vh] flex flex-col overflow-hidden">
            {navItems.length > 0 && (
                <nav className="w-full max-w-screen-md mx-auto flex flex-wrap justify-center sm:justify-between items-center px-4 sm:px-8 py-4 text-sm">
                    {navItems.map((item) => {
                        const commonProps = {
                            key: item.id,
                            className:
                                'py-2 px-3 sm:px-4 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors duration-150 ease-in-out whitespace-nowrap',
                            onClick: item.onClick,
                        };
                        if (item.href) {
                            return (
                                <a href={item.href} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : undefined} {...commonProps}>
                                    {item.label}
                                </a>
                            );
                        }
                        return <button type="button" {...commonProps}>{item.label}</button>;
                    })}
                </nav>
            )}

            <main className="flex-grow flex flex-col items-center justify-center relative z-20">
                <div className="mt-12 sm:mt-16 lg:mt-24 flex flex-col items-center">
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center px-4 tracking-tighter"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        {heading}
                    </h1>
                    <p className="mt-3 block text-zinc-500 text-center text-base sm:text-lg px-4 max-w-xl" style={{ marginBottom: '2rem' }}>
                        {tagline}
                    </p>
                </div>

                <div className="mt-8 flex justify-center">
                    {buttonHref ? (
                        <a
                            ref={targetRef as React.Ref<HTMLAnchorElement>}
                            href={buttonHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-5 rounded-xl border border-zinc-900/50 hover:border-zinc-900 text-zinc-900 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300"
                        >
                            {buttonText}
                        </a>
                    ) : (
                        <button
                            ref={targetRef as React.Ref<HTMLButtonElement>}
                            type="button"
                            className="py-2 px-5 rounded-xl border border-zinc-900/50 hover:border-zinc-900 text-zinc-900 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300"
                        >
                            {buttonText}
                        </button>
                    )}
                </div>

                <div className="mt-12 lg:mt-16 w-full max-w-screen-sm mx-auto overflow-hidden px-4 sm:px-2 pb-12">
                    <div className="bg-zinc-200 rounded-[2rem] p-[0.25rem]">
                        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-[1.75rem] bg-white flex items-center justify-center overflow-hidden">
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className={`w-[93%] h-[95%] object-contain transition-opacity duration-300 ${showVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                />
                            )}
                            {videoUrl && (
                                <video
                                    ref={videoRef}
                                    src={videoUrl}
                                    muted
                                    playsInline
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                />
                            )}
                            {!showVideo && videoUrl && imageUrl && (
                                <button
                                    onClick={handlePlayButtonClick}
                                    className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 p-2 sm:p-3 bg-zinc-900/30 hover:bg-zinc-900/50 text-white backdrop-blur-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300"
                                    aria-label="Play video"
                                >
                                    <PlayIcon className="w-4 h-4 sm:w-5 sm:h-6" />
                                </button>
                            )}
                            {!imageUrl && !videoUrl && !cardContent && (
                                <div className="text-zinc-400 italic">Card Content Area</div>
                            )}
                            {cardContent && !imageUrl && !videoUrl && (
                                <div className="absolute inset-0 w-full h-full">{cardContent}</div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Canvas is absolute within the section container */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />
        </div>
    );
};

export { HeroSection };
