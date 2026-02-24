import { HeroSection } from './ui/dynamic-hero';

export default function ResumeCTA() {
    return (
        <section id="resume-cta">
            <HeroSection
                heading="Resume"
                tagline="All the context you need, without the animations."
                buttonText="Open Resume ↗"
                buttonHref="#"
                imageUrl="/chatgpt-image.png"
                navItems={[]}
            />
        </section>
    );
}
