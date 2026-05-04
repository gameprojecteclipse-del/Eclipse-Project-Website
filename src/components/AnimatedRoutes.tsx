import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Crossroads from "../pages/Crossroads";
import NotFound from "../pages/NotFound";

// Lazy load heavy pages for code-splitting
const Eclipse = lazy(() => import("../pages/Eclipse"));
const Chroma = lazy(() => import("../pages/Chroma"));

// Elegant fallback matching Eclipse dark theme (no brutal flash)
const PageFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 bg-black flex items-center justify-center z-50"
  >
    <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#8B0000]/60 to-transparent animate-pulse" />
  </motion.div>
);

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Crossroads />} />
          <Route path="/eclipse/*" element={<Eclipse />} />
          <Route path="/chroma/*" element={<Chroma />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};
