import { Button } from '@/components/ui/button';

interface VideoSectionProps {
  onLearnMoreProject: () => void;
}

export const VideoSection = ({ onLearnMoreProject }: VideoSectionProps) => {
  return (
    <section id="video-section" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-pure-white mb-6">
            The Vision Behind Eclipse
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the creators and discover the passion driving this ambitious dark fantasy project.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="aspect-video bg-eclipse-darker rounded-lg border border-blood-red/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-blood-red/20 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-blood-red/30 transition-colors">
                <svg className="w-8 h-8 text-blood-red ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="font-oswald text-pure-white">Eclipse Project Presentation</p>
              <p className="font-inter text-sm text-muted-foreground">1 minute</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h3 className="font-oswald text-2xl font-semibold text-pure-white mb-4">
            From Vision to Reality
          </h3>
          <p className="font-inter text-muted-foreground leading-relaxed mb-6">
            Eclipse represents our commitment to pushing the boundaries of dark fantasy gaming. 
            Born from a passion for immersive storytelling and innovative gameplay mechanics, 
            this project embodies our team's dedication to creating unforgettable experiences.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={onLearnMoreProject}
            className="font-oswald text-lg font-semibold px-8 py-3 bg-transparent border-2 border-blood-red text-blood-red hover:bg-blood-red hover:text-pure-white transition-all duration-300 blood-liquid"
          >
            EXPLORE THE PROJECT
          </Button>
        </div>
      </div>
    </section>
  );
};