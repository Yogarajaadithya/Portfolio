import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, Brain, Cpu, Database, BarChart3, ShieldCheck, Zap, Layers, MessageSquare, Lightbulb, TrendingUp, Terminal, Github, Linkedin, AlertCircle, CheckCircle2, Clock, GitCommit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GetStartedButton } from '@/components/ui/get-started-button';

// --- Main Component ---
interface MultiAgentProjectDetailProps {
    onClose: () => void;
}

// --- Section Data ---
const metrics = [
    { value: '<30s', label: 'Analysis Time', icon: <Zap className="w-5 h-5" /> },
    { value: '95%+', label: 'SQL Accuracy', icon: <Database className="w-5 h-5" /> },
    { value: '50+', label: 'Question Types', icon: <MessageSquare className="w-5 h-5" /> },
    { value: '5', label: 'Specialized Agents', icon: <Cpu className="w-5 h-5" /> },
];


const features = [
    { title: 'Intelligent Routing', icon: <Zap className="w-5 h-5" />, desc: 'Auto-classifies descriptive vs causal questions for optimal workflow selection', tech: 'Few-shot CoT Prompting' },
    { title: 'Dual Analytics', icon: <Layers className="w-5 h-5" />, desc: 'Descriptive summaries & distributions + causal hypothesis testing & correlation', tech: 'Parallel Execution DAG' },
    { title: 'Multi-Dataset Support', icon: <Database className="w-5 h-5" />, desc: 'Seamlessly handles HR and Sales datasets with dynamic schema loading', tech: 'Dynamic Context Injection' },
    { title: 'Production Security', icon: <ShieldCheck className="w-5 h-5" />, desc: 'SQL injection prevention, Pydantic validation, CORS configuration', tech: 'Pydantic Validators' },
    { title: 'Statistical Rigor', icon: <TrendingUp className="w-5 h-5" />, desc: 'Chi-Square, t-Test, ANOVA, Pearson/Spearman correlation with effect sizes', tech: 'SciPy / StatsModels' },
    { title: 'Smart Visualizations', icon: <BarChart3 className="w-5 h-5" />, desc: 'Automatic chart selection, currency/percentage formatting, ordinal detection', tech: 'Plotly / LLM-Select' },
    { title: 'Real-Time Monitoring', icon: <Terminal className="w-5 h-5" />, desc: 'Color-coded agent logs, performance metrics, expandable error traces', tech: 'WebSocket Streaming' },
    { title: 'AI-Powered Insights', icon: <Lightbulb className="w-5 h-5" />, desc: 'Plain-English explanations of statistical results with actionable recommendations', tech: 'NLG Post-Processing' },
];

const techStack = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'TailwindCSS', 'Vite'] },
    { category: 'Backend', items: ['Python', 'FastAPI', 'LangChain', 'Azure OpenAI'] },
    { category: 'Data & Analytics', items: ['PostgreSQL', 'Pandas', 'SciPy', 'Plotly'] },
];

const useCases = [
    { question: 'Which department has the highest turnover?', type: 'Descriptive', result: 'Bar chart analysis' },
    { question: 'Is there a relationship between salary and performance?', type: 'Correlation', result: 'Scatter plot + Pearson/Spearman' },
    { question: 'Why are senior employees leaving?', type: 'Hypothesis', result: 'Chi-Square analysis' },
    { question: 'Does training impact satisfaction ratings?', type: 'ANOVA', result: 'Effect size calculation' },
];

const challenges = [
    { challenge: 'Ambiguous Natural Language', problem: 'Users phrase questions in varied, imprecise ways', solution: 'Multi-stage LLM processing with context clarification and intent validation' },
    { challenge: 'Statistical Test Selection', problem: 'Choosing appropriate tests requires statistical expertise', solution: 'Automated test selection based on data types, distributions, and question structure' },
    { challenge: 'SQL Injection Prevention', problem: 'LLM-generated SQL could be vulnerable', solution: 'Query validation layer with parameterized queries and schema restrictions' },
    { challenge: 'Multi-Dataset Context', problem: 'Switching between datasets requires different schemas and business logic', solution: 'Dynamic schema loading with dataset-specific prompts and KPI documentation' },
];

