import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Brain, Cpu, BarChart3, ShieldCheck, Zap, Layers, MessageSquare, Lightbulb, TrendingUp, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

import { GetStartedButton } from '@/components/ui/get-started-button';

// --- Main Component ---
interface AutonomousBlogProjectDetailProps {
    onClose: () => void;
}

// --- Section Data ---
const metrics = [
    { value: '3', label: 'Specialized Agents', icon: <Cpu className="w-5 h-5" /> },
    { value: '100%', label: 'Autonomous End-to-End', icon: <Zap className="w-5 h-5" /> },
    { value: 'GPT-4.1', label: 'Generation Model', icon: <Brain className="w-5 h-5" /> },
    { value: 'Live', label: 'LangSmith Tracing', icon: <Terminal className="w-5 h-5" /> },
];


const features = [
    { title: 'Title Agent', icon: <Lightbulb className="w-5 h-5" />, desc: 'Brainstorms five creative, SEO-optimized title candidates using high-temperature sampling (0.8), then autonomously selects the most effective title based on engagement potential, keyword placement, and clarity.' },
    { title: 'Content Agent', icon: <MessageSquare className="w-5 h-5" />, desc: 'Generates complete 800-1200 word blog posts in clean Markdown format. Maintains consistent tone across four style profiles (professional, casual, technical, humorous) with balanced creativity (temperature 0.7) for engaging, coherent narratives.' },
    { title: 'Translation Agent', icon: <Layers className="w-5 h-5" />, desc: 'Preserves Markdown formatting while translating content to Spanish, French, German, Chinese, and more. Uses low-temperature sampling (0.3) for accurate, consistent translations without hallucination or structural degradation.' },
    { title: 'LangGraph Orchestration', icon: <Cpu className="w-5 h-5" />, desc: 'Directed Acyclic Graph (DAG) workflow with conditional routing. Title Agent → Content Agent → Router decision → Translation Agent (optional) or END. State-based collaboration with BlogState managing shared memory.' },
    { title: 'LangSmith Observability', icon: <Terminal className="w-5 h-5" />, desc: 'Full trace visibility for every agent execution, LLM invocation, and state transition. Real-time debugging, token usage tracking, cost breakdown per agent, and workflow visualization with error context replay.' },
    { title: 'Configurable Style Profiles', icon: <TrendingUp className="w-5 h-5" />, desc: 'Four writing styles (professional, casual, technical, humorous) define tone, vocabulary complexity, sentence structure, and formatting preferences — all configured per-request without model retraining.' },
    { title: 'Multi-Language Support', icon: <BarChart3 className="w-5 h-5" />, desc: 'Conditional translation pipeline supporting 5+ languages. Router logic determines whether to invoke Translation Agent based on target_language parameter, enabling monolingual or multilingual output from a single request.' },
    { title: 'FastAPI Backend', icon: <Zap className="w-5 h-5" />, desc: 'RESTful API with async endpoints for blog generation jobs (/api/v1/generate), health monitoring (/api/v1/health), and automatic Swagger documentation. JSON response includes metadata: word count, generation time, brainstormed titles.' },
];

const techStack = [
    { category: 'Orchestration', items: ['LangGraph', 'UV Package Manager'] },
    { category: 'Frontend', items: ['Streamlit', 'HTTPX'] },
    { category: 'Backend', items: ['FastAPI', 'Uvicorn'] },
];

const useCases = [
    { question: 'Write a technical deep-dive on LangGraph workflows for beginners', type: 'Technical Blog Post', result: 'Title brainstorming → 1000-word technical draft with code examples' },
    { question: 'Convert a YouTube video transcript into a polished blog post', type: 'Content Repurposing', result: 'Transcript input → Title generation → Structured markdown article' },
    { question: 'Generate a professional blog about remote work in Spanish and German', type: 'Multi-Language Content', result: 'Single topic → English draft → Dual translations with preserved formatting' },
    { question: 'Create SEO content on "Best AI Tools for Content Creation 2026"', type: 'SEO-Optimized Article', result: '5 title candidates → Keyword-rich content → 800-1200 words' },
    { question: 'Write a humorous take on "Why Developers Love Dark Mode"', type: 'Casual Blog Post', result: 'Casual style profile → Engaging narrative → Light, conversational tone' },
    { question: 'Create an executive-level piece on AI adoption in enterprise', type: 'Professional Thought Leadership', result: 'Professional style → Authoritative tone → Business-focused vocabulary' },
    { question: 'Generate a beginner\'s guide to setting up FastAPI with LangGraph', type: 'Tutorial Content', result: 'Technical style → Step-by-step structure → Code-friendly formatting' },
    { question: 'Produce a product announcement blog in 5 languages simultaneously', type: 'Global Product Launch', result: 'Single generation → Multi-language translation → Consistent messaging across regions' },
];

