import { FluidNavigation } from './components/FluidNavigation';
import { InfiniteGridHero } from './components/ui/the-infinite-grid';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ResumeCTA from './components/ResumeCTA';
import ContactCTA from './components/ContactCTA';
import './App.css';

function App() {

  // Your information - Update these values
  const portfolioData = {
    initials: "YA",
    firstName: "YOGARAJA",
    lastName: "ADITHYA",
    tagline: "AI Engineer specializing in LLMs, multi-agent systems, and data-driven automation. Currently in Berlin, designing AI solutions that deliver accuracy, reliability, and real-world impact.",
    profileImage: `${import.meta.env.BASE_URL}profile.jpg`,
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
    </>
  );
}

export default App;
