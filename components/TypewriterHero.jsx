// components/TypewriterHero.jsx
import React from "react";
import { motion } from "framer-motion";

export default function TypewriterHero({ headline = "Your computer, finally self-cleaning." }) {
  // reveal word-by-word
  const words = headline.split(" ");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <motion.h1 className="hero-title" aria-hidden>
        {words.map((w, i) => (
          <motion.span
            key={w + i}
            style={{ display: "inline-block", marginRight: 8 }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.54, ease: "easeOut" }}
          >
            {w}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
