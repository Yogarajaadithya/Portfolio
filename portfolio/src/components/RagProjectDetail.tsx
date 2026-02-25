import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Brain, Cpu, Database, BarChart3, ShieldCheck, Zap, Layers, Lightbulb, TrendingUp, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

import { GetStartedButton } from '@/components/ui/get-started-button';

// --- Main Component ---
interface RagProjectDetailProps {
    onClose: () => void;
}

// --- Section Data ---
const metrics = [
    { value: '<3s', label: 'Retrieval Time', icon: <Zap className="w-5 h-5" /> },
    { value: '95%+', label: 'Context Accuracy', icon: <Database className="w-5 h-5" /> },
    { value: '3', label: 'Memory Layers', icon: <Layers className="w-5 h-5" /> },
    { value: '100%', label: 'Cross-Session Recall', icon: <Brain className="w-5 h-5" /> },
];


const features = [
    { title: 'Hybrid Retrieval System', icon: <Layers className="w-5 h-5" />, desc: 'Parallel document and memory retrieval with vector similarity search, session/user filtering, and importance-weighted ranking' },
    { title: 'Three-Tier Memory Architecture', icon: <Brain className="w-5 h-5" />, desc: 'Episodic: Conversation history, Semantic: Facts and knowledge, Procedural: How-to instructions with automatic type classification' },
    { title: 'Intelligent Memory Management', icon: <Zap className="w-5 h-5" />, desc: 'Time-based decay with importance protection, automatic consolidation, batch operations, and strength tracking (0.0–1.0 scale)' },
    { title: 'Cross-Session Context Preservation', icon: <Database className="w-5 h-5" />, desc: 'Infinite session persistence with user-level memory aggregation, session timeline tracking, and contextual conversation continuity' },
    { title: 'Multi-Format Document Processing', icon: <Lightbulb className="w-5 h-5" />, desc: 'PDF, TXT, and Markdown support with automatic text extraction, intelligent chunking (500-char with 50-char overlap), and persistent file storage' },
    { title: 'Production Vector Stores', icon: <Cpu className="w-5 h-5" />, desc: 'ChromaDB (persistent) and FAISS (in-memory) implementations with auto-indexing and dimension-aware embedding management' },
    { title: 'OpenAI Integration', icon: <TrendingUp className="w-5 h-5" />, desc: 'GPT-4.1 for generation, text-embedding-ada-002 for embeddings, with tiktoken tokenization and secure API key management' },
    { title: 'Performance Monitoring & Metrics', icon: <BarChart3 className="w-5 h-5" />, desc: 'Sub-component timing (retrieval/generation/total), token usage tracking, memory statistics, and frequency analysis' },
    { title: 'Memory Analytics Dashboard', icon: <CheckCircle2 className="w-5 h-5" />, desc: 'Interactive Streamlit UI with memory search, session management, user statistics, and real-time memory strength visualization' },
    { title: 'RESTful API Architecture', icon: <Terminal className="w-5 h-5" />, desc: 'FastAPI backend with Swagger docs, CORS configuration, Pydantic schemas, file upload endpoints, and health monitoring' },
];

const techStack = [
    { category: 'Frontend', items: ['Streamlit', 'Python', 'Custom CSS', 'Plotly'] },
    { category: 'Backend', items: ['Python 3.8+', 'FastAPI', 'Uvicorn', 'Pydantic'] },
    { category: 'AI & LLM', items: ['OpenAI', 'GPT-4.1', 'Ada-002', 'Tiktoken'] },
    { category: 'Vector & Memory', items: ['ChromaDB', 'FAISS', 'SQLite', 'Sentence Transformers'] },
    { category: 'Document Processing', items: ['PyPDF', 'pypdf2', 'Python-dotenv', 'PyYAML'] },
    { category: 'Data & Utils', items: ['NumPy', 'Pandas', 'SQLAlchemy', 'LangChain Core'] },
];

