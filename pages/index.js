// pages/index.js
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

import AnimatedOrb from "../components/AnimatedOrb";
import TrustBadges from "../components/TrustBadges";
import ParallaxLayers from "../components/ParallaxLayers";
import ThemeToggle from "../components/ThemeToggle";
import TypewriterHero from "../components/TypewriterHero";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => { /* small page-ready focus for A11y */ document.documentElement.lang = "en"; }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting…");
    try {
      const { error } = await supabase.from("waitlist").insert([form]);
      if (error) {
        if (error.message?.toLowerCase().includes("duplicate")) setStatus("You already joined.");
        else setStatus("DB error — try again.");
      } else { setStatus("✅ Added to waitlist!"); setForm({ name: "", email: "" }); }
    } catch (err) { console.error(err); setStatus("Network error"); }
  };

  return (
    <>
      <Head>
        <title>AutoDesk — Declutter your digital world</title>
      </Head>

      <main ref={pageRef} className="heavy-root">
        {/* Theme toggle top-right */}
        <div style={{ position: "fixed", top: 18, right: 18, zIndex: 60 }}>
          <ThemeToggle />
        </div>

        {/* Animated gradient background (keeps subtle) */}
        <motion.div className="animated-bg" animate={{ backgroundPosition: ["0% 30%", "100% 70%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />

        {/* Animated Orb component */}
        <AnimatedOrb mouse={mouse} scrollYProgress={scrollYProgress} />

        <div className="page-container">
          <header className="site-header" role="banner">
            <div className="brand">
              <div className="logo-pill" />
              <div>
                <div className="brand-name">AutoDesk</div>
                <div className="brand-tag">Auto tidy for your files</div>
              </div>
            </div>

            <nav className="header-actions" aria-label="Primary">
              <TrustBadges />
            </nav>
          </header>

          <section className="hero-section" role="region" aria-labelledby="hero-heading">
            <div className="hero-grid">
              <div className="hero-left">
                <TypewriterHero headline="Your computer, finally self-cleaning." />
                <p className="hero-sub">AutoDesk uses on-device AI to scan, suggest, and clean — private by default.</p>

                <div className="hero-ctas" style={{ marginTop: 18 }}>
                  <button className="btn-primary" onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}>Reserve your spot</button>
                  <button className="btn-ghost">How it works</button>
                </div>

                <div style={{ marginTop: 18 }}>
                  <div className="big-metrics">
                    <div className="metric-card"><div className="metric-title">Active waitlist</div><div className="metric-value">0</div></div>
                    <div className="metric-card"><div className="metric-title">Pre-launch</div><div className="metric-value">25%</div></div>
                  </div>
                </div>
              </div>

              <div className="hero-visual" aria-hidden>
                {/* small right-side mock illustration box */}
                <div style={{ width: 340, height: 220, borderRadius: 16, background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))" }} />
              </div>
            </div>
          </section>

          <ParallaxLayers rootRef={pageRef}>
            <section className="waitlist-section" aria-labelledby="waitlist-heading">
              <div className="waitlist-card">
                <div className="waitlist-left">
                  <h3 id="waitlist-heading" className="waitlist-title">🎉 Random 50 get <span>Lifetime Pro</span> • 25% pre-launch</h3>
                  <div className="waitlist-sub">Sign up for early support and discounts — winners chosen at random after launch.</div>

                  <form onSubmit={handleSubmit} className="waitlist-form" style={{ marginTop: 12 }}>
                    <input className="input" type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input className="input" type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <button type="submit" className="btn-primary">Join waitlist</button>
                  </form>

                  {status && <div className="waitlist-status" role="status">{status}</div>}
                </div>

                <div style={{ minWidth: 260, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ width: 200, height: 120, borderRadius: 12, background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))" }} />
                </div>
              </div>
            </section>
          </ParallaxLayers>

          <section className="features-heavy">
            <h2 className="heavy-heading">How AutoDesk works</h2>
            <p className="heavy-lead">Three steps to reclaim your digital sanity.</p>

            <div className="features-grid">
              {[
                ["Scan", "Smart analyze files locally — never uploads."],
                ["Suggest", "Preview safe renames and groups."],
                ["Apply", "One click, confirm changes."],
                ["Privacy-First", "Local processing, opt-in cloud."],
                ["Integrations", "Optional cloud sync connectors."],
                ["Duplicate Finder", "Find & remove redundant files."],
              ].map((f, i) => (
                <div className="feature-card" key={i}>
                  <h3>{f[0]}</h3>
                  <p>{f[1]}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="site-foot" role="contentinfo">© AutoDesk • 2025 — Privacy-first • Local-first • Fast</footer>
        </div>
      </main>
    </>
  );
}
