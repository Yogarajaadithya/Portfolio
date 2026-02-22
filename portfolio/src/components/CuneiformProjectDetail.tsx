import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Brain, Cpu, Database, BarChart3, ShieldCheck, Zap, Layers, Lightbulb, TrendingUp, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

import { GetStartedButton } from '@/components/ui/get-started-button';

interface CuneiformProjectDetailProps {
    onClose: () => void;
}

const metrics = [
    { value: '0.84', label: 'mAP Detection Score', icon: <BarChart3 className="w-5 h-5" /> },
    { value: '200+', label: 'Sign Classes', icon: <Database className="w-5 h-5" /> },
    { value: 'R-CNN', label: 'Detection Architecture', icon: <Cpu className="w-5 h-5" /> },
    { value: 'GPU', label: 'Accelerated Training', icon: <Zap className="w-5 h-5" /> },
];

const features = [
    { title: 'Faster R-CNN Detection Pipeline', icon: <Cpu className="w-5 h-5" />, desc: 'Two-stage object detector with Region Proposal Network (RPN) for sign candidate generation followed by ROI pooling, classification head, and bounding box regression — optimized for small, densely-packed cuneiform signs.' },
    { title: 'ResNet-50 Feature Backbone', icon: <Brain className="w-5 h-5" />, desc: 'ImageNet-pretrained ResNet-50 feature extractor fine-tuned on cuneiform tablet imagery. Transfer learning captures low-level texture features critical for distinguishing wedge-shaped sign components.' },
    { title: 'Custom Dataset Pipeline', icon: <Database className="w-5 h-5" />, desc: 'Annotated cuneiform tablet dataset with bounding box labels across 200+ sign classes. Custom PyTorch DataLoader with augmentation: rotation, contrast jitter, and elastic deformation to simulate tablet wear and lighting variation.' },
    { title: 'Anchor Box Optimization', icon: <Layers className="w-5 h-5" />, desc: 'Anchor scales and aspect ratios tuned specifically for cuneiform sign dimensions — significantly smaller and more elongated than standard object detection targets. K-means clustering on training annotations informs anchor configuration.' },
    { title: 'Multi-Scale Detection', icon: <TrendingUp className="w-5 h-5" />, desc: 'Feature Pyramid Network (FPN) integration enables detection across sign scales — from large compound signs to small determinatives — within a single forward pass, improving recall on small and partially occluded signs.' },
    { title: 'Non-Maximum Suppression Tuning', icon: <Zap className="w-5 h-5" />, desc: 'Custom NMS thresholds calibrated for densely-overlapping cuneiform signs. Soft-NMS variant used to suppress redundant detections while preserving adjacent signs that share bounding box overlap with legitimate neighbors.' },
    { title: 'OpenCV Preprocessing', icon: <Lightbulb className="w-5 h-5" />, desc: 'Adaptive histogram equalization (CLAHE), bilateral filtering, and edge enhancement applied to raw tablet scans to improve contrast and sharpen sign boundaries before model inference.' },
    { title: 'Evaluation & Metrics', icon: <BarChart3 className="w-5 h-5" />, desc: 'Per-class mAP, precision-recall curves, and confusion matrices computed at IoU thresholds 0.5 and 0.75. Failure case analysis identifies difficult sign pairs and drives targeted dataset augmentation.' },
    { title: 'Torchvision Integration', icon: <Cpu className="w-5 h-5" />, desc: 'Built on Torchvision\'s Faster R-CNN implementation for training stability and reproducibility. Custom dataset, collate function, and transform pipeline integrate cleanly with the pretrained model API.' },
    { title: 'Archaeological Output Format', icon: <Terminal className="w-5 h-5" />, desc: 'Detection outputs formatted as structured annotations: sign class, bounding box coordinates, confidence score, and tablet region metadata. Exportable to JSON and compatible with CDLI digital archive standards.' },
];

