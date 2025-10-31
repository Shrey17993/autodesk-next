// components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const saved = localStorage.getItem("site-theme");
    if (saved) setTheme(saved);
    apply(saved || "dark");
  }, []);
  function apply(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("site-theme", t);
  }
  function toggle() {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t); apply(t);
  }
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
