import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
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
  const { scrollYProgress } = useScroll({ target: pageRef });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    const { error } = await supabase.from("waitlist").insert([form]);
    if (error) setStatus("Error or duplicate");
    else setStatus("✅ Added to waitlist!");
  };

  return (
    <>
      <Head>
        <title>AutoDesk — Declutter your digital world</title>
      </Head>

      <main
        ref={pageRef}
        className="heavy-root relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#020617] to-[#0b1120]"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="animated-bg"
            animate={{ backgroundPosition: ["0% 30%", "100% 70%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div style={{ position: "fixed", top: 18, right: 18, zIndex: 60 }}>
          <ThemeToggle />
        </div>

        <AnimatedOrb mouse={mouse} scrollYProgress={scrollYProgress} />

        <div className="page-container">
          <header className="site-header">
            <div className="brand">
              <div className="logo-pill" />
              <div>
                <div className="brand-name">AutoDesk</div>
                <div className="brand-tag">Auto tidy for your files</div>
              </div>
            </div>
            <TrustBadges />
          </header>

          {/* HERO */}
          <section className="hero-section">
            <div className="hero-grid">
              <div className="hero-left fade-in">
                <TypewriterHero headline="Your computer, finally self-cleaning." />
                <p className="hero-sub">
                  AutoDesk uses on-device AI to scan, suggest, and clean — private by default.
                </p>

                <div className="hero-ctas mt-6">
                  <button
                    className="btn-primary"
                    onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
                  >
                    Reserve your spot
                  </button>
                  <button className="btn-ghost">How it works</button>
                </div>
              </div>

              <div className="hero-visual parallax" aria-hidden>
                <motion.div
                  className="parallax-content fade-in"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div
                    style={{
                      width: 340,
                      height: 220,
                      borderRadius: 16,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                      boxShadow: "0 0 30px rgba(0,255,255,0.08)",
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
