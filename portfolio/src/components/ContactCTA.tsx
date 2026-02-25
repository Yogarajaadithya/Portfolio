import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { NeonButton } from "@/components/ui/neon-button";
import { Mail, ArrowRight, GitBranch } from "lucide-react";

const words = [
    { text: "Let's" },
    { text: "build" },
    { text: "something" },
    { text: "amazing" },
    { text: "together.", className: "text-blue-500 dark:text-blue-500" },
];

export default function ContactCTA() {
    return (
        <section className="bg-zinc-900 border-t border-zinc-800 px-8 flex items-center justify-center" style={{ paddingTop: '12rem', paddingBottom: '12rem' }}>
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
                <p className="text-zinc-500 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                    Interested in working together?
                </p>

                <TypewriterEffectSmooth
                    words={words}
                    className="justify-center"
                    cursorClassName="bg-blue-500"
                />

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                    <NeonButton href="mailto:adithyaainn@gmail.com" size="lg">
                        <Mail className="w-5 h-5 shrink-0" />
                        Get in Touch
                    </NeonButton>
                    <NeonButton
                        href="https://www.linkedin.com/in/yogaraja-adithya-somasundar-82518826b"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="lg"
                    >
                        Connect on LinkedIn
                        <ArrowRight className="w-5 h-5 shrink-0" />
                    </NeonButton>
                    <NeonButton
                        href="https://github.com/Yogarajaadithya"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="lg"
                    >
                        <GitBranch className="w-5 h-5 shrink-0" />
                        GitHub
                    </NeonButton>
                </div>
            </div>
        </section>
    );
}
