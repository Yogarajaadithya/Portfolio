import { motion } from 'framer-motion';

// Template skills - Replace with your skills
const SKILLS = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma'] },
    { category: 'Other', items: ['Agile', 'CI/CD', 'Testing', 'API Design'] },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-16 lg:px-24 bg-white">
            <div className="max-w-[1400px] mx-auto">
                <motion.h2
                    className="text-4xl md:text-6xl font-bold text-zinc-900 mb-16"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Skills
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SKILLS.map((skillGroup, groupIndex) => (
                        <motion.div
                            key={skillGroup.category}
                            className="p-6 bg-zinc-50 rounded-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                        >
                            <h3 className="text-xl font-semibold text-zinc-900 mb-4">
                                {skillGroup.category}
                            </h3>
                            <ul className="space-y-2">
                                {skillGroup.items.map((skill, index) => (
                                    <li key={index} className="text-zinc-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
