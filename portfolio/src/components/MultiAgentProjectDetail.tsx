import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Brain, Cpu, Database, BarChart3, ShieldCheck, Zap, Layers, MessageSquare, Lightbulb, TrendingUp, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

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
    { value: '6', label: 'Specialized Agents', icon: <Cpu className="w-5 h-5" /> },
];


const features = [
    { title: 'Intelligent Question Routing', icon: <Zap className="w-5 h-5" />, desc: 'Automatic WHAT/WHY/SIMULATE classification with context-aware agent orchestration' },
    { title: 'Triple Analytics Pipeline', icon: <Layers className="w-5 h-5" />, desc: 'Descriptive: Text-to-SQL + EDA, Causal: Hypothesis testing, Predictive: ML scenario simulation' },
    { title: 'ML Simulation Engine', icon: <Lightbulb className="w-5 h-5" />, desc: 'What-if scenarios, Multi-scenario comparison, Parameter optimization, Sensitivity analysis' },
    { title: 'Production ML Models', icon: <Cpu className="w-5 h-5" />, desc: 'Pre-trained Random Forest (87% accuracy) and Gradient Boosting (92% accuracy) with joblib serialization' },
    { title: 'Statistical Rigor & Validation', icon: <TrendingUp className="w-5 h-5" />, desc: 'Chi-Square, Independent t-Test, One-Way ANOVA, Pearson/Spearman correlation with effect sizes' },
    { title: 'Smart Visualization System', icon: <BarChart3 className="w-5 h-5" />, desc: 'LLM-generated Plotly charts for EDA + programmatic comparison/sensitivity charts for simulations' },
    { title: 'Model Registry & Versioning', icon: <Layers className="w-5 h-5" />, desc: 'JSON-based model management with config, features, and performance tracking' },
    { title: 'Enterprise Security & Validation', icon: <ShieldCheck className="w-5 h-5" />, desc: 'SQL injection prevention, Pydantic schemas, CORS configuration, secure OpenAI integration' },
    { title: 'Real-Time Agent Monitoring', icon: <Terminal className="w-5 h-5" />, desc: 'Color-coded logs (info/success/warning/error), timing metrics, expandable error traces' },
    { title: 'AI-Powered Business Insights', icon: <Lightbulb className="w-5 h-5" />, desc: 'Plain-English explanations of SQL results, statistical tests, and ML predictions with actionable recommendations' },
];

const techStack = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'TailwindCSS', 'Vite'] },
    { category: 'Backend', items: ['Python', 'FastAPI', 'LangChain', 'OpenAI'] },
    { category: 'Data & Analytics', items: ['PostgreSQL', 'Pandas', 'SciPy', 'Plotly'] },
];

const useCases = [
    { question: 'Which department has the highest turnover?', type: 'Descriptive', result: 'Bar chart analysis' },
    { question: 'Is there a relationship between salary and performance?', type: 'Correlation', result: 'Scatter plot + Pearson/Spearman' },
    { question: 'Why are senior employees leaving?', type: 'Hypothesis', result: 'Chi-Square analysis' },
    { question: 'Does training impact satisfaction ratings?', type: 'ANOVA', result: 'Effect size calculation' },
    { question: 'What if we increase all salaries by 15%?', type: 'What-If', result: 'ML prediction, Delta calculation' },
    { question: 'How does pricing change from -20% to +20% affect revenue?', type: 'Simulation', result: 'Parameter sweep' },
    { question: 'What if we offer a remote work option to all developers?', type: 'What-If', result: 'Retention ML simulation' },
    { question: 'Which users are most likely to cancel their subscriptions?', type: 'Predictive', result: 'Gradient Boosting probability' },
];