const challenges = [
    { challenge: 'Title Selection from Multiple Candidates', problem: 'Generating 5 creative titles is easy, but autonomously selecting the best one without human judgment introduces bias and inconsistency across topic types', solution: 'Title Agent uses high-temperature sampling (0.8) for diverse brainstorming, then applies a structured evaluation rubric (SEO potential, clarity, engagement, keyword placement) with explicit selection criteria in the prompt to choose the optimal title deterministically.' },
    { challenge: 'Translation Accuracy with Markdown Preservation', problem: 'LLMs often break Markdown syntax during translation (e.g., ## Headers become ## Cabeceras: or lose formatting), making translated output unpublishable without manual fixes', solution: 'Translation Agent uses low-temperature sampling (0.3) for accuracy and receives explicit instructions to preserve all Markdown tokens verbatim. Prompt includes examples of correct Markdown preservation across language boundaries.' },
    { challenge: 'Conditional Routing Without Breaking State Flow', problem: 'Translation is optional—router must decide whether to invoke Translation Agent or skip directly to END, but incorrect routing breaks the DAG or causes state loss', solution: 'LangGraph add_conditional_edges() with should_translate() router function checks target_language field in BlogState. Returns "translate" or "end" string mapped to next node. Ensures state flows correctly regardless of path taken.' },
    { challenge: 'Temperature Optimization Per Agent Task', problem: 'Single global temperature setting produces poor results—titles need creativity (hallucination risk), translations need precision (boring output risk), content needs balance', solution: 'Each agent instantiates its own LLM client with task-specific temperature: Title Agent (0.8 for diversity), Content Agent (0.7 for balanced creativity), Translation Agent (0.3 for accuracy). Configured per-agent in prompt setup.' },
];

