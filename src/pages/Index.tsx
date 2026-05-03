import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { VideoSection } from '@/components/VideoSection';
import { GameSection } from '@/components/GameSection';
import { StudioSection } from '@/components/StudioSection';
import { PressSection } from '@/components/PressSection';
import { ContactSection } from '@/components/ContactSection';
import { GallerySection } from '@/components/GallerySection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Handle section visibility for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'game', 'studio', 'press', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(`${section}-section`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Handle home section (hero)
      if (window.scrollY < window.innerHeight / 2) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVideo = () => {
    const videoElement = document.getElementById('game-section');
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGameMidPage = () => {
    const gameElement = document.getElementById('studio-section');
    if (gameElement) {
      // Scroll to the description part, not the video
      const scrollTarget = gameElement.offsetTop;
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  };

  const handleJoinDiscord = () => {
    // Placeholder for Discord invitation
    window.open('https://discord.gg/eclipse', '_blank');
  };

  const handleDiscoverStudio = () => {
    scrollToSection('studio');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Hero Section */}
      <div id="home-section">
        <HeroSection onLearnMore={scrollToVideo} />
      </div>

      {/* Video Section */}
      <GameSection onLearnMoreProject={scrollToGameMidPage} />

      {/* Gallery Section */}
      <GallerySection />

      {/* Studio Section */}
      <StudioSection />

      {/* Press Section */}
      <PressSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Index;
