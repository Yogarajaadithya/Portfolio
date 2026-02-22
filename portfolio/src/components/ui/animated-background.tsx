import { cn } from '@/lib/utils';
import { AnimatePresence, type Transition, motion } from 'framer-motion';
import {
    Children,
    cloneElement,
    type ReactElement,
    useEffect,
    useState,
    useId,
    type ReactNode,
} from 'react';

type AnimatedBackgroundProps = {
    children: ReactNode;
    defaultValue?: string;
    onValueChange?: (newActiveId: string | null) => void;
    className?: string;
    transition?: Transition;
    enableHover?: boolean;
};

export default function AnimatedBackground({
    children,
    defaultValue,
    onValueChange,
    className,
    transition,
    enableHover = false,
}: AnimatedBackgroundProps) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const uniqueId = useId();

    const handleSetActiveId = (id: string | null) => {
        setActiveId(id);

        if (onValueChange) {
            onValueChange(id);
        }
    };

    useEffect(() => {
        if (defaultValue !== undefined) {
            setActiveId(defaultValue);
        }
    }, [defaultValue]);

    return Children.map(children, (child, index) => {
        if (!child || typeof child !== 'object' || !('props' in child)) {
            return child;
        }

        const reactChild = child as ReactElement<{ 'data-id'?: string; className?: string; children?: ReactNode }>;
        const id = reactChild.props['data-id'];

        const interactionProps = enableHover
            ? {
                onMouseEnter: () => handleSetActiveId(id || null),
                onMouseLeave: () => handleSetActiveId(null),
            }
            : {
                onClick: () => handleSetActiveId(id || null),
            };

        return cloneElement(
            reactChild,
            {
                key: index,
                className: cn('relative inline-flex', reactChild.props.className),
                'aria-selected': activeId === id,
                'data-checked': activeId === id ? 'true' : 'false',
                ...interactionProps,
            } as any,
            <>
                <AnimatePresence initial={false}>
                    {activeId === id && (
                        <motion.div
                            layoutId={`background-${uniqueId}`}
                            className={cn('absolute inset-0', className)}
                            transition={transition}
                            initial={{ opacity: defaultValue ? 1 : 0 }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                        />
                    )}
                </AnimatePresence>
                <span className='z-10'>{reactChild.props.children}</span>
            </>
        );
    });
}
