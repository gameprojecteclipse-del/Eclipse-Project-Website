import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const PressSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    media: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the actual form submission logic
    toast({
      title: "Message sent!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });
    setFormData({ name: '', media: '', email: '', message: '' });
  };

  const handlePressKitDownload = () => {
    // Placeholder for actual press kit download
    toast({
      title: "Press Kit Download",
      description: "Press kit download will be available soon.",
    });
  };

  return (
    <section id="press-section" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-pure-white mb-6">
            Press & Media
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get the latest information about Eclipse and connect with our media team for
            interviews, assets, and exclusive content access.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Press Information */}
          <div>
            <Card className="bg-eclipse-dark border-blood-red/20 mb-8">
              <CardContent className="p-8">
                <h3 className="font-oswald text-2xl font-bold text-pure-white mb-6">
                  About Eclipse
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2">Studio</h4>
                    <p className="font-inter text-muted-foreground">
                      Eclipse Studio, founded in 2025 in Algeria, represents a new wave of
                      independent game development focused on immersive dark fantasy experiences.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2">Team</h4>
                    <p className="font-inter text-muted-foreground">
                      Our passionate team of 12 developers, artists, and designers brings
                      together diverse backgrounds in gaming, storytelling, and technology.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2">Project</h4>
                    <p className="font-inter text-muted-foreground">
                      Eclipse is an ambitious dark fantasy action-RPG that combines innovative
                      shadow-based combat mechanics with deep narrative choices and stunning
                      gothic-inspired visuals.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2">Platforms</h4>
                    <div className="flex space-x-4">
                      <span className="px-3 py-1 bg-blood-red/20 text-blood-red rounded font-oswald text-sm">PC</span>
                      <span className="px-3 py-1 bg-blood-red/20 text-blood-red rounded font-oswald text-sm">PlayStation</span>
                      <span className="px-3 py-1 bg-blood-red/20 text-blood-red rounded font-oswald text-sm">Xbox</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Press Kit Download */}
            <div className="text-center">
              <Button
                onClick={handlePressKitDownload}
                className="font-oswald text-lg font-semibold px-8 py-3 bg-gradient-blood hover:shadow-glow transition-all duration-300 blood-liquid w-full sm:w-auto"
              >
                DOWNLOAD PRESS KIT
              </Button>
            </div>
          </div>

          {/* Press Contact Form */}
          <div>
            <Card className="bg-eclipse-dark border-blood-red/20">
              <CardContent className="p-8">
                <h3 className="font-oswald text-2xl font-bold text-pure-white mb-6">
                  Press Inquiries
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-eclipse-darker border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      Media Organization *
                    </label>
                    <Input
                      name="media"
                      value={formData.media}
                      onChange={handleInputChange}
                      required
                      className="bg-eclipse-darker border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder="Publication, website, or organization"
                    />
                  </div>

                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-eclipse-darker border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder="your.email@media.com"
                    />
                  </div>

                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="bg-eclipse-darker border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder="Tell us about your inquiry, deadline, and any specific requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="font-oswald font-medium px-6 py-2 bg-transparent border-2 border-blood-red text-blood-red hover:bg-blood-red hover:text-pure-white transition-all duration-300 blood-liquid w-full"
                  >
                    SEND MESSAGE
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-blood-red/20">
                  <p className="font-inter text-sm text-muted-foreground text-center">
                    For press inquiries, contact us directly at<br />
                    <a href="mailto:press.eclipse.project@gmail.com" className="text-blood-red hover:underline">
                      press.eclipse.project@gmail.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};