"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";




/* ═══════════════════════════════════════════════════════════
   SHARED HOOKS & SUB-COMPONENTS
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

// Pulled outside to avoid calling hooks inside .map()
function useInViewCard(_index: number) {
  return useInView(0.15);
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useInView();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = Math.ceil(value / (1600 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function ProcessStep({ step, title, desc, index }: {
  step: number; title: string; desc: string; index: number;
}) {
  const { ref, isVisible } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        transitionDelay: `${index * 180}ms`,
      }}
    >
      {index < 2 && (
        <div
          className="hidden md:block absolute top-6 h-px z-0"
          style={{
            background: "linear-gradient(to right,#94b500 0%,transparent 100%)",
            width: "calc(100% - 64px)",
            left: "calc(48px + 16px)",
          }}
        />
      )}

      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-5 shadow-lg relative z-10"
        style={{ background: "linear-gradient(135deg,#07187b 0%,#94b500 100%)", color: "#fff" }}
      >
        {String(step).padStart(2, "0")}
      </div>

      <div
        className="rounded-2xl p-6 h-full"
        style={{
          background: "rgba(7,24,123,0.04)",
          border: "1px solid rgba(7,24,123,0.09)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="w-8 h-[3px] mb-4 rounded-full" style={{ background: "#94b500" }} />
        <h3 className="text-lg font-bold mb-2" style={{ color: "#07187b" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#6571ab" }}>{desc}</p>
      </div>
    </div>
  );
}

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
          Ready to Scale<br />
          <span style={{ color: "#94b500" }}>Your Vision?</span>
        </h2>
        <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
          Let's build something extraordinary together. No fluff, no delays — just results.
        </p>
        <button
          className="px-10 py-4 rounded-full font-bold text-sm"
          style={{ background: "#94b500", color: "#fff", boxShadow: "0 8px 30px rgba(148,181,0,0.4)" }}
        >
          Book a Free Strategy Call →
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      title: "Agile and adaptive teams",
      desc: "We deploy small, cross-functional squads that move at startup speed. No bloated processes — just clear priorities, rapid iterations, and relentless focus on outcomes.",
    },
    {
      title: "Proven track record",
      desc: "From fintech platforms to e-commerce ecosystems, we've architected solutions that have driven 8x ROI and 98% client retention. Our work doesn't just perform — it transforms businesses.",
    },
    {
      title: "Diverse Skill pool",
      desc: "Our team is a blend of senior engineers, product strategists, and brand architects — building systems that are robust and deeply aligned with your business goals.",
    },
  ];

  const stats = [
    { value: 150, suffix: "+", label: "Projects Shipped" },
    { value: 42,  suffix: "",  label: "Integrations Done" },
    { value: 40,  suffix: "+", label: "Industries Served" },
    { value: 60,  suffix: "%", label: "Cost Reduction for Clients" },
  ];

  const reasons = [
    { icon: "⚡", title: "Speed Without Compromise", desc: "We move fast because our process is built for clarity. No bloat, no hand-holding loops — just sharp decisions and rapid delivery." },
    { icon: "🎯", title: "Strategy Baked In",         desc: "Every technical choice is a commercial one. We think like founders, not just engineers, so your product actually moves the needle." },
    { icon: "🔒", title: "Built to Scale",             desc: "We architect for tomorrow on day one. Infrastructure, code, and brand systems that grow as fast as your ambitions." },
    { icon: "🤝", title: "True Partnership",           desc: "We embed ourselves in your vision. Transparent communication, honest feedback, and relentless alignment with your goals." },
  ];

  return (
    <>
      

      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ─── HERO ─────────────────────────────────────────────────*/}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div
            className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(148,181,0,0.12) 0%,transparent 70%)" }}
          />

          <div ref={heroRef} className="max-w-7xl mx-auto px-10 grid grid-cols-2 gap-20 items-center">

            {/* LEFT */}
            <div>
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-6"
                style={{
                  color: "#94b500",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "none" : "translateY(16px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                Why ScaleLoom
              </p>

              <h1
                className="text-6xl font-black leading-[1.05] mb-8"
                style={{
                  color: "#07187b",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "none" : "translateY(24px)",
                  transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}
              >
                How We<br />
                <span style={{ WebkitTextStroke: "2px #94b500", color: "transparent" }}>
                  Deliver
                </span>
                <br />
                <span style={{ color: "#94b500" }}>Results.</span>
              </h1>

              <p
                className="text-base leading-relaxed max-w-md"
                style={{
                  color: "#6571ab",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "none" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                }}
              >
                "Most firms provide code; we provide the architecture for growth by merging
                deep-tier IT expertise with high-level brand strategy. We don't just build
                your tools — we engineer your competitive advantage."
              </p>

              <div
                className="mt-10 flex gap-4 items-center"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "none" : "translateY(16px)",
                  transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
                }}
              >
                <button
                  className="px-7 py-3 rounded-full font-semibold text-sm text-white"
                  style={{ background: "linear-gradient(135deg,#07187b,#94b500)" }}
                >
                  Start a Project
                </button>
                <button
                  className="px-7 py-3 rounded-full font-semibold text-sm border-2"
                  style={{ borderColor: "#07187b", color: "#07187b" }}
                >
                  See Our Work →
                </button>
              </div>
            </div>

            {/* RIGHT */}
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
                style={{ background: "radial-gradient(circle,rgba(148,181,0,0.35) 0%,transparent 70%)" }}
              />
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/office.jpg" alt="Team working" fill className="object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(160deg,rgba(7,24,123,0.15) 0%,transparent 60%)" }}
                />
              </div>

              <div
                className="absolute -bottom-6 -left-8 rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3"
                style={{ background: "#07187b", color: "#fff", animation: "float 3s ease-in-out infinite" }}
              >
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="text-xs opacity-70">Avg. delivery time</p>
                  <p className="font-bold text-lg" style={{ color: "#94b500" }}>2–4 Weeks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STATS BAR ──────────────────────────────────────────── */}
        <section className="py-14" style={{ background: "linear-gradient(90deg,#07187b 0%,#0d2299 100%)" }}>
          <div className="max-w-7xl mx-auto px-10 grid grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-5xl font-black mb-1" style={{ color: "#94b500" }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROCESS ────────────────────────────────────────────── */}
        <section className="py-28 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div className="max-w-7xl mx-auto px-10">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#94b500" }}>
                Our Process
              </p>
              <h2 className="text-5xl font-black" style={{ color: "#07187b" }}>Three Steps to Scale</h2>
            </div>
            <div className="grid grid-cols-3 gap-10 relative">
              {steps.map((s, i) => (
                <ProcessStep key={i} step={i + 1} index={i} title={s.title} desc={s.desc} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY US CARDS ───────────────────────────────────────── */}
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
                Our Advantage
              </p>
              <h2 className="text-5xl font-black" style={{ color: "#07187b" }}>
                Why Teams<br />Choose Us
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {reasons.map((r, i) => {
                const { ref, isVisible } = useInViewCard(i);
                return (
                  <div
                    key={i}
                    ref={ref}
                    className="group relative rounded-3xl p-8 overflow-hidden cursor-default"
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(7,24,123,0.08)",
                      boxShadow: "0 4px 24px rgba(7,24,123,0.06)",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(30px)",
                      transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: "linear-gradient(135deg,rgba(7,24,123,0.04),rgba(148,181,0,0.06))",
                        transition: "opacity 0.3s ease",
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
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5"
                        style={{ background: "rgba(148,181,0,0.12)" }}
                      >
                        {r.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: "#07187b" }}>{r.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#6571ab" }}>{r.desc}</p>
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
        `}</style>
      </main>
    </>
  );
}