const useCases = [
    { question: 'What are the key features of this product?', type: 'Document Query', result: 'Vector retrieval, Source citations' },
    { question: 'Can you explain that in simpler terms?', type: 'Follow-Up Context', result: 'Episodic memory retrieval' },
    { question: 'What did we discuss last week about the API?', type: 'Cross-Session Recall', result: 'Session-filtered memory search' },
    { question: 'Remember: I prefer Python over JavaScript', type: 'Fact Storage', result: 'Semantic memory with high importance' },
    { question: 'What are my coding preferences?', type: 'Knowledge Building', result: 'Aggregated semantic memories' },
    { question: 'Compare the pricing models across all three documents', type: 'Multi-Document', result: 'Parallel retrieval + context assembly' },
    { question: 'How do I deploy this application?', type: 'Procedural Help', result: 'Procedural memory + document steps' },
    { question: 'Based on our conversations, what should I focus on?', type: 'Contextual Learning', result: 'Frequency analysis + importance ranking' },
];

const challenges = [
    { challenge: 'Memory Retrieval Accuracy', problem: 'Retrieving relevant memories from thousands without flooding context', solution: 'Hybrid semantic search with session/user filtering, importance-weighted ranking, and configurable top-K selection' },
    { challenge: 'Context Window Limits', problem: 'Combining documents + memories + query within LLM token constraints', solution: 'Dynamic context assembly with token counting, chunk prioritization, and max_context_length enforcement (3000 chars)' },
    { challenge: 'Memory Decay Balance', problem: 'Finding optimal decay rate that preserves important memories but forgets trivial ones', solution: 'Importance-weighted decay formula: decay = rate × days × (1 - importance × 0.5) with configurable parameters' },
    { challenge: 'Importance Scoring', problem: 'Automatically determining which interactions deserve long-term storage', solution: 'Multi-factor calculation: content length, keyword analysis, user signals, and metadata boosters (0.0–1.0 scale)' },
    { challenge: 'Cross-Session Coherence', problem: 'Maintaining conversation continuity when users return after days or weeks', solution: 'Session and user-level indexing with timeline tracking, access count boosting, and strength-based filtering' },
    { challenge: 'Multi-Format Document Handling', problem: 'Different file types (PDF, TXT, MD) require different extraction methods', solution: 'DocumentProcessor abstraction with format-specific extractors, encoding fallbacks, and unified text interface' },
];

