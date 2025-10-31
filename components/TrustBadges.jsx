// components/TrustBadges.jsx
import React from "react";
import { motion } from "framer-motion";

const badges = [
  { alt: "Privacy-first", text: "Privacy-first", small: "On-device AI" },
  { alt: "Enterprise grade", text: "Enterprise grade", small: "Secure, audited" },
  { alt: "Loved by devs", text: "Trusted by creators", small: "Beta: 5k+" },
];

export default function TrustBadges() {
  return (
    <div className="trust-row" role="list" aria-label="Trust badges">
      {badges.map((b, i) => (
        <motion.div
          className="trust-badge"
          key={b.text}
          role="listitem"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 * i }}
        >
          <div className="badge-icon" aria-hidden>★</div>
          <div className="badge-text">
            <div className="badge-title">{b.text}</div>
            <div className="badge-sub">{b.small}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
