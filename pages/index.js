// pages/index.js
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { Activity, Cpu, Users, Settings } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function AliveDashboard() {
  const [users, setUsers] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [loading, setLoading] = useState(true);
  const glowRef = useRef(null);

  // 🟢 Realtime data stream from Supabase
  useEffect(() => {
    async function init() {
      const { count } = await supabase
        .from("signups")
        .select("*", { count: "exact", head: true });
      setUsers(count || 0);
      setSessions(Math.floor((count || 0) * 2.3));
      setLoading(false);

      // Live updates
      const channel = supabase
        .channel("db-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "signups" },
          async () => {
            const { count } = await supabase
              .from("signups")
              .select("*", { count: "exact", head: true });
            setUsers(count || 0);
            setSessions(Math.floor((count || 0) * 2.3));
          }
        )
        .subscribe();

      return () => supabase.removeChannel(channel);
    }

    init();
  }, []);

  // 💡 Glow mouse effect
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const move = (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white flex">
      {/* Glow Mouse Trail */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-80 h-80 bg-blue-600/20 rounded-full blur-[140px] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      ></div>

      {/* Animated Particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400/10 rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 50 - 25],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between"
      >
        <div>
          <h1 className="text-3xl font-orbitron tracking-widest bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 text-transparent bg-clip-text mb-10">
            ALIVENET
          </h1>
          <nav className="space-y-3">
            {[
              { name: "Overview", icon: Activity },
              { name: "Users", icon: Users },
              { name: "AI Engine", icon: Cpu },
              { name: "Settings", icon: Settings },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, x: 10 }}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-blue-500/20 to-cyan-400/10"
              >
                <item.icon size={20} className="text-blue-400" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="text-sm text-gray-400">v3.9.1 • Synced</div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative z-10">
        <header className="flex justify-between items-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold"
          >
            Welcome Back,{" "}
            <span className="text-blue-400 bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 text-transparent">
              Operator
            </span>
          </motion.h2>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl shadow-blue-500/30" />
        </header>

        {/* Live Metrics */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: "Active Users", value: users },
            { title: "AI Sessions", value: sessions },
            { title: "Network", value: "Stable" },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-blue-500/30 transition"
            >
              <h3 className="text-lg text-gray-300">{card.title}</h3>
              <p className="text-4xl font-bold text-blue-400 mt-2">
                {loading ? "…" : card.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Core */}
        <motion.div
          className="mt-12 p-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
            <Cpu className="text-cyan-400" /> AI Core Status
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Neural links active. Processing distributed consciousness signals.{" "}
            <span className="text-blue-400 font-semibold animate-pulse">
              Connection: Stable | Latency: 19ms | Mode: Autonomous
            </span>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
