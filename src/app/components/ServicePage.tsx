import React from "react";

type ServicePageProps = {
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];

  benefits?: { title: string; description?: string }[];

  stats?: { value: string; label: string; sub?: string }[];

  rightContent?: React.ReactNode;

  variant?: "default" | "light" | "minimal";
};

export default function ServicePage({
  title,
  subtitle,
  description,
  deliverables,
  benefits,
  stats,
  rightContent,
  variant = "default",
}: ServicePageProps) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-24 bg-[#f8f9ff]">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 gap-16 relative z-10">

        {/* LEFT SIDE */}
        <div>

          {/* TITLE */}
          <h1 className="text-5xl font-bold text-brandBlue mb-3">
            {title}
          </h1>

          <div className="w-16 h-[3px] bg-brandBlue mb-8"></div>

          {/* SUBTITLE */}
          <h2 className="text-2xl font-semibold text-brandBlue mb-6">
            {subtitle}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-brandBlue/90 leading-relaxed mb-10 max-w-xl">
            {description}
          </p>

          {/* DELIVERABLES */}
          <h3 className="text-xl font-semibold text-brandBlue mb-4">
            Key Deliverables
          </h3>

          <ul className="space-y-2 text-brandBlue/90">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brandBlue">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col justify-center">

          {/* PRIORITY: Custom Content */}
          {rightContent ? (
            rightContent
          ) : (
            <>
              {/* Stats */}
              {stats && (
                <div className="grid grid-cols-2 gap-8 mb-10">
                  {stats.map((stat, i) => (
                    <div key={i}>
                      <h3 className="text-4xl font-bold text-brandBlue">
                        {stat.value}
                      </h3>
                      <p className="text-brandBlue font-semibold">
                        {stat.label}
                      </p>
                      {stat.sub && (
                        <p className="text-sm text-brandGreyBlue">
                          {stat.sub}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Benefits */}
              {benefits && (
                <div>
                  <h3 className="text-xl font-semibold text-brandBlue mb-4">
                    Business Benefits
                  </h3>

                  <ul className="space-y-4">
                    {benefits.map((b, i) => (
                      <li key={i}>
                        <p className="font-semibold text-brandBlue">
                          ✦ {b.title}
                        </p>
                        {b.description && (
                          <p className="text-brandGreyBlue text-sm">
                            {b.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 🔵 BIG RIGHT CIRCLE (matches your design) */}
      <div className="absolute top-24 right-10 w-[320px] h-[320px] bg-brandBlue rounded-full opacity-90"></div>

      {/* ⚪ SMALL RING */}
      <div className="absolute top-[220px] right-6 w-16 h-16 border-4 border-white/70 rounded-full"></div>

      {/* 🟢 BOTTOM WAVE EFFECT */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-r from-brandGreen/40 via-brandGreen/20 to-transparent"></div>
    </section>
  );
}