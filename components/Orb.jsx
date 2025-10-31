// components/Orb.jsx
import { useEffect, useRef } from "react";

/*
 Simple animated SVG orb that responds to mouse and has layered gradients.
 Lightweight, no external libs.
*/
export default function Orb() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastX = 0, lastY = 0;
    function onMove(e) {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;
      lastX += (mx - lastX) * 0.08;
      lastY += (my - lastY) * 0.08;
      el.style.setProperty("--mx", lastX);
      el.style.setProperty("--my", lastY);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="orb-wrap" aria-hidden>
      <svg viewBox="0 0 600 600" className="orb-svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g1" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#00c2ff" stopOpacity="0.85"/>
            <stop offset="60%" stopColor="#6e3bff" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.0"/>
          </radialGradient>
          <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <g filter="url(#f1)" style={{ transform: "translate3d(calc((var(--mx,0.5)-0.5)*40px), calc((var(--my,0.5)-0.5)*40px), 0)" }}>
          <circle cx="300" cy="300" r="220" fill="url(#g1)"/>
        </g>

        <g style={{ mixBlendMode: "screen", opacity: 0.9 }}>
          <circle cx="220" cy="260" r="90" fill="#ffffff10" />
          <circle cx="380" cy="340" r="60" fill="#ffffff08" />
        </g>
      </svg>
    </div>
  );
}
