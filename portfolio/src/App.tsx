import { useState } from 'react';
import { FluidNavigation } from './components/FluidNavigation';
import { InfiniteGridHero } from './components/ui/the-infinite-grid';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ResumeCTA from './components/ResumeCTA';
import ContactCTA from './components/ContactCTA';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Your information - Update these values
  const portfolioData = {
    initials: "YA",
    firstName: "YOGARAJA",
    lastName: "ADITHYA",
    tagline: "Product & UI/UX Designer crafting intuitive, engaging, and purposeful digital experiences. Based in Berlin, working globally.",
    profileImage: "/profile.jpg",
  };

  return (
    <>
      <FluidNavigation />
      <div id="home">
        <InfiniteGridHero
          firstName={portfolioData.firstName}
          lastName={portfolioData.lastName}
          tagline={portfolioData.tagline}
          profileImage={portfolioData.profileImage}
          rotatingWords={["intelligent", "scalable", "innovative", "impactful"]}
          rotatingPrefix="I build AI systems that are"
        />
      </div>
      <Projects />
      <About />
      <Skills />
      <ResumeCTA />
      <ContactCTA />
      <Contact />
      <Navigation
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}

export default App;
