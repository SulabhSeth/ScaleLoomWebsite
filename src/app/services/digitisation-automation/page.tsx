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
  SHARED UI COMPONENTS
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
    className="text-center px-4 sm:px-8 py-4 sm:py-6"
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
      <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
       Still Doing It<br />
       <span style={{ color: "#94b500" }}>Manually?</span>
      </h2>
      <p className="text-sm sm:text-base mb-6 sm:mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
       Every hour your team spends on repetitive tasks is an hour not spent growing the business. Let's fix that.
      </p>
      <Link
       href="/contact"
       className="inline-block px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-xs sm:text-sm text-white"
       style={{ background: "#94b500", boxShadow: "0 8px 30px rgba(148,181,0,0.4)" }}
      >
       Connect with Us →
      </Link>
    </div>
   </section>
  );
}

/* ═══════════════════════════════════════════════════════════
  HERO RIGHT — animated workflow automation mockup
═══════════════════════════════════════════════════════════ */
function AutomationMockup() {
  const steps = [
   { label: "Form Submitted",      icon: "📋", status: "trigger" },
   { label: "Data Validated",      icon: "✅", status: "step"    },
   { label: "CRM Updated",         icon: "☁️", status: "step"    },
   { label: "Invoice Generated",   icon: "🧾", status: "step"    },
   { label: "Slack Notified",      icon: "💬", status: "step"    },
   { label: "Email Sent",          icon: "📧", status: "done"    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
   if (!running) return;
   if (activeStep >= steps.length) {
    const reset = setTimeout(() => setActiveStep(0), 1800);
    return () => clearTimeout(reset);
   }
   const t = setTimeout(() => setActiveStep((p) => p + 1), 750);
   return () => clearTimeout(t);
  }, [activeStep, running]);

  const timeSaved = Math.min(activeStep * 8, 47); // fake "minutes saved" counter

  return (
   <div
    className="relative rounded-3xl overflow-hidden shadow-2xl"
    style={{ background: "#07187b" }}
   >
    {/* header */}
    <div
      className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
      style={{ background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-3">
       <div className="flex gap-1.5">
        {["#ff5f57","#febc2e","#28c840"].map((c) => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
       </div>
       <span className="text-xs font-mono ml-1 hidden sm:inline" style={{ color: "rgba(255,255,255,0.4)" }}>
        workflow-engine
       </span>
      </div>
      <button
       onClick={() => { setRunning((r) => !r); if (!running) setActiveStep(0); }}
       className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap"
       style={{
        background: running ? "rgba(148,181,0,0.2)" : "rgba(255,255,255,0.1)",
        color: running ? "#94b500" : "rgba(255,255,255,0.5)",
       }}
      >
       {running ? "● Running" : "▶ Run"}
      </button>
    </div>

    {/* workflow steps */}
    <div className="px-4 sm:px-6 py-5 space-y-2">
      {steps.map((step, i) => {
       const done = i < activeStep;
       const active = i === activeStep - 1 && activeStep <= steps.length;
       return (
        <div
          key={i}
          className="flex items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition-all duration-500"
          style={{
           background: active
            ? "rgba(148,181,0,0.15)"
            : done
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.03)",
           border: active
            ? "1px solid rgba(148,181,0,0.4)"
            : "1px solid rgba(255,255,255,0.06)",
           opacity: i > activeStep ? 0.35 : 1,
           transform: active ? "translateX(4px)" : "translateX(0)",
          }}
        >
          {/* status dot */}
          <div
           className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]"
           style={{
            background: done
              ? "#94b500"
              : active
              ? "rgba(148,181,0,0.3)"
              : "rgba(255,255,255,0.08)",
           }}
          >
           {done ? "✓" : active ? (
            <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
           ) : "·"}
          </div>

          <span className="text-base flex-shrink-0">{step.icon}</span>

          <span
           className="text-xs sm:text-sm font-medium flex-1 truncate sm:truncate-none"
           style={{ color: done ? "rgba(255,255,255,0.85)" : active ? "#fff" : "rgba(255,255,255,0.35)" }}
          >
           {step.label}
          </span>

          {done && (
           <span className="text-[10px] font-bold flex-shrink-0" style={{ color: "#94b500" }}>
            done
           </span>
          )}
          {active && (
           <span className="text-[10px] font-bold flex-shrink-0" style={{ color: "#94b500", animation: "pulse 1s ease infinite" }}>
            running…
           </span>
          )}
        </div>
       );
      })}
    </div>

    {/* time saved counter */}
    <div
      className="mx-4 sm:mx-6 mb-6 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between"
      style={{ background: "rgba(148,181,0,0.1)", border: "1px solid rgba(148,181,0,0.2)" }}
    >
      <div>
       <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
        Time Saved This Run
       </p>
       <p className="text-xl sm:text-2xl font-black mt-0.5" style={{ color: "#94b500" }}>
        {timeSaved} min
       </p>
      </div>
      <div className="text-2xl sm:text-3xl">⏱️</div>
    </div>
   </div>
  );
}

/* ═══════════════════════════════════════════════════════════
  EXTRACTED SECTION HEADERS  (Rules of Hooks)
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
      Every digitisation engagement ends with running automations you own outright —
      documented, tested, and built to operate without babysitting.
    </p>
   </div>
  );
}

function ProcessHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div ref={ref} className="text-center mb-12 sm:mb-16" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>The Process</p>
    <h2 className="text-3xl sm:text-5xl font-black" style={{ color: "#07187b" }}>From Manual to Automatic</h2>
   </div>
  );
}

function BenefitsHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>Business Impact</p>
    <h2 className="text-3xl sm:text-5xl font-black leading-tight" style={{ color: "#07187b" }}>
      What Happens When<br />Humans Stop Doing Robots' Jobs
    </h2>
   </div>
  );
}

function UseCaseHeader() {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>What We Automate</p>
    <h2 className="text-3xl sm:text-5xl font-black leading-tight" style={{ color: "#07187b" }}>
      Six Workflows We<br />Kill Every Week
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

function UseCaseCard({ title, desc, index }: {
  title: string; desc: string; index: number;
}) {
  const { ref, isVisible } = useInView(0.15);
  return (
   <div
    ref={ref}
    className="group relative rounded-3xl p-6 sm:p-7 overflow-hidden cursor-default"
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

/* ═══════════════════════════════════════════════════════════
  MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function DigitisationPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
   const t = setTimeout(() => setHeroVisible(true), 80);
   return () => clearTimeout(t);
  }, []);

  const deliverables = [
   {
    text: "End-to-end workflow automation",
    sub: "Every manual, multi-step process mapped and replaced with a reliable, monitored automation that runs 24/7 without intervention.",
   },
   {
    text: "Digital forms & document pipelines",
    sub: "Paper forms, email chains, and spreadsheet hand-offs replaced with structured digital inputs that flow directly into your systems.",
   },
   {
    text: "System-to-system data sync",
    sub: "Your CRM, ERP, billing, and ops tools kept in sync automatically — no exports, no copy-paste, no stale data.",
   },
   {
    text: "Monitoring, alerting & audit logs",
    sub: "Every automation run is logged. Failures alert your team instantly. You have full visibility into what ran, when, and why.",
   },
   {
    text: "Runbooks, training & 30-day support",
    sub: "Your team learns to own it. Full documentation, live training sessions, and 30 days of dedicated post-launch support included.",
   },
  ];

  const benefits = [
   {
    icon: "⏰",
    title: "Reclaim 15+ Hours Per Week",
    description: "The average knowledge worker spends 4+ hours a day on repetitive tasks. Automation hands that time back — every single week, forever.",
   },
   {
    icon: "🎯",
    title: "Zero Manual Errors",
    description: "Humans make mistakes on repetitive work. Automations don't. Every record is consistent, every notification fires, every handoff completes.",
   },
   {
    icon: "📈",
    title: "Scale Without Hiring",
    description: "Automated processes handle 10× the volume with no additional headcount. Grow your output without growing your payroll.",
   },
   {
    icon: "🔍",
    title: "Full Audit Trail",
    description: "Every automated action is logged with timestamps and payloads. Compliance, debugging, and reporting become trivial.",
   },
  ];

  const processSteps = [
   {
    icon: "🗺️",
    title: "Process Mapping",
    desc: "We shadow your team, document every manual step, and identify which workflows have the highest automation ROI.",
   },
   {
    icon: "📐",
    title: "Automation Design",
    desc: "We design the trigger-action architecture — tools, conditions, error paths — and present it for sign-off before building.",
   },
   {
    icon: "⚙️",
    title: "Build & Connect",
    desc: "We wire up the automation using the right tool for each job — native integrations, custom code, or low-code where it fits.",
   },
   {
    icon: "🧪",
    title: "Test & Validate",
    desc: "Every edge case, failure mode, and volume scenario tested in staging before a single live record is touched.",
   },
   {
    icon: "🚀",
    title: "Go Live & Monitor",
    desc: "Staged rollout, alerting dashboards live from day one, and 30 days of monitoring and support post-launch.",
   },
  ];

  const useCases = [
   {
    icon: "📥",
    title: "Lead Capture to CRM",
    desc: "Every form submission, ad lead, or inbound email automatically creates a CRM record, assigns an owner, and fires a follow-up sequence.",
   },
   {
    icon: "🧾",
    title: "Invoice & Billing Automation",
    desc: "Contracts signed → invoices generated → payment links sent → accounting updated. The entire billing cycle without human touch.",
   },
   {
    icon: "📦",
    title: "Order & Fulfilment Workflows",
    desc: "Order placed → inventory checked → warehouse notified → shipping booked → customer updated. End-to-end, hands-free.",
   },
   {
    icon: "🗂️",
    title: "Document Digitisation",
    desc: "Paper forms, PDFs, and email attachments processed, classified, and filed automatically into the right system with zero manual sorting.",
   },
   {
    icon: "🔔",
    title: "Approval & Notification Flows",
    desc: "Leave requests, purchase approvals, and compliance sign-offs routed to the right person automatically and chased if overdue.",
   },
   {
    icon: "📊",
    title: "Reporting Automation",
    desc: "Weekly KPI reports, monthly board packs, and daily ops summaries generated and distributed automatically — no manual assembly.",
   },
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

      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

       {/* LEFT */}
       <div>
        <p
          className="text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-2 flex-wrap"
          style={{
           color: "#94b500",
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(16px)",
           transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <Link href="/services" className="hover:underline" style={{ color: "#6571ab" }}>Our Services</Link>
          <span style={{ color: "#6571ab" }}>›</span>
          <span>Digitisation &amp; Automation</span>
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
          Stop Doing<br />
          <span style={{ WebkitTextStroke: "2px #94b500", color: "transparent" }}>
           By Hand
          </span>
          <br />
          <span style={{ color: "#94b500" }}>What Runs Itself.</span>
        </h1>

        <p
          className="text-sm sm:text-base leading-relaxed max-w-md mb-8 sm:mb-10"
          style={{
           color: "#6571ab",
           opacity: heroVisible ? 1 : 0,
           transform: heroVisible ? "none" : "translateY(20px)",
           transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          Most businesses are sitting on hundreds of hours of recoverable time — buried
          in copy-paste workflows, manual reports, and email chains that should never
          involve a human. We map, digitise, and automate them so your team can focus
          on work that actually requires them.
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
           className="px-6 sm:px-7 py-3 rounded-full font-semibold text-sm text-white"
           style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
          >
           Start a Project
          </Link>
        </div>
       </div>

       {/* RIGHT — automation mockup */}
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
        <AutomationMockup />

        {/* floating badge */}
        <div
          className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-8 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 shadow-xl flex items-center gap-3"
          style={{ background: "#fff", animation: "float 3s ease-in-out infinite" }}
        >
          <span className="text-lg sm:text-xl">⏱️</span>
          <div>
           <p className="text-xs" style={{ color: "#6571ab" }}>Avg. time recovered</p>
           <p className="font-bold text-sm sm:text-base" style={{ color: "#07187b" }}>15+ hrs / week</p>
          </div>
        </div>
       </div>
      </div>
    </section>

    {/* ─── STATS BAR ──────────────────────────────────────────── */}
    <section className="py-10 sm:py-14" style={{ background: "linear-gradient(90deg,#07187b 0%,#0d2299 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-x divide-white/10">
       {[
        { value: "200+", label: "Workflows Automated"        },
        { value: "60%",  label: "Avg. Cost Reduction"        },
        { value: "0",    label: "Manual Errors Post-Launch"  },
        { value: "30d",  label: "Post-Launch Warranty"       },
       ].map((s, i) => (
        <StatPill key={i} value={s.value} label={s.label} />
       ))}
      </div>
    </section>

    {/* ─── USE CASES ──────────────────────────────────────────── */}
    <section className="py-16 sm:py-28 relative overflow-hidden">
      <div
       className="absolute inset-0 pointer-events-none opacity-[0.03]"
       style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
       <UseCaseHeader />
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12 sm:mt-16">
        {useCases.map((u, i) => (
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
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
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
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative">
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
       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-12 sm:mt-16">
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
      @keyframes spin {
       from { transform: rotate(0deg); }
       to   { transform: rotate(360deg); }
      }
      @keyframes pulse {
       0%, 100% { opacity: 1; }
       50%       { opacity: 0.4; }
      }
    `}</style>
   </main>
  );
}
