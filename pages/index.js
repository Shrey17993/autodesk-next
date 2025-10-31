// pages/index.js
import Head from "next/head";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.7], [1, 0.7, 0.3, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const handleMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const { error } = await supabase.from("waitlist").insert([form]);
      if (error) throw error;
      setStatus("✅ Added to waitlist!");
      setForm({ name: "", email: "" });
    } catch {
      setStatus("❌ Something went wrong. Try again.");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <>
      <Head>
        <title>AutoDesk — Declutter your digital world</title>
      </Head>

      <main ref={ref} className="heavy-root">
        {/* Dynamic gradient background */}
        <motion.div
          className="animated-bg"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        {/* Moving Orb */}
        <motion.div
          className="orb"
          style={{
            x: mouse.x / 40 - 100,
            y: orbY,
            opacity: orbOpacity,
          }}
        />

        <div className="page-container">
          {/* HEADER */}
          <motion.header
            className="site-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="brand">
              <div className="logo-pill" />
              <div>
                <div className="brand-name">AutoDesk</div>
                <div className="brand-tag">Auto tidy for your files</div>
              </div>
            </div>
            <nav className="header-actions">
              <motion.button whileHover={{ scale: 1.1 }} className="btn-ghost">
                Docs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
                className="btn-primary"
              >
                Join waitlist
              </motion.button>
            </nav>
          </motion.header>

          {/* HERO */}
          <motion.section
            className="hero-section"
            style={{ y: heroY }}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Your computer, finally <span className="highlight">self-cleaning</span>.
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeInUp} custom={2}>
              AutoDesk uses on-device AI to declutter, rename, and organize your files —{" "}
              <span className="highlight">automatically</span>.  
              No uploads. No risk. Just a clean, calm workspace.
            </motion.p>

            <motion.div className="hero-ctas" variants={fadeInUp} custom={3}>
              <button className="btn-primary">Reserve your spot</button>
              <button className="btn-ghost">How it works</button>
            </motion.div>

            <motion.div
              className="hero-trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <img src="/trust-icons.svg" alt="Trusted logos" width={220} />
              <p>Trusted by creators & engineers worldwide</p>
            </motion.div>
          </motion.section>

          {/* WAITLIST */}
          <motion.section
            className="waitlist-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="waitlist-card">
              <div className="waitlist-left">
                <h3 className="waitlist-title">
                  🎉 Random 50 get <span>Lifetime Pro</span> • 25% pre-launch
                </h3>
                <p className="waitlist-sub">
                  Secure your early spot. Join the waitlist and you’ll be entered to win a lifetime license.
                </p>

                <form onSubmit={handleSubmit} className="waitlist-form">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary"
                  >
                    Join waitlist
                  </motion.button>
                </form>
                {status && <p className="waitlist-status">{status}</p>}
              </div>
            </div>
          </motion.section>

          {/* FEATURES */}
          <section className="features-heavy">
            <motion.h2 variants={fadeInUp}>How AutoDesk works</motion.h2>
            <motion.p variants={fadeInUp} custom={2}>
              Three simple steps to reclaim your digital sanity.
            </motion.p>

            <div className="features-grid">
              {[
                ["Scan", "Smart analyze your files locally — never leaves your system."],
                ["Suggest", "See safe renames & groups before you apply."],
                ["Apply", "One click, instant organization."],
                ["Privacy-First", "All AI processing happens locally."],
                ["Integrations", "Optional sync with Google Drive, Dropbox, iCloud."],
                ["Duplicate Finder", "Detect and remove redundant copies safely."],
              ].map(([title, desc], i) => (
                <motion.div
                  className="feature-card"
                  key={i}
                  custom={i + 3}
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 20px 60px rgba(0,231,255,0.15)",
                  }}
                >
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="site-foot">
            <p>© 2025 AutoDesk — Privacy-first • Local-first • Fast</p>
          </footer>
        </div>
      </main>
    </>
  );
}