const highlights = [
    { title: 'Agentic Architecture', icon: <Cpu className="w-5 h-5" />, desc: '3-agent LangGraph workflow with conditional routing' },
    { title: 'AI Engineering', icon: <Brain className="w-5 h-5" />, desc: 'Production LLM pipeline with tuned temps & TypedDict state' },
    { title: 'Observability', icon: <Terminal className="w-5 h-5" />, desc: 'LangSmith tracing for execution, tokens, latency, transitions' },
    { title: 'Multi-Language AI', icon: <Layers className="w-5 h-5" />, desc: 'Markdown-safe translation across 5+ languages' },
    { title: 'Production Ready', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Async FastAPI + Pydantic + Streamlit + Azure deployment' },
    { title: 'Business Value', icon: <Zap className="w-5 h-5" />, desc: 'Minutes-based automated blog generation with SEO boost' },
];



const AutonomousBlogProjectDetail: React.FC<AutonomousBlogProjectDetailProps> = ({ onClose }) => {
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
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
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
                                A production-ready 3-agent DAG workflow that autonomously generates, writes, and translates blog posts from topic to publication
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
                                combining conditional routing with temperature-optimized LLMs to deliver SEO-friendly content across <span className="font-bold text-gray-900">5+ languages</span> in under 60 seconds.
                            </p>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <a href="https://github.com/Yogarajaadithya/Autonomous-Blog-Generation-Agent.git" target="_blank" rel="noopener noreferrer" className="inline-block">
                                <GetStartedButton
                                    text="View Repository"
                                    className="bg-gray-900 text-white hover:bg-black h-14 px-10 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                                />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Explicit Spacer to Force Layout Separation */}
                <div className="h-16 md:h-24 w-full" aria-hidden="true" />

                {/* Structured breathing space */}
                <div className="container mx-auto max-w-7xl px-10 md:px-16 mb-20">
                    <div className="h-px bg-gray-100" />
                </div>
            </section>

            {/* ====== IMPACT METRICS ====== */}
            <section className="bg-gray-200" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {metrics.map((m, i) => (
                            <motion.div
                                key={m.label}
                                className="p-10 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-center text-center"
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
            </section >

            {/* Explicit spacing between sections */}
            < div className="w-full bg-white h-12 md:h-24" ></div >

            {/* ====== ARCHITECTURE — Visual Centerpiece ====== */}
            < section className="py-16 bg-white" >
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
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

                    {/* Pipeline Diagram — THE BRAIN */}
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
                                    {`                           ┌─────────────────────────────────────────┐
                           │         Streamlit Frontend              │
                           │      http://localhost:8501              │
                           └─────────────────┬───────────────────────┘
                                             │
                                             ▼
                           ┌─────────────────────────────────────────┐
                           │          FastAPI Backend                │
                           │      http://localhost:8000              │
                           └─────────────────┬───────────────────────┘
                                             │
                                             ▼
┌────────────────────────────────────────────────────────────────────────────────┐
│                           LangGraph Workflow(DAG)                              │
│                         with BlogState Management                              │
│                                                                                │
│   ┌──────────────┐      ┌──────────────┐      ┌─────────────────────┐          │
│   │ Title Agent  │──────│Content Agent │──────│  Should Translate ? │          │
│   │              │      │              │      │     (Router)        │          │
│   │ • Generates  │      │ • 800 - 1200 │      └──────────┬──────────┘          │
│   │   5 titles   │      │   words      │                 │                     │
│   │ • Selects    │      │ • Markdown   │       ┌─────────┴─────────┐           │
│   │   best       │      │ • SEO - opt  │       │                   │           │
│   │ • Temp: 0.8  │      │ • Temp: 0.7  │       ▼                   ▼           │
│   └──────────────┘      └──────────────┘  ┌──────────────┐      ┌─────────┐    │
│                                           │ Translation  │      │   END   │    │
│                                           │    Agent     │──────│         │    │
│                                           │ • Preserves  │      └─────────┘    │
│                                           │   Markdown   │                     │
│                                           │ • Temp: 0.3  │                     │
│                                           └──────────────┘                     │
└────────────────────────────────────────────────────────────────────────────────┘
                                             │
                                             ▼
                           ┌─────────────────────────────────────────┐
                           │         OpenAI GPT - 4.1 API            │
                           │   (Enterprise - grade deployment)       │
                           └─────────────────────────────────────────┘
                                             │
                                             ▼
                           ┌─────────────────────────────────────────┐
                           │         LangSmith Monitoring            │
                           │   (Tracing, Debugging, Analytics)       │
                           └─────────────────────────────────────────┘`}
                                </pre>
                            </div>
                        </motion.div>



                    </div>
                </div>
            </section >



            {/* Explicit spacing between sections */}
            < div className="w-full bg-white h-12 md:h-24" ></div >

            {/* ====== FEATURES ====== */}
            <section className="bg-gray-200" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Key Features
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl leading-relaxed" style={{ marginBottom: '2rem' }}>Enterprise-grade capabilities across six specialized AI agents.</p>
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
                                <div className="flex items-start justify-between mb-6" style={{ paddingLeft: '0.75rem' }}>
                                    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-md">
                                        {f.icon}
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-4 text-xl" style={{ paddingLeft: '0.75rem' }}>{f.title}</h3>
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
            < section className="pt-32 pb-16 bg-white" >
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Technology Stack
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl" style={{ marginBottom: '2rem' }}>The modern, scalable tools driving the system.</p>
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
            </section >

            {/* Explicit spacing between sections */}
            < div className="w-full bg-white h-12 md:h-24" ></div >

            {/* ====== USE CASES ====== */}
            <section className="bg-gray-200" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Use Cases
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl" style={{ marginBottom: '2rem' }}>Content types handled end-to-end by the pipeline.</p>
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
                                <div className="flex justify-between items-start mb-8" style={{ paddingLeft: '0.75rem' }}>
                                    <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg uppercase tracking-widest border border-gray-200 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">{uc.type}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-4 leading-snug" style={{ paddingLeft: '0.75rem' }}>{uc.question}</p>
                                <div className="flex items-center gap-4 text-gray-400 text-base font-medium">
                                    <div className="h-px w-8 bg-gray-200 group-hover:bg-gray-400 transition-colors" />
                                    <span className="group-hover:text-gray-600 transition-colors">{uc.result}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Explicit spacing between sections */}
            < div className="w-full bg-white h-12 md:h-24" ></div >

            {/* ====== CHALLENGES ====== */}
            < section className="py-16 bg-white" >
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
                    <h2 className="text-4xl font-semibold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: '2rem' }}>
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
                                <div className="p-8 border-b border-gray-50 bg-gray-50/30" style={{ paddingLeft: '1.75rem' }}>
                                    <h3 className="font-bold text-gray-900 text-xl">{c.challenge}</h3>
                                </div>
                                <div className="p-8 flex-1 flex flex-col gap-8" style={{ paddingLeft: '1.75rem' }}>
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
            </section >

            {/* Explicit spacing between sections */}
            < div className="w-full bg-white h-12 md:h-24" ></div >

            {/* ====== HIGHLIGHTS / DEMONSTRATES ====== */}
            <section className="bg-gray-200" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
                    <h2 className="text-4xl font-semibold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: '2rem' }}>
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
                                <div className="flex items-start justify-between mb-6" style={{ paddingLeft: '0.75rem' }}>
                                    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-md">
                                        {h.icon}
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-4 text-xl" style={{ paddingLeft: '0.75rem' }}>{h.title}</h3>
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
            <section className="bg-gray-900 text-white" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="container mx-auto max-w-7xl px-10 md:px-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: '2rem' }}>
                        Explore the Project
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a href="https://github.com/Yogarajaadithya/Autonomous-Blog-Generation-Agent.git" target="_blank" rel="noopener noreferrer">
                            <GetStartedButton
                                text="View on GitHub"
                                className="bg-white text-gray-900 hover:bg-gray-100 h-14 px-10 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                            />
                        </a>
                    </div>
                </div>
            </section>

        </motion.div>
    );
};

export default AutonomousBlogProjectDetail;
