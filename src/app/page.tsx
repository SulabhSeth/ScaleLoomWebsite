"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   SHARED HOOK
═══════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useInView(0.3);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = Math.ceil(value / (1600 / 16));
    const t = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(t); }
      else setCount(start);
    }, 16);
    return () => clearInterval(t);
  }, [isVisible, value]);
  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   MINI MOCKUPS — exact replicas of each service hero, scaled down
═══════════════════════════════════════════════════════════ */

/* ── 1. Data Visualization ── revenue dashboard */
function MiniDataViz() {
  const bars = [40, 65, 50, 80, 60, 90, 75];
  const days = ["M","T","W","T","F","S","S"];
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "#07187b" }}>
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <p className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Weekly Overview</p>
          <p className="text-xs font-black text-white leading-tight">Revenue Dashboard</p>
        </div>
        <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(148,181,0,0.2)", color: "#94b500" }}>● Live</span>
      </div>
      <div className="px-4 pb-2 grid grid-cols-3 gap-1.5">
        {[
          { l: "Total Revenue", v: "$284K", d: "+12%" },
          { l: "Active Users",  v: "14.3K", d: "+8%"  },
          { l: "Conversion",    v: "3.7%",  d: "+0.4%" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-2" style={{ background: "rgba(255,255,255,0.06)" }}>
            <p className="text-[7px] mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.l}</p>
            <p className="text-[10px] font-black text-white leading-none">{s.v}</p>
            <p className="text-[7px] font-semibold mt-0.5" style={{ color: "#94b500" }}>{s.d} ↑</p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 pt-1">
        <p className="text-[7px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>7-Day Trend</p>
        <div className="flex items-end gap-1 h-10">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <div className="w-full rounded-t-sm"
                style={{ height: `${h}%`, background: i === 5 ? "#94b500" : "rgba(255,255,255,0.18)", animation: `growUp 0.8s ease ${i * 80 + 200}ms both` }} />
              <span className="text-[6px]" style={{ color: "rgba(255,255,255,0.3)" }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 2. Digitisation & Automation ── step pipeline */
function MiniAutomation() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 5), 800);
    return () => clearInterval(t);
  }, []);

  const steps = [
    { label: "Receive",   icon: "📥" },
    { label: "Parse",     icon: "🔍" },
    { label: "Transform", icon: "⚙️" },
    { label: "Route",     icon: "🔀" },
    { label: "Deliver",   icon: "✅" },
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "rgba(7,24,123,0.04)", border: "1px solid rgba(7,24,123,0.1)" }}>
      <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(7,24,123,0.07)" }}>
        <p className="text-[9px] font-black tracking-wide" style={{ color: "#07187b" }}>Automation Pipeline</p>
        <span className="text-[7px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(148,181,0,0.12)", color: "#94b500" }}>Running</span>
      </div>
      <div className="px-4 py-3 flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1 flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300"
                style={{
                  background: active > i ? "linear-gradient(135deg,#07187b,#94b500)" : active === i ? "linear-gradient(135deg,#94b500,#b8d900)" : "rgba(7,24,123,0.07)",
                  transform: active === i ? "scale(1.18)" : "scale(1)",
                  boxShadow: active === i ? "0 0 10px rgba(148,181,0,0.5)" : "none",
                }}>
                {s.icon}
              </div>
              <span className="text-[7px] font-bold truncate w-full text-center" style={{ color: active >= i ? "#07187b" : "#aab0cc" }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="h-px w-3 flex-shrink-0 mb-3 transition-all duration-500"
                style={{ background: active > i ? "#94b500" : "rgba(7,24,123,0.12)" }} />
            )}
          </div>
        ))}
      </div>
      <div className="mx-3 mb-3 rounded-lg px-3 py-2" style={{ background: "rgba(7,24,123,0.06)", border: "1px solid rgba(7,24,123,0.08)" }}>
        <p className="text-[8px] font-mono" style={{ color: "#94b500" }}>
          ✓ {steps[Math.max(0, active - 1)]?.label ?? "Receive"} complete · saved 14h/wk
        </p>
        <p className="text-[7px] font-mono mt-0.5" style={{ color: "#6571ab" }}>
          → next: {steps[active]?.label ?? "Done"}
        </p>
      </div>
    </div>
  );
}

