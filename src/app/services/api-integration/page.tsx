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
      className="text-center px-4 py-6 sm:px-8"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <p className="text-4xl sm:text-5xl font-black mb-1" style={{ color: "#94b500" }}>{value}</p>
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
          Ready to Connect<br />
          <span style={{ color: "#94b500" }}>Your Entire Stack?</span>
        </h2>
        <p className="text-sm sm:text-base mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
          Stop juggling disconnected tools. Let's wire everything together — cleanly, reliably, and once.
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
   HERO RIGHT — animated API flow diagram
═══════════════════════════════════════════════════════════ */
function ApiFlowMockup() {
  const nodes = [
    { label: "Your App",    icon: "🖥️", x: "50%",  y: "8%",  anchor: "center" },
    { label: "Stripe",      icon: "💳", x: "10%",  y: "38%", anchor: "left"   },
    { label: "Salesforce",  icon: "☁️", x: "75%",  y: "38%", anchor: "right"  },
    { label: "Slack",       icon: "💬", x: "10%",  y: "68%", anchor: "left"   },
    { label: "PostgreSQL",  icon: "🗄️", x: "75%",  y: "68%", anchor: "right"  },
    { label: "OpenAI",      icon: "🤖", x: "50%",  y: "88%", anchor: "center" },
  ];

  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % nodes.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl"
      style={{ background: "#07187b", minHeight: 420 }}
    >
      {/* header */}
      <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Integration Hub</p>
          <p className="text-lg sm:text-xl font-black text-white">Live Data Flow</p>
        </div>
        <div className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(148,181,0,0.2)", color: "#94b500" }}>
          ● Active
        </div>
      </div>

      {/* node graph */}
      <div className="relative mx-6 my-5" style={{ height: 280 }}>
        {/* SVG connector lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
          {nodes.slice(1).map((n, i) => {
            const cx = parseFloat(nodes[0].x) / 100;
            const cy = parseFloat(nodes[0].y) / 100;
            const nx = parseFloat(n.x) / 100;
            const ny = parseFloat(n.y) / 100;
            return (
              <line
                key={i}
                x1={`${cx * 100}%`} y1={`${cy * 100 + 6}%`}
                x2={`${nx * 100}%`} y2={`${ny * 100}%`}
                stroke={pulse === i + 1 ? "#94b500" : "rgba(255,255,255,0.12)"}
                strokeWidth={pulse === i + 1 ? 2 : 1}
                strokeDasharray={pulse === i + 1 ? "6 3" : "0"}
                style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
              />
            );
          })}
        </svg>

        {/* nodes */}
        {nodes.map((n, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center"
            style={{
              left: n.x,
              top: n.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg shadow-lg mb-1.5 transition-all duration-300"
              style={{
                background: pulse === i
                  ? "linear-gradient(135deg,#94b500,#b8d900)"
                  : "rgba(255,255,255,0.1)",
                transform: pulse === i ? "scale(1.15)" : "scale(1)",
                boxShadow: pulse === i ? "0 0 20px rgba(148,181,0,0.5)" : "none",
              }}
            >
              {n.icon}
            </div>
            <span
              className="text-[10px] font-bold whitespace-nowrap"
              style={{ color: pulse === i ? "#94b500" : "rgba(255,255,255,0.45)" }}
            >
              {n.label}
            </span>
          </div>
        ))}
      </div>

      {/* bottom log strip */}
      <div className="mx-4 sm:mx-6 mb-5 sm:mb-6 rounded-xl px-3 sm:px-4 py-3" style={{ background: "rgba(0,0,0,0.25)" }}>
        <p className="text-[10px] font-mono" style={{ color: "#94b500" }}>
          ✓ POST /api/stripe/webhook → 200 OK &nbsp;·&nbsp; 42ms
        </p>
        <p className="text-[10px] font-mono mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
          → synced to Salesforce CRM &nbsp;·&nbsp; Slack notified
        </p>
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
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight" style={{ color: "#07187b" }}>
        Five Things<br />Delivered to You
      </h2>
      <div className="w-16 h-1 rounded-full mb-8" style={{ background: "#94b500" }} />
      <p className="text-base leading-relaxed" style={{ color: "#6571ab" }}>
        Every integration engagement ends with production-ready, documented connections your team
        owns outright — no black-box middleware, no vendor lock-in.
      </p>
    </div>
  );
}

function ProcessHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
    <div ref={ref} className="text-center mb-12 sm:mb-16" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>The Process</p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black" style={{ color: "#07187b" }}>From Scattered Tools to One System</h2>
    </div>
  );
}

function BenefitsHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>Business Impact</p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: "#07187b" }}>
        Why It Changes<br />How You Operate
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
        transition: `opacity 0.7s ease ${index * 130}ms, transform 0.7s ease ${index * 130}ms`,
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
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-5 shadow-lg relative z-10"
        style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
      >
        {icon}
      </div> */}
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
export default function ApiIntegrationPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const deliverables = [
    { text: "Custom API design & documentation",         sub: "RESTful or GraphQL APIs built to your spec, with full OpenAPI/Swagger docs your team can maintain." },
    { text: "Third-party service integrations",          sub: "Stripe, Salesforce, HubSpot, Slack, Twilio, OpenAI — we connect the tools you already use." },
    { text: "Webhook pipelines & event architecture",    sub: "Real-time data flows between systems without polling. Reliable, retryable, and monitored." },
    { text: "Error handling & retry logic",              sub: "Idempotent requests, dead-letter queues, and alerting so no data ever silently drops." },
    { text: "Integration tests & handover docs",         sub: "Full test suites, runbooks, and a 30-day warranty. You own it completely from day one." },
  ];

  const benefits = [
    { icon: "🔗", title: "One Source of Truth",        description: "Stop copy-pasting between tools. Data flows automatically — from CRM to billing to ops — the moment something changes." },
    { icon: "⏱️", title: "Hours Saved Every Week",     description: "Manual exports, CSV uploads, and copy-paste workflows disappear. Your team focuses on work that actually moves the needle." },
    { icon: "🛡️", title: "Bulletproof Reliability",   description: "Retry logic, circuit breakers, and dead-letter queues ensure your integrations survive failures gracefully — every time." },
    { icon: "📈", title: "Scales With You",            description: "Async queues and event-driven architecture mean your integrations handle 10 transactions or 10 million without re-engineering." },
  ];

  const processSteps = [
    { icon: "🗺️", title: "Audit & Map",       desc: "We document every tool, data source, and manual handoff in your current stack." },
    { icon: "🏗️", title: "Architect",         desc: "We design the integration layer — sync vs async, webhooks vs polling, auth flows — before writing a line of code." },
    { icon: "⚙️", title: "Build & Test",      desc: "We build, mock, and integration-test each connection in a staging environment before it touches production." },
    { icon: "🚀", title: "Deploy & Monitor",  desc: "We roll out with feature flags, set up alerting dashboards, and watch for anomalies through go-live." },
    { icon: "📖", title: "Document & Hand Off", desc: "Full runbooks, API docs, and a walkthrough session. Your team owns it — we stay on for 30 days post-launch." },
  ];

  const integrations = ["Stripe","Salesforce","HubSpot","Slack","Twilio","OpenAI","Shopify","Notion","Zapier","PostgreSQL","Airtable","SendGrid"];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden">
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
              className="font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-2"
              style={{
                color: "#94b500",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <Link href="/services" className="hover:underline" style={{ color: "#6571ab" }}>Our Services</Link>
              <span style={{ color: "#6571ab" }}>›</span>
              API Integration
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
              Your Tools,<br />
              <span style={{ WebkitTextStroke: "2px #94b500", color: "transparent" }}>
                Finally
              </span>
              <br />
              <span style={{ color: "#94b500" }}>Connected.</span>
            </h1>

            <p
              className="text-base leading-relaxed max-w-md mb-10"
              style={{
                color: "#6571ab",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              Most businesses run on 10+ disconnected tools. We wire them together
              with clean, reliable APIs and event-driven pipelines — so data flows
              automatically and your team stops doing computers' jobs.
            </p>

            <div
              className="flex gap-4 items-center"
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

          {/* RIGHT — API flow mockup */}
          <div
            className="relative mt-8 lg:mt-0"
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
            <ApiFlowMockup />

            {/* floating badge */}
            <div
              className="absolute -bottom-5 left-4 sm:-left-8 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 shadow-xl flex items-center gap-3"
              style={{ background: "#fff", animation: "float 3s ease-in-out infinite" }}
            >
              <span className="text-xl">🔗</span>
              <div>
                <p className="text-xs" style={{ color: "#6571ab" }}>Avg. integration time</p>
                <p className="font-bold text-sm sm:text-base" style={{ color: "#07187b" }}>1–2 Weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ──────────────────────────────────────────── */}
      <section className="py-10 sm:py-14" style={{ background: "linear-gradient(90deg,#07187b 0%,#0d2299 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-white/10">
          {[
            { value: "80+",    label: "APIs Integrated" },
            { value: "99.97%", label: "Uptime Across Pipelines" },
            { value: "12×",    label: "Faster Than Manual Sync" },
            { value: "30d",    label: "Post-Launch Warranty" },
          ].map((s, i) => (
            <StatPill key={i} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      {/* ─── INTEGRATIONS MARQUEE ───────────────────────────────── */}
      <section className="py-10 sm:py-14 overflow-hidden" style={{ borderBottom: "1px solid rgba(7,24,123,0.07)" }}>
        <p className="text-center text-xs font-bold tracking-[0.3em] uppercase mb-8" style={{ color: "#6571ab" }}>
          Platforms We Integrate With
        </p>
        <div className="relative flex gap-6 overflow-hidden">
          {[...integrations, ...integrations].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap"
              style={{
                background: "rgba(7,24,123,0.05)",
                border: "1px solid rgba(7,24,123,0.1)",
                color: "#07187b",
                animation: "marquee 22s linear infinite",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHAT YOU GET ───────────────────────────────────────── */}
      <section className="py-16 sm:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
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
      <section
        className="py-16 sm:py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 100%)" }}
      >
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(148,181,0,0.15) 0%,transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <ProcessHeader />
          {/* 5-col on desktop → 2-col on sm → 1-col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {processSteps.map((s, i) => (
              <ProcessStep key={i} step={i + 1} title={s.title} desc={s.desc} index={i} total={processSteps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <BenefitsHeader />
          {/* 2-col on desktop → 1-col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 sm:mt-16">
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
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}