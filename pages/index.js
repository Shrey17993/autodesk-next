import Head from "next/head";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    const { error } = await supabase.from("waitlist").insert([form]);
    setStatus(error ? "DB Error ❌" : "✅ Added to waitlist!");
  };

  // Track mouse for interactive orb
  useEffect(() => {
    const handleMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <Head>
        <title>AutoDesk — Auto tidy for your files</title>
      </Head>

      <main className="heavy-root">
        {/* Background gradient glow */}
        <motion.div
          className="background-glow"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Hero Section */}
        <motion.section
          className="hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-grid">
            <div className="hero-text">
              <motion.h1
                className="hero-title"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
              >
                {"AutoDesk".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="hero-sub"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Your computer, finally self-cleaning.
                <br />
                Local AI that declutters — privately.
              </motion.p>

              <div className="hero-ctas">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reserve your spot
                </motion.button>
                <motion.button
                  className="btn-ghost"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more
                </motion.button>
              </div>
            </div>

            {/* Orb follows cursor */}
            <motion.div
              className="orb"
              animate={{
                x: mouse.x / 50 - 30,
                y: mouse.y / 50 - 30,
              }}
              transition={{ type: "spring", stiffness: 40, damping: 20 }}
            />
          </div>
        </motion.section>

        {/* Waitlist */}
        <motion.section
          className="waitlist-section"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="waitlist-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Random 50 get <span>Lifetime Pro</span> • 25% pre-launch
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="waitlist-form"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
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
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00e7ff77" }}
            >
              Join waitlist
            </motion.button>
          </motion.form>

          {status && <p className="waitlist-status">{status}</p>}
        </motion.section>

        {/* Features */}
        <section className="features-heavy">
          <motion.h2
            className="heavy-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Features that feel magic
          </motion.h2>

          <div className="features-grid">
            {[
              ["Smart Rename", "AI renaming that understands your files."],
              ["Auto Sort", "Groups photos, docs, code with intent."],
              ["Privacy-First", "100% on-device — zero uploads."],
              ["Duplicate Finder", "Finds & removes copies instantly."],
              ["One-Click Cleanup", "Preview and confirm changes safely."],
              ["Integrations", "Connect drives seamlessly."],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotateX: 4, rotateY: 4 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="site-foot">
          © AutoDesk • 2025 <br /> Privacy-first • Local-first • Fast
        </footer>
      </main>
    </>
  );
}
