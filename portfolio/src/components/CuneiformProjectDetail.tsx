import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Brain, Cpu, Database, BarChart3, ShieldCheck, Zap, Layers, Lightbulb, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

import { GetStartedButton } from '@/components/ui/get-started-button';

interface CuneiformProjectDetailProps {
    onClose: () => void;
}

const metrics = [
    { value: '0.123', label: 'AP@IoU=0.5 Score', icon: <BarChart3 className="w-5 h-5" /> },
    { value: '30', label: 'Sign Classes Detected', icon: <Database className="w-5 h-5" /> },
    { value: 'Faster R-CNN', label: 'Detection Architecture', icon: <Cpu className="w-5 h-5" /> },
    { value: '50', label: 'Training Epochs', icon: <Zap className="w-5 h-5" /> },
];

const features = [
    { title: 'Faster R-CNN Detection Architecture', icon: <Cpu className="w-5 h-5" />, desc: 'Two-stage object detector leveraging Region Proposal Network (RPN) for sign candidate generation followed by ROI pooling and dual-head classification and bounding box regression. Architecture optimized for detecting small, densely-packed cuneiform characters with significant overlap and irregular spacing typical of 2000-year-old writing systems.' },
    { title: 'ResNet-50 + FPN Feature Extraction', icon: <Brain className="w-5 h-5" />, desc: 'ImageNet-pretrained ResNet-50 convolutional backbone integrated with Feature Pyramid Network (FPN) for multi-scale feature extraction. Transfer learning approach captures low-level texture patterns and wedge-shaped stroke features critical for distinguishing cuneiform sign components across varying scales and degradation levels.' },
    { title: 'Domain-Adapted Anchor Box System', icon: <Layers className="w-5 h-5" />, desc: 'Custom anchor generation pipeline using K-means clustering (k=5) on training set sign dimensions to derive domain-specific anchor configurations. Anchor sizes [45, 87, 60, 70, 148] and aspect ratios [1.07, 0.62, 0.67, 1.19, 0.72] specifically tuned for cuneiform morphology — significantly smaller and more varied than standard object detection anchors (e.g., COCO 32–512 range).' },
    { title: 'COCO-Format Annotation Pipeline', icon: <Database className="w-5 h-5" />, desc: 'Curated dataset of 71 ancient Mesopotamian tablets from the Cuneiform Digital Library Initiative (CDLI), segmented into 113 obverse/reverse views with 3,743 sign-level bounding box annotations. Standardized COCO format enables compatibility with pycocotools evaluation framework and facilitates dataset expansion and benchmark comparison.' },
    { title: 'Multi-Class Sign Classification', icon: <ShieldCheck className="w-5 h-5" />, desc: 'Detection and classification across 30 most frequent cuneiform sign classes selected from 251 unique characters in the dataset. Class selection based on occurrence frequency to address extreme class imbalance while maintaining coverage of common administrative and lexical signs. MZL (Mesopotamisches Zeichenlexikon) standard notation system for categorical labels.' },
    { title: 'Multi-Scale Detection via FPN', icon: <TrendingUp className="w-5 h-5" />, desc: 'Feature Pyramid Network integration enables simultaneous detection across multiple sign scales within a single forward pass — from large compound logograms to small phonetic complements and determinatives. Pyramid architecture improves recall on small and partially degraded signs common in damaged archaeological artifacts.' },
    { title: 'Custom PyTorch DataLoader', icon: <Zap className="w-5 h-5" />, desc: 'Tailored Dataset class implementing COCO annotation parsing, image loading, and target dictionary construction (boxes, labels, image_id). Custom collate function handles variable-length annotation lists across batch dimensions. Batch size optimized to 2 images for GPU memory constraints with high-resolution tablet scans.' },
    { title: 'Stratified Train-Test Splitting', icon: <BarChart3 className="w-5 h-5" />, desc: '80/20 train-test split (90 training / 23 test images) with stratification ensuring representation of top sign classes across both sets. Random seed (random_state=42) fixed for reproducibility. Split performed at image level to prevent data leakage from same-tablet obverse/reverse pairs.' },
    { title: 'Comprehensive Evaluation Metrics', icon: <BarChart3 className="w-5 h-5" />, desc: 'COCO evaluation protocol computing mean Average Precision (mAP) at IoU thresholds 0.5:0.95 (primary metric: 0.068) and AP@IoU=0.5 (0.123). Per-class Average Precision analysis identifies high-performing sign categories and challenging class pairs. Confusion matrix visualization for top-5 sign classes reveals systematic misclassification patterns.' },
    { title: 'GPU-Accelerated Training', icon: <Cpu className="w-5 h-5" />, desc: 'CUDA-enabled PyTorch training pipeline with automatic device detection and tensor placement. GPU acceleration essential for processing high-resolution tablet imagery (typical dimensions 800–1400 pixels) and deep ResNet-50 backbone inference across 50 training epochs.' },
    { title: 'TorchVision Integration', icon: <Cpu className="w-5 h-5" />, desc: "Built on TorchVision's pretrained Faster R-CNN implementation (fasterrcnn_resnet50_fpn) ensuring training stability, reproducibility, and access to established computer vision best practices. Custom anchor generator and box predictor components integrate cleanly with pretrained model API while maintaining compatibility with TorchVision transforms and utilities." },
    { title: 'Baseline Performance Benchmarking', icon: <TrendingUp className="w-5 h-5" />, desc: 'Establishes first quantitative benchmark for cuneiform sign detection on CDLI imagery with documented mAP and per-class performance. Baseline metrics (mAP 0.068, AP@0.5: 0.123) reflect dataset challenges — limited training data, extreme class imbalance, dense overlapping text, and archaeological degradation — and provide foundation for future architectural improvements and dataset expansion.' },
];

