import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface AboutDetailProps {
    onClose: () => void;
}

interface AboutEntry {
    number: string;
    label: string;
    title: string;
    description: string;
    items?: string[];
}

const ABOUT_ENTRIES: AboutEntry[] = [
    {
        number: "01",
        label: "Who I Am",
        title: "Hi, I'm Adithya.",
        description:
            "This page isn't a resume. It's how I got here. And trust me, it's been a winding road.\n\n\n\nI'm 23, based in Berlin, and somehow ended up deep in the world of AI. Not because I planned it, but because I couldn't stop. There's something about this space that just doesn't bore me. I can sit with it for days and still want more. That's rare, and I know it.\n\nIt didn't start with agents or LLMs though. It started with messy datasets, cleaning scripts, and trying to make sense of numbers after moving to Germany. Then came ML models, visualizations, and that slow realization that I actually enjoy this. Like genuinely enjoy it. Not \"I should learn this for my career\" enjoy it, but \"it's 2am and I don't want to stop\" enjoy it.\n\n\n\nBut I'm not just someone who lives behind a screen. I shoot, edit, and produce my own photos and videos, I trek, I love the kind of silence you only find in nature, and I'm a little crazy about bikes and cars. I take fitness and nutrition seriously too, it's something I've put real time into understanding, not just practicing. Sport, adventure, movement, that's the other half of me. I think that's why I build the way I do. I don't like sitting still, even in code.\n\n\n\nJack of all trades? Absolutely. And I'll own it.\n\n\n\nCurrently finishing my thesis in Berlin, graduating August 2026  and building things the whole way through.",
        items: [],
    },
    {
        number: "02",
        label: "The Beginning",
        title: "Where It All Started",
        description:
            "I landed in Germany on October 14th 2024. No idea about the job market, the culture, the people, or honestly even the weather. Everything surprised me. And I didn't know much about Germany yet. But I had my laptop, an assignment, and a dataset waiting to be cleaned.\n\n\n\nMy first assignment was data wrangling. Small dataset, simple task. Clean it, understand it, make sense of it. Nothing glamorous. But something about it clicked. I kept going further than the assignment asked. I wanted to understand the domain, understand why the data looked the way it did, understand what it was actually saying.\n\n\n\nThen came a Data Engineering course where I trained my first ML model. It was predicting house sales prices. When it actually predicted correctly, I remember just sitting there thinking \"wow, this is something.\" It wasn't a big moment on paper. But for me it was the first time I felt like technology wasn't just something I was studying. It was something I could actually build with.\n\n\n\nLeaving home and my friends behind felt like losing something important. And maybe I did. But somewhere between that first dataset and that first prediction, I realized I hadn't lost anything. I had just stepped out of my comfort zone for the first time.",
        items: [],
    },
    {
        number: "03",
        label: "The Shift",
        title: "Finding My Way to AI",
        description:
            "I had been using LLMs for 3 to 4 years already. But for a long time it was just a tool, something I used for assignments or to learn something new faster. I never thought about building with them.\n\n\n\nThat changed in August 2025.\n\n\n\nI made a decision to fully shift towards AI Engineering. It wasn't easy and honestly I wouldn't have pulled the trigger without my friend Kapil, who was one of the biggest reasons I had the confidence to make that call. Having someone believe in your decision before you fully believe in it yourself makes all the difference.\n\n\n\nAnd to make it real, I took a risk. I chose a capstone project that carried the weight of 3 subjects combined, in an area I had almost no depth in. No safety net. I just decided to learn and build at the same time and figure it out as I went.\nI spent hours on YouTube, Coursera, papers, articles. I annoyed ChatGPT so many times asking the same thing in different ways until it finally made sense. It was frustrating and exciting at the same time. But somewhere in that process I realized I had developed something useful, the ability to pick up anything new and actually run with it fast.\n\n\n\nMy first agent. A Text to SQL agent. And when it worked, I felt something I didn't expect. For years my happiness was hanging out with friends, bikes, cars, movies, shows. Good things. But this was different. This was the first time I felt genuinely happy building something. Something that solved a real problem. Something meaningful.\n\n\n\nThat was the moment I knew this was my thing.",
        items: [],
    },
    {
        number: "04",
        label: "Building",
        title: "Projects That Shaped Me",
        description:
            "Every project teaches you something. But some projects change how you see yourself as an engineer.\n\n\n\nThe one that did that for me was the Multi-Agent Assistant for Smarter Analytics. A modular system where multiple agents work together, a Planner, a Text-to-SQL agent, a Stats agent, a Visualization agent, each one doing its job and handing off to the next. Built with Python, FastAPI, LangChain, and React. On paper it sounds clean. In reality, it was messy, iterative, and exactly the kind of problem that keeps you up at night.\n\n\n\nThe hardest part wasn't the architecture or the code. It was writing the right prompts for each agent. Getting an agent to reason correctly, stay in its lane, and not break the whole pipeline took more iteration than I expected. One wrong instruction and the whole workflow fell apart. And on top of that, I wasn't building this for one specific dataset. The whole point was to make it work on any dataset, fully generalized, no hardcoding. That meant every module had to be flexible enough to handle whatever data you threw at it. I rewrote those prompts more times than I can count. But when it finally clicked and the system worked end to end on data it had never seen before, that was the moment I thought \"okay, I can build anything now.\" That project gave me my base and my confidence.\n\n\n\nThe RAG with Long-Term Memory System was a different kind of challenge. Building a system that doesn't just retrieve information but actually remembers across sessions, with episodic, semantic, and procedural memory types, time-based decay, and vector embeddings, taught me how to think about AI systems the way you think about how humans actually retain knowledge.\n\n\n\nThen there was the Cuneiform Sign Detection project. Ancient tablet images, archaeology, Faster R-CNN, and a COCO-formatted dataset. Completely different world. But it taught me that the fundamentals transfer everywhere. Computer vision, spatial annotations, mAP evaluation, it all pushed me to think beyond language models and understand AI more broadly.\n\n\n\nThree very different projects, Three very different problems. But each one added a layer to how I think and build.",
        items: [],
    },
    {
        number: "05",
        label: "Life",
        title: "Life Beyond Code",
        description:
            "Not everything about living in Berlin is about AI.\n\n\n\nEvery evening I go for a run. I cook, sometimes spending more time on it than I planned. I keep telling myself I will get back to the gym soon, just haven't found the time yet. I play badminton with friends too, finding a time that works for everyone is basically its own scheduling problem, but we make it work. And I travel whenever I get the chance because seeing new places is one of those things that genuinely recharges me.\n\n\n\nWarsaw was one of those trips that stuck with me. Beautiful city, unexpected in the best way. Travelling has a way of reminding you how much there is outside your own bubble.\nI also shoot and edit photos and videos everywhere I go. Streets, nature, random moments. I like to think of myself as a part time content creator, just not an active one.\nBerlin has surprised me in a lot of ways too. The culture, the people, the energy of the city. But nothing quite prepared me for Oktoberfest and the sheer amount of beer I saw people drinking. I just stood there taking it all in.\n\n\n\nLife here is a good balance. There is always something to build, something to learn, somewhere to go, and someone to play badminton with.",
        items: [],
    },
    {
        number: "06",
        label: "Right Now",
        title: "These Days",
        description:
            "Life right now is simple. Be productive. Keep moving.\n\n\n\nI just started my thesis, Beyond Retrieval: Optimizing Provenance and Faithfulness in Enterprise RAG. It is early days but it is already pushing me to think deeper about how RAG systems actually work at an enterprise level, not just technically but in terms of trust, accuracy, and where answers actually come from.\nWhile that is happening, I am also actively looking for an AI Engineer role across Germany. The job search and the thesis are running in parallel, which keeps things interesting.\n\n\n\nAnd in between all of that, I work as a Shift Leader at Burgermeister three days a week. Yes, the AI Engineer makes burgers too. No regrets.\n\n\n\nWorkout x good food x Tech. That is pretty much the formula right now.\n\n\n\nIf you are building something interesting in AI and looking for someone who is genuinely obsessed with this space, I would love to connect.",
        items: [],
    },
];