const challenges = [
    { challenge: 'Ambiguous Natural Language', problem: 'Users phrase questions in varied, imprecise ways', solution: 'Multi-stage LLM processing with context clarification and intent validation' },
    { challenge: 'Statistical Test Selection', problem: 'Choosing appropriate tests requires statistical expertise', solution: 'Automated test selection based on data types, distributions, and question structure' },
    { challenge: 'SQL Injection Prevention', problem: 'LLM-generated SQL could be vulnerable', solution: 'Query validation layer with parameterized queries and schema restrictions' },
    { challenge: 'Multi-Dataset Context', problem: 'Switching between datasets requires different schemas and business logic', solution: 'Dynamic schema loading with dataset-specific prompts and KPI documentation' },
];

const highlights = [
    { title: 'System Design', icon: <Layers className="w-5 h-5" />, desc: 'Multi-agent architecture vs single-purpose tool' },
    { title: 'AI Engineering', icon: <Brain className="w-5 h-5" />, desc: 'Beyond chatbots: production LLM integration & routing' },
    { title: 'Full-Stack Scope', icon: <Database className="w-5 h-5" />, desc: 'End-to-end: Frontend + Backend + DB + AI' },
    { title: 'Statistical Depth', icon: <TrendingUp className="w-5 h-5" />, desc: 'Automated hypothesis testing & effect size analysis' },
    { title: 'Production Ready', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Security, monitoring, error handling, scalability' },
    { title: 'Business Value', icon: <Zap className="w-5 h-5" />, desc: 'Quantifiable time savings & decision support' },
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
            <section className="pt-32 pb-16 bg-white">
                <div className="container mx-auto max-w-7xl px-10 md:px-16">
                    <motion.h1
                        className="text-6xl md:text-7xl lg:text-[6rem] font-extrabold text-gray-900 leading-[1.02] tracking-[-0.03em]"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Multi-Agent Assistant <br />
                        <span className="text-gray-400">for Smarter Analytics</span>
                    </motion.h1>

                    <motion.div
                        className="mt-12 space-y-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="space-y-6 max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                                An enterprise-grade 6-agent analytics system that transforms natural language into descriptive, causal, and predictive insights
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
                                combining LLM orchestration with machine learning to deliver rigorous statistical analysis in <span className="font-bold text-gray-900">seconds</span>.
                            </p>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <a href="https://github.com/Yogarajaadithya/The-Multi-Agent-Assistant-for-Smarter-Analytics.git" target="_blank" rel="noopener noreferrer" className="inline-block">
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
                                    {`┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              FRONTEND LAYER (React + TypeScript)                                             │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌────────────────────────┐                                │
│  │ Chat Input   │      │ Message List │      │ Plotly Charts│      │ Agent Activity Monitor │                                │
│  └──────┬───────┘      └──────▲───────┘      └──────▲───────┘      └────────────────────────┘                                │
│         │                     │                     │                                                                        │
└─────────┼─────────────────────┼─────────────────────┼────────────────────────────────────────────────────────────────────────┘
          │                     │                     │
          │       HTTP REST API │                     │
          ▼                     │                     │
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              BACKEND LAYER (FastAPI + Python)                                                │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                               MULTI-AGENT ORCHESTRATION                                                │  │
│  │                                                                                                                        │  │
│  │                                              ┌──────────────────────────┐                                              │  │
│  │                                              │     PLANNER AGENT        │                                              │  │
│  │                                              │  (Question Classifier)   │                                              │  │
│  │                                              └───────┬────────┬─────────┘                                              │  │
│  │                                                      │        │         │                                              │  │
│  │                ┌─────────────────────────────────────┘        │         └─────────────────────────────────┐            │  │
│  │                ▼                                              ▼                                           ▼            │  │
│  │     ┌──────────────────────┐                      ┌──────────────────────────┐              ┌────────────────────────┐ │  │
│  │     │    DESCRIPTIVE       │                      │    CAUSAL ANALYTICS      │              │  PREDICTIVE ANALYTICS  │ │  │
│  │     │     ANALYTICS        │                      │                          │              │                        │ │  │
│  │     │   (WHAT Questions)   │                      │   (WHY Questions)        │              │  (WHAT-IF Questions)   │ │  │
│  │     └──────────┬───────────┘                      └──────────┬───────────────┘              └───────────┬────────────┘ │  │
│  │                │                                             │                                          │              │  │
│  │                ▼                                             ▼                                          ▼              │  │
│  │     ┌──────────────────────┐                      ┌──────────────────────────┐              ┌────────────────────────┐ │  │
│  │     │   Text-to-SQL        │                      │   Hypothesis Agent       │              │  Simulation Agent      │ │  │
│  │     │    Agent             │                      │  (Generate 3 Hypos)      │              │    (Self-Contained)    │ │  │
│  │     └──────────┬───────────┘                      └──────────┬───────────────┘              │ ┌────────────────────┐ │ │  │
│  │                │                                             │                              │ │• ML Model Predicts │ │ │  │
│  │                ▼                                             ▼                              │ │• Built-in Charts   │ │ │  │
│  │     ┌──────────────────────┐                      ┌──────────────────────────┐              │ │• Metrics Calculate │ │ │  │
│  │     │   Visualization      │                      │   Text-to-SQL Agent      │              │ │• Scenario Compare  │ │ │  │
│  │     │    Agent             │                      │   (Per Hypothesis)       │              │ │• LLM Insight Gener │ │ │  │
│  │     └──────────┬───────────┘                      └──────────┬───────────────┘              │ └────────────────────┘ │ │  │
│  │                │                                             │                              │ • What-If • Multi-Scen │ │  │
│  │                │                                             ▼                              │ • Optimz  • Sensitivty │ │  │
│  │                │                                  ┌──────────────────────────┐              └───────────┬────────────┘ │  │
│  │                │                                  │   Visualization Agent    │                          │              │  │
│  │                │                                  │   (Per Hypothesis)       │                          │              │  │
│  │                │                                  └──────────┬───────────────┘                          │              │  │
│  │                │                                             │                                          │              │  │
│  │                │                                             ▼                                          │              │  │
│  │                │                                  ┌──────────────────────────┐                          │              │  │
│  │                │                                  │   Statistical Agent      │                          │              │  │
│  │                │                                  │ • Chi-Square Test        │                          │              │  │
│  │                │                                  │ • t-Test / ANOVA         │                          │              │  │
│  │                │                                  │ • Correlation Analysis   │                          │              │  │
│  │                │                                  │ • AI Interpretation      │                          │              │  │
│  │                │                                  └──────────┬───────────────┘                          │              │  │
│  │                │                                             │                                          │              │  │
│  │                └─────────────────────────────────────────────┴──────────────────────────────────────────┘              │  │
│  │                                                              │                                                         │  │
│  └──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────┘  │
│                                                                 │                                                            │
└─────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┘
                                                                  │
                                           ┌──────────────────────┴──────────────────────┐
                                           │                                             │
                                           ▼                                             ▼
                             ┌─────────────────────┐                       ┌──────────────────────────┐
                             │    DATA LAYER       │                       │     AI/LLM LAYER         │
                             │                     │                       │                          │
                             │  PostgreSQL DB      │                       │   OpenAI (GPT-4)         │
                             │  ┌───────────────┐  │                       │                          │
                             │  │ HR Schema     │  │                       │  Powers all agents:      │
                             │  └───────────────┘  │                       │  • NL Understanding      │
                             │  ┌───────────────┐  │                       │  • SQL Generation        │
                             │  │ Sales Schema  │  │                       │  • Hypothesis Creation   │
                             │  └───────────────┘  │                       │  • Insight Generation    │
                             └─────────────────────┘                       └──────────────────────────┘`}
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
                        <a href="https://github.com/Yogarajaadithya/The-Multi-Agent-Assistant-for-Smarter-Analytics.git" target="_blank" rel="noopener noreferrer">
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

export default MultiAgentProjectDetail;