const techStack = [
    { category: 'Deep Learning Framework', items: ['PyTorch', 'TorchVision', 'Faster R-CNN', 'ResNet-50 FPN'] },
    { category: 'Computer Vision & Image Processing', items: ['PIL (Pillow)', 'NumPy', 'Matplotlib', 'Seaborn'] },
    { category: 'Training & Evaluation', items: ['CUDA', 'pycocotools', 'Scikit-learn', 'tqdm'] },
];

const challenges = [
    { challenge: 'Small, Densely Overlapping Signs', problem: 'Cuneiform signs are extremely small (typical dimensions 40-150 pixels) and densely packed with overlapping bounding boxes due to insufficient horizontal and vertical spacing in ancient writing. Standard COCO anchor configurations (32-512 pixels) and default NMS thresholds designed for separated objects fail to detect adjacent signs without merging detections.', solution: 'K-means clustering (k=5) on training set sign dimensions derives custom anchor boxes: sizes [45, 87, 60, 70, 148] and aspect ratios [1.07, 0.62, 0.67, 1.19, 0.72] specifically tuned for cuneiform morphology. Feature Pyramid Network (FPN) integration provides multi-scale detection capabilities, improving recall on small signs while maintaining detection of larger compound characters.' },
    { challenge: 'Extreme Class Imbalance', problem: 'Original dataset contains 251 unique cuneiform signs with severe class imbalance — common administrative signs appear hundreds of times while rare phonetic complements have fewer than 5 instances. Training on the full class set leads to model bias toward majority classes and poor generalization.', solution: 'Top-30 class selection strategy filters dataset to most frequent signs, reducing classes from 251 to 30 while retaining 3,743 annotations across 113 images. Statistical frequency analysis ensures selected classes represent common administrative and lexical signs with sufficient training examples per category.' },
    { challenge: 'Limited Training Data', problem: 'Only 71 cuneiform tablets available from CDLI with sign-level annotations, yielding just 90 training images after obverse/reverse segmentation and 80/20 split. Dataset size orders of magnitude smaller than standard computer vision benchmarks (COCO: 118K images), risking severe overfitting.', solution: 'Transfer learning from ImageNet-pretrained ResNet-50 backbone leverages learned low-level feature extractors (edges, textures) applicable to cuneiform wedge patterns. Fine-tuning approach requires significantly less labeled data than training from scratch. Data augmentation experiments (rotation, stretching, sharpening) conducted to expand training set, though did not yield mAP improvements on this dataset.' },
    { challenge: 'Historical Writing Variation & Tablet Damage', problem: 'Dataset spans 2000 years of evolving cuneiform writing systems, introducing significant intra-class variation in sign execution styles. Additionally, archaeological artifacts exhibit physical damage: cracks, erosion, incomplete inscriptions, and surface degradation that obscure sign boundaries.', solution: 'Deep feature learning via ResNet-50 backbone captures texture patterns robust to stylistic variation through hierarchical feature extraction. Transfer learning initialization provides pre-trained weights that generalize across visual domains. Model trained end-to-end learns damage-invariant representations from diverse tablet conditions in training set.' },
    { challenge: 'Unusual Sign Aspect Ratios', problem: 'Cuneiform signs exhibit highly variable aspect ratios — from very thin vertical wedges (ratio ~1.2) to wide horizontal strokes (ratio ~0.6) — differing significantly from standard object detection assumptions (typical ratios: 0.5, 1.0, 2.0 for natural objects).', solution: 'Data-driven anchor generation using K-means on training bounding boxes automatically discovers domain-specific aspect ratios [1.07, 0.62, 0.67, 1.19, 0.72]. Custom anchor configuration replaces standard ratios, improving RPN proposal quality and reducing false negatives on elongated sign shapes.' },
    { challenge: 'Complex Sign Hierarchies', problem: 'Smaller cuneiform signs serve as building blocks for larger compound signs, creating nested and partially overlapping bounding boxes. Multi-scale detection must identify both atomic components and composite characters without redundant detections.', solution: 'Feature Pyramid Network architecture processes features at multiple resolutions simultaneously, enabling detection of small atomic signs (e.g., determinatives) and large compound signs in a single forward pass. Multi-scale approach improves detection consistency across the sign hierarchy.' },
];

