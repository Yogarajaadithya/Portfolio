"use client";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: React.ElementType;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
}

const ROTATION_SPEED = 0.006; // degrees per ms ≈ 6°/s

const NODE_COLORS = [
    { pill: "bg-blue-100 text-blue-700 border-blue-200",    header: "border-blue-200" },
    { pill: "bg-purple-100 text-purple-700 border-purple-200", header: "border-purple-200" },
    { pill: "bg-emerald-100 text-emerald-700 border-emerald-200", header: "border-emerald-200" },
    { pill: "bg-amber-100 text-amber-700 border-amber-200",  header: "border-amber-200" },
    { pill: "bg-cyan-100 text-cyan-700 border-cyan-200",    header: "border-cyan-200" },
    { pill: "bg-rose-100 text-rose-700 border-rose-200",    header: "border-rose-200" },
    { pill: "bg-indigo-100 text-indigo-700 border-indigo-200", header: "border-indigo-200" },
];

export default function RadialOrbitalTimeline({
    timelineData,
}: RadialOrbitalTimelineProps) {
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
        {}
    );
    const [viewMode] = useState<"orbital">("orbital");
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const rotationAngleRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const expandedItemsRef = useRef(expandedItems);
    const radiusRef = useRef(220);
    const [displayRadius, setDisplayRadius] = useState(220);

    useEffect(() => {
        const updateRadius = () => {
            const r = window.innerWidth < 640 ? 110 : window.innerWidth < 768 ? 150 : 220;
            radiusRef.current = r;
            setDisplayRadius(r);
        };
        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    useEffect(() => {
        expandedItemsRef.current = expandedItems;
    }, [expandedItems]);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const newPulseEffect: Record<number, boolean> = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);

                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return newState;
        });
    };

    const getNodePosition = (index: number, total: number, angle: number) => {
        const nodeAngle = ((index / total) * 360 + angle) % 360;
        const radian = (nodeAngle * Math.PI) / 180;
        const x = radiusRef.current * Math.cos(radian);
        const y = radiusRef.current * Math.sin(radian);
        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
        return { x, y, zIndex, opacity };
    };

    // RAF-based smooth rotation — directly updates DOM, no React re-renders per frame
    useEffect(() => {
        if (!autoRotate || viewMode !== "orbital") {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lastTimestampRef.current = null;
            return;
        }

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current !== null) {
                const delta = timestamp - lastTimestampRef.current;
                rotationAngleRef.current = (rotationAngleRef.current + delta * ROTATION_SPEED) % 360;

                timelineData.forEach((item, index) => {
                    const node = nodeRefs.current[item.id];
                    if (!node || expandedItemsRef.current[item.id]) return;
                    const pos = getNodePosition(index, timelineData.length, rotationAngleRef.current);
                    node.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
                    node.style.opacity = String(pos.opacity);
                    node.style.zIndex = String(pos.zIndex);
                });
            }
            lastTimestampRef.current = timestamp;
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [autoRotate, viewMode, timelineData]);

    const centerViewOnNode = (nodeId: number) => {
        if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;
        rotationAngleRef.current = 270 - targetAngle;
    };

    const calculateNodePosition = (index: number, total: number) => {
        return getNodePosition(index, total, rotationAngleRef.current);
    };

    const getRelatedItems = (itemId: number): number[] => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    return (
        <div
            className="w-full py-12 md:py-32 bg-white overflow-hidden relative"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="container mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between gap-12">

                {/* LEFT: Title */}
                <div className="w-full md:w-1/3 flex flex-col items-start">
                    <h2
                        className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight tracking-tighter"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        Skills & Stack
                    </h2>
                </div>

                {/* RIGHT: Orbital */}
                <div className="relative w-full md:w-2/3 h-[320px] sm:h-[420px] md:h-[700px] flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{ perspective: "1000px" }}
                >
                    <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
                        <div className="absolute w-24 h-24 rounded-full border border-black animate-ping opacity-40"></div>
                        <div
                            className="absolute w-32 h-32 rounded-full border border-black animate-ping opacity-20"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md"></div>
                    </div>

                    <div
                        className="absolute rounded-full border border-black opacity-30"
                        style={{ width: displayRadius * 2, height: displayRadius * 2 }}
                    ></div>

                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];
                        const Icon = item.icon;

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            zIndex: isExpanded ? 200 : position.zIndex,
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { nodeRefs.current[item.id] = el; }}
                                className="absolute cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                <div
                                    className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""
                                        }`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%)`,
                                        width: `${item.energy * 0.5 + 40}px`,
                                        height: `${item.energy * 0.5 + 40}px`,
                                        left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                                        top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                                    }}
                                ></div>

                                <div
                                    className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  ${isExpanded
                                            ? "bg-white text-black"
                                            : isRelated
                                                ? "bg-zinc-800 text-white"
                                                : "bg-black text-white"
                                        }
                  border-2
                  ${isExpanded
                                            ? "border-black shadow-lg shadow-black/20"
                                            : isRelated
                                                ? "border-black animate-pulse"
                                                : "border-black"
                                        }
                  transition-colors duration-300
                  ${isExpanded ? "scale-150" : ""}
                `}
                                >
                                    <Icon size={22} />
                                </div>

                                {!isExpanded && (
                                    <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold tracking-wider text-black">
                                        {item.title}
                                    </div>
                                )}

                                {isExpanded && (() => {
                                    const color = NODE_COLORS[index % NODE_COLORS.length];
                                    return (
                                    <Card className={`absolute top-12 left-1/2 -translate-x-1/2 w-72 bg-white shadow-xl shadow-black/5 overflow-visible border ${color.header}`}>
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-black"></div>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-base text-zinc-900">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-0" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingBottom: '1rem' }}>
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.content.split(",").map((skill) => (
                                                    <span
                                                        key={skill.trim()}
                                                        className={`px-2.5 py-1 text-sm rounded-full border ${color.pill}`}
                                                    >
                                                        {skill.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                    );
                                })()}
                            </div>
                        );
                    })}
                </div>
            </div>
            </div>
        </div>
    );
}
