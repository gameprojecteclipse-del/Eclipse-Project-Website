import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import eclipseLogo from "@/assets/logo.svg";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  const handleMobileNavigate = (section: string) => {
    setIsMobileMenuOpen(false);
    handleNavigate(section);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "game", label: "Game" },
    { id: "studio", label: "Studio" },
    { id: "press", label: "Press" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (section: string) => {
    if (section === "home") {
      scrollToTop();
    } else {
      onNavigate(section);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 ${isScrolled
          ? "bg-eclipse-black/70 backdrop-blur-md border-b border-our-red/70"
          : "bg-transparent"
        }`}
      style={{ zIndex: 40 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigate("home")}
          >
            <img src={eclipseLogo} alt="Eclipse" className="h-10 w-auto" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`font-oswald text-md font-medium tracking-wide transition-all duration-300 relative group ${activeSection === item.id
                    ? "text-our-red"
                    : "text-our-white hover:text-our-red"
                  }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-our-red transition-all duration-300 ${activeSection === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                    }`}
                />
              </button>
            ))}
          </div>

          {/* Discord CTA */}
          <Button
            variant="outline"
            className="hidden md:inline-flex items-center gap-2 font-oswald text-md font-semibold bg-transparent rounded-full border-our-red text-our-red hover:bg-our-red hover:text-our-white transition-all duration-300"
          >
            REJOINDRE SUR
            <svg
              className="w-6 h-6 fill-current" // Changed this line
              viewBox="0 0 24 24"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </Button>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-pure-white p-2"
            style={{ zIndex: 40 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative w-6 h-6"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="absolute w-6 h-0.5 bg-pure-white rounded-full"
                style={{ top: "50%", left: 0 }}
                variants={{
                  open: { rotate: 45, translateY: 0 },
                  closed: { rotate: 0, translateY: -8 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-pure-white rounded-full"
                style={{ top: "50%", left: 0 }}
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-pure-white rounded-full"
                style={{ top: "50%", left: 0 }}
                variants={{
                  open: { rotate: -45, translateY: 0 },
                  closed: { rotate: 0, translateY: 8 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-background/95 backdrop-blur-lg"
                style={{
                  zIndex: 35,
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  minHeight: "100vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="h-full flex flex-col items-center justify-start space-y-12 px-6 overflow-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {/* Logo in mobile menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mt-12 mb-8"
                  >
                    <img
                      src={eclipseLogo}
                      alt="Eclipse"
                      className="h-16 w-auto"
                    />
                  </motion.div>

                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleMobileNavigate(item.id)}
                      className={`font-oswald text-2xl font-medium tracking-wide transition-all duration-300 relative group ${activeSection === item.id
                          ? "text-our-red"
                          : "text-our-white hover:text-our-red"
                        }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-2 left-0 h-0.5 bg-our-red transition-all duration-300 ${activeSection === item.id
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                          }`}
                      />
                    </motion.button>
                  ))}

                  {/* Mobile Discord Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="mt-8 inline-flex items-center gap-2 font-oswald text-lg font-semibold bg-transparent rounded-full border-our-red text-our-red hover:bg-our-red hover:text-our-white transition-all duration-300"
                    >
                      REJOINDRE SUR
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                      </svg>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};