const highlights = [
    { title: 'Computer Vision', icon: <Cpu className="w-5 h-5" />, desc: 'Two-stage Faster R-CNN with ResNet-50 FPN backbone for multi-scale detection of small, densely-overlapping cuneiform signs.' },
    { title: 'Transfer Learning', icon: <Brain className="w-5 h-5" />, desc: 'ImageNet-pretrained ResNet-50 fine-tuned on archaeological domain with limited training data (90 images, 3,743 annotations).' },
    { title: 'Domain Expertise', icon: <Lightbulb className="w-5 h-5" />, desc: 'Detection pipeline engineered around cuneiform-specific constraints: custom K-means anchors, unusual aspect ratios, and 2000-year writing variation.' },
    { title: 'Data Engineering', icon: <Database className="w-5 h-5" />, desc: 'CDLI-to-COCO pipeline with tablet segmentation, top-30 class selection, stratified splitting, and custom anchor optimization via clustering.' },
    { title: 'Evaluation Rigor', icon: <BarChart3 className="w-5 h-5" />, desc: 'COCO evaluation protocol with per-class mAP, AP@IoU metrics, confusion matrices, and systematic baseline benchmarking.' },
    { title: 'Real Impact', icon: <TrendingUp className="w-5 h-5" />, desc: 'Enables automated sign detection on thousands of tablets, accelerating cuneiform digitization and computational paleography at scale.' },
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
                                A deep learning-based computer vision system for automated detection and classification of ancient cuneiform characters in 2D archaeological tablet imagery.
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
                                This project addresses the challenging task of digitizing and analyzing Mesopotamian artifacts spanning 2000 years of writing evolution, enabling large-scale computational analysis of <span className="font-bold text-gray-900">cuneiform inscriptions</span>.
                            </p>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <a href="https://github.com/Yogarajaadithya/Cuneiform-Sign-Detection-and-Classification-using-Faster-R-CNN.git" target="_blank" rel="noopener noreferrer" className="inline-block">
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
{`┌──────────────────────────────────────────────────────────────┐
│                     CDLI Image Database                      │
│                     (71 Ancient Tablets)                     │
└──────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────┐
│                 Preprocessing & Segmentation                 │
│                   • Obverse/Reverse Split                    │
│                      • 113 Total Images                      │
│                     • 90 Train / 23 Test                     │
└──────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────┐
│                Annotation Processing Pipeline                │
│                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐  │
│  │  CSV Parser  │     │ Top 30 Class │     │ COCO Format  │  │
│  │ • 251 signs  │  →  │    Filter    │  →  │  Converter   │  │
│  │ • MZL labels │     │ • 3,743 bbox │     │              │  │
│  └──────────────┘     └──────────────┘     └──────────────┘  │
└──────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────┐
│                   Anchor Box Optimization                    │
│                  • K-Means Clustering (k=5)                  │
│                • Sizes: [45, 87, 60, 70, 148]                │
│          • Ratios: [1.07, 0.62, 0.67, 1.19, 0.72]            │
└──────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────┐
│                Faster R-CNN Training Pipeline                │
│                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐  │
│  │  ResNet-50   │     │     FPN      │     │  RPN + ROI   │  │
│  │   Backbone   │  →  │ Multi-scale  │  →  │    Heads     │  │
│  │ (Pretrained) │     │   Features   │     │  31 Classes  │  │
│  └──────────────┘     └──────────────┘     └──────────────┘  │
│                                                              │
│                       Training Config:                       │
│                • SGD (lr=0.001, momentum=0.9)                │
│                  • 50 Epochs, Batch Size: 2                  │
│                   • CUDA GPU Acceleration                    │
└──────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────┐
│                      Model Checkpoints                       │
│              (Saved: Epoch 10, 20, 30, 40, 50)               │
└──────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────┐
│               Inference & Evaluation Pipeline                │
│                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐  │
│  │  Prediction  │     │     COCO     │     │ Performance  │  │
│  │  Generation  │  →  │  Evaluator   │  →  │ • mAP: 0.068 │  │
│  │ (23 images)  │     │(pycocotools) │     │ •  AP@0.5:   │  │
│  │              │     │              │     │    0.123     │  │
│  └──────────────┘     └──────────────┘     └──────────────┘  │
└──────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────┐
│                   Visualization & Analysis                   │
│                   • Bounding Box Overlays                    │
│                      • Confusion Matrix                      │
│                    • Per-Class AP Scores                     │
└──────────────────────────────────────────────────────────────┘`}
                                </pre>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== FEATURES ====== */}
            <section className="bg-gray-200" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="container mx-auto max-w-7xl px-6">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Key Features
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl leading-relaxed" style={{ marginBottom: '2rem' }}>Computer vision capabilities tailored for ancient cuneiform script detection and classification at archaeological scale.</p>
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
            <section className="pt-32 pb-16 bg-white">
                <div className="container mx-auto max-w-7xl px-6">
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
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== CHALLENGES ====== */}
            <section className="bg-gray-200" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
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
            </section>

            {/* Explicit spacing between sections */}
            <div className="w-full bg-white h-12 md:h-24"></div>

            {/* ====== HIGHLIGHTS / DEMONSTRATES ====== */}
            <section className="py-16 bg-white">
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
                        <a href="https://github.com/Yogarajaadithya/Cuneiform-Sign-Detection-and-Classification-using-Faster-R-CNN.git" target="_blank" rel="noopener noreferrer">
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
