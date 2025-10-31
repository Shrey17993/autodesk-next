// components/ActivityFeed.js
import React from 'react';
import { motion } from 'framer-motion';

export default function ActivityFeed({ items=[] }) {
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
        <div style={{fontWeight:700}}>Activity</div>
        <div className="small">Live feed</div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {items.map((it,i) => (
          <motion.div key={i} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{delay: i*0.03}} style={{display:'flex', justifyContent:'space-between', gap:10}}>
            <div>
              <div style={{fontWeight:600}}>{it.name}</div>
              <div className="small">{it.role}</div>
            </div>
            <div className="small">{new Date(it.when).toLocaleTimeString()}</div>
          </motion.div>
        ))}
        {items.length === 0 && <div className="small">No recent activity</div>}
      </div>
    </div>
  )
}
