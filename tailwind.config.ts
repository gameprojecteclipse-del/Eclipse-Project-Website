import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      font: {
        "one-slice": ['OneSlice', 'sans-serif'],
      },
      colors: {
        "our-black": "#211D1E",
        "our-white": "#FFEBF0",
        "our-red": "#DC143C",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Eclipse custom colors
        'blood-red': "hsl(var(--blood-red))",
        'blood-red-dark': "hsl(var(--blood-red-dark))",
        'crimson-glow': "hsl(var(--crimson-glow))",
        'eclipse-black': "hsl(var(--eclipse-black))",
        'eclipse-dark': "hsl(var(--eclipse-dark))",
        'eclipse-darker': "hsl(var(--eclipse-darker))",
        'pure-white': "hsl(var(--pure-white))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-blood': 'var(--gradient-blood)',
        'gradient-dark': 'var(--gradient-dark)',
        'gradient-hero': 'var(--gradient-hero)',
      },
      boxShadow: {
        'blood': 'var(--shadow-blood)',
        'dark': 'var(--shadow-dark)',
        'glow': 'var(--shadow-glow)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-down-2": {
          "0%": {
            opacity: "0",
            transform: "translateY(-40px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-up-2": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 2s ease-out",
        "accordion-up": "accordion-up 2.5s ease-out",
        "fade-in-down": "fade-down 3s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in-up": "fade-up 3.5s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in-4": "fade-up-4 4s ease-out forwards",
        "blood-pulse": "bloodPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
