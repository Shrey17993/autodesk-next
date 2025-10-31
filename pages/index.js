// pages/index.js
import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Orb from "../components/Orb";
import FeatureGrid from "../components/FeatureGrid";
import WaitlistModal from "../components/WaitlistModal";

export default function Home() {
  const [count, setCount] = useState(null);
  const [open, setOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

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

  return (
    <>
      <Head>
        <title>AutoDesk — Your computer, finally self-cleaning</title>
        <meta name="description" content="AutoDesk auto-organizes and declutters your files with privacy-first local AI." />
      </Head>

      <div className="heavy-root">
        <div className="bg-visuals" aria-hidden>
          <Orb />
        </div>

        <header className="site-header">
          <div className="brand">
            <div className="logo-pill" />
            <div>
              <div className="brand-name">AutoDesk</div>
              <div className="brand-tag">Auto tidy for your files</div>
            </div>
          </div>

          <nav className="header-actions">
            <div className="joined">{count !== null ? `${count.toLocaleString()} joined` : "—"}</div>
            <button className="btn-ghost" onClick={() => setOpen(true)}>Join waitlist</button>
          </nav>
        </header>

        <main className="page-container">
          <section className="hero-and-metrics">
            <div className="hero-left">
              <Hero
                onPrimary={() => setOpen(true)}
                onSecondary={() => setStatusMsg("Demo coming soon — stay tuned!")}
              />
              <div className="big-metrics">
                <motion.div className="metric-card" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="metric-title">Active waitlist</div>
                  <div className="metric-value">{count !== null ? count.toLocaleString() : "…"}</div>
                  <div className="metric-sub">First 100 get 1 month Pro</div>
                </motion.div>

                <motion.div className="metric-card alt" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="metric-title">Pre-launch discount</div>
                  <div className="metric-value">25%</div>
                  <div className="metric-sub">Applied to early supporters</div>
                </motion.div>
              </div>
            </div>

            <aside className="hero-right">
              <motion.div className="launch-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                <div className="launch-title">Launch Controls</div>
                <div className="launch-sub">Admin tools (safe; requires secret)</div>

                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  <button className="btn-primary" onClick={() => setOpen(true)}>Reserve spot</button>
                  <button className="btn-outline" onClick={async () => {
                    const secret = prompt("Admin secret:");
                    if (!secret) return;
                    const res = await fetch("/api/draw-winners", { method: "POST", headers: { "x-admin-secret": secret }});
                    const j = await res.json();
                    if (res.ok) setStatusMsg(`Draw done — winners: ${j.winners ?? 0}`);
                    else setStatusMsg(`Error: ${j.error || JSON.stringify(j)}`);
                  }}>Draw winners</button>
                </div>

                {statusMsg && <div className="small muted" style={{ marginTop: 12 }}>{statusMsg}</div>}
              </motion.div>

              <motion.div className="visual-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="visual-title">How AutoDesk works</div>
                <ol className="work-steps">
                  <li><strong>Scan</strong> — Smart analyze files locally.</li>
                  <li><strong>Suggest</strong> — Safe renames and groups.</li>
                  <li><strong>Apply</strong> — One click to clean up.</li>
                </ol>
              </motion.div>
            </aside>
          </section>

          <section className="features-heavy">
            <h3 className="heavy-heading">Built for real life</h3>
            <p className="heavy-lead">Enterprise core, consumer polish — AutoDesk automates the tedious file work so you can focus.</p>

            <FeatureGrid />
          </section>

          <footer className="site-foot">
            <div>© AutoDesk • 2025</div>
            <div className="muted">Privacy-first • Local-first • Fast</div>
          </footer>
        </main>

        <WaitlistModal open={open} onClose={() => setOpen(false)} onJoined={() => { setOpen(false); setStatusMsg("Thanks — you're on the list!"); }} />
      </div>
    </>
  );
}
