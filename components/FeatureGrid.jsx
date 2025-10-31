// components/FeatureGrid.jsx
import { motion } from "framer-motion";

const features = [
  { title: "Smart Rename", desc: "Semantic file renaming based on content and date." },
  { title: "Auto Sort", desc: "Automatically group into Documents, Photos, Code." },
  { title: "Duplicate Finder", desc: "Detect & remove duplicate files safely." },
  { title: "Privacy-First", desc: "Local-first processing; never upload without consent." },
  { title: "One-Click Cleanup", desc: "Preview and apply fixes with confidence." },
  { title: "Integrations", desc: "Connect cloud drives & local folders (optional)." },
];

export default function FeatureGrid(){
  return (
    <div className="feature-grid">
      {features.map((f, i) => (
        <motion.div className="feature-tile" key={i} whileHover={{ scale: 1.03, y: -6 }} transition={{ type: "spring", stiffness: 280 }}>
          <div className="tile-icon" aria-hidden>★</div>
          <div>
            <div className="tile-title">{f.title}</div>
            <div className="tile-desc muted">{f.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
