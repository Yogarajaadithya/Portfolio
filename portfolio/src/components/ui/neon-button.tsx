import React from 'react'
import { cn } from '@/lib/utils'
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-white rounded-full inline-flex items-center justify-center whitespace-nowrap",
    {
        variants: {
            variant: {
                default: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/20",
                solid: "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-white/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
            },
            size: {
                default: "text-sm",
                sm: "text-xs",
                lg: "h-14 text-lg font-semibold",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    neon?: boolean
    href?: string
    target?: string
    rel?: string
}

const NeonButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, href, target, rel, ...props }, ref) => {

        const innerStyle: React.CSSProperties = size === 'lg'
            ? { paddingLeft: '2.5rem', paddingRight: '2.5rem' }
            : size === 'sm'
            ? { paddingLeft: '1rem', paddingRight: '1rem' }
            : { paddingLeft: '1.75rem', paddingRight: '1.75rem' }

        const neonTop = (
            <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent", neon ? "block" : "hidden")} />
        )
        const neonBottom = (
            <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent", neon ? "block" : "hidden")} />
        )
        const innerContent = (
            <span className="relative z-10 flex items-center gap-2.5" style={innerStyle}>
                {children}
            </span>
        )

        if (href) {
            return (
                <a
                    href={href}
                    target={target}
                    rel={rel}
                    className={cn(buttonVariants({ variant, size }), className)}
                >
                    {neonTop}
                    {innerContent}
                    {neonBottom}
                </a>
            )
        }

        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                {neonTop}
                {innerContent}
                {neonBottom}
            </button>
        )
    }
)

NeonButton.displayName = 'NeonButton';

export { NeonButton, buttonVariants };
