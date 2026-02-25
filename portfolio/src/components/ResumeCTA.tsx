import { HeroSection } from './ui/dynamic-hero';

export default function ResumeCTA() {
    return (
        <section id="resume-cta">
            <HeroSection
                heading="Resume"
                tagline="All the context you need, without the animations."
                buttonText="Open Resume ↗"
                buttonHref="https://drive.google.com/file/d/1v-H4YsAIXieIEa88tGjeO4kHj2wUJok0/view?usp=drive_link"
                imageUrl={`${import.meta.env.BASE_URL}chatgpt-image.png`}
                navItems={[]}
            />
        </section>
    );
}
