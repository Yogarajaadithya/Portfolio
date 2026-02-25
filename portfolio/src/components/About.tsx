import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WavePath } from '@/components/ui/wave-path';
import { GraduationCap, Briefcase, MapPin, Calendar } from 'lucide-react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { AboutDetail } from '@/components/AboutDetail';

// ── Work Experience Data ──────────────────────────────────────────────────────
const EXPERIENCE = [
    {
        role: 'Data Science Intern',
        company: 'TechCiti Technologies',
        period: 'Apr 2024 – Sep 2024',
        location: 'Bengaluru, India',
        highlights: [
            'Built data pipelines using Python and SQL; automated reporting workflows for analytics.',
            'Applied ML models (Linear Regression, K-Means, Random Forest) for trend and performance analysis.',
            'Designed Power BI dashboards to visualize KPIs and model insights.',
            'Cleaned large datasets and collaborated cross-functionally to improve data accuracy.',
        ],
    },
];

// ── Education Data ────────────────────────────────────────────────────────────
const EDUCATION = [
    {
        degree: 'Master of Science – Data Science',
        institution: 'University of Europe for Applied Sciences',
        period: 'Sep 2024 – Aug 2026',
        location: 'Germany',
    },
];

// ── Shared card ───────────────────────────────────────────────────────────────
function TimelineCard({
    title,
    subtitle,
    period,
    location,
    bullets,
    detail,
    delay,
}: {
    title: string;
    subtitle: string;
    period: string;
    location: string;
    bullets?: string[];
    detail?: string;
    delay: number;
}) {
    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="rounded-xl border border-zinc-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1" style={{ paddingLeft: '0.75rem' }}>
                    <div>
                        <h4 className="text-lg md:text-2xl font-semibold text-zinc-900 leading-tight">{title}</h4>
                        <p className="text-base md:text-xl font-medium text-zinc-500 mt-0.5">{subtitle}</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 shrink-0" style={{ paddingRight: '0.75rem' }}>
                        <span className="flex items-center gap-1 text-sm text-zinc-900 font-medium">
                            <Calendar className="h-4 w-4" /> {period}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-zinc-900 font-medium">
                            <MapPin className="h-4 w-4" /> {location}
                        </span>
                    </div>
                </div>

                {bullets && (
                    <ul className="mt-2 space-y-1.5" style={{ paddingLeft: '0.75rem' }}>
                        {bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm md:text-xl text-zinc-600">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" style={{ marginTop: '0.6rem' }} />
                                {b}
                            </li>
                        ))}
                    </ul>
                )}

                {detail && (
                    <p className="mt-2 text-sm text-zinc-500">{detail}</p>
                )}
            </div>
        </motion.div>
    );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function About() {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <section id="about" className="py-16 sm:py-24 md:py-40 lg:py-64 bg-zinc-50">
                <div className="container mx-auto px-4 w-full">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                        {/* ── LEFT: Title + Button ─────────────────────────────── */}
                        <motion.div
                            className="w-full md:w-1/3 flex flex-col items-start"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2
                                className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight tracking-tighter mb-8"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                About Me
                            </h2>
                            <InteractiveHoverButton
                                onClick={() => setShowDetail(true)}
                                text="More"
                                className="h-14 w-40 text-lg rounded-2xl"
                            />
                        </motion.div>

                        {/* ── RIGHT: Experience → WavePath → Education ─────────── */}
                        <div className="w-full md:w-2/3 flex flex-col gap-6">

                            {/* Experience group */}
                            <div className="flex flex-col gap-3" style={{ marginTop: '3rem' }}>
                                <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Briefcase className="h-5 w-5 text-zinc-900" />
                                    <h3 className="text-base font-bold uppercase tracking-widest text-zinc-900">
                                        Work Experience
                                    </h3>
                                </motion.div>
                                <div className="flex flex-col gap-5 border-l-2 border-zinc-100 ml-3">
                                    {EXPERIENCE.map((exp, i) => (
                                        <TimelineCard
                                            key={i}
                                            title={exp.role}
                                            subtitle={exp.company}
                                            period={exp.period}
                                            location={exp.location}
                                            bullets={exp.highlights}
                                            delay={0.1 * i}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* ── WavePath divider ── */}
                            <div className="my-4 flex flex-col items-center text-zinc-900">
                                <WavePath className="w-full" />
                            </div>

                            {/* Education group */}
                            <div className="flex flex-col gap-3" style={{ marginBottom: '3rem' }}>
                                <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <GraduationCap className="h-5 w-5 text-zinc-900" />
                                    <h3 className="text-base font-bold uppercase tracking-widest text-zinc-900">
                                        Education
                                    </h3>
                                </motion.div>
                                <div className="flex flex-col gap-5 border-l-2 border-zinc-100 ml-3">
                                    {EDUCATION.map((edu, i) => (
                                        <TimelineCard
                                            key={i}
                                            title={edu.degree}
                                            subtitle={edu.institution}
                                            period={edu.period}
                                            location={edu.location}
                                            delay={0.1 * i + 0.3}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ── About Detail Overlay ── */}
            <AnimatePresence>
                {showDetail && (
                    <AboutDetail onClose={() => setShowDetail(false)} />
                )}
            </AnimatePresence>
        </>
    );
}
