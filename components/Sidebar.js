// components/Sidebar.js
import React from 'react';
import { motion } from 'framer-motion';

export default function Sidebar({ count, recent }) {
  return (
    <aside className="sidebar">
      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:18}}>
        <div style={{width:48, height:48, borderRadius:12, background:'linear-gradient(135deg,#00BFA5,#1ecbe1)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 30px rgba(0,191,165,0.08)'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="4" width="20" height="16" rx="3" fill="white" opacity="0.08"/>
            <path d="M6 8h12M6 12h12M6 16h8" stroke="white" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div style={{fontWeight:800}}>AutoDesk</div>
          <div style={{fontSize:12, color:'#9aa'}}>Your files. Automatically tidy.</div>
        </div>
      </div>

      <div className="card" style={{marginBottom:14}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className="small">Joined</div>
          <div style={{textAlign:'right'}}>
            <div className="stat-num">{count?.toLocaleString() ?? '—'}</div>
            <div className="small" style={{color:'#7f8b94'}}>Active waitlist</div>
          </div>
        </div>
        <div style={{height:10}} />
        <button id="open-waitlist" className="card" style={{width:'100%', textAlign:'center', cursor:'pointer', background:'linear-gradient(90deg,#00BFA5,#1ecbe1)', color:'#021515', fontWeight:700}}>Reserve spot</button>
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="small" style={{marginBottom:8}}>Recent signups</div>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {recent && recent.length === 0 && <div className="small">No signups yet</div>}
          {recent && recent.map((r, i) => (
            <div key={i} style={{display:'flex', justifyContent:'space-between', gap:8}}>
              <div style={{fontWeight:600}}>{r.name}</div>
              <div className="small">{new Date(r.when).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{display:'flex', flexDirection:'column', gap:8}}>
        <div style={{fontWeight:700}}>Quick actions</div>
        <button className="card small" style={{cursor:'pointer'}}>Download demo</button>
        <a className="small" href="#how" style={{color:'#9aa'}}>How it works</a>
      </div>

      <div style={{marginTop:18}} className="small">© AutoDesk · 2025</div>
    </aside>
  )
}
