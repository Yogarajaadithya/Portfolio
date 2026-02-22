import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GetStartedButtonProps extends ButtonProps {
    text?: string;
}

export function GetStartedButton({ text = "Get Started", className, ...props }: GetStartedButtonProps) {
    return (
        <Button className={cn("relative overflow-hidden flex items-center justify-center gap-2.5 px-8 group", className)} size="lg" {...props}>
            <span className="z-20 font-medium">
                {text}
            </span>
            <ArrowRight className="w-4 h-4 z-20 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
        </Button>
    );
}
