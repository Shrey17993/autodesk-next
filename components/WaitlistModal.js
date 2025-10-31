// components/WaitlistModal.js
import React, { useState } from 'react';

export default function WaitlistModal({ open, onClose, onJoined }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  if (!open) return null;

  async function submit(e){
    e.preventDefault();
    setMsg('');
    if(!email) { setMsg('Email required'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role })
      });
      const j = await res.json();
      if(res.ok){
        setMsg('Thanks — you’re on the list!');
        onJoined && onJoined();
        setName(''); setEmail(''); setRole('');
        setTimeout(() => { setMsg(''); onClose(); }, 1600);
      } else {
        setMsg(j.error || 'Submission failed');
      }
    } catch(e){
      setMsg('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000
    }}>
      <div style={{ width: 'min(540px,92%)', background:'#071317', padding:20, borderRadius:12, border:'1px solid rgba(255,255,255,0.03)' }}>
        <button onClick={onClose} style={{ float:'right', background:'transparent', border:0, color:'#9aa'}}>✕</button>
        <h3 style={{ marginTop:0 }}>Reserve your spot</h3>
        <p style={{ color:'#9aa' }}>Random 50 will get Lifetime Pro access. Early signups still get 25% off.</p>
        <form onSubmit={submit}>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" style={inputStyle} />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
          <select value={role} onChange={e=>setRole(e.target.value)} style={inputStyle}>
            <option value="">How do you use your computer?</option>
            <option value="student">Student</option>
            <option value="freelancer">Freelancer/Pro</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
          <div style={{ display:'flex', gap:8, alignItems:'center', marginTop:10 }}>
            <button className="btn" type="submit" disabled={loading} style={{ padding:'10px 16px' }}>{loading ? 'Saving...' : 'Join waitlist'}</button>
            <div style={{ color:'#9aa', fontSize:13 }}>{msg}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  marginTop: 8,
  borderRadius: 8,
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.04)',
  color: '#fff'
};
