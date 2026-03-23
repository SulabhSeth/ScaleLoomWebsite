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

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════ */
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
   HERO — full viewport, split layout
═══════════════════════════════════════════════════════════ */
function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const services = [
    { name: "Data Visualization & Analysis",  path: "/services/data-visualization",       icon: "📊" },
    { name: "Digitisation & Automations",      path: "/services/digitisation-automation",  icon: "⚙️" },
    { name: "Customised Point Solutions",      path: "/services/custom-solutions",         icon: "🛠️" },
    { name: "API Integrations & Development",  path: "/services/api-integration",          icon: "🔗" },
    { name: "Website & App Development",       path: "/services/web-development",          icon: "💻" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* ── parallax background blobs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(148,181,0,0.18) 0%,transparent 65%)",
          transform: `translate(${mousePos.x * -18}px,${mousePos.y * -14}px)`,
          transition: "transform 0.6s ease",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(7,24,123,0.08) 0%,transparent 65%)",
          transform: `translate(${mousePos.x * 14}px,${mousePos.y * 12}px)`,
          transition: "transform 0.6s ease",
        }}
      />

      {/* ── dot grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* ── green accent stripe on far left ── */}
      <div
        className="absolute left-0 top-0 h-full w-1.5 pointer-events-none"
        style={{ background: "linear-gradient(to bottom,#94b500,#07187b,transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10 pt-24 pb-16">

        {/* ── LEFT: logo card ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
          }}
        >
          {/* outer glow ring */}
          <div
            className="relative rounded-3xl p-1"
            style={{ background: "linear-gradient(135deg,#94b500 0%,#07187b 50%,#94b500 100%)" }}
          >
            <div className="relative bg-white rounded-[22px] overflow-hidden" style={{ height: 360 }}>

              {/* animated green shimmer top */}
              <div
                className="absolute top-0 left-0 right-0 h-2 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg,transparent,#94b500,transparent)",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              />

              {/* logo */}
              <div className="flex items-center justify-center h-full">
                <div className="relative">
                  {/* halo */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle,rgba(148,181,0,0.15) 0%,transparent 70%)",
                      transform: "scale(2.2)",
                    }}
                  />
                  <Image
                    src="/logo.jpg"
                    alt="ScaleLoom Logo"
                    width={200}
                    height={200}
                    className="object-contain relative z-10 sm:w-[260px] sm:h-[260px]"
                    style={{ borderRadius: 24 }}
                  />
                </div>
              </div>

              {/* floating tag bottom-left */}
              <div
                className="absolute bottom-5 left-5 rounded-xl px-3 py-2 flex items-center gap-2"
                style={{
                  background: "#07187b",
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <span className="text-base">🚀</span>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>Since</p>
                  <p className="text-sm font-black text-white">2018</p>
                </div>
              </div>

              {/* floating tag bottom-right */}
              <div
                className="absolute bottom-5 right-5 rounded-xl px-3 py-2 text-center"
                style={{
                  background: "rgba(148,181,0,0.12)",
                  border: "1px solid rgba(148,181,0,0.3)",
                  animation: "float 3s ease-in-out infinite 1s",
                }}
              >
                <p className="text-xl font-black" style={{ color: "#94b500" }}>150+</p>
                <p className="text-[10px] font-bold" style={{ color: "#6571ab" }}>Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: copy ── */}
        <div className="mt-4 lg:mt-0">
          {/* eyebrow */}
          <p
            className="text-xs font-bold tracking-[0.35em] uppercase mb-6"
            style={{
              color: "#94b500",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            Digital Engineering Studio
          </p>

          {/* headline */}
          <h1
            className="font-black leading-[1.02] mb-6"
            style={{
              fontSize: "clamp(2.4rem,5vw,4.5rem)",
              color: "#07187b",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(28px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
          >
            SCALE
            <span
              className="relative inline-block mx-2 sm:mx-3 px-3 sm:px-4 py-0"
              style={{ background: "#07187b", color: "#94b500" }}
            >
              LOOM
            </span>
            <br />
            <span style={{ WebkitTextStroke: "2px #94b500", color: "transparent" }}>
              Builds What
            </span>
            <br />
            <span style={{ color: "#94b500" }}>Scales You.</span>
          </h1>

          {/* body */}
          <p
            className="text-base leading-relaxed mb-3 max-w-md"
            style={{
              color: "#6571ab",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
            }}
          >
            In the digital age, most businesses aren't suffering from a lack of
            technology — they're suffering from a lack of cohesion.
          </p>
          <p
            className="text-base leading-relaxed mb-10 max-w-md"
            style={{
              color: "#6571ab",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
            }}
          >
            We weave your technical capabilities into your brand's ambition and
            build scalable digital systems that perform as loudly as they look.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
            }}
          >
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full font-bold text-sm text-white"
              style={{ background: "linear-gradient(135deg,#07187b,#94b500)", boxShadow: "0 8px 24px rgba(7,24,123,0.25)" }}
            >
              Start a Project
            </Link>
            <Link
              href="/about"
              className="px-7 py-3.5 rounded-full font-bold text-sm border-2"
              style={{ borderColor: "#07187b", color: "#07187b" }}
            >
              Why Us →
            </Link>
          </div>

          {/* service pills */}
          <div
            className="flex flex-wrap gap-2"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.6s",
            }}
          >
            {services.map((s, i) => (
              <Link
                key={i}
                href={s.path}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(7,24,123,0.05)",
                  border: "1px solid rgba(7,24,123,0.12)",
                  color: "#07187b",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <span>{s.icon}</span>
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── scroll hint ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease 1.2s" }}
      >
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#6571ab", opacity: 0.5 }}>Scroll</span>
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: "rgba(7,24,123,0.2)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: "#94b500", animation: "scrollDot 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   VISION SECTION
═══════════════════════════════════════════════════════════ */
function VisionSection() {
  const { ref, isVisible } = useInView(0.2);

  const pillars = [
    { icon: "🎯", label: "Clarity",    desc: "Every system we build is designed to reduce confusion, not add to it." },
    { icon: "⚡", label: "Efficiency", desc: "No bloat. No waste. Just the right technology doing exactly the right job." },
    { icon: "📈", label: "Growth",     desc: "We build for where you're going, not just where you are today."         },
  ];

  return (
    <section className="py-16 sm:py-28 relative overflow-hidden bg-white">
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right,transparent,#94b500,transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* LEFT */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(28px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <p className="text-xs font-bold tracking-[0.35em] uppercase mb-4" style={{ color: "#94b500" }}>
              Our Vision
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6" style={{ color: "#07187b" }}>
              Technology That<br />
              <span style={{ WebkitTextStroke: "2px #94b500", color: "transparent" }}>Fits</span>
              {" "}<span style={{ color: "#94b500" }}>Your Ambition.</span>
            </h2>
            <div className="w-16 h-1 rounded-full mb-8" style={{ background: "#94b500" }} />
            <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color: "#6571ab" }}>
              We aim to bridge the gap between technology and business by creating
              systems that are not only scalable but also aligned with your long-term
              goals.
            </p>
            <p className="text-base leading-relaxed max-w-md" style={{ color: "#6571ab" }}>
              Our approach focuses on three things — and only three — because focus is
              what makes the difference between software that works and software that wins.
            </p>
          </div>

          {/* RIGHT — pillar cards */}
          <div className="flex flex-col gap-5">
            {pillars.map((p, i) => (
              <PillarCard key={i} icon={p.icon} label={p.label} desc={p.desc} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ icon, label, desc, index }: { icon: string; label: string; desc: string; index: number }) {
  const { ref, isVisible } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="group flex items-start gap-5 p-6 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: "rgba(7,24,123,0.03)",
        border: "1px solid rgba(7,24,123,0.08)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(30px)",
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl"
        style={{ background: "rgba(148,181,0,0.12)" }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-black mb-1" style={{ color: "#07187b" }}>{label}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#6571ab" }}>{desc}</p>
      </div>
      <div
        className="ml-auto self-center text-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ color: "#94b500", transform: "translateX(-8px)" }}
      >
        →
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICES PREVIEW
═══════════════════════════════════════════════════════════ */
function ServicesSection() {
  const services = [
    { icon: "📊", title: "Data Visualization & Analysis",  sub: "One-click dashboards & scheduled reports for every stakeholder.",    path: "/services/data-visualization",      accent: "#94b500" },
    { icon: "⚙️", title: "Digitisation & Automations",     sub: "Eliminate repetitive work. Recover 15+ hours every week.",           path: "/services/digitisation-automation", accent: "#07187b" },
    { icon: "🛠️", title: "Customised Point Solutions",     sub: "No tool fits? We build exactly what your workflow needs.",           path: "/services/custom-solutions",        accent: "#94b500" },
    { icon: "🔗", title: "API Integrations & Development", sub: "Wire every tool in your stack into one coherent system.",            path: "/services/api-integration",         accent: "#07187b" },
    { icon: "💻", title: "Website & App Development",      sub: "From marketing sites to production-grade apps — built to perform.",  path: "/services/web-development",         accent: "#94b500" },
  ];

  return (
    <section
      className="py-16 sm:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 100%)" }}
    >
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(148,181,0,0.12) 0%,transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <ServicesHeader />

        {/* On mobile/tablet: single column. On lg: first 3 in a row, last 2 centered */}
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((s, i) => (
              <ServiceCard key={i} {...s} index={i} />
            ))}
            {/* Last 2 — shown inline on mobile, centred on lg */}
            <div className="contents lg:hidden">
              {services.slice(3).map((s, i) => (
                <ServiceCard key={i + 3} {...s} index={i + 3} />
              ))}
            </div>
          </div>
          {/* Last 2 centered row — desktop only */}
          <div className="hidden lg:grid grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
            {services.slice(3).map((s, i) => (
              <ServiceCard key={i + 3} {...s} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesHeader() {
  const { ref, isVisible } = useInView(0.2);
  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <p className="text-xs font-bold tracking-[0.35em] uppercase mb-4" style={{ color: "#94b500" }}>What We Do</p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: "#07187b" }}>
          Five Services,<br />One Cohesive Partner.
        </h2>
        <p className="text-sm max-w-xs sm:text-right" style={{ color: "#6571ab" }}>
          Every service is designed to plug into the others — so your stack grows as a system, not a patchwork.
        </p>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, sub, path, accent, index }: {
  icon: string; title: string; sub: string; path: string; accent: string; index: number;
}) {
  const { ref, isVisible } = useInView(0.15);
  return (
    <Link
      href={path}
      ref={ref as any}
      className="group relative rounded-3xl p-7 overflow-hidden block"
      style={{
        background: "#fff",
        border: "1px solid rgba(7,24,123,0.08)",
        boxShadow: "0 4px 24px rgba(7,24,123,0.05)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 90}ms, transform 0.6s ease ${index * 90}ms`,
      }}
    >
      {/* hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg,${accent}08,${accent}12)`,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* bottom border sweep */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full rounded-full"
        style={{ background: `linear-gradient(to right,${accent},transparent)`, transition: "width 0.4s ease" }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
          style={{ background: `${accent}18` }}
        >
          {icon}
        </div>
        <div className="w-8 h-[3px] mb-4 rounded-full" style={{ background: accent }} />
        <h3 className="text-base font-bold mb-2 leading-snug" style={{ color: "#07187b" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#6571ab" }}>{sub}</p>
        <p
          className="text-xs font-bold mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ color: accent }}
        >
          Learn more <span>→</span>
        </p>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════
   STATS / WHY US
═══════════════════════════════════════════════════════════ */
function MilestoneItem({ value, text, index }: { value: string; text: string; index: number }) {
  const { ref, isVisible } = useInView(0.15);
  return (
    <div
      ref={ref}
      className="flex items-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0) scale(1)" : "translateX(80px) scale(0.95)",
        transition: "opacity 1s ease, transform 1s ease",
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* CIRCLE */}
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl flex-shrink-0 shadow-lg"
        style={{ background: "#07187b" }}
      >
        {value}
      </div>
      {/* CONNECTOR */}
      <div className="h-1 w-4 sm:w-6 flex-shrink-0" style={{ background: "#07187b" }} />
      {/* PILL */}
      <div
        className="text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full text-xs sm:text-sm leading-relaxed shadow-md"
        style={{ background: "#07187b" }}
      >
        {text}
      </div>
    </div>
  );
}

function WhyUsSection() {
  const milestones = [
    { value: "150+", text: "Websites & multiple B2B & B2C apps delivered across domains like e-commerce, healthcare, travel and manufacturing." },
    { value: "42",   text: "Reliable & secure integrations done. Integrated marketplaces with warehousing systems." },
    { value: "60%",  text: "Cost reduction for our clients outsourcing to us." },
  ];

  return (
    <section className="py-16 sm:py-28 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#07187b 1px,transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(148,181,0,0.1) 0%,transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* stats bar */}
        <div
          className="rounded-3xl mb-12 sm:mb-20 py-8 sm:py-10 px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4"
          style={{ background: "linear-gradient(90deg,#07187b 0%,#0d2299 100%)" }}
        >
          {[
            { value: 150, suffix: "+", label: "Projects Shipped"        },
            { value: 42,  suffix: "",  label: "Enterprise Integrations" },
            { value: 60,  suffix: "%", label: "Avg. Cost Reduction"     },
            { value: 8,   suffix: "×", label: "Avg. ROI Delivered"      },
          ].map((s, i) => (
            <div key={i} className="text-center px-2 sm:px-4">
              <p className="text-4xl sm:text-5xl font-black mb-1" style={{ color: "#94b500" }}>
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs sm:text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* two-column: left copy, right milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <WhyUsLeft />
          <div className="space-y-6 sm:space-y-10">
            {milestones.map((m, i) => (
              <MilestoneItem key={i} value={m.value} text={m.text} index={i} />
            ))}
          </div>
        </div>

        <WhyUsCta />
      </div>
    </section>
  );
}

function WhyUsLeft() {
  const { ref, isVisible } = useInView(0.2);
  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <p className="text-xs font-bold tracking-[0.35em] uppercase mb-4" style={{ color: "#94b500" }}>Why Choose Us</p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6" style={{ color: "#07187b" }}>
        50+ Years Combined<br />
        <span style={{ color: "#94b500" }}>Experience. One Team.</span>
      </h2>
      <div className="w-16 h-1 rounded-full mb-8" style={{ background: "#94b500" }} />
      <p className="text-base leading-relaxed mb-4" style={{ color: "#6571ab" }}>
        With 50+ years of combined team experience, we have successfully executed
        150+ digital projects and 42 enterprise-grade integrations.
      </p>
      <p className="text-base leading-relaxed" style={{ color: "#6571ab" }}>
        Our approach ensures a 60% cost-to-value advantage while maintaining
        scalable and structured systems that grow with your business.
      </p>
    </div>
  );
}

function WhyUsCta() {
  const { ref, isVisible } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="mt-12 sm:mt-16 text-center"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
    >
      {/* <Link
        href="/about"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white"
        style={{ background: "linear-gradient(135deg,#07187b,#94b500)", boxShadow: "0 8px 24px rgba(7,24,123,0.2)" }}
      >
        See the Full Story →
      </Link> */}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════════════════════════ */
function CtaBanner() {
  const { ref, isVisible } = useInView(0.2);
  return (
    <section
      className="py-16 sm:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#07187b 0%,#0f2db8 100%)" }}
    >
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 pointer-events-none" style={{ background: "#94b500" }} />
      <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full opacity-10 pointer-events-none" style={{ background: "#94b500" }} />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg,#94b500 0,#94b500 1px,transparent 0,transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div
        ref={ref}
        className="max-w-3xl mx-auto px-6 sm:px-10 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <p className="text-xs font-bold tracking-[0.35em] uppercase mb-6" style={{ color: "rgba(148,181,0,0.8)" }}>
          Let's Build Together
        </p>
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
          Transform Your Ideas<br />
          <span style={{ color: "#94b500" }}>Into Scalable Products.</span>
        </h2>
        <p className="text-sm sm:text-base mb-10 sm:mb-12 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
          Partner with us to drive real business growth. No fluff, no delays —
          just systems that perform as loudly as your ambitions demand.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 sm:px-10 py-4 rounded-full font-bold text-sm text-white"
            style={{ background: "#94b500", boxShadow: "0 8px 30px rgba(148,181,0,0.45)" }}
          >
            Get Started Today →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <VisionSection />
      <ServicesSection />
      <WhyUsSection />
      <CtaBanner />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </main>
  );
}