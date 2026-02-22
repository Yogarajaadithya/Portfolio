import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MultiAgentProjectDetail } from '@/components/MultiAgentProjectDetail';
import { RagProjectDetail } from '@/components/RagProjectDetail';
import { AutonomousBlogProjectDetail } from '@/components/AutonomousBlogProjectDetail';
import { CuneiformProjectDetail } from '@/components/CuneiformProjectDetail';
import { EnterpriseRagProjectDetail } from '@/components/EnterpriseRagProjectDetail';

interface AccordionItemData {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    hasCustomDetail?: boolean;
}

// --- Data for the image accordion ---
const accordionItems: AccordionItemData[] = [
    {
        id: 1,
        title: 'Multi-Agent Assistant for Smarter Analytics',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        description: 'An intelligent multi-agent system that leverages LLMs to automate data analysis, generate insights, and provide interactive analytics dashboards. Agents collaborate to handle data ingestion, transformation, visualization, and natural language querying.',
        techStack: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'React', 'OpenAI'],
        githubUrl: '#',
        hasCustomDetail: true,
    },
    {
        id: 2,
        title: 'RAG with Long-Term Memory System',
        imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
        description: 'A Retrieval-Augmented Generation system with persistent long-term memory. Uses FAISS vector stores for document retrieval and integrates conversational memory to maintain context across sessions, enabling more personalized and accurate responses.',
        techStack: ['Python', 'LangChain', 'FAISS', 'HuggingFace', 'Azure OpenAI', 'Streamlit'],
        githubUrl: 'https://github.com/Yogarajaadithya/RAG-with-Long-Term-Memory-System.git',
        hasCustomDetail: true,
    },
    {
        id: 3,
        title: 'Autonomous Blog Generation Agent',
        imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop',
        description: 'An autonomous agent that generates high-quality blog posts end-to-end. It researches topics, outlines content, writes drafts, and self-reviews using a multi-agent LangGraph workflow with LangSmith observability for monitoring and debugging.',
        techStack: ['Python', 'LangGraph', 'LangSmith', 'FastAPI', 'GPT-4'],
        githubUrl: '#',
        hasCustomDetail: true,
    },
    {
        id: 4,
        title: 'Cuneiform Sign Detection & Classification',
        imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
        description: 'A deep learning pipeline using Faster R-CNN for detecting and classifying ancient cuneiform signs in tablet images, enabling automated archaeological analysis and digitization of historical artifacts.',
        techStack: ['Python', 'PyTorch', 'Faster R-CNN', 'Torchvision', 'OpenCV', 'NumPy'],
        githubUrl: '#',
        hasCustomDetail: true,
    },
    {
        id: 5,
        title: 'Beyond Retrieval: Optimizing Provenance and Faithfulness in Enterprise RAG',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
        description: 'An enterprise-grade RAG pipeline optimized for source provenance and answer faithfulness — combining hybrid retrieval, cross-encoder re-ranking, NLI-based validation, and chunk-level citation mapping to deliver trustworthy, auditable AI answers at scale.',
        techStack: ['Python', 'FAISS', 'BM25', 'Cross-Encoder', 'NLI Models', 'FastAPI', 'OpenAI'],
        githubUrl: '#',
        hasCustomDetail: true,
    },
];

// --- Accordion Item Component ---
interface AccordionItemProps {
    item: AccordionItemData;
    isActive: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter, onClick }) => {
    return (
        <div
            className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        >
            {/* Background Image */}
            <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error';
                }}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors"></div>

            {/* Click hint on active */}
            {isActive && (
                <span className="absolute top-4 right-4 text-white/70 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    Click to view →
                </span>
            )}

            {/* Caption Text */}
            <span
                className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${isActive
                        ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
                        : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
                    }
        `}
            >
                {item.title}
            </span>
        </div>
    );
};


// --- Project Detail Overlay ---
interface ProjectDetailProps {
    project: AccordionItemData;
    onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
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
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="fixed top-6 right-8 md:right-16 z-[110] text-gray-900 hover:text-gray-600 transition-colors"
                aria-label="Close project detail"
            >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 pt-20 pb-20">
                <h1
                    className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    {project.title}
                </h1>

                <p className="mt-6 text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="mt-10 flex flex-wrap gap-4">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View on GitHub
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </a>
                    )}
                </div>

                {/* Back button */}
                <button
                    onClick={onClose}
                    className="mt-12 text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </button>
            </div>
        </motion.div>
    );
};


// --- Main Accordion Component ---
export function LandingAccordionItem() {
    const [activeIndex, setActiveIndex] = useState(4);
    const [selectedProject, setSelectedProject] = useState<AccordionItemData | null>(null);

    const handleItemHover = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="bg-white font-sans">
            <section className="container mx-auto px-4 py-12 md:py-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Left Side: Title */}
                    <div className="w-full md:w-1/3 text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tighter"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Projects
                        </h1>
                    </div>

                    {/* Right Side: Image Accordion */}
                    <div className="w-full md:w-2/3">
                        <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
                            {accordionItems.map((item, index) => (
                                <AccordionItem
                                    key={item.id}
                                    item={item}
                                    isActive={index === activeIndex}
                                    onMouseEnter={() => handleItemHover(index)}
                                    onClick={() => setSelectedProject(item)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Detail Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    selectedProject.hasCustomDetail ? (
                        selectedProject.id === 1 ? (
                            <MultiAgentProjectDetail
                                onClose={() => setSelectedProject(null)}
                            />
                        ) : selectedProject.id === 2 ? (
                            <RagProjectDetail
                                onClose={() => setSelectedProject(null)}
                            />
                        ) : selectedProject.id === 3 ? (
                            <AutonomousBlogProjectDetail
                                onClose={() => setSelectedProject(null)}
                            />
                        ) : selectedProject.id === 4 ? (
                            <CuneiformProjectDetail
                                onClose={() => setSelectedProject(null)}
                            />
                        ) : selectedProject.id === 5 ? (
                            <EnterpriseRagProjectDetail
                                onClose={() => setSelectedProject(null)}
                            />
                        ) : null
                    ) : (
                        <ProjectDetail
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    )
                )}
            </AnimatePresence>
        </div>
    );
}
