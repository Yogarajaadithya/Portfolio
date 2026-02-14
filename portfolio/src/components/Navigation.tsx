import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
];

export default function Navigation({ isOpen, onClose }: NavigationProps) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Prevent body scroll when menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.nav
                    className="fixed inset-0 bg-white/98 flex flex-col items-center justify-center z-[200]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.button
                        className="absolute top-6 right-8 md:right-16 text-4xl text-zinc-900 hover:rotate-90 transition-transform duration-300"
                        aria-label="Close menu"
                        onClick={onClose}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        &times;
                    </motion.button>
                    <ul className="text-center space-y-4">
                        {navLinks.map((link, index) => (
                            <motion.li
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                            >
                                <a
                                    href={link.href}
                                    onClick={onClose}
                                    className="text-4xl md:text-6xl font-bold text-zinc-900 hover:opacity-70 transition-opacity relative group"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-zinc-900 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
