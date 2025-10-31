"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedOrb() {
  // Track scroll position for parallax
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [0.6, 0.1]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.2]);

  // Track mouse for interactive parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 12 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 12 });

  if (!mounted) return null;

  return (
    <motion.div
      className="orb-animated"
      style={{
        x: springX.to((v) => v * 80),
        y: springY.to((v) => v * 60),
        opacity,
        scale,
        filter: "blur(80px)",
        zIndex: -5,
      }}
      transition={{ type: "spring", stiffness: 25, damping: 40 }}
      aria-hidden
    >
      {/* Inner pulse layers for glow */}
      <motion.div
        className="orb-core"
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb-ring"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