const highlights = [
    { title: 'System Design', icon: <Layers className="w-5 h-5" />, desc: 'Memory-enhanced RAG architecture vs traditional stateless retrieval' },
    { title: 'AI Engineering', icon: <Brain className="w-5 h-5" />, desc: 'Beyond simple Q&A: persistent memory with decay, consolidation & context preservation' },
    { title: 'Full-Stack Scope', icon: <Database className="w-5 h-5" />, desc: 'End-to-end: Streamlit UI + FastAPI + SQLite + Vector Store + OpenAI' },
    { title: 'Memory Innovation', icon: <Zap className="w-5 h-5" />, desc: 'Three-tier cognitive architecture: episodic, semantic, procedural with importance scoring' },
    { title: 'Production Ready', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Thread-safe operations, batch processing, error handling, performance monitoring' },
    { title: 'Business Value', icon: <TrendingUp className="w-5 h-5" />, desc: 'Cross-session intelligence, knowledge accumulation, personalized AI interactions' },
];



export const RagProjectDetail: React.FC<RagProjectDetailProps> = ({ onClose }) => {
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
                        RAG with Long-Term <br />
                        <span className="text-gray-400">Memory System</span>
                    </motion.h1>

                    <motion.div
                        className="mt-12 space-y-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="space-y-6 max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                                An intelligent RAG system that remembers
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
                                combining vector document retrieval with persistent long-term memory to deliver contextual AI conversations that learn from every interaction and maintain knowledge across sessions.
                            </p>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <a href="https://github.com/Yogarajaadithya/RAG-with-Long-Term-Memory-System.git" target="_blank" rel="noopener noreferrer" className="inline-block">
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
                <div className="container mx-auto max-w-7xl px-6 mb-20">
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
                                    {`┌─────────────────────────────────────────────────────────────────────────┐
│                            USER QUERY                                   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     RAG WITH MEMORY PIPELINE                           │
│                                                                        │
│    ┌──────────────────────┐              ┌──────────────────────┐      │
│    │  DOCUMENT RETRIEVAL  │              │  MEMORY RETRIEVAL    │      │
│    │  • Vector Search     │              │  • SQLite Query      │      │
│    │  • Top-K Selection   │              │  • Semantic Search   │      │
│    │  • Chunk Assembly    │              │  • Session Filter    │      │
│    └─────────┬────────────┘              └──────────┬───────────┘      │
│              │                                      │                  │
│              │         ┌─────────────────────┐      │                  │
│              └────────▶│  CONTEXT ASSEMBLY   │◀─────┘                 │
│                        │  • Docs + Memories  │                         │
│                        │  • Prompt Format    │                         │
│                        └─────────┬───────────┘                         │
│                                  │                                     │
│                                  ▼                                     │
│                        ┌─────────────────────┐                         │
│                        │  LLM GENERATION     │                         │
│                        │  • GPT-4.1          │                         │
│                        │  • OpenAI           │                         │
│                        └─────────┬───────────┘                         │
└──────────────────────────────────┼─────────────────────────────────────┘
                                   │
                 ┌─────────────────┴─────────────────┐
                 │                                   │
                 ▼                                   ▼
      ┌──────────────────┐              ┌──────────────────────┐
      │  RESPONSE        │              │  MEMORY STORAGE      │
      │  • Answer        │              │  • Store as Episodic │
      │  • Sources       │              │  • Calc Importance   │
      │  • Metadata      │              │  • Generate Embedding│
      └──────────────────┘              └──────────────────────┘
                 │                                   │
                 └─────────────────┬─────────────────┘
                                   ▼
                        ┌──────────────────────┐
                        │  VECTOR STORE        │
                        │  • ChromaDB/FAISS    │
                        └──────────────────────┘
                                   │
                        ┌──────────────────────┐
                        │  MEMORY DATABASE     │
                        │  • SQLite            │
                        │  • Embeddings        │
                        └──────────────────────┘`}
                                </pre>
                            </div>
                        </motion.div>



                    </div>
                </div>
            </section >



            {/* Explicit spacing between sections */}
            < div className="w-full bg-white h-12 md:h-24" ></div >

            {/* ====== MEMORY LAYER ARCHITECTURE ====== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Memory Layer Architecture
                        </h2>
                    </motion.div>

                    <motion.div
                        className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 overflow-hidden relative"
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="absolute top-6 left-8 md:top-8 md:left-12">
                            <span className="inline-block px-4 py-1.5 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-200 rounded-full shadow-sm">
                                Memory System
                            </span>
                        </div>
                        <div className="flex justify-center overflow-hidden pt-8 md:pt-4">
                            <pre className="font-mono text-xs md:text-sm leading-none text-gray-800 whitespace-pre">
                                {`┌─────────────────────────────────────────────────────────────────────────┐
│                          MEMORY LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      MEMORY TYPES                               │    │
│  │                                                                 │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │    │
│  │  │   EPISODIC      │  │    SEMANTIC     │  │   PROCEDURAL    │  │    │
│  │  │                 │  │                 │  │                 │  │    │
│  │  │ • Conversations │  │ • Facts         │  │ • How-to Steps  │  │    │
│  │  │ • Q&A Pairs     │  │ • Preferences   │  │ • Workflows     │  │    │
│  │  │ • Events        │  │ • Rules         │  │ • Procedures    │  │    │
│  │  │ • Session-based │  │ • Domain Know.  │  │ • Instructions  │  │    │
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │    │
│  └───────────┼────────────────────┼────────────────────┼───────────┘    │
│              │                    │                    │                │
│              └────────────────────┼────────────────────┘                │
│                                   ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    MEMORY OPERATIONS                            │    │
│  │                                                                 │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐        │    │
│  │  │  STORE   │  │ RETRIEVE │  │  DECAY   │  │CONSOLIDATE│        │    │
│  │  │          │  │          │  │          │  │           │        │    │
│  │  │ • Embed  │  │ • Search │  │ • Time   │  │ • Boost   │        │    │
│  │  │ • Score  │  │ • Filter │  │ • Weaken │  │ • Merge   │        │    │
│  │  │ • Save   │  │ • Rank   │  │ • Update │  │ • Clear   │        │    │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬──────┘        │    │
│  └───────┼─────────────┼─────────────┼─────────────┼───────────────┘    │
│          │             │             │             │                    │
│          ▼             ▼             ▼             ▼                    │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    STORAGE LAYER                                │    │
│  │                                                                 │    │
│  │  ┌────────────────────────┐    ┌────────────────────────┐       │    │
│  │  │    SQLITE DATABASE     │    │  VECTOR EMBEDDINGS     │       │    │
│  │  │                        │    │                        │       │    │
│  │  │ • memory_id            │◀──▶│ • 1536-dim vectors    │       │    │
│  │  │ • content              │    │ • Cosine similarity    │       │    │
│  │  │ • type                 │    │ • Semantic search      │       │    │
│  │  │ • importance (0-1)     │    │ • Top-K retrieval      │       │    │
│  │  │ • strength (0-1)       │    │                        │       │    │
│  │  │ • access_count         │    │                        │       │    │
│  │  │ • created_at           │    │                        │       │    │
│  │  │ • session_id           │    │                        │       │    │
│  │  │ • user_id              │    │                        │       │    │
│  │  └────────────────────────┘    └────────────────────────┘       │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    MEMORY LIFECYCLE                             │    │
│  │                                                                 │    │
│  │  Created → Embedded → Stored → Retrieved → Accessed →           │    │
│  │    (t=0)   (vector)   (SQLite)  (cosine)   (+count)             │    │
│  │                ↓                                ↓               │    │
│  │           Importance             ┌──────────────┘               │    │
│  │           Calculated             │                              │    │
│  │           (0.0-1.0)              ▼                              │    │
│  │                          Decay Applied                          │    │
│  │                          strength ↓                             │    │
│  │                               ↓                                 │    │
│  │                          Consolidated                           │    │
│  │                          (if important)                         │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘`}
                            </pre>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            < div className="w-full bg-white h-12 md:h-24" ></div >

            {/* ====== FEATURES ====== */}
            <section className="bg-gray-200" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Key Features
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl leading-relaxed" style={{ marginBottom: '2rem' }}>Enterprise-grade RAG capabilities with persistent memory across sessions.</p>
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
            </section >

            {/* Explicit spacing between sections */}
            < div className="w-full bg-white h-12 md:h-24" ></div >

            {/* ====== TECH STACK ====== */}
            < section className="pt-32 pb-16 bg-white" >
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Technology Stack
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl" style={{ marginBottom: '2rem' }}>The modern, scalable tools driving the system.</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Use Cases
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl" style={{ marginBottom: '2rem' }}>Interactive example questions handled by the system.</p>
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
                <div className="container mx-auto max-w-7xl px-6">
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
                <div className="container mx-auto max-w-7xl px-6">
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
                <div className="container mx-auto max-w-7xl px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: '2rem' }}>
                        Explore the Project
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a href="https://github.com/Yogarajaadithya/RAG-with-Long-Term-Memory-System.git" target="_blank" rel="noopener noreferrer">
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

export default RagProjectDetail;
