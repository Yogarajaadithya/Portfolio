import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Particles } from './ui/particles';

interface AboutDetailProps {
    onClose: () => void;
}

interface AboutEntry {
    number: string;
    label: string;
    title: string;
    description: string;
    items?: string[];
}

const ABOUT_ENTRIES: AboutEntry[] = [
    {
        number: "01",
        label: "Who I Am",
        title: "Hi, I'm Adithya",
        description:
            "An AI Engineer who loves building intelligent systems that actually feel useful. I'm currently based in Berlin, studying Data Science and spending most of my time experimenting with LLMs, agents, and real-world AI applications. I enjoy turning complex AI ideas into practical tools — something people can click, use, and rely on.",
        items: [
            "AI Engineer",
            "Berlin, Germany",
            "Data Science & LLMs",
            "Full-stack AI systems",
        ],
    },
    {
        number: "02",
        label: "The Beginning",
        title: "Where It All Started",
        description:
            "I didn't begin with AI. I started with small programming tasks, class assignments, and simple projects that made me curious about how technology works behind the scenes. The more I learned, the more I enjoyed taking something abstract and turning it into something that interacts with the world. That curiosity slowly pushed me towards machine learning… and eventually LLMs.",
        items: [
            "Started with small programming tasks and class projects",
            "Grew fascinated by how technology works behind the scenes",
            "Curiosity led me naturally towards machine learning",
            "Eventually discovered the power of LLMs and agents",
        ],
    },
    {
        number: "03",
        label: "The Shift",
        title: "Finding My Way to AI",
        description:
            "During my early ML coursework, I realized I wasn't interested in just training models. I liked building entire systems around them — APIs, automations, workflows, dashboards, everything. When LLMs became mainstream, it felt like the perfect playground: logic, reasoning, language, memory, and user interaction blended together.",
        items: [
            "Realized I wanted to build full systems, not just train models",
            "LLMs opened up a new world of logic, memory, and interaction",
            "Started building agents that analyze, plan, reason, and act",
            "That became the turning point of my journey",
        ],
    },
    {
        number: "04",
        label: "Building",
        title: "Projects That Shaped Me",
        description:
            "Each project pushed me to understand AI more deeply — not just as a tool, but as a system. From orchestrating agents to designing retrieval pipelines and autonomous workflows, these projects defined who I am as an engineer.",
        items: [
            "Multi-Agent Assistant for Smarter Analytics — orchestration, planning, tool-calling, SQL reasoning",
            "RAG with Long-Term Memory — embeddings, context windows, memory stores, answer faithfulness",
            "Autonomous Blog Generation Agent — research, validation, content writing, pipeline design",
        ],
    },
    {
        number: "05",
        label: "Life",
        title: "Life Beyond Code",
        description:
            "Moving to Berlin has shaped a lot of who I am today. New city, new culture, new opportunities — and a lot of personal growth along the way. I try to keep a balance between learning, building, and enjoying my time here.",
        items: [
            "Exploring cafés around Berlin",
            "Planning new project ideas",
            "Watching tech and AI content",
            "Experimenting with UI upgrades",
            "Walking around the city",
        ],
    },
    {
        number: "06",
        label: "Right Now",
        title: "These Days",
        description:
            "Right now I'm balancing thesis research with building new AI systems and polishing my portfolio. I'm continuously learning, building, breaking things, and rebuilding them better. I love creating things that feel meaningful — tools that solve problems and make the experience effortless.",
        items: [
            "Thesis: Beyond Retrieval — Optimizing Provenance & Faithfulness in Enterprise RAG",
            "Multi-Agent RAG architecture for enterprise use cases",
            "Simulation Agent to run what-if ML scenarios through natural language",
            "Polishing my AI Engineer portfolio",
            "Applying for AI roles in Berlin",
        ],
    },
];

export function AboutDetail({ onClose }: AboutDetailProps) {
    // 🔶 LOCK BODY SCROLL
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-white font-sans flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            {/* 🔶 PARTICLES BACKGROUND - Static */}
            <Particles
                className="absolute inset-0 z-0 pointer-events-none"
                quantity={150}
                ease={80}
                color="#000000"
                refresh
            />

            {/* 🔶 SCROLLABLE CONTENT WRAPPER */}
            <div className="absolute inset-0 overflow-y-auto flex justify-center">
                {/* Close Button - Minimal, fixed positioning (inside scroll wrapper but fixed) */}
                <button
                    onClick={onClose}
                    className="fixed top-8 right-8 z-[110] p-2 text-gray-400 hover:text-gray-900 transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* 🔶 PAGE CONTAINER */}
                <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 pb-32">
                    {/* 🔶 SPACER - Force vertical positioning */}
                    <div style={{ height: '20vh' }} aria-hidden="true" />

                    {/* 🔶 PAGE HEADER - Alignment fixed */}
                    <div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                            About Me
                        </h1>
                        <p className="text-2xl text-gray-500 max-w-3xl leading-relaxed">
                            A journey from curiosity to AI engineering — the people, projects, and turning points that shaped who I am.
                        </p>
                    </div>

                    {/* 🔶 SPACER - Force gap between Header and Content */}
                    <div style={{ height: '15vh' }} aria-hidden="true" />

                    {/* 🔶 CHANGELOG GRID */}
                    <div className="flex flex-col gap-16 md:gap-24">
                        {ABOUT_ENTRIES.map((entry, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-12 gap-6 relative"
                            >
                                {/* 🔶 LEFT COLUMN (Labels restored) */}
                                <div className="hidden md:flex flex-col items-start md:sticky md:top-32 h-fit">
                                    <span className="text-base font-medium text-black uppercase tracking-widest">
                                        {entry.label}
                                    </span>
                                </div>

                                {/* 🔶 RIGHT COLUMN (Content) */}
                                <div className="space-y-6">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                                        {entry.title}
                                    </h2>

                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-xl text-gray-600 leading-relaxed">
                                            {entry.description}
                                        </p>

                                        {entry.items && entry.items.length > 0 && (
                                            <ul className="mt-8 space-y-4 list-none pl-0">
                                                {entry.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                                        {/* Bullet Wrapper: height matches text line-height ~32px */}
                                                        <div className="flex h-[2rem] items-center shrink-0">
                                                            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                                                        </div>
                                                        <span className="text-xl leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
