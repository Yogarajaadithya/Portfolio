import { motion } from 'framer-motion';
import { AboutGlowingCards } from '@/components/ui/about-glowing-cards';

export default function About() {
    return (
        <section id="about" className="py-24 px-16 lg:px-24 bg-zinc-50">
            <div className="max-w-[1400px] mx-auto">
                <motion.h2
                    className="text-4xl md:text-6xl font-bold text-zinc-900 mb-16"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    About Me
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-semibold text-zinc-900 mb-6">
                            Who I Am
                        </h3>
                        <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                            [Your introduction goes here. Talk about your background, what drives you, and what makes you unique.]
                        </p>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            [Add more about your journey, education, or what you're passionate about.]
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="w-full max-w-xl translate-x-24 lg:translate-x-60">
                            <AboutGlowingCards />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
