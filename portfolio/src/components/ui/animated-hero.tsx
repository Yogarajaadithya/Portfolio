import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimatedHeroProps {
    titles?: string[];
    headingPrefix?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonIcon?: "arrow" | "phone";
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonIcon?: "arrow" | "phone";
    secondaryButtonHref?: string;
    badgeText?: string;
}

function Hero({
    titles = ["amazing", "new", "wonderful", "beautiful", "smart"],
    headingPrefix = "This is something",
    description = "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods.",
    primaryButtonText,
    primaryButtonIcon = "phone",
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonIcon = "arrow",
    secondaryButtonHref,
    badgeText,
}: AnimatedHeroProps) {
    const [titleNumber, setTitleNumber] = useState(0);
    const memoTitles = useMemo(() => titles, [titles]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === memoTitles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, memoTitles]);

    return (
        <div className="w-full">
            <div className="container mx-auto">
                <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
                    {badgeText && (
                        <div>
                            <Button variant="secondary" size="sm" className="gap-4" asChild>
                                <a href="#projects">
                                    {badgeText} <MoveRight className="w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                    )}
                    <div className="flex gap-4 flex-col">
                        <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                            <span className="text-spektr-cyan-50">{headingPrefix}</span>
                            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                                &nbsp;
                                {memoTitles.map((title, index) => (
                                    <motion.span
                                        key={index}
                                        className="absolute font-semibold"
                                        initial={{ opacity: 0, y: "-100" }}
                                        transition={{ type: "spring", stiffness: 50 }}
                                        animate={
                                            titleNumber === index
                                                ? {
                                                    y: 0,
                                                    opacity: 1,
                                                }
                                                : {
                                                    y: titleNumber > index ? -150 : 150,
                                                    opacity: 0,
                                                }
                                        }
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            {description}
                        </p>
                    </div>
                    {(primaryButtonText || secondaryButtonText) && (
                        <div className="flex flex-row gap-3">
                            {primaryButtonText && (
                                <Button size="lg" className="gap-4" variant="outline" asChild={!!primaryButtonHref}>
                                    {primaryButtonHref ? (
                                        <a href={primaryButtonHref}>
                                            {primaryButtonText}
                                            {primaryButtonIcon === "phone" ? <PhoneCall className="w-4 h-4" /> : <MoveRight className="w-4 h-4" />}
                                        </a>
                                    ) : (
                                        <>
                                            {primaryButtonText}
                                            {primaryButtonIcon === "phone" ? <PhoneCall className="w-4 h-4" /> : <MoveRight className="w-4 h-4" />}
                                        </>
                                    )}
                                </Button>
                            )}
                            {secondaryButtonText && (
                                <Button size="lg" className="gap-4" asChild={!!secondaryButtonHref}>
                                    {secondaryButtonHref ? (
                                        <a href={secondaryButtonHref}>
                                            {secondaryButtonText}
                                            {secondaryButtonIcon === "arrow" ? <MoveRight className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                                        </a>
                                    ) : (
                                        <>
                                            {secondaryButtonText}
                                            {secondaryButtonIcon === "arrow" ? <MoveRight className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export { Hero };
