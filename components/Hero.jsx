// components/Hero.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};
const word = {
  hidden: { y: 24, opacity: 0, filter: "blur(4px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

function AnimatedHeadline({ headline }) {
  const words = headline.split(" ");
  return (
    <motion.div variants={container} initial="hidden" animate="visible" aria-hidden={false} className="hero-title">
      {words.map((w, i) => (
        <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: 8 }}>
          {w}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Hero({ onPrimary }) {
  return (
    <div className="hero-inner">
      <AnimatedHeadline headline="Your computer, finally self-cleaning." />
      <p className="hero-sub">AutoDesk uses on-device AI to scan, suggest, and clean — private by default.</p>

      <div className="hero-ctas" aria-hidden={false}>
        <button className="btn-primary cta-glow" onClick={onPrimary}>Reserve your spot</button>
        <button className="btn-ghost">How it works</button>
      </div>

      {/* right-floating glass panel */}
      <div className="glass-panel">
        <div className="glass-inner">
          <div className="glass-header">
            <div className="chip">Auto Preview</div>
            <div className="mini-metrics">0 joined</div>
          </div>

          <div className="file-preview">
            <div className="file-row">
              <div className="file-name">Invoice_2020_old_name.jpg</div>
              <div className="file-new">→ Invoice_2020_Feb.jpg</div>
            </div>
            <div className="file-row">
              <div className="file-name">IMG_9876_final_version.png</div>
              <div className="file-new">→ IMG_9876.png</div>
            </div>
            <div className="file-row muted">Preview of AI suggestion • Local-only</div>
          </div>

          <div className="glass-footer">
            <div className="tiny">Smart Rename • Auto Sort • Duplicate Finder</div>
            <div className="pulsing-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
