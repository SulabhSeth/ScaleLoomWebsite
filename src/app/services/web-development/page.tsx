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

function DeliverableItem({ icon, text, index }: { icon: string; text: string; index: number }) {
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
      <p className="text-sm mt-0.5" style={{ color: "#6571ab" }}>{icon}</p>
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
    className="text-center px-4 py-6 sm:px-8"
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
    className="py-16 sm:py-24 relative overflow-hidden px-5"
    style={{ background: "linear-gradient(135deg,#07187b 0%,#0f2db8 100%)" }}
   >
    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: "#94b500" }} />
    <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: "#94b500" }} />
    <div
      className="max-w-3xl mx-auto text-center"
      style={{
       opacity: isVisible ? 1 : 0,
       transform: isVisible ? "translateY(0)" : "translateY(30px)",
       transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
       Ready to Build<br />
       <span style={{ color: "#94b500" }}>Something Great?</span>
      </h2>
      <p className="text-sm sm:text-base mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
       Let's turn your idea into a production-grade product — fast, beautiful, and built to scale.
      </p>
      <Link
       href="/contact"
       className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm text-white"
       style={{ background: "#94b500", boxShadow: "0 8px 30px rgba(148,181,0,0.4)" }}
      >
       Get Connected →
      </Link>
    </div>
   </section>
  );
}

function BrowserMockup() {
  const tabs = ["Home", "About", "Pricing", "Contact"];
  const [active, setActive] = useState(0);

  useEffect(() => {
   const t = setInterval(() => setActive((p) => (p + 1) % tabs.length), 1800);
   return () => clearInterval(t);
  }, []);

  return (
   <div
    className="relative rounded-3xl overflow-hidden shadow-2xl"
    style={{ background: "#07187b" }}
   >
    <div
      className="flex items-center gap-3 px-6 py-4"
      style={{ background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex gap-1.5">
       {["#ff5f57","#febc2e","#28c840"].map((c) => (
        <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
       ))}
      </div>
      <div
       className="flex-1 mx-4 px-4 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 truncate"
       style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
      >
       <span style={{ color: "#94b500" }}>🔒</span>
       <span className="truncate">scaleloom.com</span>
      </div>
    </div>

    <div className="flex gap-1 px-6 pt-5 overflow-x-auto">
      {tabs.map((t, i) => (
       <button
        key={i}
        onClick={() => setActive(i)}
        className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap"
        style={{
          background: active === i ? "#94b500" : "rgba(255,255,255,0.07)",
          color: active === i ? "#fff" : "rgba(255,255,255,0.45)",
        }}
       >
        {t}
       </button>
      ))}
    </div>

    <div className="px-6 py-8">
      <div
       className="rounded-2xl p-7 mb-4"
       style={{ background: "rgba(255,255,255,0.05)" }}
      >
       <div className="w-24 h-2 rounded-full mb-3" style={{ background: "#94b500", opacity: 0.8 }} />
       <div className="w-40 h-4 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.2)" }} />
       <div className="w-32 h-4 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.12)" }} />
       <div
        className="inline-block px-5 py-2 rounded-full text-xs font-bold text-white"
        style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
       >
        Get Started →
       </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
       {["⚡ Fast","📱 Mobile","🔒 Secure"].map((f, i) => (
        <div
          key={i}
          className="rounded-xl p-3 text-center text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
        >
          {f}
        </div>
       ))}
      </div>
    </div>

    <div className="flex items-center justify-center gap-2 sm:gap-4 px-6 pb-7 overflow-x-auto">
      <div
       className="rounded-xl overflow-hidden shadow-lg flex-shrink-0"
       style={{ width: 56, height: 96, background: "rgba(255,255,255,0.09)", border: "2px solid rgba(255,255,255,0.12)" }}
      >
       <div className="h-3 mx-2 mt-3 rounded-full" style={{ background: "rgba(148,181,0,0.5)" }} />
       <div className="h-2 mx-2 mt-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
       <div className="h-2 mx-2 mt-1 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.1)" }} />
       <div className="mx-2 mt-3 rounded-lg" style={{ height: 32, background: "rgba(148,181,0,0.2)" }} />
      </div>
      <div className="text-center flex-shrink-0">
       <p className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>Works everywhere</p>
       <p className="text-xs mt-0.5" style={{ color: "#94b500" }}>Web · iOS · Android</p>
      </div>
      <div
       className="rounded-xl overflow-hidden shadow-lg flex-shrink-0"
       style={{ width: 56, height: 96, background: "rgba(255,255,255,0.09)", border: "2px solid rgba(255,255,255,0.12)" }}
      >
       <div className="h-3 mx-2 mt-3 rounded-full" style={{ background: "rgba(148,181,0,0.5)" }} />
       <div className="h-2 mx-2 mt-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
       <div className="h-2 mx-2 mt-1 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.1)" }} />
       <div className="mx-2 mt-3 rounded-lg" style={{ height: 32, background: "rgba(148,181,0,0.2)" }} />
      </div>
    </div>
   </div>
  );
}

