import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero({ onReserve, onPrimary, onSecondary }) {
  const text = "Your computer, finally self-cleaning";

  return (
    <div className="hero-block">
      <div className="orb" />
      <motion.h1
        className="hero-title"
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, i) => (
          <motion.span key={i} variants={reveal} custom={i} style={{ display: "inline-block" }}>
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        AutoDesk uses on-device AI to scan, rename, and declutter your files.  
        Your workspace — clean, private, and effortless.
      </motion.p>

      <motion.div
        className="hero-ctas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <button className="btn-primary" onClick={onPrimary || onReserve}>
          Reserve your spot
        </button>
        <button className="btn-ghost" onClick={onSecondary}>
          How it works
        </button>
      </motion.div>
    </div>
  );
}
