import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export const CursorClickEffect = () => {
  const location = useLocation();
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const isEclipsePage = location.pathname.startsWith("/eclipse");
      const isPortal = location.pathname === "/";
      const isLeftHalf = e.clientX < window.innerWidth / 2;
      
      const shouldShow = isEclipsePage || (isPortal && isLeftHalf);

      if (!shouldShow) return;

      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setClicks((prev) => [...prev, newClick]);

      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 600);
    };

    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [location.pathname]);

  return (
    <div className="fixed inset-0 z-[100000] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-12 h-12 rounded-full"
            style={{
              left: click.x,
              top: click.y,
              marginLeft: "-24px",
              marginTop: "-24px",
              background: "radial-gradient(circle, rgba(139,0,0,0.6) 0%, transparent 70%)",
              filter: "blur(4px)",
              mixBlendMode: "screen"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
