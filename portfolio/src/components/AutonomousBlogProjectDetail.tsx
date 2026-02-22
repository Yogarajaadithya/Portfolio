import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Brain, Cpu, Database, BarChart3, ShieldCheck, Zap, Layers, Lightbulb, TrendingUp, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

import { GetStartedButton } from '@/components/ui/get-started-button';

interface AutonomousBlogProjectDetailProps {
    onClose: () => void;
}

const metrics = [
    { value: '5', label: 'Specialized Agents', icon: <Cpu className="w-5 h-5" /> },
    { value: '100%', label: 'Autonomous End-to-End', icon: <Zap className="w-5 h-5" /> },
    { value: 'GPT-4', label: 'Generation Model', icon: <Brain className="w-5 h-5" /> },
    { value: 'Live', label: 'LangSmith Tracing', icon: <BarChart3 className="w-5 h-5" /> },
];

const features = [
    { title: 'Research Agent', icon: <Database className="w-5 h-5" />, desc: 'Autonomously gathers information from multiple sources, validates facts, extracts key insights, and compiles a structured research report to ground every blog post in accurate data.' },
    { title: 'Outline Agent', icon: <Layers className="w-5 h-5" />, desc: 'Generates a logically structured blog outline with section headings, subpoints, and SEO keyword placement — adapting depth and format to the target audience and topic complexity.' },
    { title: 'Writing Agent', icon: <Brain className="w-5 h-5" />, desc: 'Produces section-by-section prose with consistent tone, voice, and style. Integrates citations from research, maintains narrative flow, and targets the specified word count and reading level.' },
    { title: 'Review & Refinement Agent', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Self-reviews the draft for factual accuracy, logical coherence, grammar, and quality. Produces an annotated critique and revised draft, reducing manual editing by over 80%.' },
    { title: 'Publish Agent', icon: <TrendingUp className="w-5 h-5" />, desc: 'Handles final formatting, metadata generation (title, description, tags, slug), and outputs publish-ready markdown or HTML. Can integrate with CMS APIs for automated publishing.' },
    { title: 'LangGraph Orchestration', icon: <Cpu className="w-5 h-5" />, desc: 'State-machine workflow built on LangGraph with conditional branching, retry logic, and human-in-the-loop checkpoints. Each agent passes structured state to the next in the pipeline.' },
    { title: 'LangSmith Observability', icon: <Terminal className="w-5 h-5" />, desc: 'Full trace visibility for every agent call, LLM invocation, and tool use. Latency tracking, token usage per step, error replay, and evaluation datasets built from production runs.' },
    { title: 'Configurable Style Profiles', icon: <Lightbulb className="w-5 h-5" />, desc: 'Per-topic style profiles define tone (technical, casual, persuasive), target audience, word count, structure preferences, and citation format — all passed as prompt-time configuration.' },
    { title: 'Human-in-the-Loop Gates', icon: <Zap className="w-5 h-5" />, desc: 'Optional approval checkpoints after Research and Review stages. Human can inject edits, redirect research, or approve before the pipeline continues — without breaking the agentic flow.' },
    { title: 'FastAPI Backend', icon: <Database className="w-5 h-5" />, desc: 'RESTful API with async endpoints for blog generation jobs, status polling, and result retrieval. Supports background task execution so long-running pipelines don\'t block request threads.' },
];

const techStack = [
    { category: 'Orchestration', items: ['LangGraph', 'LangChain', 'Python', 'AsyncIO'] },
    { category: 'AI & LLM', items: ['OpenAI', 'GPT-4', 'LangSmith', 'Tiktoken'] },
    { category: 'Backend', items: ['FastAPI', 'Pydantic', 'Uvicorn', 'Redis'] },
];

const useCases = [
    { question: 'Write a technical deep-dive on transformer attention mechanisms', type: 'Technical Blog', result: 'Research → Outline → 2000-word draft' },
    { question: 'Generate a beginner guide to setting up a Python dev environment', type: 'Tutorial Post', result: 'Step-by-step with code snippets' },
    { question: 'Create a thought-leadership piece on the future of AI in healthcare', type: 'Opinion Piece', result: 'Research-grounded persuasive essay' },
    { question: 'Write a product comparison: LangChain vs LlamaIndex', type: 'Comparison Post', result: 'Structured pros/cons with citations' },
    { question: 'Draft a weekly AI news roundup from recent research papers', type: 'Newsletter', result: 'Summarized highlights with links' },
    { question: 'Create an SEO-optimized post on "best vector databases 2025"', type: 'SEO Content', result: 'Keyword-mapped outline + draft' },
    { question: 'Produce a case study on using LLMs for customer support automation', type: 'Case Study', result: 'Problem → Solution → Outcome format' },
    { question: 'Generate a series of 3 posts on RAG architecture from scratch', type: 'Content Series', result: 'Linked multi-post with shared context' },
];

const challenges = [
    { challenge: 'Research Accuracy & Hallucination', problem: 'Agents can fabricate plausible-sounding facts when sources are unavailable or ambiguous', solution: 'Research Agent uses structured source validation with citation tracking. Review Agent cross-checks claims against the original research report before approving the draft.' },
    { challenge: 'Maintaining Coherent Voice Across Agents', problem: 'Each agent call is stateless — tone, style, and narrative voice can drift between sections written by different prompts', solution: 'Global style profile injected into every agent prompt as a system instruction. Outline Agent defines a tone contract; Writing Agent follows it section-by-section with reference to prior output.' },
    { challenge: 'Long-Context State Management', problem: 'Passing research reports, outlines, and drafts through a multi-step pipeline quickly exhausts LLM context windows', solution: 'LangGraph state object carries compressed summaries at each stage. Full content stored in Redis; agents retrieve only the specific context slice they need per step.' },
    { challenge: 'Review Agent Consistency', problem: 'Self-review by the same LLM that wrote the content tends to be lenient and misses real issues', solution: 'Review Agent uses a separate, higher-temperature prompt with an explicit adversarial instruction set. Evaluates against a fixed rubric (accuracy, clarity, structure, tone) and produces scored feedback.' },
];

const highlights = [
    { title: 'Agentic Architecture', icon: <Layers className="w-5 h-5" />, desc: 'LangGraph state machine with 5 specialized agents, conditional branching, and human-in-the-loop checkpoints' },
    { title: 'AI Engineering', icon: <Brain className="w-5 h-5" />, desc: 'Production LLM pipeline: prompt engineering, state management, and multi-step orchestration at scale' },
    { title: 'Observability', icon: <Terminal className="w-5 h-5" />, desc: 'Full LangSmith tracing: every token, latency, and agent decision visible and replayable for debugging' },
    { title: 'Content Quality', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Self-reviewing pipeline with adversarial critique agent reduces manual editing and hallucination risk' },
    { title: 'Production Ready', icon: <Zap className="w-5 h-5" />, desc: 'Async FastAPI backend, background job execution, Redis state store, and configurable style profiles' },
    { title: 'Business Value', icon: <TrendingUp className="w-5 h-5" />, desc: 'Turns a multi-hour content creation task into a fully automated, configurable pipeline that runs in minutes' },
];

export const AutonomousBlogProjectDetail: React.FC<AutonomousBlogProjectDetailProps> = ({ onClose }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-white text-gray-900 overflow-y-auto selection:bg-black/10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="fixed top-6 right-8 z-[110] text-gray-400 hover:text-black transition-colors duration-200"
                aria-label="Close project detail"
            >
                <X className="w-7 h-7" />
            </button>

            {/* ====== HERO ====== */}
            <section className="pt-32 pb-16 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.h1
                        className="text-6xl md:text-7xl lg:text-[6rem] font-extrabold text-gray-900 leading-[1.02] tracking-[-0.03em]"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Autonomous Blog <br />
                        <span className="text-gray-400">Generation Agent</span>
                    </motion.h1>

                    <motion.div
                        className="mt-12 space-y-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="space-y-6 max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                                A 5-agent LangGraph pipeline that researches, writes, reviews, and publishes blog content autonomously
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
                                combining LLM orchestration with structured state management and LangSmith observability to produce high-quality, fact-grounded blog posts in <span className="font-bold text-gray-900">minutes</span>.
                            </p>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block">
                                <GetStartedButton
                                    text="View Repository"
                                    className="bg-gray-900 text-white hover:bg-black h-14 px-10 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                                />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block">
                                <GetStartedButton
                                    text="Watch Pitch Video"
                                    className="bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 h-14 px-10 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                                />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="h-16 md:h-24 w-full" aria-hidden="true" />
                <div className="container mx-auto max-w-7xl px-6 mb-20">
                    <div className="h-px bg-gray-100" />
                </div>
            </section>

            {/* ====== IMPACT METRICS ====== */}
            <section className="py-24 bg-gray-200">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {metrics.map((m, i) => (
                            <motion.div
                                key={m.label}
                                className="p-10 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <div className="text-gray-400 mb-6 group-hover:text-gray-900 transition-colors duration-300">{m.icon}</div>
                                <div className="text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{m.value}</div>
                                <div className="text-base text-gray-500 font-medium">{m.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== ARCHITECTURE ====== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif', marginTop: '0', marginBottom: '0' }}>
                            Architecture
                        </h2>
                    </motion.div>

                    <div className="relative">
                        <motion.div
                            className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 overflow-hidden relative"
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="absolute top-6 left-8 md:top-8 md:left-12">
                                <span className="inline-block px-4 py-1.5 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-200 rounded-full shadow-sm">
                                    Orchestration Flow
                                </span>
                            </div>
                            <div className="flex justify-center overflow-hidden pt-8 md:pt-4">
                                <pre className="font-mono text-xs md:text-sm leading-none text-gray-800 whitespace-pre">
                                    {`┌─────────────────────────────────────────────────────────────────────────┐
│                         USER TOPIC INPUT                                │
│                  "Write a post on RAG architecture"                     │
│                  + Style Profile: { tone, audience, length }            │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    LANGGRAPH STATE MACHINE                               │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  STATE OBJECT                                                   │   │
│  │  { topic, style_profile, research, outline, draft, review }    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                               │                                         │
│                               ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  [1] RESEARCH AGENT                                              │  │
│  │  • Multi-source information gathering                            │  │
│  │  • Fact extraction & source validation                           │  │
│  │  • Key insight compilation                                       │  │
│  │  Output → research_report (stored in state)                      │  │
│  └────────────────────────────┬─────────────────────────────────────┘  │
│                               │                                         │
│            ┌──────────────────┤ Human Checkpoint (optional)             │
│            │ APPROVED         │                                         │
│            ▼                  ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  [2] OUTLINE AGENT                                               │  │
│  │  • Section heading generation                                    │  │
│  │  • SEO keyword mapping                                           │  │
│  │  • Subpoint & flow planning                                      │  │
│  │  Output → blog_outline (stored in state)                         │  │
│  └────────────────────────────┬─────────────────────────────────────┘  │
│                               │                                         │
│                               ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  [3] WRITING AGENT                                               │  │
│  │  • Section-by-section prose generation                           │  │
│  │  • Tone & style enforcement (via style profile)                  │  │
│  │  • Citation integration from research report                     │  │
│  │  Output → draft_post (stored in state)                           │  │
│  └────────────────────────────┬─────────────────────────────────────┘  │
│                               │                                         │
│                               ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  [4] REVIEW AGENT (Adversarial)                                  │  │
│  │  • Quality rubric scoring (accuracy, clarity, structure, tone)   │  │
│  │  • Fact-check against research report                            │  │
│  │  • Annotated critique + revised draft                            │  │
│  │  Output → reviewed_draft (stored in state)                       │  │
│  └────────────────────────────┬─────────────────────────────────────┘  │
│                               │                                         │
│            ┌──────────────────┤ Human Checkpoint (optional)             │
│            │ APPROVED         │                                         │
│            ▼                  ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  [5] PUBLISH AGENT                                               │  │
│  │  • Final formatting (Markdown / HTML)                            │  │
│  │  • Metadata: title, description, slug, tags                      │  │
│  │  • CMS API integration (optional)                                │  │
│  │  Output → published_post                                         │  │
│  └────────────────────────────┬─────────────────────────────────────┘  │
└───────────────────────────────┼─────────────────────────────────────────┘
                                │
                ┌───────────────┴──────────────┐
                │                              │
                ▼                              ▼
    ┌─────────────────────┐       ┌───────────────────────┐
    │   FASTAPI BACKEND   │       │  LANGSMITH TRACING    │
    │  • Async job queue  │       │  • Full agent traces  │
    │  • Redis state store│       │  • Token & latency    │
    │  • REST endpoints   │       │  • Error replay       │
    └─────────────────────┘       └───────────────────────┘`}
                                </pre>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== FEATURES ====== */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Key Features
                    </h2>
                    <p className="text-xl text-gray-500 mb-20 max-w-2xl leading-relaxed">Enterprise-grade content generation across five specialized AI agents.</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                className="flex flex-col p-10 bg-white/80 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.35, delay: i * 0.04 }}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-md">
                                        {f.icon}
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-4 text-xl">{f.title}</h3>
                                <div className="flex items-start gap-4 text-gray-400 text-base font-medium mt-auto">
                                    <div className="h-px w-8 bg-gray-200 group-hover:bg-gray-400 transition-colors mt-3 shrink-0" />
                                    <span className="group-hover:text-gray-600 transition-colors leading-relaxed">{f.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== TECH STACK ====== */}
            <section className="pt-32 pb-16 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Technology Stack
                    </h2>
                    <p className="text-xl text-gray-500 mb-32 max-w-2xl">The modern, scalable tools driving the system.</p>
                    <div className="grid md:grid-cols-3 gap-10">
                        {techStack.map((group, i) => (
                            <motion.div
                                key={group.category}
                                className="p-10 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.35, delay: i * 0.08 }}
                            >
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-10 border-b border-gray-100 pb-5 w-full">{group.category}</h3>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    {group.items.map((item) => (
                                        <span key={item} className="px-4 py-4 md:py-6 bg-gray-50 text-gray-800 border-2 border-gray-200 rounded-2xl text-lg md:text-xl font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors cursor-default shadow-sm hover:shadow-md flex items-center justify-center">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== USE CASES ====== */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Use Cases
                    </h2>
                    <p className="text-xl text-gray-500 mb-20 max-w-2xl">Content types handled end-to-end by the pipeline.</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {useCases.map((uc, i) => (
                            <motion.div
                                key={uc.question}
                                className="p-10 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg uppercase tracking-widest border border-gray-200 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">{uc.type}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{uc.question}</p>
                                <div className="flex items-center gap-4 text-gray-400 text-base font-medium">
                                    <div className="h-px w-8 bg-gray-200 group-hover:bg-gray-400 transition-colors" />
                                    <span className="group-hover:text-gray-600 transition-colors">{uc.result}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== CHALLENGES ====== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-16" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Challenges & Solutions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        {challenges.map((c, i) => (
                            <motion.div
                                key={c.challenge}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                                    <h3 className="font-bold text-gray-900 text-xl">{c.challenge}</h3>
                                </div>
                                <div className="p-8 flex-1 flex flex-col gap-8">
                                    <div className="flex gap-5">
                                        <div className="mt-1 shrink-0 text-red-500 bg-red-50 p-2 rounded-full">
                                            <AlertCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2 block">Problem</span>
                                            <p className="text-base text-gray-600 leading-relaxed">{c.problem}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="mt-1 shrink-0 text-emerald-500 bg-emerald-50 p-2 rounded-full">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 block">Solution</span>
                                            <p className="text-base text-gray-600 leading-relaxed">{c.solution}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== HIGHLIGHTS / DEMONSTRATES ====== */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-16" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        What This Demonstrates
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col p-10 bg-white/80 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-md">
                                        {h.icon}
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-4 text-xl">{h.title}</h3>
                                <div className="flex items-start gap-4 text-gray-400 text-base font-medium mt-auto">
                                    <div className="h-px w-8 bg-gray-200 group-hover:bg-gray-400 transition-colors mt-3 shrink-0" />
                                    <span className="group-hover:text-gray-600 transition-colors leading-relaxed">{h.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== FOOTER / ACTIONS ====== */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="container mx-auto max-w-7xl px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Explore the Project
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <GetStartedButton
                                text="View on GitHub"
                                className="bg-white text-gray-900 hover:bg-gray-100 h-14 px-10 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                            />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <GetStartedButton
                                text="Watch Pitch Video"
                                className="bg-transparent text-white border-2 border-white/20 hover:border-white hover:bg-white/5 h-14 px-10 text-lg rounded-full transition-all duration-200"
                            />
                        </a>
                    </div>
                </div>
            </section>

        </motion.div>
    );
};

export default AutonomousBlogProjectDetail;