const techStack = [
    { category: 'Deep Learning', items: ['PyTorch', 'Torchvision', 'Faster R-CNN', 'ResNet-50'] },
    { category: 'Computer Vision', items: ['OpenCV', 'NumPy', 'PIL', 'Albumentations'] },
    { category: 'Training & Eval', items: ['CUDA', 'TensorBoard', 'Matplotlib', 'Scikit-learn'] },
];

const useCases = [
    { question: 'Detect and classify all signs on a newly excavated tablet scan', type: 'Sign Detection', result: 'Bounding boxes + class labels + confidence scores' },
    { question: 'Identify damaged or partially occluded signs for scholarly review', type: 'Damage Analysis', result: 'Low-confidence detections flagged for expert review' },
    { question: 'Count sign frequency across a corpus of 500 tablet images', type: 'Corpus Analysis', result: 'Per-class frequency histogram + CSV export' },
    { question: 'Locate a specific sign type (e.g. DINGIR determinative) across all tablets', type: 'Sign Search', result: 'Filtered detections with tablet + position metadata' },
    { question: 'Compare sign distribution between two archaeological sites', type: 'Comparative Study', result: 'Statistical comparison of detected class distributions' },
    { question: 'Generate a digital transcription layer over a high-res tablet image', type: 'Digitization', result: 'Annotated image with sign labels in CDLI format' },
    { question: 'Detect anomalous or previously unclassified sign forms', type: 'Discovery', result: 'Low-class-confidence clusters for new sign candidates' },
    { question: 'Batch process an entire museum collection of tablet photographs', type: 'Batch Inference', result: 'Parallel GPU inference with structured output per tablet' },
];

const challenges = [
    { challenge: 'Small, Densely Packed Signs', problem: 'Cuneiform signs are extremely small and tightly packed, causing standard anchor configurations and NMS to miss or merge adjacent detections', solution: 'K-means anchor optimization on training annotation dimensions. Custom NMS thresholds per sign class density zone. FPN multi-scale detection for improved small-object recall.' },
    { challenge: 'High Inter-Class Similarity', problem: 'Many cuneiform signs differ by a single wedge component — subtle visual differences that confuse classifiers trained on natural images', solution: 'Fine-grained classification head with higher-resolution ROI pooling (14×14 vs standard 7×7). Hard negative mining focuses training on visually similar sign pairs. Per-class calibration of confidence thresholds.' },
    { challenge: 'Dataset Scarcity & Imbalance', problem: 'Cuneiform datasets are small compared to natural image benchmarks, with severe class imbalance — common signs vastly outnumber rare ones', solution: 'Transfer learning from ImageNet reduces data requirements. Focal Loss addresses class imbalance during training. Augmentation pipeline (rotation, elastic deformation, contrast jitter) synthetically expands the training set.' },
    { challenge: 'Tablet Degradation & Lighting Variation', problem: 'Ancient tablet surfaces have cracks, erosion, and inconsistent photographic lighting that obscure sign boundaries and introduce noise', solution: 'CLAHE adaptive histogram equalization and bilateral filtering applied in preprocessing. Model trained with degradation-simulating augmentations: Gaussian noise, blur, and partial occlusion masks.' },
];

const highlights = [
    { title: 'Computer Vision', icon: <Cpu className="w-5 h-5" />, desc: 'Two-stage Faster R-CNN with FPN for multi-scale detection of small, densely-packed sign objects' },
    { title: 'Transfer Learning', icon: <Brain className="w-5 h-5" />, desc: 'ImageNet-pretrained ResNet-50 fine-tuned on a specialist domain with limited annotated data' },
    { title: 'Domain Expertise', icon: <Lightbulb className="w-5 h-5" />, desc: 'Detection pipeline designed around the unique constraints of ancient script analysis and archaeological digitization' },
    { title: 'Data Engineering', icon: <Database className="w-5 h-5" />, desc: 'Custom dataset pipeline with K-means anchor optimization, focal loss, and augmentation for imbalanced classes' },
    { title: 'Evaluation Rigour', icon: <BarChart3 className="w-5 h-5" />, desc: 'Per-class mAP, precision-recall curves, and failure case analysis driving iterative model improvement' },
    { title: 'Real Impact', icon: <TrendingUp className="w-5 h-5" />, desc: 'Enables automated digitization of thousands of tablet images, accelerating archaeological scholarship at scale' },
];

