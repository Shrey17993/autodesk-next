import Head from "next/head";
import { motion } from "framer-motion";
import TrustedByRow from "../components/TrustedByRow";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("waitlist").insert([
      {
        name: formData.name,
        email: formData.email,
      },
    ]);

    if (error) setStatus("error");
    else setStatus("success");
  };

  return (
    <>
      <Head>
        <title>AutoDesk — Auto tidy for your files</title>
        <meta
          name="description"
          content="AutoDesk uses on-device AI to organize and clean your workspace — private, smart, and effortless."
        />
      </Head>

      {/* ====== HERO SECTION ====== */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.2 }}
        >
          <span className="gradient-text">AutoDesk</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          Auto tidy for your files
        </motion.p>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          Your computer, finally self-cleaning.
        </motion.p>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          AutoDesk uses on-device AI to scan, rename, and declutter your files.
          Your workspace — clean, private, and effortless.
        </motion.p>

        <motion.div
          className="cta-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <p className="promo">
            Random 50 get <strong>Lifetime Pro</strong> • 25% pre-launch
          </p>

          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </button>
          </form>

          {status === "success" && (
            <p className="success-msg">🎉 You’re on the waitlist!</p>
          )}
          {status === "error" && (
            <p className="error-msg">⚠️ Error adding to waitlist. Try again.</p>
          )}
        </motion.div>
      </motion.section>

      {/* ====== TRUSTED BY ROW ====== */}
      <TrustedByRow />

      {/* ====== FEATURES SECTION ====== */}
      <motion.section
        className="features"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>How AutoDesk Works</h2>
        <div className="features-grid">
          <Feature
            title="Smart Rename"
            desc="Semantic file renaming based on content and date."
          />
          <Feature
            title="Auto Sort"
            desc="Automatically group into Documents, Photos, Code."
          />
          <Feature
            title="Duplicate Finder"
            desc="Detect & remove duplicate files safely."
          />
          <Feature
            title="Privacy-First"
            desc="Local-first processing; never upload without consent."
          />
          <Feature
            title="One-Click Cleanup"
            desc="Preview and apply fixes with confidence."
          />
          <Feature
            title="Integrations"
            desc="Connect cloud drives & local folders (optional)."
          />
        </div>
      </motion.section>

      {/* ====== FOOTER ====== */}
      <footer className="footer">
        © AutoDesk • 2025 · Privacy-first • Local-first • Fast
      </footer>
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
    </motion.div>
  );
}
