// components/AnimatedOrb.jsx
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AnimatedOrb({ mouse = { x: 0, y: 0 }, scrollYProgress }) {
  const mx = useMotionValue(mouse.x || 0);
  const my = useMotionValue(mouse.y || 0);

  React.useEffect(() => {
    mx.set(mouse.x || 0);
    my.set(mouse.y || 0);
  }, [mouse.x, mouse.y, mx, my]);

  const x = useSpring(useTransform(mx, v => (v - window.innerWidth/2) / 30), { stiffness: 25, damping: 30 });
  const y = useSpring(useTransform(my, v => (v - window.innerHeight/2) / 30), { stiffness: 25, damping: 30 });

  const scale = useTransform(scrollYProgress ?? 0, [0, 1], [1.1, 0.7]);
  const opacity = useTransform(scrollYProgress ?? 0, [0, 0.4, 1], [0.8, 0.4, 0]);

  return (
    <motion.div
      className="orb-fixed"
      style={{ x, y, scale, opacity }}
      aria-hidden
    >
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" className="orb-svg">
        <defs>
          <radialGradient id="g1" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#00e7ff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#6fc0ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g2" cx="70%" cy="70%">
            <stop offset="0%" stopColor="#9146ff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#9146ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feColorMatrix type="matrix" values="1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 0.6 0"/>
          </filter>
        </defs>
        <g filter="url(#f1)">
          <circle cx="200" cy="200" r="160" fill="url(#g1)" />
          <circle cx="210" cy="210" r="120" fill="url(#g2)" />
        </g>
        <g style={{ transformOrigin: "200px 200px" }}>
          <motion.path
            d="M200 30 a170 170 0 1 0 0.001 0"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.6"
            fill="none"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 34, ease: "linear" }}
          />
        </g>
      </svg>
    </motion.div>
  );
}
