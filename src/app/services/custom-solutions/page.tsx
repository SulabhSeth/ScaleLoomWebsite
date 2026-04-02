"use client";

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
    ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
    { threshold }
   );
   obs.observe(el);
   return () => obs.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ═══════════════════════════════════════════════════════════
  SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */
function DeliverableItem({ text, sub, index }: { text: string; sub: string; index: number }) {
  const { ref, isVisible } = useInView(0.2);
  return (
   <div
    ref={ref}
    className="flex items-start gap-4 p-5 rounded-2xl"
    style={{
      background: "rgba(7,24,123,0.03)",
      border: "1px solid rgba(7,24,123,0.08)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(-24px)",
      transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
    }}
   >
    <div
      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
      style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
       <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div>
      <p className="text-base font-semibold" style={{ color: "#07187b" }}>{text}</p>
      <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "#6571ab" }}>{sub}</p>
    </div>
   </div>
  );
}

function BenefitCard({ title, description, index }: {
  title: string; description: string; index: number;
}) {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div
    ref={ref}
    className="group relative rounded-3xl p-8 overflow-hidden cursor-default"
    style={{
      background: "#fff",
      border: "1px solid rgba(7,24,123,0.08)",
      boxShadow: "0 4px 24px rgba(7,24,123,0.06)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.6s ease ${index * 130}ms, transform 0.6s ease ${index * 130}ms`,
    }}
   >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100"
      style={{
       background: "linear-gradient(135deg,rgba(7,24,123,0.04),rgba(148,181,0,0.07))",
       transition: "opacity 0.35s ease",
      }}
    />
    <div
      className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full"
      style={{
       background: "linear-gradient(to bottom,#07187b,#94b500)",
       transform: "scaleY(0)",
       transformOrigin: "top",
       transition: "transform 0.4s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scaleY(1)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scaleY(0)")}
    />
    <div className="relative z-10">
      {/* <div
       className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5"
       style={{ background: "rgba(148,181,0,0.12)" }}
      >
       {icon}
      </div> */}
      <h3 className="text-lg font-bold mb-2" style={{ color: "#07187b" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#6571ab" }}>{description}</p>
    </div>
   </div>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  const { ref, isVisible } = useInView(0.2);
  return (
   <div
    ref={ref}
    className="text-center px-4 sm:px-8 py-6"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}
   >
    <p className="text-3xl sm:text-5xl font-black mb-1" style={{ color: "#94b500" }}>{value}</p>
    <p className="text-xs sm:text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>{label}</p>
   </div>
  );
}

function CtaBanner() {
  const { ref, isVisible } = useInView(0.2);
  return (
   <section
    ref={ref}
    className="py-16 sm:py-24 relative overflow-hidden"
    style={{ background: "linear-gradient(135deg,#07187b 0%,#0f2db8 100%)" }}
   >
    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: "#94b500" }} />
    <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: "#94b500" }} />
    <div
      className="max-w-3xl mx-auto px-6 sm:px-10 text-center"
      style={{
       opacity: isVisible ? 1 : 0,
       transform: isVisible ? "translateY(0)" : "translateY(30px)",
       transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
       Have a Problem<br />
       <span style={{ color: "#94b500" }}>No Tool Solves?</span>
      </h2>
      <p className="text-sm sm:text-base mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
       Tell us what's broken, inefficient, or missing — we'll engineer exactly what you need.
      </p>
      <Link
       href="/contact"
       className="inline-block px-8 sm:px-10 py-4 rounded-full font-bold text-sm text-white"
       style={{ background: "#94b500", boxShadow: "0 8px 30px rgba(148,181,0,0.4)" }}
      >
       Connect with Us →
      </Link>
    </div>
   </section>
  );
}

