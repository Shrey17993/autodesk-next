// components/Header.js
import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ onOpenWaitlist }) {
  return (
    <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div style={{padding:8, borderRadius:10, background:'rgba(255,255,255,0.02)'}}>Search</div>
        <div style={{color:'#9aa'}}>Dashboard</div>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <button onClick={onOpenWaitlist} className="btn" style={{padding:'8px 12px', borderRadius:10, background:'linear-gradient(90deg,#00BFA5,#1ecbe1)', color:'#021515', fontWeight:700}}>Join Waitlist</button>
        <div style={{width:38, height:38, borderRadius:10, background:'rgba(255,255,255,0.02)', display:'flex', alignItems:'center', justifyContent:'center'}}>S</div>
      </div>
    </header>
  )
}