/* ── 3. Custom Solutions ── live kanban board */
function MiniCustomSolutions() {
  const cols = [
    { label: "Backlog",     color: "#6571ab", dot: "rgba(101,113,171,0.5)" },
    { label: "In Progress", color: "#07187b", dot: "#07187b"               },
    { label: "Shipped",     color: "#94b500", dot: "#94b500"               },
  ];
  const staticCards = [
    ["Auth flow", "DB schema", "API spec"],
    ["Dashboard UI"],
    ["Landing page", "Onboarding"],
  ];
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "#fff", border: "1px solid rgba(7,24,123,0.09)" }}>
      <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(7,24,123,0.07)" }}>
        <p className="text-[9px] font-black tracking-wide" style={{ color: "#07187b" }}>Custom Build · Sprint 3</p>
        <span className="text-[7px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(148,181,0,0.12)", color: "#94b500" }}>On Track</span>
      </div>
      <div className="px-3 py-3 grid grid-cols-3 gap-2">
        {cols.map((col, ci) => (
          <div key={ci}>
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.dot }} />
              <p className="text-[7px] font-bold truncate" style={{ color: col.color }}>{col.label}</p>
            </div>
            <div className="flex flex-col gap-1">
              {staticCards[ci].map((card, k) => (
                <div key={k} className="rounded-md px-2 py-1.5 text-[7.5px] font-semibold"
                  style={{ background: "rgba(7,24,123,0.04)", border: `1px solid ${ci === 1 && k === 0 ? "#94b500" : "rgba(7,24,123,0.08)"}`, color: "#07187b" }}>
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[7px] font-bold" style={{ color: "#6571ab" }}>Overall progress</p>
          <p className="text-[7px] font-black" style={{ color: "#94b500" }}>67%</p>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(7,24,123,0.07)" }}>
          <div className="h-full rounded-full" style={{ width: "67%", background: "linear-gradient(to right,#07187b,#94b500)" }} />
        </div>
      </div>
    </div>
  );
}

/* ── 4. API Integration ── node-graph (ApiFlowMockup mini) */
function MiniApiIntegration() {
  const nodes = [
    { label: "Your App",   icon: "🖥️", x: "50%", y: "10%"  },
    { label: "Stripe",     icon: "💳", x: "14%", y: "40%"  },
    { label: "Salesforce", icon: "☁️", x: "80%", y: "40%"  },
    { label: "Slack",      icon: "💬", x: "14%", y: "72%"  },
    { label: "PostgreSQL", icon: "🗄️", x: "80%", y: "72%"  },
    { label: "OpenAI",     icon: "🤖", x: "50%", y: "92%"  },
  ];
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => (p + 1) % nodes.length), 850);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "#07187b" }}>
      <div className="px-4 pt-4 pb-2 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[9px] font-black text-white tracking-wide">Integration Hub</p>
        <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(148,181,0,0.2)", color: "#94b500" }}>● Active</span>
      </div>
      <div className="relative mx-3 my-2" style={{ height: 120 }}>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
          {nodes.slice(1).map((n, i) => {
            const cx = parseFloat(nodes[0].x) / 100;
            const cy = parseFloat(nodes[0].y) / 100;
            const nx = parseFloat(n.x) / 100;
            const ny = parseFloat(n.y) / 100;
            const active = pulse === i + 1;
            return (
              <line key={i}
                x1={`${cx * 100}%`} y1={`${cy * 100 + 5}%`}
                x2={`${nx * 100}%`} y2={`${ny * 100}%`}
                stroke={active ? "#94b500" : "rgba(255,255,255,0.1)"}
                strokeWidth={active ? 1.5 : 0.8}
                strokeDasharray={active ? "4 2" : "0"}
                style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
              />
            );
          })}
        </svg>
        {nodes.map((n, i) => (
          <div key={i} className="absolute flex flex-col items-center"
            style={{ left: n.x, top: n.y, transform: "translate(-50%,-50%)" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all duration-300"
              style={{
                background: pulse === i ? "linear-gradient(135deg,#94b500,#b8d900)" : "rgba(255,255,255,0.1)",
                transform: pulse === i ? "scale(1.2)" : "scale(1)",
                boxShadow: pulse === i ? "0 0 12px rgba(148,181,0,0.6)" : "none",
              }}>
              {n.icon}
            </div>
            <span className="text-[6.5px] font-bold whitespace-nowrap mt-0.5"
              style={{ color: pulse === i ? "#94b500" : "rgba(255,255,255,0.4)" }}>
              {n.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mx-3 mb-3 rounded-lg px-3 py-2" style={{ background: "rgba(0,0,0,0.25)" }}>
        <p className="text-[8px] font-mono" style={{ color: "#94b500" }}>✓ POST /webhook → 200 OK · 42ms</p>
        <p className="text-[7px] font-mono mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>→ synced CRM · Slack notified</p>
      </div>
    </div>
  );
}

/* ── 5. Website & App Development ── browser + hero mockup */
function MiniWebDev() {
  const [tabActive, setTabActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTabActive(p => (p + 1) % 3), 1600);
    return () => clearInterval(t);
  }, []);
  const tabs = ["Home", "Pricing", "Docs"];

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid rgba(7,24,123,0.1)" }}>
      {/* browser chrome */}
      <div className="px-3 py-2 flex items-center gap-2" style={{ background: "rgba(7,24,123,0.05)", borderBottom: "1px solid rgba(7,24,123,0.08)" }}>
        <div className="flex gap-1 flex-shrink-0">
          <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex-1 rounded px-2 py-0.5 text-[7px] font-medium truncate" style={{ background: "rgba(7,24,123,0.05)", color: "#6571ab" }}>
          scaleloom.com
        </div>
      </div>
      <div style={{ background: "#fff" }}>
        {/* navbar */}
        <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(7,24,123,0.05)" }}>
          <div className="h-2 w-12 rounded-full" style={{ background: "#07187b" }} />
          <div className="flex gap-2">
            {tabs.map((tab, i) => (
              <span key={i} className="text-[7px] font-bold transition-all duration-300"
                style={{ color: tabActive === i ? "#94b500" : "rgba(7,24,123,0.3)", borderBottom: tabActive === i ? "1px solid #94b500" : "1px solid transparent" }}>
                {tab}
              </span>
            ))}
          </div>
          <div className="h-4 w-8 rounded-full" style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }} />
        </div>
        {/* hero block */}
        <div className="mx-3 mt-2.5 mb-2 rounded-xl p-3 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#07187b 0%,#0f2db8 100%)" }}>
          <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full opacity-20" style={{ background: "#94b500" }} />
          <div className="h-2 w-20 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.6)" }} />
          <div className="h-1.5 w-14 rounded-full mb-2.5" style={{ background: "rgba(255,255,255,0.25)" }} />
          <div className="h-4 w-14 rounded-full" style={{ background: "#94b500" }} />
        </div>
        {/* stat cards */}
        <div className="px-3 pb-3 grid grid-cols-3 gap-1.5">
          {[{ h: "10×", l: "Faster" }, { h: "98%", l: "Uptime" }, { h: "60%", l: "Saved" }].map((c, i) => (
            <div key={i} className="rounded-lg p-2 text-center" style={{ background: "rgba(7,24,123,0.04)", border: "1px solid rgba(7,24,123,0.07)" }}>
              <p className="text-[9px] font-black" style={{ color: "#07187b" }}>{c.h}</p>
              <p className="text-[6.5px] font-medium" style={{ color: "#6571ab" }}>{c.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const services = [
    { name: "Data Visualization & Analysis", path: "/services/data-visualization"      },
    { name: "Digitisation & Automations",    path: "/services/digitisation-automation" },
    { name: "Customised Point Solutions",    path: "/services/custom-solutions"        },
    { name: "API Integrations & Development",path: "/services/api-integration"         },
    { name: "Website & App Development",     path: "/services/web-development"         },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute pointer-events-none" style={{ top:"-20%",left:"-10%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(148,181,0,0.18) 0%,transparent 65%)",transform:`translate(${mousePos.x*-18}px,${mousePos.y*-14}px)`,transition:"transform 0.6s ease" }} />
      <div className="absolute pointer-events-none" style={{ bottom:"-15%",right:"-5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(7,24,123,0.08) 0%,transparent 65%)",transform:`translate(${mousePos.x*14}px,${mousePos.y*12}px)`,transition:"transform 0.6s ease" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage:"radial-gradient(#07187b 1px,transparent 1px)",backgroundSize:"32px 32px" }} />
      <div className="absolute left-0 top-0 h-full w-1.5 pointer-events-none" style={{ background:"linear-gradient(to bottom,#94b500,#07187b,transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10 pt-24 pb-16">
        <div style={{ opacity:visible?1:0,transform:visible?"translateX(0)":"translateX(-40px)",transition:"opacity 0.9s ease 0.1s,transform 0.9s ease 0.1s" }}>
          <div className="relative rounded-4xl p-1" style={{ background:"linear-gradient(135deg,#94b500 0%,#07187b 50%,#94b500 100%)" }}>
            <div className="relative bg-white rounded-[22px] overflow-hidden" style={{ height:360 }}>
              <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none" style={{ background:"linear-gradient(90deg,transparent,#94b500,transparent)",animation:"shimmer 3s ease-in-out infinite" }} />
              <div className="flex items-center justify-center h-full">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full" style={{ background:"radial-gradient(circle,rgba(148,181,0,0.15) 0%,transparent 70%)",transform:"scale(2.2)" }} />
                  <Image src="/logo.jpg" alt="ScaleLoom Logo" width={200} height={200} className="object-contain relative z-10 sm:w-[260px] sm:h-[260px]" style={{ borderRadius:24 }} />
                </div>
              </div>
              <div className="absolute bottom-5 right-5 rounded-xl px-3 py-2 text-center" style={{ background:"rgba(148,181,0,0.12)",border:"1px solid rgba(148,181,0,0.3)",animation:"float 3s ease-in-out infinite 1s" }}>
                <p className="text-xl font-black" style={{ color:"#94b500" }}>150+</p>
                <p className="text-[10px] font-bold" style={{ color:"#6571ab" }}>Projects</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:mt-0">
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-6" style={{ color:"#94b500",opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity 0.6s ease 0.2s,transform 0.6s ease 0.2s" }}>Digital Engineering Studio</p>
          <h1 className="font-black leading-[1.02] mb-6" style={{ fontSize:"clamp(2.4rem,5vw,4.5rem)",color:"#07187b",opacity:visible?1:0,transform:visible?"none":"translateY(28px)",transition:"opacity 0.7s ease 0.3s,transform 0.7s ease 0.3s" }}>
            SCALE<span className="relative inline-block mx-2 sm:mx-3 px-3 sm:px-4 py-0" style={{ background:"#07187b",color:"#94b500" }}>LOOM</span><br />
            <span style={{ WebkitTextStroke:"2px #94b500",color:"transparent" }}>Builds What</span><br />
            <span style={{ color:"#94b500" }}>Scales You.</span>
          </h1>
          <p className="text-base leading-relaxed mb-3 max-w-md" style={{ color:"#6571ab",opacity:visible?1:0,transform:visible?"none":"translateY(20px)",transition:"opacity 0.7s ease 0.4s,transform 0.7s ease 0.4s" }}>In the digital age, most businesses aren't suffering from a lack of technology — they're suffering from a lack of cohesion.</p>
          <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color:"#6571ab",opacity:visible?1:0,transform:visible?"none":"translateY(20px)",transition:"opacity 0.7s ease 0.45s,transform 0.7s ease 0.45s" }}>We weave your technical capabilities into your brand's ambition and build scalable digital systems that perform as loudly as they look.</p>
          <div className="flex flex-wrap gap-4 mb-10" style={{ opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity 0.7s ease 0.5s,transform 0.7s ease 0.5s" }}>
            <Link href="/contact" className="px-7 py-3.5 rounded-full font-bold text-sm text-white" style={{ background:"linear-gradient(135deg,#07187b,#94b500)",boxShadow:"0 8px 24px rgba(7,24,123,0.25)" }}>Talk to Us</Link>
            <Link href="/about" className="px-7 py-3.5 rounded-full font-bold text-sm border-2" style={{ borderColor:"#07187b",color:"#07187b" }}>Why Us →</Link>
          </div>
          <div className="flex flex-wrap gap-2" style={{ opacity:visible?1:0,transition:"opacity 0.7s ease 0.6s" }}>
            {services.map((s, i) => (
              <Link key={i} href={s.path} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105" style={{ background:"rgba(7,24,123,0.05)",border:"1px solid rgba(7,24,123,0.12)",color:"#07187b" }}>{s.name}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity:visible?1:0,transition:"opacity 1s ease 1.2s" }}>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color:"#6571ab",opacity:0.5 }}>Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor:"rgba(7,24,123,0.2)" }}>
          <div className="w-1 h-2 rounded-full" style={{ background:"#94b500",animation:"scrollDot 1.6s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   VISION
═══════════════════════════════════════════════════════════ */
function VisionSection() {
  const { ref, isVisible } = useInView(0.2);
  const pillars = [
    { label:"Clarity",    desc:"Every system we build is designed to reduce confusion, not add to it." },
    { label:"Efficiency", desc:"No bloat. No waste. Just the right technology doing exactly the right job." },
    { label:"Growth",     desc:"We build for where you're going, not just where you are today." },
  ];
  return (
    <section className="py-16 sm:py-28 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background:"linear-gradient(to right,transparent,#94b500,transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div style={{ opacity:isVisible?1:0,transform:isVisible?"none":"translateY(28px)",transition:"opacity 0.7s ease,transform 0.7s ease" }}>
            <p className="text-xs font-bold tracking-[0.35em] uppercase mb-4" style={{ color:"#94b500" }}>Our Vision</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6" style={{ color:"#07187b" }}>
              Technology That<br /><span style={{ WebkitTextStroke:"2px #94b500",color:"transparent" }}>Fits</span>{" "}<span style={{ color:"#94b500" }}>Your Ambition.</span>
            </h2>
            <div className="w-16 h-1 rounded-full mb-8" style={{ background:"#94b500" }} />
            <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color:"#6571ab" }}>We aim to bridge the gap between technology and business by creating systems that are not only scalable but also aligned with your long-term goals.</p>
            <p className="text-base leading-relaxed max-w-md" style={{ color:"#6571ab" }}>Our approach focuses on three things — and only three — because focus is what makes the difference between software that works and software that wins.</p>
          </div>
          <div className="flex flex-col gap-5">
            {pillars.map((p, i) => <PillarCard key={i} label={p.label} desc={p.desc} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ label, desc, index }: { label: string; desc: string; index: number }) {
  const { ref, isVisible } = useInView(0.2);
  return (
    <div ref={ref} className="group flex items-start gap-5 p-6 rounded-2xl cursor-default"
      style={{ background:"rgba(7,24,123,0.03)",border:"1px solid rgba(7,24,123,0.08)",opacity:isVisible?1:0,transform:isVisible?"translateX(0)":"translateX(30px)",transition:`opacity 0.6s ease ${index*150}ms,transform 0.6s ease ${index*150}ms` }}>
      <div>
        <h3 className="text-lg font-black mb-1" style={{ color:"#07187b" }}>{label}</h3>
        <p className="text-sm leading-relaxed" style={{ color:"#6571ab" }}>{desc}</p>
      </div>
      <div className="ml-auto self-center text-lg opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color:"#94b500",transform:"translateX(-8px)" }}>→</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICES SECTION
═══════════════════════════════════════════════════════════ */
const SERVICE_LIST = [
  { title:"Data Visualization & Analysis",  sub:"One-click dashboards & scheduled reports for every stakeholder.",   path:"/services/data-visualization",      accent:"#94b500", mockup:<MiniDataViz />         },
  { title:"Digitisation & Automations",     sub:"Eliminate repetitive work. Recover 15+ hours every week.",          path:"/services/digitisation-automation", accent:"#07187b", mockup:<MiniAutomation />      },
  { title:"Customised Point Solutions",     sub:"No tool fits? We build exactly what your workflow needs.",          path:"/services/custom-solutions",        accent:"#94b500", mockup:<MiniCustomSolutions /> },
  { title:"API Integrations & Development", sub:"Wire every tool in your stack into one coherent system.",           path:"/services/api-integration",         accent:"#07187b", mockup:<MiniApiIntegration />  },
  { title:"Website & App Development",      sub:"From marketing sites to production-grade apps — built to perform.", path:"/services/web-development",         accent:"#94b500", mockup:<MiniWebDev />          },
];

function ServicesSection() {
  return (
    <section className="py-16 sm:py-28 relative overflow-hidden" style={{ background:"linear-gradient(160deg,#f8faff 0%,#eef2ff 100%)" }}>
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(148,181,0,0.12) 0%,transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <ServicesHeader />
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_LIST.slice(0,3).map((s,i) => <ServiceCard key={i} {...s} index={i} />)}
            <div className="contents lg:hidden">
              {SERVICE_LIST.slice(3).map((s,i) => <ServiceCard key={i+3} {...s} index={i+3} />)}
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
            {SERVICE_LIST.slice(3).map((s,i) => <ServiceCard key={i+3} {...s} index={i+3} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesHeader() {
  const { ref, isVisible } = useInView(0.2);
  return (
    <div ref={ref} style={{ opacity:isVisible?1:0,transform:isVisible?"none":"translateY(24px)",transition:"opacity 0.7s ease,transform 0.7s ease" }}>
      <p className="text-xs font-bold tracking-[0.35em] uppercase mb-4" style={{ color:"#94b500" }}>What We Do</p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color:"#07187b" }}>
          Five Services,<br />One Cohesive Partner.
        </h2>
        <p className="text-sm max-w-xs sm:text-right" style={{ color:"#6571ab" }}>Every service is designed to plug into the others — so your stack grows as a system, not a patchwork.</p>
      </div>
    </div>
  );
}

function ServiceCard({ title, sub, path, accent, index, mockup }: {
  title: string; sub: string; path: string; accent: string; index: number; mockup: React.ReactNode;
}) {
  const { ref, isVisible } = useInView(0.15);
  return (
    <Link href={path} ref={ref as any} className="group relative rounded-3xl overflow-hidden block"
      style={{ background:"#fff",border:"1px solid rgba(7,24,123,0.08)",boxShadow:"0 4px 24px rgba(7,24,123,0.05)",opacity:isVisible?1:0,transform:isVisible?"translateY(0)":"translateY(28px)",transition:`opacity 0.6s ease ${index*90}ms,transform 0.6s ease ${index*90}ms` }}>

      {/* mockup sits flush at top, no padding */}
      <div className="pointer-events-none select-none p-3 pb-0">
        {mockup}
      </div>

      {/* hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background:`linear-gradient(135deg,${accent}06,${accent}10)`,transition:"opacity 0.3s ease" }} />
      {/* bottom sweep */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full" style={{ background:`linear-gradient(to right,${accent},transparent)`,transition:"width 0.4s ease" }} />

      <div className="relative z-10 px-5 py-4">
        <div className="w-8 h-[3px] mb-3 rounded-full" style={{ background:accent }} />
        <h3 className="text-sm font-bold mb-1.5 leading-snug" style={{ color:"#07187b" }}>{title}</h3>
        <p className="text-xs leading-relaxed" style={{ color:"#6571ab" }}>{sub}</p>
        <p className="text-xs font-bold mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color:accent }}>
          Learn more <span>→</span>
        </p>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════
   WHY US
═══════════════════════════════════════════════════════════ */
function WhyUsSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section className="py-16 sm:py-28 relative overflow-hidden bg-white">

      {/* ─── HERO BACKGROUND (IDENTICAL) ─── */}

      {/* green glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(148,181,0,0.18) 0%,transparent 65%)",
          transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -14}px)`,
          transition: "transform 0.6s ease",
        }}
      />

      {/* blue glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(7,24,123,0.08) 0%,transparent 65%)",
          transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 12}px)`,
          transition: "transform 0.6s ease",
        }}
      />

      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(#07187b 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* left gradient line */}
      <div
        className="absolute left-0 top-0 h-full w-1.5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom,#94b500,#07187b,transparent)",
        }}
      />

      {/* ─── ORIGINAL CONTENT (UNCHANGED) ─── */}

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div
          className="rounded-3xl mb-12 sm:mb-20 py-8 sm:py-10 px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4"
          style={{
            background: "linear-gradient(90deg,#07187b 0%,#0d2299 100%)",
          }}
        >
          {[
            { value: 150, suffix: "+", label: "Projects Shipped" },
            { value: 42, suffix: "", label: "Enterprise Integrations" },
            { value: 60, suffix: "%", label: "Avg. Cost Reduction" },
          ].map((s, i) => (
            <div key={i} className="text-center px-2 sm:px-4">
              <p
                className="text-4xl sm:text-5xl font-black mb-1"
                style={{ color: "#94b500" }}
              >
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p
                className="text-xs sm:text-sm font-medium tracking-wide"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════ */
function CtaBanner() {
  const { ref, isVisible } = useInView(0.2);
  return (
    <section className="py-16 sm:py-28 relative overflow-hidden" style={{ background:"linear-gradient(135deg,#07187b 0%,#0f2db8 100%)" }}>
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 pointer-events-none" style={{ background:"#94b500" }} />
      <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full opacity-10 pointer-events-none" style={{ background:"#94b500" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage:"repeating-linear-gradient(45deg,#94b500 0,#94b500 1px,transparent 0,transparent 50%)",backgroundSize:"20px 20px" }} />
      <div ref={ref} className="max-w-3xl mx-auto px-6 sm:px-10 text-center" style={{ opacity:isVisible?1:0,transform:isVisible?"translateY(0)":"translateY(30px)",transition:"opacity 0.8s ease,transform 0.8s ease" }}>
        <p className="text-xs font-bold tracking-[0.35em] uppercase mb-6" style={{ color:"rgba(148,181,0,0.8)" }}>Let's Build Together</p>
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
          Transform Your Ideas<br /><span style={{ color:"#94b500" }}>Into Scalable Products.</span>
        </h2>
        <p className="text-sm sm:text-base mb-10 sm:mb-12 max-w-xl mx-auto" style={{ color:"rgba(255,255,255,0.6)" }}>Partner with us to drive real business growth. No fluff, no delays — just systems that perform as loudly as your ambitions demand.</p>
        <Link href="/contact" className="px-8 sm:px-10 py-4 rounded-full font-bold text-sm text-white" style={{ background:"#94b500",boxShadow:"0 8px 30px rgba(148,181,0,0.45)" }}>
          Get Started Today →
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <VisionSection />
      <ServicesSection />
      <WhyUsSection />
      <CtaBanner />
      <style>{`
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer  { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes scrollDot{ 0%{transform:translateY(0);opacity:1} 80%{transform:translateY(12px);opacity:0} 100%{transform:translateY(0);opacity:0} }
        @keyframes growUp   { from{transform:scaleY(0);transform-origin:bottom} to{transform:scaleY(1);transform-origin:bottom} }
      `}</style>
    </main>
  );
}