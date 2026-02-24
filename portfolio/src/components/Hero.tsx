import { motion } from 'framer-motion';

interface HeroProps {
    firstName: string;
    lastName: string;
    tagline: string;
    profileImage: string | null;
}

export default function Hero({ firstName, lastName, tagline, profileImage }: HeroProps) {
    return (
        <main className="min-h-screen flex items-center px-4 sm:px-8 md:px-16 lg:px-20">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-8 md:gap-0 py-8 md:py-0">
                {/* Left: Name + Tagline */}
                <div className="text-center md:text-left">
                    <h1
                        style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontStyle: 'italic',
                            fontSize: 'clamp(3rem, 12vw, 11rem)',
                            fontWeight: 700,
                            lineHeight: 0.85,
                            color: '#000',
                            letterSpacing: '-0.03em',
                            marginBottom: 'clamp(1.5rem, 4vw, 5rem)',
                        }}
                    >
                        <motion.span
                            style={{ display: 'block' }}
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {firstName}
                        </motion.span>
                        <motion.span
                            style={{ display: 'block' }}
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {lastName}
                        </motion.span>
                    </h1>

                    {/* Tagline - larger font, positioned below name */}
                    <motion.p
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
                            fontWeight: 400,
                            color: '#000',
                            maxWidth: 'min(420px, 100%)',
                            lineHeight: 1.45,
                            letterSpacing: '0.02em',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        {tagline}
                    </motion.p>
                </div>

                {/* Right: Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div
                        style={{
                            width: 'clamp(140px, 35vw, 320px)',
                            height: 'clamp(140px, 35vw, 320px)',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt={`${firstName} ${lastName}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: '80% 100%'
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                <span style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📷</span>
                                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>Add Photo</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
