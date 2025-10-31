// components/AnimatedBackground.jsx
"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";


export default function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    // create a bunch of subtle particles as divs for visual sparkle
    const container = containerRef.current;
    if (!container) return;
    // only create once
    if (container.dataset.ready) return;
    container.dataset.ready = "1";

    const count = 30;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "bg-particle";
      const size = Math.random() * 6 + 2;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.opacity = `${0.06 + Math.random() * 0.14}`;
      el.style.transform = `translate3d(0,0,0)`;
      container.appendChild(el);
    }
    // cleanup on unmount
    return () => {
      while (container && container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return (
    <div ref={containerRef} className="animated-bg-layer" aria-hidden>
      {/* slow drifting blurs */}
      <motion.div
        className="bg-cloud cloud-a"
        animate={{ x: ["-6%", "6%", "-6%"], y: ["-2%", "2%", "-2%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-cloud cloud-b"
        animate={{ x: ["6%", "-6%", "6%"], y: ["2%", "-2%", "2%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* occasional sweep */}
      <motion.div
        className="light-sweep"
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 12, repeat: Infinity, repeatDelay: 8, ease: "linear" }}
      />
    </div>
  );
}
