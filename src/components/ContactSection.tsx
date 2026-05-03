import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
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
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact-section" className="py-20 bg-eclipse-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-pure-white mb-6">
            Get In Touch
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions about Eclipse? Want to collaborate or learn more about our studio? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <Card className="bg-eclipse-darker border-blood-red/20 mb-8">
              <CardContent className="p-8">
                <h3 className="font-oswald text-2xl font-bold text-pure-white mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2 flex items-center">
                      <svg className="w-5 h-5 text-blood-red mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      General Contact
                    </h4>
                    <p className="font-inter text-muted-foreground ml-8">
                      <a href="mailto:contact@eclipsestudio.dev" className="text-blood-red hover:underline">
                        contact@eclipsestudio.dev
                      </a>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2 flex items-center">
                      <svg className="w-5 h-5 text-blood-red mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v8m0 0V9a2 2 0 012-2h2M7 13h10v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6z" />
                      </svg>
                      Press Inquiries
                    </h4>
                    <p className="font-inter text-muted-foreground ml-8">
                      <a href="mailto:press.eclipse.project@gmail.com" className="text-blood-red hover:underline">
                        press.eclipse.project@gmail.com
                      </a>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-oswald font-semibold text-pure-white mb-2 flex items-center">
                      <svg className="w-5 h-5 text-blood-red mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      Community
                    </h4>
                    <p className="font-inter text-muted-foreground ml-8">
                      <a href="#" className="text-blood-red hover:underline">
                        Join our Discord Server
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-eclipse-darker border-blood-red/20">
              <CardContent className="p-8">
                <h3 className="font-oswald text-xl font-bold text-pure-white mb-4">
                  Follow Our Journey
                </h3>
                <p className="font-inter text-muted-foreground mb-6">
                  Stay updated with the latest Eclipse development progress and behind-the-scenes content.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-blood-red/20 rounded-full flex items-center justify-center text-blood-red hover:bg-blood-red hover:text-pure-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-eclipse-darker border-blood-red/20">
              <CardContent className="p-8">
                <h3 className="font-oswald text-2xl font-bold text-pure-white mb-6">
                  Send Us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                        First Name *
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="bg-eclipse-black border-blood-red/20 text-pure-white focus:border-blood-red"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                        Last Name *
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="bg-eclipse-black border-blood-red/20 text-pure-white focus:border-blood-red"
                        placeholder="Doe"
                      />
                    </div>
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
                      className="bg-eclipse-black border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="font-oswald text-sm font-medium text-pure-white block mb-2">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-eclipse-black border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder="What would you like to discuss?"
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
                      rows={5}
                      className="bg-eclipse-black border-blood-red/20 text-pure-white focus:border-blood-red"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="font-oswald font-medium px-6 py-2 bg-gradient-blood hover:shadow-glow transition-all duration-300 blood-liquid w-full"
                  >
                    SEND MESSAGE
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};