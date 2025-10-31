// components/AnimatedOrb.jsx
"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AnimatedOrb({ mouse = { x: 0, y: 0 }, scrollYProgress }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  React.useEffect(() => {
    const setFromMouse = () => {
      // adopt passed mouse if available
      if (typeof window === "undefined") return;
      mx.set(mouse.x || window.innerWidth / 2);
      my.set(mouse.y || window.innerHeight / 2);
    };
    setFromMouse();
  }, [mouse.x, mouse.y, mx, my]);

  const [center, setCenter] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (typeof window !== "undefined") setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const onResize = () => {
      if (typeof window !== "undefined") setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const x = useSpring(useTransform(mx, (v) => (v - center.x) / 30), { stiffness: 30, damping: 28 });
  const y = useSpring(useTransform(my, (v) => (v - center.y) / 30), { stiffness: 30, damping: 28 });

  const scale = useTransform(scrollYProgress ?? 0, [0, 1], [1.05, 0.8]);
  const opacity = useTransform(scrollYProgress ?? 0, [0, 0.6, 1], [0.9, 0.5, 0]);

  return (
    <motion.div className="orb-fixed" style={{ x, y, scale, opacity }} aria-hidden>
      <svg viewBox="0 0 400 400" className="orb-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="orbGradient1" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#00e7ff" stopOpacity="0.98" />
            <stop offset="60%" stopColor="#6fc0ff" stopOpacity="0.24" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbGradient2" cx="70%" cy="70%">
            <stop offset="0%" stopColor="#9146ff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#9146ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="orbBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <g filter="url(#orbBlur)">
          <circle cx="200" cy="200" r="160" fill="url(#orbGradient1)" />
          <circle cx="210" cy="210" r="120" fill="url(#orbGradient2)" />
        </g>

        <motion.path
          d="M200 30 a170 170 0 1 0 0.001 0"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1.6"
          fill="none"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
}