/* ═══════════════════════════════════════════════════════════
  HERO RIGHT — animated "build" terminal mockup
═══════════════════════════════════════════════════════════ */
function SolutionMockup() {
  const lines = [
   { text: "$ scaffold --project custom-portal",       color: "#94b500",              delay: 0 },
   { text: "  ✓ Requirements mapped",                   color: "rgba(255,255,255,0.7)", delay: 600 },
   { text: "  ✓ Architecture designed",                 color: "rgba(255,255,255,0.7)", delay: 1100 },
   { text: "  ✓ Sprint 1 shipped",                      color: "rgba(255,255,255,0.7)", delay: 1600 },
   { text: "  ✓ User testing passed",                   color: "rgba(255,255,255,0.7)", delay: 2100 },
   { text: "  ✓ Production deployed",                   color: "#94b500",              delay: 2600 },
   { text: "  → ROI measured in week 1.",               color: "rgba(255,255,255,0.4)", delay: 3100 },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
   if (visibleCount >= lines.length) return;
   const t = setTimeout(() => setVisibleCount((c) => c + 1), lines[visibleCount]?.delay ?? 0);
   return () => clearTimeout(t);
  }, [visibleCount]);

  // restart loop
  useEffect(() => {
   const loop = setInterval(() => setVisibleCount(0), 5000);
   return () => clearInterval(loop);
  }, []);

  const useCases = [
   { label: "Internal Tool",   icon: "🛠️" },
   { label: "Client Portal",   icon: "🔐" },
   { label: "Workflow Engine", icon: "⚙️" },
   { label: "AI Feature",      icon: "🤖" },
  ];

  const [activeCase, setActiveCase] = useState(0);
  useEffect(() => {
   const t = setInterval(() => setActiveCase((p) => (p + 1) % useCases.length), 1600);
   return () => clearInterval(t);
  }, []);

  return (
   <div
    className="relative rounded-3xl overflow-hidden shadow-2xl"
    style={{ background: "#07187b" }}
   >
    {/* header */}
    <div
      className="flex items-center gap-3 px-6 py-4"
      style={{ background: "rgba(0,0,0,0.25)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex gap-1.5">
       {["#ff5f57","#febc2e","#28c840"].map((c) => (
        <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
       ))}
      </div>
      <span className="text-xs font-mono ml-2" style={{ color: "rgba(255,255,255,0.4)" }}>
       scaleloom — custom-build
      </span>
    </div>

    {/* use-case pills */}
    <div className="flex gap-2 px-6 pt-5 flex-wrap">
      {useCases.map((u, i) => (
       <button
        key={i}
        onClick={() => setActiveCase(i)}
        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5"
        style={{
          background: activeCase === i ? "#94b500" : "rgba(255,255,255,0.07)",
          color: activeCase === i ? "#fff" : "rgba(255,255,255,0.45)",
        }}
       >
        {u.icon} {u.label}
       </button>
      ))}
    </div>

    {/* terminal output */}
    <div className="px-6 py-5 font-mono text-sm space-y-1.5" style={{ minHeight: 200 }}>
      {lines.slice(0, visibleCount).map((line, i) => (
       <p
        key={i}
        style={{
          color: line.color,
          opacity: 1,
          animation: "fadeInLine 0.3s ease",
        }}
       >
        {line.text}
        {i === visibleCount - 1 && visibleCount < lines.length && (
          <span style={{ animation: "blink 0.8s step-end infinite", color: "#94b500" }}>▌</span>
        )}
       </p>
      ))}
    </div>

    {/* metrics row */}
    <div className="grid grid-cols-3 gap-3 mx-6 mb-6">
      {[
       { label: "Scope locked",  value: "Week 1" },
       { label: "First ship",    value: "Week 3" },
       { label: "Full handover", value: "Week 6" },
      ].map((m, i) => (
       <div
        key={i}
        className="rounded-xl p-3 text-center"
        style={{ background: "rgba(255,255,255,0.06)" }}
       >
        <p className="text-base font-black" style={{ color: "#94b500" }}>{m.value}</p>
        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{m.label}</p>
       </div>
      ))}
    </div>
   </div>
  );
}

/* ═══════════════════════════════════════════════════════════
  EXTRACTED HOOK COMPONENTS (Rules of Hooks)
═══════════════════════════════════════════════════════════ */
function DeliverablesIntro() {
  const { ref, isVisible } = useInView(0.2);
  return (
   <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>What You Get</p>
    <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight" style={{ color: "#07187b" }}>
      Five Things<br />Delivered to You
    </h2>
    <div className="w-16 h-1 rounded-full mb-8" style={{ background: "#94b500" }} />
    <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#6571ab" }}>
      Every custom engagement ends with a fully owned, documented, and production-ready
      system — built precisely for your workflow, not retrofitted from a template.
    </p>
   </div>
  );
}

function ProcessHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div ref={ref} className="text-center mb-12 sm:mb-16" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>The Process</p>
    <h2 className="text-3xl sm:text-5xl font-black" style={{ color: "#07187b" }}>Built Around You, Not the Other Way</h2>
   </div>
  );
}

function BenefitsHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>Business Impact</p>
    <h2 className="text-3xl sm:text-5xl font-black leading-tight" style={{ color: "#07187b" }}>
      Why Custom Beats<br />Off-the-Shelf
    </h2>
   </div>
  );
}

function ProcessStep({ step, icon, title, desc, index, total }: {
  step: number; icon: string; title: string; desc: string; index: number; total: number;
}) {
  const { ref, isVisible } = useInView(0.2);
  return (
   <div
    ref={ref}
    className="relative"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${index * 130}ms, transform 0.7s ease ${index * 130}ms`,
    }}
   >
    {index < total - 1 && (
      <div
       className="hidden md:block absolute top-6 h-px z-0"
       style={{
        background: "linear-gradient(to right,#94b500,transparent)",
        width: "calc(100% - 48px)",
        left: "calc(48px + 8px)",
       }}
      />
    )}
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-5 shadow-lg relative z-10"
      style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
    >
      {icon}
    </div>
    <div
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid rgba(7,24,123,0.08)", boxShadow: "0 4px 20px rgba(7,24,123,0.05)" }}
    >
      <div className="w-6 h-[3px] mb-3 rounded-full" style={{ background: "#94b500" }} />
      <p className="text-[11px] font-black tracking-widest uppercase mb-1" style={{ color: "#94b500" }}>Step {step}</p>
      <h3 className="text-sm font-bold mb-2 leading-snug" style={{ color: "#07187b" }}>{title}</h3>
      <p className="text-xs leading-relaxed" style={{ color: "#6571ab" }}>{desc}</p>
    </div>
   </div>
  );
}

/* ═══════════════════════════════════════════════════════════
  MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function CustomSolutionsPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
   const t = setTimeout(() => setHeroVisible(true), 80);
   return () => clearTimeout(t);
  }, []);

  const deliverables = [
   {
    text: "Fully scoped solution design document",
    sub: "A precise technical blueprint covering architecture, data models, and integration points — signed off before a single line of code is written.",
   },
   {
    text: "Purpose-built application or internal tool",
    sub: "Whether it's an internal ops portal, client-facing workflow engine, or AI-powered feature — engineered exactly for your use case.",
   },
   {
    text: "End-to-end testing suite",
    sub: "Unit, integration, and UAT tests written alongside the code. What ships is what was agreed on, provably.",
   },
   {
    text: "Full source code & IP ownership",
    sub: "Everything we build is yours. No licence fees, no vendor dependency — complete transfer of ownership at handover.",
   },
   {
    text: "Onboarding, docs & 30-day support",
    sub: "Live walkthrough sessions, written runbooks, and a dedicated support channel for the first 30 days post-launch.",
   },
  ];

  const benefits = [
   {
    icon: "",
    title: "Fits Like a Glove",
    description: "Off-the-shelf tools make you adapt your workflow to their limitations. Custom solutions are shaped around how your team actually works — no compromises.",
   },
   {
    icon: "",
    title: "Kills Hidden Costs",
    description: "Stitching together SaaS tools adds up fast. A single purpose-built solution often costs less than 12 months of the subscriptions it replaces.",
   },
   {
    icon: "",
    title: "Your Data, Your Rules",
    description: "Full control over where data lives and how it flows. Critical for regulated industries, privacy-conscious teams, or businesses with complex compliance needs.",
   },
   {
    icon: "",
    title: "Competitive Moat",
    description: "A tool built around your exact process is one your competitors can't buy off the shelf. It becomes a genuine operational advantage.",
   },
  ];

  const processSteps = [
   {
    icon: "",
    title: "Discovery Workshop",
    desc: "We map your current workflow, pain points, and success metrics in a structured session — leaving with a shared understanding of the problem.",
   },
   {
    icon: "",
    title: "Solution Architecture",
    desc: "We design the technical blueprint — stack, data model, integrations, and phasing — and present it for sign-off before any build begins.",
   },
   {
    icon: "",
    title: "Iterative Build",
    desc: "Two-week sprints with live demos each cycle. You steer. We build. Nothing ships that hasn't been reviewed and approved.",
   },
   {
    icon: "",
    title: "Test & Harden",
    desc: "Automated tests, UAT sessions, and a staging environment that mirrors production — so go-live is boring, not stressful.",
   },
   {
    icon: "",
    title: "Launch & Hand Over",
    desc: "Production deployment, team onboarding, full docs, and 30 days of dedicated post-launch support included in every engagement.",
   },
  ];

  const useCaseExamples = [
   { icon: "", title: "Internal Operations Tool",    desc: "Replace spreadsheets and tribal knowledge with a purpose-built ops platform your whole team can use." },
   { icon: "", title: "Customer / Client Portal",     desc: "Give your clients a branded, self-serve experience — orders, status, files, comms — all in one place." },
   { icon: "", title: "AI-Powered Feature",           desc: "Embed LLMs, vision models, or recommendation engines directly into your product or workflow." },
   { icon: "", title: "Workflow Automation Engine",   desc: "Replace manual, multi-step processes with rules-driven automation that runs 24/7 without intervention." },
   { icon: "", title: "Reporting & Analytics Layer",  desc: "Custom metrics, drill-downs, and exports built around your KPIs — not a generic BI tool's defaults." },
   { icon: "", title: "Legacy System Modernisation",  desc: "Wrap or replace ageing systems with modern APIs and interfaces, without a risky full rewrite." },
  ];

  return (
   <main className="min-h-screen bg-white overflow-x-hidden">

    {/* ─── HERO ─────────────────────────────────────────────── */}
    <section className="relative pt-16 sm:pt-32 pb-16 sm:pb-28 overflow-hidden">
      <div
       className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
       style={{ background: "radial-gradient(circle,rgba(148,181,0,0.11) 0%,transparent 70%)" }}
      />
      <div
       className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
       style={{ background: "radial-gradient(circle,rgba(7,24,123,0.06) 0%,transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

       {/* LEFT */}
       <div>
        <p
          className="font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-2 flex-wrap"
          style={{
           color: "#94b500",
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(16px)",
           transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <Link href="/services" className="hover:underline" style={{ color: "#6571ab" }}>Our Services</Link>
          <span style={{ color: "#6571ab" }}>›</span>
          Custom Solutions
        </p>

        <h1
          className="text-4xl sm:text-6xl font-black leading-[1.05] mb-6"
          style={{
           color: "#07187b",
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(24px)",
           transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          No Tool<br />
          <span style={{ WebkitTextStroke: "2px #94b500", color: "transparent" }}>
           Fits?
          </span>
          <br />
          <span style={{ color: "#94b500" }}>We Build It.</span>
        </h1>

        <p
          className="text-sm sm:text-base leading-relaxed max-w-md mb-10"
          style={{
           color: "#6571ab",
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(20px)",
           transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          When off-the-shelf software forces you to change your process instead of
          supporting it, that's a sign you've outgrown it. We engineer bespoke systems
          — internal tools, portals, automation engines, AI features — built precisely
          around how your business actually operates.
        </p>

        <div
          className="flex gap-4 items-center flex-wrap"
          style={{
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(16px)",
           transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <Link
           href="/contact"
           className="px-7 py-3 rounded-full font-semibold text-sm text-white"
           style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
          >
           Start a Project
          </Link>
        </div>
       </div>

       {/* RIGHT — terminal mockup */}
       <div
        className="relative"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "none" : "translateX(40px)",
          transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
        }}
       >
        <div
          className="absolute -top-6 -right-6 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(148,181,0,0.3) 0%,transparent 70%)" }}
        />
        <SolutionMockup />

        {/* floating badge */}
        <div
          className="absolute -bottom-5 -left-4 sm:-left-8 rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3"
          style={{ background: "#fff", animation: "float 3s ease-in-out infinite" }}
        >
          <span className="text-xl">🛠️</span>
          <div>
           <p className="text-xs" style={{ color: "#6571ab" }}>Avg. time to first ship</p>
           <p className="font-bold text-sm sm:text-base" style={{ color: "#07187b" }}>2–3 Weeks</p>
          </div>
        </div>
       </div>
      </div>
    </section>

    {/* ─── STATS BAR ──────────────────────────────────────────── */}
    <section className="py-8 sm:py-14" style={{ background: "linear-gradient(90deg,#07187b 0%,#0d2299 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-2 lg:grid-cols-4 gap-4 divide-x divide-white/10">
       {[
        { value: "70+",  label: "Custom Solutions Shipped" },
        { value: "8×",   label: "Avg. ROI Vs SaaS Spend"  },
        { value: "100%", label: "IP Ownership Transferred" },
        { value: "30d",  label: "Post-Launch Warranty"     },
       ].map((s, i) => (
        <StatPill key={i} value={s.value} label={s.label} />
       ))}
      </div>
    </section>

    {/* ─── USE CASE GRID ──────────────────────────────────────── */}
    <section className="py-16 sm:py-28 relative overflow-hidden">
      <div
       className="absolute inset-0 pointer-events-none opacity-[0.03]"
       style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
       <UseCaseHeader />
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
        {useCaseExamples.map((u, i) => (
          <UseCaseCard key={i} title={u.title} desc={u.desc} index={i} />
        ))}
       </div>
      </div>
    </section>

    {/* ─── WHAT YOU GET ───────────────────────────────────────── */}
    <section
      className="py-16 sm:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 100%)" }}
    >
      <div
       className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
       style={{ background: "radial-gradient(circle,rgba(148,181,0,0.15) 0%,transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
       <DeliverablesIntro />
       <div className="flex flex-col gap-4">
        {deliverables.map((d, i) => (
          <DeliverableItem key={i} text={d.text} sub={d.sub} index={i} />
        ))}
       </div>
      </div>
    </section>

    {/* ─── PROCESS ────────────────────────────────────────────── */}
    <section className="py-16 sm:py-28 relative overflow-hidden">
      <div
       className="absolute inset-0 pointer-events-none opacity-[0.03]"
       style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
       <ProcessHeader />
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
        {processSteps.map((s, i) => (
          <ProcessStep key={i} step={i + 1} icon={s.icon} title={s.title} desc={s.desc} index={i} total={processSteps.length} />
        ))}
       </div>
      </div>
    </section>

    {/* ─── BENEFITS ───────────────────────────────────────────── */}
    <section
      className="py-16 sm:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 100%)" }}
    >
      <div
       className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
       style={{ background: "radial-gradient(circle,rgba(148,181,0,0.15) 0%,transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
       <BenefitsHeader />
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 sm:mt-16">
        {benefits.map((b, i) => (
          <BenefitCard key={i} title={b.title} description={b.description} index={i} />
        ))}
       </div>
      </div>
    </section>

    <CtaBanner />

    <style>{`
      @keyframes float {
       0%, 100% { transform: translateY(0); }
       50%       { transform: translateY(-8px); }
      }
      @keyframes fadeInLine {
       from { opacity: 0; transform: translateX(-8px); }
       to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes blink {
       0%, 100% { opacity: 1; }
       50%       { opacity: 0; }
      }
    `}</style>
   </main>
  );
}

/* ── Use-case card with own hook ── */
function UseCaseCard({ title, desc, index }: {
  title: string; desc: string; index: number;
}) {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div
    ref={ref}
    className="group relative rounded-3xl p-7 overflow-hidden cursor-default"
    style={{
      background: "#fff",
      border: "1px solid rgba(7,24,123,0.08)",
      boxShadow: "0 4px 24px rgba(7,24,123,0.05)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
    }}
   >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100"
      style={{
       background: "linear-gradient(135deg,rgba(7,24,123,0.03),rgba(148,181,0,0.06))",
       transition: "opacity 0.3s ease",
      }}
    />
    <div className="relative z-10">
      {/* <div
       className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl mb-4"
       style={{ background: "rgba(148,181,0,0.12)" }}
      >
       {icon}
      </div> */}
      <div className="w-6 h-[3px] mb-3 rounded-full" style={{ background: "#94b500" }} />
      <h3 className="text-base font-bold mb-2" style={{ color: "#07187b" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#6571ab" }}>{desc}</p>
    </div>
   </div>
  );
}

function UseCaseHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>
      What We Build
    </p>
    <h2 className="text-3xl sm:text-5xl font-black leading-tight" style={{ color: "#07187b" }}>
      Six Problems<br />We Solve Often
    </h2>
   </div>
  );
}