export default function DevPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
   const t = setTimeout(() => setHeroVisible(true), 80);
   return () => clearTimeout(t);
  }, []);

  const deliverables = [
   { text: "Faster releases and better retention",  icon: "Continuous delivery pipelines mean your users get improvements weekly, not quarterly." },
   { text: "Stable production experience",           icon: "99.9% uptime SLAs backed by monitoring, alerting, and on-call runbooks from day one." },
   { text: "Cross-platform efficiency",              icon: "One codebase. Web, iOS, and Android — built in parallel without tripling your budget." },
   { text: "Clear support channels",                 icon: "Dedicated Slack channel, documented handover, and 30-day post-launch warranty included." },
  ];

  const benefits = [
   { icon: "🚀", title: "Ship in Weeks, Not Months",   description: "Our sprint-based process compresses timelines without cutting corners. Your MVP is live before your competitors finish scoping." },
   { icon: "🎨", title: "Design-First Engineering",    description: "We prototype in Figma before a single line of code is written — saving rework cycles and ensuring what's built is what was envisioned." },
   { icon: "📱", title: "Mobile-First by Default",     description: "Every interface is built responsive from the ground up. No bolt-on mobile styles — native performance across all screen sizes." },
   { icon: "🔧", title: "Owned, Not Rented",           description: "Full source code, docs, and CI/CD pipelines handed to you. No lock-in. No black-box vendors." },
  ];

  const processSteps = [
   { icon: "🔍", title: "Discovery & Wireframing",       desc: "We map user journeys, define scope, and align on tech stack before a pixel is moved." },
   { icon: "🎨", title: "Design Sprint & Prototypes",    desc: "High-fidelity Figma prototypes signed off by your team before development begins." },
   { icon: "⚙️", title: "Iterative Development",         desc: "Two-week sprints with demos every cycle. You see progress — and can steer — constantly." },
   { icon: "🏪", title: "Beta & App Store Releases",     desc: "Staged rollouts, TestFlight / Play Store betas, and App Store submission handled end-to-end." },
   { icon: "🛡️", title: "Post-Launch Support",           desc: "30-day warranty, monitoring dashboards, and optional retainer for ongoing feature work." },
  ];

  return (
   <main className="min-h-screen bg-white overflow-x-hidden">

    {/* ─── HERO ─────────────────────────────────────────────── */}
    <section className="relative pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-28 overflow-hidden px-5 sm:px-8">
      <div
       className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
       style={{ background: "radial-gradient(circle,rgba(148,181,0,0.11) 0%,transparent 70%)" }}
      />
      <div
       className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
       style={{ background: "radial-gradient(circle,rgba(7,24,123,0.06) 0%,transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

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
          <span>Web &amp; App Development</span>
        </p>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-6"
          style={{
           color: "#07187b",
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(24px)",
           transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          Sites &amp; Apps<br />
          <span style={{ WebkitTextStroke: "2px #94b500", color: "transparent" }}>
           Built to
          </span>
          <br />
          <span style={{ color: "#94b500" }}>Perform.</span>
        </h1>

        <p
          className="text-sm sm:text-base leading-relaxed max-w-md mb-4"
          style={{
           color: "#6571ab",
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(20px)",
           transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          From marketing sites to production-grade apps — we design, engineer, and
          ship digital products that look great, load fast, and scale with your business.
        </p>

        <p
          className="text-xs sm:text-sm font-semibold tracking-wide uppercase mb-10"
          style={{
           color: "#94b500",
           opacity: heroVisible ? 1 : 0,
           transition: "opacity 0.7s ease 0.25s",
          }}
        >
          Web · iOS · Android · Cross-Platform
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          style={{
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(16px)",
           transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <Link
           href="/contact"
           className="px-7 py-3 rounded-full font-semibold text-sm text-white w-full sm:w-auto text-center"
           style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
          >
           Start a Project
          </Link>
        </div>
       </div>

       {/* RIGHT — browser + floating badge */}
       <div
        className="relative mt-10 lg:mt-0"
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
        <BrowserMockup />

        <div
          className="absolute -bottom-5 -left-8 rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3"
          style={{ background: "#fff", animation: "float 3s ease-in-out infinite" }}
        >
          <span className="text-xl">⚡</span>
          <div>
           <p className="text-xs" style={{ color: "#6571ab" }}>Avg. time to MVP</p>
           <p className="font-bold text-base" style={{ color: "#07187b" }}>3–5 Weeks</p>
          </div>
        </div>
       </div>
      </div>
    </section>

    {/* ─── STATS BAR ──────────────────────────────────────────── */}
    <section className="py-10 sm:py-14 px-5" style={{ background: "linear-gradient(90deg,#07187b 0%,#0d2299 100%)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 divide-x divide-white/10">
       {[
        { value: "50+",   label: "Apps Shipped to Store" },
        { value: "99.9%", label: "Production Uptime SLA" },
        { value: "3×",    label: "Faster Than Agency Average" },
        { value: "30d",   label: "Post-Launch Warranty" },
       ].map((s, i) => (
        <StatPill key={i} value={s.value} label={s.label} />
       ))}
      </div>
    </section>

    {/* ─── WHAT YOU GET ───────────────────────────────────────── */}
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden px-5 sm:px-8">
      <div
       className="absolute inset-0 pointer-events-none opacity-[0.03]"
       style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
       
       <DeliverablesIntro />

       <div className="flex flex-col gap-4">
        {deliverables.map((d, i) => (
          <DeliverableItem key={i} text={d.text} icon={d.icon} index={i} />
        ))}
       </div>
      </div>
    </section>

    {/* ─── PROCESS ────────────────────────────────────────────── */}
    <section
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden px-5 sm:px-8"
      style={{ background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 100%)" }}
    >
      <div
       className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
       style={{ background: "radial-gradient(circle,rgba(148,181,0,0.15) 0%,transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto">
       <ProcessHeader />

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
        {processSteps.map((step, i) => (
          <ProcessStep key={i} step={i + 1} title={step.title} desc={step.desc} index={i} total={processSteps.length} />
        ))}
       </div>
      </div>
    </section>

    {/* ─── BENEFITS ───────────────────────────────────────────── */}
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden px-5 sm:px-8">
      <div
       className="absolute inset-0 pointer-events-none opacity-[0.03]"
       style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="max-w-7xl mx-auto">
       <BenefitsHeader />
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
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
    `}</style>
   </main>
  );
}

function DeliverablesIntro() {
  const { ref, isVisible } = useInView(0.2);
  return (
   <div
    ref={ref}
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "none" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}
   >
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>
      What You Get
    </p>
    <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight" style={{ color: "#07187b" }}>
      Four Outcomes<br />Guaranteed
    </h2>
    <div className="w-16 h-1 rounded-full mb-8" style={{ background: "#94b500" }} />
    <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#6571ab" }}>
      Every engagement ends with a production-ready product fully owned by you —
      source code, pipelines, docs, and a team that knows how to maintain it.
    </p>
   </div>
  );
}

function ProcessHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div
    ref={ref}
    className="text-center mb-16"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "none" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}
   >
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>
      The Process
    </p>
    <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "#07187b" }}>
      From Idea to App Store
    </h2>
   </div>
  );
}

function BenefitsHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div
    ref={ref}
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "none" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}
   >
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>
      Why It Works
    </p>
    <h2 className="text-4xl sm:text-5xl font-black leading-tight" style={{ color: "#07187b" }}>
      Built Different,<br />By Design
    </h2>
   </div>
  );
}

function ProcessStep({ step, title, desc, index, total }: {
  step: number; title: string; desc: string; index: number; total: number;
}) {
  const { ref, isVisible } = useInView(0.2);
  return (
   <div
    ref={ref}
    className="relative"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
    }}
   >
    {index < total - 1 && (
      <div
       className="hidden lg:block absolute top-6 h-px z-0"
       style={{
        background: "linear-gradient(to right,#94b500,transparent)",
        width: "calc(100% - 48px)",
        left: "calc(48px + 8px)",
       }}
      />
    )}

    {/* <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-black text-base mb-5 shadow-lg relative z-10 text-white"
      style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
    >
      {icon}
    </div> */}

    <div
      className="rounded-2xl p-5"
      style={{
       background: "#fff",
       border: "1px solid rgba(7,24,123,0.08)",
       boxShadow: "0 4px 20px rgba(7,24,123,0.05)",
      }}
    >
      <div className="w-6 h-[3px] mb-3 rounded-full" style={{ background: "#94b500" }} />
      <p className="text-[11px] font-black tracking-widest uppercase mb-1" style={{ color: "#94b500" }}>
       Step {step}
      </p>
      <h3 className="text-sm font-bold mb-2 leading-snug" style={{ color: "#07187b" }}>{title}</h3>
      <p className="text-xs leading-relaxed" style={{ color: "#6571ab" }}>{desc}</p>
    </div>
   </div>
  );
}
