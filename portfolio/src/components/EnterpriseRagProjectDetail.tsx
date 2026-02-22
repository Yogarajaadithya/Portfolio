import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Brain, Cpu, Database, BarChart3, ShieldCheck, Zap, Layers, Lightbulb, TrendingUp, Terminal, AlertCircle, CheckCircle2, FileSearch, Link, GitBranch, Search } from 'lucide-react';

import { GetStartedButton } from '@/components/ui/get-started-button';

// --- Main Component ---
interface EnterpriseRagProjectDetailProps {
    onClose: () => void;
}

// --- Section Data ---
const metrics = [
    { value: '92%', label: 'Faithfulness Score', icon: <ShieldCheck className="w-5 h-5" /> },
    { value: '100%', label: 'Source Attribution', icon: <Link className="w-5 h-5" /> },
    { value: '<2s', label: 'Retrieval Latency', icon: <Zap className="w-5 h-5" /> },
    { value: '4', label: 'Validation Layers', icon: <Layers className="w-5 h-5" /> },
];

const features = [
    { title: 'Provenance-Aware Retrieval', icon: <FileSearch className="w-5 h-5" />, desc: 'Every generated claim is linked to its source document, page, and passage. Full citation chain maintained from user query to final answer with inline reference markers.' },
    { title: 'Faithfulness Validation Pipeline', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Multi-stage NLI (Natural Language Inference) checks verify each answer claim against retrieved context. Answers scoring below threshold are flagged, revised, or rejected.' },
    { title: 'Hybrid Semantic + Lexical Search', icon: <Search className="w-5 h-5" />, desc: 'BM25 sparse retrieval fused with dense vector search (FAISS/Chroma) using Reciprocal Rank Fusion (RRF). Captures both keyword precision and semantic relevance.' },
    { title: 'Re-Ranking & Context Pruning', icon: <GitBranch className="w-5 h-5" />, desc: 'Cross-encoder re-ranker refines top-K candidates. Irrelevant context pruned via sentence-level relevance scoring before LLM prompt assembly to reduce noise and hallucination.' },
    { title: 'Chunk-Level Attribution Mapping', icon: <Link className="w-5 h-5" />, desc: 'Each answer sentence is mapped to the exact document chunk that supports it. Displayed as inline citations with source metadata: document name, section, page, confidence score.' },
    { title: 'Hallucination Detection & Scoring', icon: <AlertCircle className="w-5 h-5" />, desc: 'Automated hallucination scoring using token-level overlap (ROUGE, BERTScore) and semantic entailment. Answers with unsupported claims trigger regeneration or user warnings.' },
    { title: 'Adaptive Chunking Strategy', icon: <Layers className="w-5 h-5" />, desc: 'Document-type-aware chunking: sentence-level for dense text, paragraph-level for structured docs, sliding window with configurable overlap for technical manuals and contracts.' },
    { title: 'Enterprise Document Ingestion', icon: <Database className="w-5 h-5" />, desc: 'Batch ingestion pipeline for PDF, DOCX, XLSX, HTML, and TXT. Metadata extraction (author, date, department, classification) preserved and indexed alongside content vectors.' },
    { title: 'Answer Confidence & Uncertainty', icon: <BarChart3 className="w-5 h-5" />, desc: 'Calibrated confidence scores for every answer. Low-confidence responses include uncertainty signals. Users receive "I don\'t know" rather than hallucinated answers when evidence is insufficient.' },
    { title: 'Audit Trail & Compliance Logging', icon: <Terminal className="w-5 h-5" />, desc: 'Immutable query-to-source audit logs for compliance. Every retrieval event, re-ranking decision, and validation step recorded with timestamps for enterprise governance and review.' },
];

const techStack = [
    { category: 'Retrieval', items: ['FAISS', 'ChromaDB', 'BM25', 'RRF Fusion'] },
    { category: 'Validation', items: ['NLI Models', 'BERTScore', 'ROUGE', 'Cross-Encoder'] },
    { category: 'AI & LLM', items: ['OpenAI GPT-4', 'Ada-002', 'Sentence-T5', 'Cohere'] },
    { category: 'Backend', items: ['Python 3.10+', 'FastAPI', 'Celery', 'Redis'] },
    { category: 'Document Processing', items: ['PyMuPDF', 'Docx2txt', 'Unstructured', 'Tiktoken'] },
    { category: 'Observability', items: ['LangSmith', 'Prometheus', 'Grafana', 'SQLite'] },
];

const useCases = [
    { question: 'What is the refund policy for enterprise contracts?', type: 'Policy Lookup', result: 'Cited: Contract §4.2, p.12' },
    { question: 'Summarize Q3 compliance requirements across all departments', type: 'Multi-Doc Synthesis', result: 'Cross-doc retrieval + provenance map' },
    { question: 'Is this claim supported by our internal research?', type: 'Claim Verification', result: 'NLI faithfulness check + score' },
    { question: 'What are the SLA terms for Tier 1 customers?', type: 'Contract Analysis', result: 'Exact clause citation + confidence 0.96' },
    { question: 'Generate a summary of the technical specification', type: 'Faithful Summarization', result: 'Claim-by-claim source attribution' },
    { question: 'Who approved the budget for Project Alpha?', type: 'Provenance Trace', result: 'Document + author + date metadata' },
    { question: 'What safety standards apply to our manufacturing process?', type: 'Regulatory Query', result: 'Standards doc citation + audit log' },
    { question: 'Compare pricing across vendor proposals', type: 'Multi-Document Compare', result: 'Parallel retrieval + conflict detection' },
];

const challenges = [
    { challenge: 'Hallucination in Long-Context Generation', problem: 'LLMs confidently generate plausible-sounding but unsupported facts when context is long or ambiguous', solution: 'Post-generation NLI validation checks each answer claim against retrieved chunks. Claims with entailment score below 0.75 trigger regeneration or are flagged with uncertainty markers.' },
    { challenge: 'Source Attribution at Scale', problem: 'Mapping generated sentences back to specific document passages is computationally expensive and error-prone at enterprise document volumes', solution: 'Chunk-ID tagging during ingestion + sentence-level cosine similarity matching post-generation. Each answer sentence linked to its top supporting chunk with confidence score.' },
    { challenge: 'Retrieval Precision vs Recall Trade-off', problem: 'High recall returns too much irrelevant context (noise); high precision misses supporting evidence from different phrasings', solution: 'Hybrid BM25 + dense retrieval with RRF fusion balances both. Cross-encoder re-ranking then filters to the 5 highest-relevance chunks before prompt assembly.' },
    { challenge: 'Conflicting Evidence Across Documents', problem: 'Enterprise knowledge bases contain outdated, contradictory, or versioned documents that lead to inconsistent answers', solution: 'Document metadata (date, version, authority level) used in re-ranking. Conflicting claims detected via semantic contradiction scoring and surfaced to the user with source timestamps.' },
    { challenge: 'Context Window Overflow', problem: 'Enterprise documents are often thousands of pages; fitting relevant content within LLM token limits without losing critical evidence', solution: 'Hierarchical chunking + dynamic context budget allocation. Higher-relevance chunks receive more tokens; lower-relevance context summarized before inclusion.' },
    { challenge: 'Compliance & Audit Requirements', problem: 'Enterprise deployments require full traceability of every AI-generated answer for legal and regulatory compliance', solution: 'Immutable event log captures query, retrieved chunks, re-ranking decisions, validation scores, and final answer. Exportable audit trail with cryptographic timestamps.' },
];

const highlights = [
    { title: 'RAG Architecture', icon: <Layers className="w-5 h-5" />, desc: 'Beyond basic retrieval: faithfulness validation, re-ranking, and source attribution as first-class citizens' },
    { title: 'AI Safety', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Practical hallucination reduction using NLI, BERTScore, and claim-level validation in production pipelines' },
    { title: 'Enterprise Scale', icon: <Database className="w-5 h-5" />, desc: 'Handles thousands of enterprise documents with async ingestion, metadata-aware retrieval, and batch processing' },
    { title: 'Trustworthy AI', icon: <Brain className="w-5 h-5" />, desc: 'Every answer is explainable: inline citations, confidence scores, and full provenance chain from query to source' },
    { title: 'Search Engineering', icon: <Search className="w-5 h-5" />, desc: 'Hybrid retrieval with BM25 + vector search + RRF fusion and cross-encoder re-ranking for optimal precision/recall' },
    { title: 'Compliance Ready', icon: <TrendingUp className="w-5 h-5" />, desc: 'Audit trails, conflict detection, uncertainty signaling—enterprise governance built into the retrieval pipeline' },
];



export const EnterpriseRagProjectDetail: React.FC<EnterpriseRagProjectDetailProps> = ({ onClose }) => {
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
                        Beyond Retrieval: <br />
                        <span className="text-gray-400">Provenance & Faithfulness</span>
                    </motion.h1>

                    <motion.div
                        className="mt-12 space-y-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="space-y-6 max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                                Enterprise RAG that cites its sources and proves it's right
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
                                An enterprise-grade RAG pipeline optimized for source provenance and answer faithfulness — combining hybrid retrieval, cross-encoder re-ranking, NLI-based validation, and chunk-level citation mapping to deliver trustworthy, auditable AI answers at scale.
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

                {/* Explicit Spacer to Force Layout Separation */}
                <div className="h-16 md:h-24 w-full" aria-hidden="true" />

                {/* Structured breathing space */}
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

            {/* ====== ARCHITECTURE — Visual Centerpiece ====== */}
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

                    {/* Pipeline Diagram */}
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
                                    Retrieval & Validation Pipeline
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
│                     HYBRID RETRIEVAL STAGE                             │
│                                                                        │
│    ┌──────────────────────┐              ┌──────────────────────┐      │
│    │   DENSE RETRIEVAL    │              │   SPARSE RETRIEVAL   │      │
│    │  • FAISS / Chroma    │              │  • BM25 Keyword      │      │
│    │  • Semantic Search   │              │  • Lexical Matching  │      │
│    │  • Top-K Candidates  │              │  • Exact Term Match  │      │
│    └─────────┬────────────┘              └──────────┬───────────┘      │
│              │                                      │                  │
│              │         ┌─────────────────────┐      │                  │
│              └────────▶│   RRF FUSION        │◀─────┘                 │
│                        │  • Rank Aggregation │                         │
│                        │  • Score Normalizn  │                         │
│                        └─────────┬───────────┘                         │
└──────────────────────────────────┼────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      RE-RANKING STAGE                                  │
│                                                                        │
│    ┌──────────────────────────────────────────────────────────────┐    │
│    │  CROSS-ENCODER RE-RANKER                                     │    │
│    │  • Query-Chunk Relevance Scoring                             │    │
│    │  • Context Pruning (remove noise)                            │    │
│    │  • Top-5 Context Assembly                                   │    │
│    └──────────────────────────────┬───────────────────────────────┘    │
└─────────────────────────────────┬─┴──────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        LLM GENERATION                                  │
│    • GPT-4 with source-grounded prompt                                 │
│    • Instruction: cite chunk IDs for every claim                       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   FAITHFULNESS VALIDATION STAGE                        │
│                                                                        │
│    ┌──────────────────────┐              ┌──────────────────────┐      │
│    │  NLI CLAIM CHECK     │              │  BERTSCORE / ROUGE   │      │
│    │  • Sentence-by-sent  │              │  • Token Overlap     │      │
│    │  • Entailment score  │              │  • Semantic Sim.     │      │
│    │  • Flag if < 0.75    │              │  • Hallucn Score     │      │
│    └─────────┬────────────┘              └──────────┬───────────┘      │
│              └──────────────────┬───────────────────┘                  │
│                                 ▼                                      │
│                   ┌─────────────────────────┐                          │
│                   │  PROVENANCE MAPPER       │                          │
│                   │  • Answer → Chunk ID     │                          │
│                   │  • Inline citations      │                          │
│                   │  • Confidence scores     │                          │
│                   └─────────────┬────────────┘                         │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  │
                                  ▼
             ┌─────────────────────────────────────┐
             │  FINAL RESPONSE                      │
             │  • Answer with inline [1][2] cites   │
             │  • Source metadata panel             │
             │  • Confidence + faithfulness score   │
             │  • Audit log entry written           │
             └─────────────────────────────────────┘`}
                                </pre>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== FAITHFULNESS VALIDATION DETAIL ====== */}
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
                            Faithfulness Validation
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
                                Validation System
                            </span>
                        </div>
                        <div className="flex justify-center overflow-hidden pt-8 md:pt-4">
                            <pre className="font-mono text-xs md:text-sm leading-none text-gray-800 whitespace-pre">
                                {`┌─────────────────────────────────────────────────────────────────────────┐
│                     FAITHFULNESS VALIDATION SYSTEM                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  GENERATED ANSWER: "The refund window is 30 days [1] and applies       │
│  to all enterprise tiers [2]."                                          │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  CLAIM DECOMPOSITION                                            │   │
│  │                                                                 │   │
│  │  Claim 1: "refund window is 30 days"                           │   │
│  │  Claim 2: "applies to all enterprise tiers"                    │   │
│  └──────────────────────────┬──────────────────────────────────────┘   │
│                             │                                           │
│                             ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  NLI VALIDATION (per claim × retrieved chunk)                   │   │
│  │                                                                 │   │
│  │  Claim 1 ──▶ Chunk [1] "...refund period: 30 calendar days..." │   │
│  │              Entailment Score: 0.94  ✓ SUPPORTED               │   │
│  │                                                                 │   │
│  │  Claim 2 ──▶ Chunk [2] "...applicable to Tier 1, 2, 3..."     │   │
│  │              Entailment Score: 0.88  ✓ SUPPORTED               │   │
│  └──────────────────────────┬──────────────────────────────────────┘   │
│                             │                                           │
│                             ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  BERTSCORE + ROUGE CROSS-CHECK                                  │   │
│  │  • ROUGE-L:   0.71  (lexical overlap)                          │   │
│  │  • BERTScore: 0.89  (semantic similarity)                      │   │
│  │  • Combined Faithfulness Score: 0.92  ✓ PASS                   │   │
│  └──────────────────────────┬──────────────────────────────────────┘   │
│                             │                                           │
│                             ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  DECISION ENGINE                                                │   │
│  │                                                                 │   │
│  │  Score ≥ 0.85  →  DELIVER with citations                       │   │
│  │  Score 0.70-0.84 →  DELIVER with uncertainty warning           │   │
│  │  Score < 0.70  →  REGENERATE or surface "insufficient evidence" │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘`}
                            </pre>
                        </div>
                    </motion.div>
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
                    <p className="text-xl text-gray-500 mb-20 max-w-2xl leading-relaxed">Source-grounded, hallucination-resistant RAG built for enterprise trust and compliance.</p>
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
                    <p className="text-xl text-gray-500 mb-32 max-w-2xl">The modern, scalable tools powering provenance-first RAG.</p>
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
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== USE CASES ====== */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Use Cases
                    </h2>
                    <p className="text-xl text-gray-500 mb-20 max-w-2xl">Real enterprise queries answered with full source attribution.</p>
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

export default EnterpriseRagProjectDetail;
