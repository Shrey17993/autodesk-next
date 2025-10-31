// pages/index.js
import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Orb from "../components/Orb";
import FeatureGrid from "../components/FeatureGrid";
import WaitlistModal from "../components/WaitlistModal";
import { supabase } from "../lib/supabaseClient";
import React from "react";

export default function Home() {
  const [count, setCount] = useState(null);
  const [open, setOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch waitlist count
  useEffect(() => {
    let mounted = true;
    async function fetchCount() {
      try {
        const res = await fetch("/api/count");
        const j = await res.json();
        if (mounted) setCount(j.count ?? 0);
      } catch (e) {
        if (mounted) setCount(0);
      }
    }
    fetchCount();
    const iv = setInterval(fetchCount, 15000);
    return () => { mounted = false; clearInterval(iv); };
  }, []);

  // Handle form submit (join waitlist)
  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    const { error } = await supabase.from("signups").insert([
      { name, email, tier: "waitlist" },
    ]);

    if (error) {
      console.error(error);
      setStatusMsg("❌ Database error: " + error.message);
    } else {
      setStatusMsg("✅ You're on the waitlist!");
      setName("");
      setEmail("");
    }

    setLoading(false);
  };

  return (
  <React.Suspense fallback={<div style={{ color: "white", padding: 50 }}>Loading...</div>}>
    <>
      <Head>
        <title>AutoDesk — Your computer, finally self-cleaning</title>
        <meta
          name="description"
          content="AutoDesk auto-organizes and declutters your files with privacy-first local AI."
        />
      </Head>

      <div className="heavy-root">
        <header className="site-header">
          <div className="brand">
            <div className="logo-pill" />
            <div>
              <div className="brand-name">AutoDesk</div>
              <div className="brand-tag">Auto tidy for your files</div>
            </div>
          </div>

          <nav className="header-actions">
            <div className="joined">
              {count !== null ? `${count.toLocaleString()} joined` : "—"}
            </div>
            <button className="btn-ghost" onClick={() => setOpen(true)}>
              Join waitlist
            </button>
          </nav>
        </header>

        <main className="page-container">
          <section className="hero-and-metrics">
            <div className="hero-left">
              <Hero
                onPrimary={() => setOpen(true)}
                onSecondary={() =>
                  setStatusMsg("Demo coming soon — stay tuned!")
                }
              />

              <div className="big-metrics">
                <motion.div
                  className="metric-card"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="metric-title">Active waitlist</div>
                  <div className="metric-value">
                    {count !== null ? count.toLocaleString() : "…"}
                  </div>
                  <div className="metric-sub">
                    Random 50 get{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(90deg, var(--neon1), var(--neon2))",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        fontWeight: 700,
                      }}
                    >
                      Lifetime Pro
                    </span>{" "}
                    • 25% pre-launch
                  </div>
                </motion.div>
              </div>
            </div>

            <aside className="hero-right">
              <motion.div
                className="launch-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
              >
                <div className="launch-title">Reserve your spot</div>
                <div className="launch-sub">
                  Random 50 get Lifetime Pro • 25% pre-launch
                </div>

                <form
                  onSubmit={handleJoin}
                  className="flex flex-col gap-3 mt-3"
                  style={{ maxWidth: 320 }}
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? "Joining..." : "Join waitlist"}
                  </button>
                </form>

                {statusMsg && (
                  <div
                    className="small muted"
                    style={{ marginTop: 12, color: "#9ef" }}
                  >
                    {statusMsg}
                  </div>
                )}
              </motion.div>

              <motion.div
                className="visual-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="visual-title">How AutoDesk works</div>
                <ol className="work-steps">
                  <li>
                    <strong>Scan</strong> — Smart analyze files locally.
                  </li>
                  <li>
                    <strong>Suggest</strong> — Safe renames and groups.
                  </li>
                  <li>
                    <strong>Apply</strong> — One click to clean up.
                  </li>
                </ol>
              </motion.div>
            </aside>
          </section>

          <section className="features-heavy">
            <h3 className="heavy-heading">Built for real life</h3>
            <p className="heavy-lead">
              Enterprise core, consumer polish — AutoDesk automates the tedious
              file work so you can focus.
            </p>
            <FeatureGrid />
          </section>

          <footer className="site-foot">
            <div>© AutoDesk • 2025</div>
            <div className="muted">Privacy-first • Local-first • Fast</div>
          </footer>
        </main>

        <WaitlistModal
          open={open}
          onClose={() => setOpen(false)}
          onJoined={() => {
            setOpen(false);
            setStatusMsg("Thanks — you're on the list!");
          }}
        />
      </div>
    </>
  </React.Suspense>
);

}
