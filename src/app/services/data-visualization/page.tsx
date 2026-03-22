"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

/* Deliverable row */
function DeliverableItem({ text, index }: { text: string; index: number }) {
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
      <span className="text-base font-medium" style={{ color: "#07187b" }}>{text}</span>
    </div>
  );
}

/* Benefit card */
function BenefitCard({ icon, title, description, index }: {
  icon: string; title: string; description: string; index: number;
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
      {/* hover gradient fill */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg,rgba(7,24,123,0.04),rgba(148,181,0,0.07))",
          transition: "opacity 0.35s ease",
        }}
      />
      {/* left accent bar */}
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
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5"
          style={{ background: "rgba(148,181,0,0.12)" }}
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: "#07187b" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#6571ab" }}>{description}</p>
      </div>
    </div>
  );
}

/* Stat pill */
function StatPill({ value, label }: { value: string; label: string }) {
  const { ref, isVisible } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="text-center px-8 py-6"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <p className="text-5xl font-black mb-1" style={{ color: "#94b500" }}>{value}</p>
      <p className="text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>{label}</p>
    </div>
  );
}

/* CTA banner */
function CtaBanner() {
  const { ref, isVisible } = useInView(0.2);
  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#07187b 0%,#0f2db8 100%)" }}
    >
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: "#94b500" }} />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: "#94b500" }} />
      <div
        className="max-w-3xl mx-auto px-10 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <h2 className="text-5xl font-black text-white mb-6 leading-tight">
          Ready to See Your<br />
          <span style={{ color: "#94b500" }}>Data Come Alive?</span>
        </h2>
        <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
          Let's turn your scattered data into a single source of truth — in weeks, not months.
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 rounded-full font-bold text-sm text-white"
          style={{ background: "#94b500", boxShadow: "0 8px 30px rgba(148,181,0,0.4)" }}
        >
          Contact Us →
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function DataVisualizationPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const deliverables = [
    "Live dashboards with viewer accounts — shareable in one click",
    "SQL / dataset layer with fully documented metrics & definitions",
    "Automation scripts and a long-term maintenance & update plan",
  ];

  const benefits = [
    {
      icon: "📉",
      title: "Fewer Status Meetings",
      description: "Data-ready decks replace repetitive update calls. Every stakeholder has the answer before the question.",
    },
    {
      icon: "⚡",
      title: "Faster Decisions",
      description: "Cut time-to-insight from days to seconds. React to market shifts while competitors are still pulling spreadsheets.",
    },
    {
      icon: "🔁",
      title: "Consistent Reporting",
      description: "One metrics layer across all teams means finance, product, and ops are always speaking the same language.",
    },
  ];

  /* mini mock chart bars — purely decorative SVG */
  const bars = [40, 65, 50, 80, 60, 90, 75];

  return (
    <>
      

      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-28 overflow-hidden">

          {/* background glow */}
          <div
            className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(148,181,0,0.11) 0%,transparent 70%)" }}
          />
          <div
            className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(7,24,123,0.06) 0%,transparent 70%)" }}
          />

          <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 gap-20 items-center">

            {/* LEFT */}
            <div>
              {/* breadcrumb */}
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-2"
                style={{
                  color: "#94b500",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "none" : "translateY(16px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <Link href="/services" className="hover:underline" style={{ color: "#6571ab" }}>Our Services</Link>
                <span style={{ color: "#6571ab" }}>›</span>
                Data Visualization
              </p>

              <h1
                className="text-6xl font-black leading-[1.05] mb-6"
                style={{
                  color: "#07187b",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "none" : "translateY(24px)",
                  transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}
              >
                Data That<br />
                <span style={{ WebkitTextStroke: "2px #94b500", color: "transparent" }}>
                  Speaks
                </span>
                <br />
                <span style={{ color: "#94b500" }}>For Itself.</span>
              </h1>

              <p
                className="text-base leading-relaxed max-w-md mb-4"
                style={{
                  color: "#6571ab",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "none" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                }}
              >
                Turn raw product, usage, and ops data into one-click dashboards and
                scheduled reports — so every stakeholder gets the answer before they
                even know the question.
              </p>

              <p
                className="text-sm font-semibold tracking-wide uppercase mb-10"
                style={{
                  color: "#94b500",
                  opacity: heroVisible ? 1 : 0,
                  transition: "opacity 0.7s ease 0.25s",
                }}
              >
                Easy Dashboards &amp; Reports
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
                {/* <Link
                  href="/services"
                  className="px-7 py-3 rounded-full font-semibold text-sm border-2"
                  style={{ borderColor: "#07187b", color: "#07187b" }}
                >
                  All Services →
                </Link> */}
              </div>
            </div>

            {/* RIGHT — decorative dashboard mockup */}
            <div
              className="relative"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateX(40px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}
            >
              {/* glow */}
              <div
                className="absolute -top-6 -right-6 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(148,181,0,0.3) 0%,transparent 70%)" }}
              />

              {/* dashboard card */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: "#07187b" }}
              >
                {/* header bar */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Weekly Overview
                    </p>
                    <p className="text-2xl font-black text-white">Revenue Dashboard</p>
                  </div>
                  <div
                    className="px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: "rgba(148,181,0,0.2)", color: "#94b500" }}
                  >
                    ● Live
                  </div>
                </div>

                {/* stat row */}
                <div className="px-8 py-4 grid grid-cols-3 gap-4">
                  {[
                    { label: "Total Revenue", value: "$284K", delta: "+12%" },
                    { label: "Active Users",  value: "14.3K", delta: "+8%"  },
                    { label: "Conversion",    value: "3.7%",  delta: "+0.4%" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-4"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</p>
                      <p className="text-xl font-black text-white mb-1">{s.value}</p>
                      <p className="text-xs font-semibold" style={{ color: "#94b500" }}>{s.delta} ↑</p>
                    </div>
                  ))}
                </div>

                {/* bar chart */}
                <div className="px-8 pb-8 pt-2">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                    7-Day Trend
                  </p>
                  <div className="flex items-end gap-3 h-28">
                    {bars.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-lg"
                          style={{
                            height: `${h}%`,
                            background: i === 5
                              ? "#94b500"
                              : "rgba(255,255,255,0.18)",
                            animation: `growUp 0.8s ease ${i * 80 + 400}ms both`,
                          }}
                        />
                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {["M","T","W","T","F","S","S"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* floating badge */}
              <div
                className="absolute -bottom-5 -left-8 rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3"
                style={{ background: "#fff", animation: "float 3s ease-in-out infinite" }}
              >
                <span className="text-xl">📊</span>
                <div>
                  <p className="text-xs" style={{ color: "#6571ab" }}>Avg. setup time</p>
                  <p className="font-bold text-base" style={{ color: "#07187b" }}>Under 2 Weeks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STATS BAR ──────────────────────────────────────────── */}
        <section className="py-14" style={{ background: "linear-gradient(90deg,#07187b 0%,#0d2299 100%)" }}>
          <div className="max-w-7xl mx-auto px-10 grid grid-cols-4 gap-4 divide-x divide-white/10">
            {[
              { value: "10×",  label: "Faster Reporting Cycles" },
              { value: "98%",  label: "Dashboard Uptime SLA"   },
              { value: "60%",  label: "Reduction in Ad-hoc Queries" },
              { value: "3 wk", label: "Average Time to Live"   },
            ].map((s, i) => (
              <StatPill key={i} value={s.value} label={s.label} />
            ))}
          </div>
        </section>

        {/* ─── WHAT YOU GET ───────────────────────────────────────── */}
        <section className="py-28 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 gap-20 items-center">

            {/* LEFT — text */}
            <div>
              {(() => {
                const { ref, isVisible } = useInView(0.2);
                return (
                  <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>
                      What You Get
                    </p>
                    <h2 className="text-5xl font-black mb-4 leading-tight" style={{ color: "#07187b" }}>
                      Three Things<br />Delivered to You
                    </h2>
                    <div className="w-16 h-1 rounded-full mb-8" style={{ background: "#94b500" }} />
                    <p className="text-base leading-relaxed" style={{ color: "#6571ab" }}>
                      Every engagement ends with a production-ready data stack — not just pretty charts.
                      We hand over ownership fully documented and automated.
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* RIGHT — deliverables */}
            <div className="flex flex-col gap-4">
              {deliverables.map((d, i) => (
                <DeliverableItem key={i} text={d} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ───────────────────────────────────────────── */}
        <section
          className="py-28 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 100%)" }}
        >
          <div
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(148,181,0,0.15) 0%,transparent 70%)" }}
          />
          <div className="max-w-7xl mx-auto px-10">
            <div className="mb-16">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>
                Business Impact
              </p>
              <h2 className="text-5xl font-black leading-tight" style={{ color: "#07187b" }}>
                Why It Changes<br />How You Operate
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <BenefitCard key={i} icon={b.icon} title={b.title} description={b.description} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ───────────────────────────────────────── */}
        <section className="py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-10">
            {(() => {
              const { ref, isVisible } = useInView(0.15);
              return (
                <div ref={ref} className="text-center mb-16" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
                  <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>The Process</p>
                  <h2 className="text-5xl font-black" style={{ color: "#07187b" }}>From Data to Dashboard</h2>
                </div>
              );
            })()}

            <div className="grid grid-cols-4 gap-8 relative">
              {[
                { icon: "🔍", title: "Audit",     desc: "We map every data source — databases, APIs, spreadsheets — and identify the metrics that actually matter." },
                { icon: "🏗️", title: "Model",     desc: "We build a clean SQL layer with documented, version-controlled metrics all teams can trust." },
                { icon: "🎨", title: "Visualise", desc: "We design intuitive dashboards with drill-downs, filters, and scheduled email exports." },
                { icon: "🚀", title: "Hand Over",  desc: "Full walkthrough, access provisioned to your team, automation live — we stay on for 30 days post-launch." },
              ].map((step, i) => {
                const { ref, isVisible } = useInView(0.2);
                return (
                  <div
                    key={i}
                    ref={ref}
                    className="relative"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(36px)",
                      transition: `opacity 0.7s ease ${i * 150}ms, transform 0.7s ease ${i * 150}ms`,
                    }}
                  >
                    {i < 3 && (
                      <div
                        className="hidden md:block absolute top-6 h-px z-0"
                        style={{
                          background: "linear-gradient(to right,#94b500,transparent)",
                          width: "calc(100% - 64px)",
                          left: "calc(48px + 16px)",
                        }}
                      />
                    )}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-5 shadow-lg relative z-10"
                      style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="rounded-2xl p-6"
                      style={{ background: "rgba(7,24,123,0.03)", border: "1px solid rgba(7,24,123,0.08)" }}
                    >
                      <div className="w-8 h-[3px] mb-4 rounded-full" style={{ background: "#94b500" }} />
                      <h3 className="text-lg font-bold mb-2" style={{ color: "#07187b" }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#6571ab" }}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBanner />

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-8px); }
          }
          @keyframes growUp {
            from { transform: scaleY(0); transform-origin: bottom; }
            to   { transform: scaleY(1); transform-origin: bottom; }
          }
        `}</style>
      </main>
    </>
  );
}