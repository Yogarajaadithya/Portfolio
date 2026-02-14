import { motion } from 'framer-motion';

interface HeaderProps {
    initials: string;
    onMenuClick: () => void;
}

export default function Header({ initials, onMenuClick }: HeaderProps) {
    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '28px 50px',
                zIndex: 50,
                background: 'transparent',
            }}
        >
            <motion.a
                href="#"
                style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    letterSpacing: '-0.02em',
                    color: '#000',
                    textDecoration: 'none',
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {initials}
            </motion.a>
            <motion.button
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '4px',
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                }}
                aria-label="Open menu"
                onClick={onMenuClick}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <span style={{ width: '6px', height: '6px', background: '#000', borderRadius: '50%' }}></span>
                <span style={{ width: '6px', height: '6px', background: '#000', borderRadius: '50%' }}></span>
                <span style={{ width: '6px', height: '6px', background: '#000', borderRadius: '50%' }}></span>
                <span style={{ width: '6px', height: '6px', background: '#000', borderRadius: '50%' }}></span>
            </motion.button>
        </header>
    );
}
