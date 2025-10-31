// pages/index.js
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

import AnimatedBackground from "../components/AnimatedBackground";
import AnimatedOrb from "../components/AnimatedOrb";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import ParallaxLayers from "../components/ParallaxLayers";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    if (typeof window !== "undefined") window.addEventListener("mousemove", onMove, { passive: true });
    return () => typeof window !== "undefined" && window.removeEventListener("mousemove", onMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting…");
    try {
      const { error } = await supabase.from("waitlist").insert([form]);
      if (error) {
        if ((error.message || "").toLowerCase().includes("duplicate")) setStatus("You already joined.");
        else setStatus("DB error — try again.");
      } else {
        setStatus("✅ Added to waitlist!");
        setForm({ name: "", email: "" });
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error");
    }
  };

  return (
    <>
      <Head>
        <title>AutoDesk — Declutter your digital world</title>
      </Head>

      <main ref={pageRef} className="heavy-root relative min-h-screen overflow-x-hidden">
        <AnimatedBackground />
        <AnimatedOrb mouse={mouse} scrollYProgress={scrollYProgress} />

        <div style={{ position: "fixed", top: 18, right: 18, zIndex: 60 }}>
          <ThemeToggle />
        </div>

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
                <Hero onPrimary={() => window.scrollTo({ top: 700, behavior: "smooth" })} />
              </div>

              <div className="hero-visual parallax" aria-hidden>
                {/* legacy visual placeholder (non-intrusive) */}
                <div style={{ width: 340, height: 220, borderRadius: 16, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))", boxShadow: "0 0 30px rgba(0,255,255,0.08)" }} />
              </div>
            </div>
          </section>

          <ParallaxLayers rootRef={pageRef}>
            <section className="waitlist-section">
              <div className="waitlist-card">
                <div>
                  <h3 className="waitlist-title">🎉 Random 50 get <span>Lifetime Pro</span> • 25% pre-launch</h3>
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
                <div className="feature-card fade-in" key={i} style={{ animationDelay: `${0.06 * i}s` }}>
                  <h3>{f[0]}</h3>
                  <p>{f[1]}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="site-foot">© AutoDesk • 2025 — Privacy-first • Local-first • Fast</footer>
        </div>
      </main>
    </>
  );
}
