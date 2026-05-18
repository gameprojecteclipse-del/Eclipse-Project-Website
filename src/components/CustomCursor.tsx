import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { audioManager } from "../lib/audio";

export const CustomCursor = () => {
  const location = useLocation();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorSrc, setCursorSrc] = useState("/assets/eclipse/ui/custom-cursor.gif");
  const [isVisible, setIsVisible] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const speed = useRef(0);

  // Context detection
  const isEclipsePage = location.pathname.startsWith("/eclipse");
  const isPortal = location.pathname === "/";

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Logic: Show custom cursor ONLY on Eclipse page OR left side of Portal
      const isLeftHalf = e.clientX < window.innerWidth / 2;
      const shouldShow = isEclipsePage || (isPortal && isLeftHalf);
      
      setIsVisible(shouldShow);

      // Manage browser cursor visibility
      if (shouldShow) {
        document.documentElement.classList.add("no-cursor");
      } else {
        document.documentElement.classList.remove("no-cursor");
      }

      if (cursorRef.current && shouldShow) {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        if (lastPos.current.x !== 0) {
          speed.current = Math.sqrt(dx * dx + dy * dy);
        }
        lastPos.current = { x: e.clientX, y: e.clientY };

        const s = isNaN(speed.current) ? 0 : speed.current;
        const scale = 1 + Math.min(s / 100, 0.3);
        const blur = Math.min(s / 20, 2);
        
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${scale})`;
        cursorRef.current.style.filter = `drop-shadow(0 0 2px black) drop-shadow(0 0 8px rgba(139,0,0,0.8)) blur(${blur}px) contrast(1.2) brightness(1.2)`;
      }
    };

    const handleClick = () => {
      if (isVisible) {
        setCursorSrc(`/assets/eclipse/ui/custom-cursor.gif?t=${Date.now()}`);
        audioManager.playSound("click");
        // User specifically asked for music to start on click in Eclipse context
        audioManager.startAmbience();
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleClick);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleClick);
      document.documentElement.classList.remove("no-cursor");
    };
  }, [isEclipsePage, isPortal, isVisible]);

  // Handle music and context transition
  useEffect(() => {
    const isChromaSide = isPortal && !isVisible;
    const isChromaPage = location.pathname.startsWith("/chroma");

    if (isChromaSide || isChromaPage) {
      // Immediate kill when in Chroma territory
      audioManager.forceStopAll();
      document.documentElement.classList.remove("no-cursor");
    }

    // Auto-start music ONLY if in Eclipse page and already interacted
    if (isEclipsePage) {
      audioManager.startAmbience();
    }
  }, [isVisible, isEclipsePage, location.pathname, isPortal]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[999999] pointer-events-none will-change-transform hidden lg:block transition-opacity duration-200 w-[56px] h-[56px] -ml-[28px] -mt-[28px] mix-blend-screen ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <img src={cursorSrc} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
      <div 
        className="absolute inset-0 rounded-full blur-md opacity-30 bg-[radial-gradient(circle,_rgba(139,0,0,0.8)_0%,_transparent_70%)] scale-[0.8] animate-[pulse-organic_3s_ease-in-out_infinite]"
      />
      <style>{`
        @keyframes pulse-organic {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }
        .no-cursor, .no-cursor * {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
};
