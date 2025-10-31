import Head from "next/head";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("waitlist").insert([form]);
    setStatus(error ? "DB Error ❌" : "✅ Added to waitlist!");
  };

  return (
    <>
      <Head>
        <title>AutoDesk — Auto tidy for your files</title>
      </Head>

      <main className="heavy-root">
        {/* Hero Section */}
        <motion.section
          className="hero-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-grid">
            <div className="hero-text">
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                AutoDesk
              </motion.h1>
              <motion.p
                className="hero-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Auto tidy for your files.
                <br />
                Your computer, finally self-cleaning.
              </motion.p>

              <div className="hero-ctas">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reserve your spot
                </motion.button>
                <motion.button
                  className="btn-ghost"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  How it works
                </motion.button>
              </div>
            </div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="orb"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Waitlist Section */}
        <motion.section
          className="waitlist-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="waitlist-title">
            Random 50 get <span>Lifetime Pro</span> • 25% pre-launch
          </h2>

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
            <button type="submit">Join waitlist</button>
          </form>

          {status && <p className="waitlist-status">{status}</p>}
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="features-heavy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="heavy-heading">How AutoDesk works</h2>
          <p className="heavy-lead">
            AutoDesk uses on-device AI to scan, rename, and declutter your files.
            Your workspace — clean, private, and effortless.
          </p>

          <div className="features-grid">
            {[
              ["Smart Rename", "Semantic file renaming based on content and date."],
              ["Auto Sort", "Automatically group into Documents, Photos, Code."],
              ["Duplicate Finder", "Detect & remove duplicate files safely."],
              ["Privacy-First", "Local-first processing; never upload without consent."],
              ["One-Click Cleanup", "Preview and apply fixes with confidence."],
              ["Integrations", "Connect cloud drives & local folders (optional)."],
            ].map(([title, desc]) => (
              <motion.div
                key={title}
                className="feature-card"
                whileHover={{ scale: 1.05 }}
              >
                <h3>★ {title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <footer className="site-foot">
          © AutoDesk • 2025 <br /> Privacy-first • Local-first • Fast
        </footer>
      </main>
    </>
  );
}
