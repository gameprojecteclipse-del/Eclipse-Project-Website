import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Crossroads from "../pages/Crossroads";
import Eclipse from "../pages/Eclipse";
import Chroma from "../pages/Chroma";
import NotFound from "../pages/NotFound";

export const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Crossroads />} />
        <Route path="/eclipse/*" element={<Eclipse />} />
        <Route path="/chroma/*" element={<Chroma />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};
