import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

// Template contact info - Replace with your info
const CONTACT_INFO = {
    email: 'your.email@example.com',
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername',
    location: 'Berlin, Germany',
};

const SOCIAL_LINKS = [
    { icon: Mail, label: 'Email', href: `mailto:${CONTACT_INFO.email}`, value: CONTACT_INFO.email },
    { icon: Linkedin, label: 'LinkedIn', href: CONTACT_INFO.linkedin, value: 'LinkedIn Profile' },
    { icon: Github, label: 'GitHub', href: CONTACT_INFO.github, value: 'GitHub Profile' },
];

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-16 lg:px-24 bg-zinc-900 text-white">
            <div className="max-w-[1400px] mx-auto">
                <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-8"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Let's Connect
                </motion.h2>

                <motion.p
                    className="text-xl text-zinc-400 mb-16 max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Have a project in mind or just want to chat? Feel free to reach out!
                </motion.p>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* Contact Links */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-lg text-zinc-300 hover:text-white transition-colors group"
                            >
                                <link.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span>{link.value}</span>
                            </a>
                        ))}
                        <div className="flex items-center gap-4 text-lg text-zinc-300">
                            <MapPin className="w-6 h-6" />
                            <span>{CONTACT_INFO.location}</span>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 font-semibold rounded-full hover:bg-zinc-200 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            Send me an email
                        </a>
                        <p className="mt-6 text-zinc-500">
                            Or download my CV for more details
                        </p>
                        <a
                            href="#" // Add your CV link here
                            className="inline-block mt-2 text-zinc-300 underline hover:text-white transition-colors"
                        >
                            Download CV →
                        </a>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    className="mt-24 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-zinc-500">
                        © {new Date().getFullYear()} Yogaraja Adithya. All rights reserved.
                    </p>
                    <p className="text-zinc-500">
                        Built with React & Tailwind CSS
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