const devLog = [
    { version: 'v2.0', date: 'January 2025', title: 'Full-Stack Production Release', items: ['React frontend with TypeScript and TailwindCSS', 'Interactive Plotly charts with automatic type selection', 'Real-time agent monitoring with color-coded logs', 'Multi-dataset selector (HR & Sales)'] },
    { version: 'v1.5', date: 'December 2024', title: 'Hypothesis Testing Pipeline', items: ['Hypothesis Agent generates 3–5 null/alternative hypotheses', 'Statistical Agent performs Chi-Square, t-tests, ANOVA', "Effect size calculations (Cohen's d, Cramér's V)", 'AI-powered plain-English interpretation of results'] },
    { version: 'v1.0', date: 'November 2024', title: 'Core Agent Architecture', items: ['Planner Agent for intent classification', 'Text-to-SQL Agent with schema-aware query generation', 'Visualization Agent with LLM-driven chart selection', 'Event-driven pipeline with LangGraph state management'] },
    { version: 'v0.1', date: 'October 2024', title: 'Project Kickoff & Research', items: ['Defined problem space', 'Researched multi-agent architectures', 'Selected tech stack'] },
];

const highlights = [
    { title: 'System Design', icon: <Layers className="w-5 h-5" />, desc: 'Multi-agent architecture vs single-purpose tool' },
    { title: 'AI Engineering', icon: <Brain className="w-5 h-5" />, desc: 'Beyond chatbots: production LLM integration & routing' },
    { title: 'Full-Stack Scope', icon: <Database className="w-5 h-5" />, desc: 'End-to-end: Frontend + Backend + DB + AI' },
    { title: 'Statistical Depth', icon: <TrendingUp className="w-5 h-5" />, desc: 'Automated hypothesis testing & effect size analysis' },
    { title: 'Production Ready', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Security, monitoring, error handling, scalability' },
    { title: 'Business Value', icon: <Zap className="w-5 h-5" />, desc: 'Quantifiable time savings & decision support' },
];

const businessImpact = [
    { title: 'Accelerated Analysis', value: '30s avg', desc: 'Reduced analysis time from hours to under 30 seconds', icon: <Clock className="w-5 h-5" /> },
    { title: 'Automated Rigor', value: '100%', desc: 'Automated statistical test selection for every query', icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: 'Reliability', value: '99.9%', desc: 'Improved SQL generation reliability via validation layers', icon: <ShieldCheck className="w-5 h-5" /> },
    { title: 'Observability', value: 'Live', desc: 'Production-ready monitoring & validation pipelines', icon: <Terminal className="w-5 h-5" /> },
];

export const MultiAgentProjectDetail: React.FC<MultiAgentProjectDetailProps> = ({ onClose }) => {
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
            <section className="pt-32 pb-20 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-[5.25rem] font-extrabold text-gray-900 leading-[1.02] tracking-[-0.03em]"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Multi-Agent Assistant <br />
                        <span className="text-gray-400">for Smarter Analytics</span>
                    </motion.h1>

                    <motion.div
                        className="mt-8 space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-xl md:text-2xl font-medium text-gray-900 leading-tight">
                                An enterprise-grade multi-agent analytics system designed for <br className="hidden md:block" />
                                structured reasoning and statistical rigor.
                            </h2>
                            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
                                A 5-agent orchestration system that transforms natural language questions into rigorous statistical analysis — making complex data analytics accessible to anyone, in <span className="font-bold text-gray-900">seconds</span>.
                            </p>
                        </div>

                        <div className="pt-4">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block">
                                <GetStartedButton
                                    text="View Repository"
                                    className="bg-gray-900 text-white hover:bg-black h-12 px-8 text-base rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                                />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Structured breathing space */}
                <div className="container mx-auto max-w-7xl px-6 mt-20">
                    <div className="h-px bg-gray-100" />
                </div>
            </section>

            {/* ====== IMPACT METRICS ====== */}
            <section className="py-32 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {metrics.map((m, i) => (
                            <motion.div
                                key={m.label}
                                className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <div className="text-gray-400 mb-4 group-hover:text-gray-900 transition-colors duration-300">{m.icon}</div>
                                <div className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{m.value}</div>
                                <div className="text-sm text-gray-500 font-medium">{m.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== ARCHITECTURE — Visual Centerpiece ====== */}
            <section className="py-32 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            5-Agent Architecture
                        </h2>
                        <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
                            Specialized agents orchestrated via an event-driven LangGraph pipeline. The Planner classifies user intent and routes to the right analytical workflow, ensuring efficiency and accuracy.
                        </p>
                    </motion.div>

                    {/* Pipeline Diagram — THE BRAIN */}
                    <div className="relative">
                        {/* Summary above diagram */}
                        <div className="absolute -top-3 left-8 z-10 px-4 py-1 bg-white text-xs font-bold uppercase tracking-wider text-gray-400 border border-gray-100 rounded-full shadow-sm">
                            Orchestration Flow
                        </div>

                        <motion.div
                            className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 overflow-hidden"
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="overflow-x-auto pb-4">
                                <div className="flex flex-col items-center min-w-[700px]">
                                    {/* Flattened structure for cleaner look in the new container */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="px-6 py-3 bg-gray-900 text-white rounded-full font-bold text-sm shadow-md">User Input</span>
                                        <ArrowLeft className="w-4 h-4 text-gray-300 rotate-180" />
                                        <span className="px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-semibold text-sm shadow-sm">Planner Agent</span>
                                    </div>

                                    {/* Fork */}
                                    <div className="relative w-full max-w-xl h-8 mb-4">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gray-200" />
                                        <div className="absolute top-0 left-[20%] w-px h-8 bg-gray-200" />
                                        <div className="absolute top-0 right-[20%] w-px h-8 bg-gray-200" />
                                        <div className="absolute bottom-0 left-[20%] -translate-x-1/2 w-2 h-2 rounded-full bg-gray-200" />
                                        <div className="absolute bottom-0 right-[20%] translate-x-1/2 w-2 h-2 rounded-full bg-gray-200" />
                                    </div>

                                    {/* Two Paths */}
                                    <div className="flex gap-16 w-full justify-center">
                                        {/* Descriptive Path */}
                                        <div className="flex flex-col items-center flex-1 max-w-sm bg-gray-50/50 rounded-2xl p-6 border border-gray-100/50">
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Descriptive Pipeline</span>
                                            <div className="space-y-3 w-full">
                                                <div className="flex items-center gap-3 w-full p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                                    <Database className="w-4 h-4 text-blue-500" />
                                                    <span className="text-sm font-medium text-gray-700">Text-to-SQL Agent</span>
                                                </div>
                                                <ArrowLeft className="w-3 h-3 text-gray-300 rotate-[270deg] mx-auto" />
                                                <div className="flex items-center gap-3 w-full p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                                    <BarChart3 className="w-4 h-4 text-purple-500" />
                                                    <span className="text-sm font-medium text-gray-700">Visualization Agent</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Causal Path */}
                                        <div className="flex flex-col items-center flex-1 max-w-sm bg-gray-50/50 rounded-2xl p-6 border border-gray-100/50">
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Causal Pipeline</span>
                                            <div className="space-y-3 w-full">
                                                <div className="flex items-center gap-3 w-full p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                                    <Lightbulb className="w-4 h-4 text-amber-500" />
                                                    <span className="text-sm font-medium text-gray-700">Hypothesis Agent</span>
                                                </div>
                                                <ArrowLeft className="w-3 h-3 text-gray-300 rotate-[270deg] mx-auto" />
                                                <div className="flex items-center gap-3 w-full p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                                    <Cpu className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-sm font-medium text-gray-700">Statistical Agent</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rejoin */}
                                    <div className="mt-8 flex items-center gap-3">
                                        <ArrowLeft className="w-4 h-4 text-gray-300 rotate-[270deg]" />
                                    </div>
                                    <span className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-md mt-2">Unified Natural Language Response</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Technical Details Expandable */}
                        <div className="mt-8 max-w-3xl mx-auto">
                            <details className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 open:shadow-md">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white transition-colors font-medium text-gray-700">
                                    <span className="flex items-center gap-2">
                                        <Cpu className="w-4 h-4 text-gray-400" />
                                        Technical Details: Routing & State
                                    </span>
                                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-[270deg] transition-transform duration-300 group-open:rotate-90" />
                                </summary>
                                <div className="p-6 pt-0 text-sm text-gray-600 space-y-4 border-t border-gray-100 bg-white">
                                    <div className="grid md:grid-cols-3 gap-6 pt-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Why LangGraph?</h4>
                                            <p className="leading-relaxed text-gray-500">Chosen for cyclic graph capabilities, allowing agents to loop back for corrections (e.g., if SQL fails) rather than a linear DAG.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Agent Routing</h4>
                                            <p className="leading-relaxed text-gray-500">The Planner uses few-shot prompting to distinguish "What happened?" (SQL aggregation) vs "Why did it happen?" (Statistical inference).</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">State Management</h4>
                                            <p className="leading-relaxed text-gray-500">A shared <code>AgentState</code> dict passes the schema, initial question, intermediate steps, and error logs between nodes.</p>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </section>



            {/* ====== FEATURES ====== */}
            <section className="py-32 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Key Features
                    </h2>
                    <p className="text-base text-gray-500 mb-16 max-w-xl leading-relaxed">Core capabilities that power the enterprise analytics pipeline.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                className="flex flex-col p-8 bg-white/80 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.04 }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-gray-900 text-white rounded-xl shadow-md">
                                        {f.icon}
                                    </div>
                                    {f.tech && (
                                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-gray-400 border-gray-200 bg-gray-50 font-semibold py-1">
                                            {f.tech}
                                        </Badge>
                                    )}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 text-lg">{f.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== TECH STACK ====== */}
            <section className="py-32 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Technology Stack
                    </h2>
                    <p className="text-base text-gray-500 mb-16 max-w-xl">The modern, scalable tools driving the system.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {techStack.map((group, i) => (
                            <motion.div
                                key={group.category}
                                className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.08 }}
                            >
                                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">{group.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span key={item} className="px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-xs font-semibold hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-default">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== USE CASES ====== */}
            <section className="py-32 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Use Cases
                    </h2>
                    <p className="text-base text-gray-500 mb-16 max-w-xl">Interactive example questions handled by the system.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((uc, i) => (
                            <motion.div
                                key={uc.question}
                                className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg uppercase tracking-widest border border-gray-200 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">{uc.type}</span>
                                    <ArrowLeft className="w-4 h-4 text-gray-300 rotate-[135deg] group-hover:text-gray-900 transition-colors duration-300" />
                                </div>
                                <p className="text-xl font-bold text-gray-900 mb-3 leading-snug">"{uc.question}"</p>
                                <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                                    <div className="h-px w-6 bg-gray-200 group-hover:bg-gray-400 transition-colors" />
                                    <span className="group-hover:text-gray-600 transition-colors">{uc.result}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== CHALLENGES ====== */}
            <section className="py-32 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-12" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Challenges & Solutions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {challenges.map((c, i) => (
                            <motion.div
                                key={c.challenge}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                                    <h3 className="font-bold text-gray-900 text-lg">{c.challenge}</h3>
                                </div>
                                <div className="p-6 flex-1 flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <div className="mt-1 shrink-0 text-red-500 bg-red-50 p-1.5 rounded-full">
                                            <AlertCircle className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1 block">Problem</span>
                                            <p className="text-sm text-gray-600 leading-relaxed">{c.problem}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 shrink-0 text-emerald-500 bg-emerald-50 p-1.5 rounded-full">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1 block">Solution</span>
                                            <p className="text-sm text-gray-600 leading-relaxed">{c.solution}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== DEVELOPMENT TIMELINE ====== */}
            <section className="py-32 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Development Timeline
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-16 max-w-2xl">
                        Key milestones in the evolution of the system.
                    </p>

                    <div className="relative border-l border-gray-200 ml-3 md:ml-6 space-y-12 pb-4">
                        {devLog.map((log, index) => (
                            <motion.div
                                key={log.version}
                                className="relative pl-8 md:pl-12"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Connector Dot */}
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-900 border-2 border-white ring-4 ring-gray-50" />

                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                                    <span className="font-mono text-sm font-bold text-gray-900">{log.version}</span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{log.date}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-4">{log.title}</h3>

                                <ul className="space-y-3">
                                    {log.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                                            <GitCommit className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== HIGHLIGHTS ====== */}
            <section className="py-32 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-12" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        What This Demonstrates
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-900 shrink-0 w-fit mb-4">
                                    {h.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{h.title}</h3>
                                <p className="text-sm font-medium text-gray-500 leading-relaxed">{h.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== BUSINESS IMPACT (NEW) ====== */}
            <section className="py-32 bg-gray-900 text-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Business Impact
                            </h2>
                            <p className="text-gray-400 max-w-xl text-lg">
                                Delivering tangible value through automation and intelligence.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {businessImpact.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="relative p-6 rounded-2xl bg-white/5 border border-white/10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="text-gray-400 mb-6">{item.icon}</div>
                                <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{item.value}</div>
                                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">{item.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== FOOTER ====== */}
            <section className="py-32 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto max-w-7xl px-6 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Interested in the architecture?
                    </h2>
                    <p className="text-lg text-gray-500 mb-10 max-w-2xl">
                        Explore the repository for detailed implementation of the LangGraph pipeline, or connect with me to discuss multi-agent systems.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <Github className="w-5 h-5" />
                            <span>View on GitHub</span>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-6 py-3.5 bg-white text-gray-700 border border-gray-200 font-semibold rounded-full hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-300"
                        >
                            <Linkedin className="w-5 h-5" />
                            <span>Connect on LinkedIn</span>
                        </a>
                    </div>

                    <div className="mt-20 pt-10 border-t border-gray-200 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400 uppercase tracking-widest font-mono">
                        <span>Portfolio Case Study — 2025</span>
                        <div className="flex items-center gap-6">
                            <button onClick={onClose} className="hover:text-gray-900 transition-colors">Back to Projects</button>
                            <span>•</span>
                            <span>Multi-Agent Intelligence</span>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default MultiAgentProjectDetail;
