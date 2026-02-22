import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export interface FeatureItem {
    id: number;
    title: string;
    image: string;
    description: string;
    items?: string[];
}

interface Feature197Props {
    heading?: string;
    subheading?: string;
    features: FeatureItem[];
}

const Feature197 = ({ heading, subheading, features }: Feature197Props) => {
    const [activeTabId, setActiveTabId] = useState<number>(features[0]?.id ?? 1);
    const [activeImage, setActiveImage] = useState(features[0]?.image ?? "");

    return (
        <section className="py-0">
            <div className="w-full">
                {/* Optional header */}
                {(heading || subheading) && (
                    <div className="mb-12">
                        {heading && (
                            <h1
                                className="text-5xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.05] mb-4"
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                {heading}
                            </h1>
                        )}
                        {subheading && (
                            <p className="text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">
                                {subheading}
                            </p>
                        )}
                    </div>
                )}

                <div className="flex w-full items-start justify-between gap-12">
                    {/* Left: Accordion */}
                    <div className="w-full md:w-1/2">
                        <Accordion
                            type="single"
                            className="w-full"
                            defaultValue={`item-${features[0]?.id}`}
                        >
                            {features.map((tab) => (
                                <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                                    <AccordionTrigger
                                        onClick={() => {
                                            setActiveImage(tab.image);
                                            setActiveTabId(tab.id);
                                        }}
                                        className="cursor-pointer py-5 !no-underline transition hover:!no-underline"
                                    >
                                        <h3
                                            className={`text-xl font-semibold text-left transition-colors duration-200 ${tab.id === activeTabId
                                                    ? "text-neutral-900"
                                                    : "text-neutral-400"
                                                }`}
                                        >
                                            {tab.title}
                                        </h3>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="mt-1 text-base text-neutral-500 leading-relaxed">
                                            {tab.description}
                                        </p>
                                        {tab.items && tab.items.length > 0 && (
                                            <ul className="mt-4 space-y-2">
                                                {tab.items.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-3 text-base text-neutral-500"
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {/* Mobile image */}
                                        <div className="mt-5 md:hidden">
                                            <img
                                                src={tab.image}
                                                alt={tab.title}
                                                className="h-56 w-full rounded-xl object-cover"
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Right: Sticky image */}
                    <div className="relative hidden md:block w-1/2 sticky top-8 self-start">
                        <div className="overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                            <img
                                src={activeImage}
                                alt="Feature preview"
                                className="aspect-[4/3] w-full object-cover transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Feature197 };
