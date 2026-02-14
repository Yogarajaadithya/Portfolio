import { HeroSection } from "@/components/ui/dynamic-hero";

export default function ResumeCTA() {
    return (
        <section id="resume-cta">
            <HeroSection
                heading="Want the Full Picture?"
                tagline="Explore my complete professional journey — skills, experiences, and the story behind the work."
                buttonText="Download Resume ↓"
                imageUrl="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                navItems={[]}
            />
        </section>
    );
}
