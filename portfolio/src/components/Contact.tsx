import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" className="py-16 px-4 sm:px-8 md:px-12 lg:px-24 bg-zinc-900 text-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Footer */}
                <motion.div
                    className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-zinc-500">
                        © {new Date().getFullYear()} Yogaraja Adithya. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
