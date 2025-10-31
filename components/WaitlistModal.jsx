// components/WaitlistModal.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WaitlistModal({ open, onClose, onJoined }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { if (!open) { setEmail(""); setName(""); setMsg(""); setBusy(false); } }, [open]);

  async function submit(e){
    e.preventDefault();
    if (!email) { setMsg("Email required"); return; }
    setBusy(true); setMsg("");
    try {
      const res = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ name, email })});
      const j = await res.json();
      if (res.ok) {
        setMsg("You're on the list — thanks!");
        onJoined && onJoined();
      } else {
        setMsg(j.error || "Failed");
      }
    } catch (err) {
      setMsg("Network error");
    } finally { setBusy(false); }
  }

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal>
      <motion.div className="modal-card" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3>Join AutoDesk waitlist</h3>
        <p className="muted">First 100 get 1 month Pro free. Early signups get 25% off.</p>

        <form onSubmit={submit} style={{ marginTop: 12 }}>
          <input className="input" placeholder="Your name (optional)" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} />
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button className="btn-primary" type="submit" disabled={busy}>{busy ? "Saving…" : "Join waitlist"}</button>
            <button className="btn-ghost" type="button" onClick={onClose}>Cancel</button>
          </div>
          {msg && <div className="small muted" style={{ marginTop:8 }}>{msg}</div>}
        </form>
      </motion.div>
    </div>
  );
}
