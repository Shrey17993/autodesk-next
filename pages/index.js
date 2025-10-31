// pages/index.js
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import WaitlistModal from '../components/WaitlistModal'

export default function Home() {
  const [count, setCount] = useState(0)
  const [recent, setRecent] = useState([])
  const [open, setOpen] = useState(false)
  const [now, setNow] = useState(new Date())
  const waitlistClose = process.env.NEXT_PUBLIC_WAITLIST_CLOSE

  useEffect(()=>{ fetchCount(); fetchRecent(); const iv = setInterval(fetchCount, 20000); setNow(new Date()); const t = setInterval(()=>setNow(new Date()),1000); return ()=>{clearInterval(iv); clearInterval(t)} }, [])

  async function fetchCount(){
    try {
      const res = await fetch('/api/count')
      const j = await res.json()
      if(j.count !== undefined) setCount(j.count)
    } catch(e){ console.error(e) }
  }

  async function fetchRecent(){
    try {
      const res = await fetch('/api/recent?limit=9')
      const j = await res.json()
      if(j.recent) setRecent(j.recent)
    } catch(e){ console.error(e) }
  }

  function handleJoined(){
    fetchCount(); fetchRecent();
  }

  // countdown
  const end = new Date(waitlistClose)
  const diff = Math.max(0, end - now)
  const days = Math.floor(diff / (1000*60*60*24))
  const hours = Math.floor((diff % (1000*60*60*24))/(1000*60*60))
  const minutes = Math.floor((diff % (1000*60*60))/(1000*60))
  const seconds = Math.floor((diff % (1000*60))/1000)

  return (
    <>
      <Head>
        <title>AutoDesk — Your files, automatically tidy</title>
        <meta name="description" content="AutoDesk keeps your desktop and downloads clean using AI. Smart renaming, automatic sorting, privacy-first." />
      </Head>

      <main style={{ background: 'linear-gradient(180deg,#000,#071014)', minHeight:'100vh', color:'#fff' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:28 }}>
          <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:56, height:56, borderRadius:12, background:'linear-gradient(135deg,#00ffa3,#1ecbe1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src="/assets/logo.svg" alt="logo" style={{ width:36 }} />
              </div>
              <div>
                <div style={{ fontWeight:800 }}>AutoDesk</div>
                <div style={{ fontSize:13, color:'#9aa' }}>Your files. Automatically tidy.</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <a href="#how" style={{ padding:'8px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.04)', color:'#9aa' }}>How it works</a>
              <button onClick={()=>setOpen(true)} style={{ padding:'10px 14px', borderRadius:999, background:'linear-gradient(90deg,#00ffa3,#1ecbe1)', color:'#061414', fontWeight:700 }}>Join Early Access</button>
            </div>
          </header>

          <section style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:28, marginTop:22 }}>
            <div>
              <h1 style={{ fontSize:42, margin:0, lineHeight:1, background:'linear-gradient(90deg,#00ffa3,#1ecbe1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Your computer, finally self-cleaning.</h1>
              <p style={{ color:'#9aa', fontSize:18 }}>AutoDesk automatically organizes, renames, and declutters your files — privacy-first and set-it-and-forget-it.</p>

              <div style={{ display:'flex', gap:12, marginTop:16 }}>
                <button onClick={()=>setOpen(true)} className="btn" style={{ padding:'12px 18px', borderRadius:999, background:'linear-gradient(90deg,#00ffa3,#1ecbe1)', color:'#061414', fontWeight:700 }}>🚀 Reserve Spot</button>
                <a href="#features" style={{ padding:'10px 14px', borderRadius:12, border:'1px solid rgba(255,255,255,0.04)', color:'#9aa' }}>See features</a>
              </div>

              <p style={{ color:'#9aa', marginTop:12 }}>🎁 <strong>First 100 sign-ups</strong> will be randomly chosen to receive 1 month AutoDesk Pro free. Pre-launch signups get <strong>25% off for life</strong>.</p>

              <div id="features" style={{ marginTop:18, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                <div style={featureStyle}><h4 style={{ margin:'0 0 8px 0', color:'#00ffa3' }}>🧠 Smart Rename</h4><p style={{ margin:0, color:'#9aa' }}>Rename files sensibly based on content.</p></div>
                <div style={featureStyle}><h4 style={{ margin:'0 0 8px 0', color:'#00ffa3' }}>📂 Auto Sort</h4><p style={{ margin:0, color:'#9aa' }}>Organize into Documents, Photos, Work, etc.</p></div>
                <div style={featureStyle}><h4 style={{ margin:'0 0 8px 0', color:'#00ffa3' }}>♻️ Duplicate Finder</h4><p style={{ margin:0, color:'#9aa' }}>Detect duplicates and free space.</p></div>
                <div style={featureStyle}><h4 style={{ margin:'0 0 8px 0', color:'#00ffa3' }}>🔒 Local Mode</h4><p style={{ margin:0, color:'#9aa' }}>Optional local-only processing — privacy-first.</p></div>
                <div style={featureStyle}><h4 style={{ margin:'0 0 8px 0', color:'#00ffa3' }}>📊 Weekly Digest</h4><p style={{ margin:0, color:'#9aa' }}>Summary of what's cleaned & space saved.</p></div>
                <div style={featureStyle}><h4 style={{ margin:'0 0 8px 0', color:'#00ffa3' }}>⚙️ Macros</h4><p style={{ margin:0, color:'#9aa' }}>Chain actions together (rename+archive).</p></div>
              </div>

            </div>

            <aside>
              <div style={{ background:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', borderRadius:14, padding:10 }}>
                <div style={{ borderRadius:10, overflow:'hidden', border:'1px solid rgba(0,255,163,0.03)' }}>
                  <video id="demo" src="/assets/autodesk-demo.mp4" autoPlay muted loop playsInline style={{ width:'100%', display:'block' }} />
                </div>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10 }}>
                  <div>
                    <div style={{ fontWeight:800, fontSize:18 }}>🔥 {count.toLocaleString()} joined</div>
                    <div style={{ color:'#9aa', fontSize:13 }}>Be among the first to try AutoDesk</div>
                    <div style={{ marginTop:8 }}>{recent.slice(0,6).map(r=> <span key={r.when} style={{ display:'inline-block', marginRight:6, padding:'6px 10px', borderRadius:999, background:'rgba(255,255,255,0.02)', color:'#fff', fontSize:13 }}>{r.name}</span>)}</div>
                  </div>
                  <div>
                    <button onClick={()=>setOpen(true)} style={{ padding:'10px 14px', borderRadius:999, background:'linear-gradient(90deg,#00ffa3,#1ecbe1)', color:'#061414', fontWeight:700 }}>Reserve</button>
                  </div>
                </div>

                <div style={{ marginTop:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
                    <div style={{ color:'#9aa', fontSize:13 }}>Waitlist closes in</div>
                    <div style={{ color:'#9aa', fontSize:13 }}>{days}d {hours}h {minutes}m {seconds}s</div>
                  </div>
                </div>

              </div>

              <div style={{ marginTop:14, background:'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))', padding:12, borderRadius:12 }}>
                <h4 style={{ margin:'0 0 6px 0' }}>Join the movement</h4>
                <p style={{ margin:0, color:'#9aa' }}>Reserve your spot and help shape AutoDesk.</p>
                <div style={{ marginTop:10 }}>
                  <button onClick={()=>setOpen(true)} style={{ padding:'10px 14px', borderRadius:999, background:'linear-gradient(90deg,#00ffa3,#1ecbe1)', color:'#061414', fontWeight:700 }}>Reserve</button>
                </div>
              </div>
            </aside>
          </section>

          <footer style={{ marginTop:48, color:'#9aa', textAlign:'center' }}>
            <div>Made by Shreyan Singh • AutoDesk © 2025</div>
          </footer>

        </div>
      </main>

      <WaitlistModal open={open} onClose={()=>setOpen(false)} onJoined={handleJoined} />
    </>
  )
}

const featureStyle = { padding:12, borderRadius:10, background:'rgba(255,255,255,0.02)' }
