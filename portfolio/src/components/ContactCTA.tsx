import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Mail, ArrowRight } from "lucide-react";

const words = [
    { text: "Let's" },
    { text: "build" },
    { text: "something" },
    { text: "amazing" },
    { text: "together.", className: "text-blue-500 dark:text-blue-500" },
];

export default function ContactCTA() {
    return (
        <section className="bg-zinc-900 border-t border-zinc-800 min-h-[60vh] px-8 flex items-center justify-center">
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
                <p className="text-zinc-500 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                    Interested in working together?
                </p>

                <TypewriterEffectSmooth
                    words={words}
                    className="justify-center my-4"
                    cursorClassName="bg-blue-500"
                />

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-zinc-900 text-sm font-semibold rounded-full hover:bg-zinc-200 transition-all hover:scale-105"
                    >
                        <Mail className="w-4 h-4" />
                        Get in Touch
                    </a>
                    <a
                        href="https://linkedin.com/in/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 border border-zinc-600 text-white text-sm font-semibold rounded-full hover:border-white transition-all hover:scale-105"
                    >
                        Connect on LinkedIn
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
