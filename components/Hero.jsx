// components/Hero.jsx
import { motion } from "framer-motion";

export default function Hero({ onPrimary, onSecondary }) {
  return (
    <section className="hero-block">
      <motion.h1 initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero-title">
        Your computer, <span className="glow-text">finally self-cleaning</span>
      </motion.h1>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} className="hero-desc">
        AutoDesk intelligently organizes, renames and declutters your files — private by default, automated for life.
      </motion.p>

      <div className="hero-ctas">
        <motion.button whileHover={{ scale: 1.03 }} className="btn-primary large" onClick={onPrimary}>Reserve your spot</motion.button>
        <motion.button whileHover={{ scale: 1.03 }} className="btn-ghost" onClick={onSecondary}>Watch demo</motion.button>
      </div>

      <div className="trust-row">
        <div className="trust-pill">First 100 winners • 25% pre-launch</div>
        <div className="micro-stats">No upload required • Runs locally</div>
      </div>
    </section>
  );
}
