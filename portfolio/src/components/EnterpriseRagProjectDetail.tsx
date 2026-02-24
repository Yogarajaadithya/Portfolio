import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface EnterpriseRagProjectDetailProps {
    onClose: () => void;
}

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
            className="fixed inset-0 z-[100] bg-white text-gray-900 overflow-y-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
            <button
                onClick={onClose}
                className="fixed top-6 right-8 z-[110] text-gray-400 hover:text-black transition-colors duration-200"
                aria-label="Close project detail"
            >
                <X className="w-7 h-7" />
            </button>

            {/* Title at the top */}
            <motion.div
                className="pt-32 pb-16 px-10 md:px-16 max-w-7xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h1
                    className="text-6xl md:text-7xl lg:text-[6rem] font-extrabold text-gray-900 leading-[1.02] tracking-[-0.03em]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Beyond Retrieval <br />
                    <span className="text-gray-400">Optimizing Provenance and Faithfulness in Enterprise RAG</span>
                </h1>
            </motion.div>

            {/* Centered working message */}
            <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
                <motion.div
                    className="text-center px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    <h2
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        Currently Working on it
                    </h2>
                    <p className="text-xl text-gray-400 font-medium">Check back soon.</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default EnterpriseRagProjectDetail;