export const CuneiformProjectDetail: React.FC<CuneiformProjectDetailProps> = ({ onClose }) => {
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
                        Cuneiform Sign <br />
                        <span className="text-gray-400">Detection & Classification</span>
                    </motion.h1>

                    <motion.div
                        className="mt-12 space-y-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="space-y-6 max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                                A deep learning pipeline for automated detection and classification of ancient cuneiform signs in archaeological tablet imagery
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
                                combining Faster R-CNN with ResNet-50 feature extraction, FPN multi-scale detection, and domain-specific preprocessing to enable large-scale digitization of <span className="font-bold text-gray-900">ancient Mesopotamian artifacts</span>.
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
│                       INPUT: TABLET IMAGE                               │
│              (High-res scan of ancient cuneiform tablet)                │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       PREPROCESSING STAGE                               │
│                                                                         │
│  • CLAHE adaptive histogram equalization (contrast enhancement)         │
│  • Bilateral filtering  (noise reduction, edge preservation)            │
│  • Normalization to ImageNet mean/std                                   │
│  • Resize with aspect ratio preservation                                │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    BACKBONE: ResNet-50 + FPN                             │
│                                                                         │
│   Input Image                                                           │
│       │                                                                 │
│       ▼                                                                 │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐  │
│  │  Conv1  │──▶│  Layer1 │──▶│  Layer2 │──▶│  Layer3 │──▶│  Layer4 │  │
│  │ 64 ch   │   │ 256 ch  │   │ 512 ch  │   │ 1024 ch │   │ 2048 ch │  │
│  └─────────┘   └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘  │
│                     │             │             │             │         │
│                     └─────────────┴─────────────┴─────────────┘         │
│                                           │                              │
│                              Feature Pyramid Network                     │
│                              (P2, P3, P4, P5, P6)                       │
└──────────────────────────────┬───────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                  REGION PROPOSAL NETWORK (RPN)                          │
│                                                                         │
│  • Slides over each FPN level                                           │
│  • Generates anchor boxes (scales/ratios tuned for cuneiform)          │
│  • Objectness score + bounding box delta per anchor                     │
│  • Top-K proposals selected via Non-Maximum Suppression                 │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│               ROI POOLING & DETECTION HEAD                              │
│                                                                         │
│  ┌────────────────────────┐        ┌────────────────────────────┐       │
│  │  ROI Align (14×14)     │        │  Fully Connected Layers    │       │
│  │  (per proposal region) │───────▶│  (2048 → 1024 → 512)      │       │
│  └────────────────────────┘        └─────────────┬──────────────┘       │
│                                                  │                      │
│                               ┌──────────────────┴────────────────┐     │
│                               │                                   │     │
│                               ▼                                   ▼     │
│                    ┌──────────────────┐             ┌──────────────────┐ │
│                    │ Classification   │             │  Bounding Box    │ │
│                    │ Head             │             │  Regression Head │ │
│                    │ (200+ sign class)│             │  (Δx, Δy, Δw, Δh)│ │
│                    └──────────────────┘             └──────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     POST-PROCESSING & OUTPUT                            │
│                                                                         │
│  • Soft-NMS to handle dense sign overlap                                │
│  • Per-class confidence thresholding                                    │
│  • Output: { sign_class, bbox, confidence, tablet_region }             │
│  • Export: JSON annotations + CDLI-compatible format                    │
└─────────────────────────────────────────────────────────────────────────┘`}
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
                    <p className="text-xl text-gray-500 mb-20 max-w-2xl leading-relaxed">Computer vision capabilities tailored for ancient script detection at archaeological scale.</p>
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
                    <p className="text-xl text-gray-500 mb-20 max-w-2xl">Archaeological and scholarly applications powered by automated sign detection.</p>
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

export default CuneiformProjectDetail;