export function AboutDetail({ onClose }: AboutDetailProps) {
    // 🔶 LOCK BODY SCROLL
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-white font-sans flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            {/* 🔶 SCROLLABLE CONTENT WRAPPER */}
            <div className="absolute inset-0 overflow-y-auto flex justify-center z-10">
                {/* Close Button - Minimal, fixed positioning (inside scroll wrapper but fixed) */}
                <button
                    onClick={onClose}
                    className="fixed top-8 right-8 z-[110] p-2 text-gray-400 hover:text-gray-900 transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* 🔶 PAGE CONTAINER */}
                <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 pb-32">
                    {/* 🔶 SPACER - Force vertical positioning */}
                    <div style={{ height: '20vh' }} aria-hidden="true" />

                    {/* 🔶 PAGE HEADER - Alignment fixed */}
                    <div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                            About Me
                        </h1>
                        <p className="text-2xl text-gray-500 max-w-3xl leading-relaxed">
                            A journey from curiosity to AI engineering. The people, projects, and turning points that shaped who I am.
                        </p>
                    </div>

                    {/* 🔶 SPACER - Force gap between Header and Content */}
                    <div style={{ height: '15vh' }} aria-hidden="true" />

                    {/* 🔶 CHANGELOG GRID */}
                    <div className="flex flex-col gap-16 md:gap-24">
                        {ABOUT_ENTRIES.map((entry, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-12 gap-6 relative"
                            >
                                {/* 🔶 LEFT COLUMN (Labels restored) */}
                                <div className="hidden md:flex flex-col items-start md:sticky md:top-32 h-fit gap-6">
                                    <span className="text-base font-medium text-black uppercase tracking-widest">
                                        {entry.label}
                                    </span>

                                </div>

                                {/* 🔶 RIGHT COLUMN (Content) */}
                                <div className="space-y-6">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                                        {entry.title}
                                    </h2>

                                    <div style={{ height: '3rem' }} aria-hidden="true" />

                                    <div className={`prose prose-gray max-w-none`}>
                                        {entry.description.split('\n\n').map((para, i) =>
                                            para.trim() === '' ? (
                                                <div key={i} className="h-6" aria-hidden="true" />
                                            ) : (
                                                <p key={i} className="text-xl text-gray-600 leading-relaxed mb-5 last:mb-0 text-justify">{para}</p>
                                            )
                                        )}

                                        {entry.items && entry.items.length > 0 && (
                                            <ul className="mt-8 space-y-4 list-none pl-0">
                                                {entry.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                                        {/* Bullet Wrapper: height matches text line-height ~32px */}
                                                        <div className="flex h-[2rem] items-center shrink-0">
                                                            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                                                        </div>
                                                        <span className="text-xl leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
