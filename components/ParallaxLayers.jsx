// components/ParallaxLayers.jsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxLayers({ children, rootRef }) {
  // rootRef is the page ref from index.js
  const { scrollY } = useScroll();
  const offset = useTransform(scrollY, [0, 800], [0, -60]);
  return (
    <motion.div style={{ y: offset }} className="parallax-layer">
      {children}
    </motion.div>
  );
}
