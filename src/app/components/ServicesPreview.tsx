"use client";

import Link from "next/link";
import useInView from "../hooks/useInView";

const services = [
  {
    title: "Data Visualization & Analysis",
    desc: "Transform raw data into clear dashboards and actionable insights.",
    path: "components/services/data-visualization",
  },
  {
    title: "Digitisation & Automations",
    desc: "Automate workflows and eliminate repetitive manual processes.",
    path: "components/services/digitisation-automation",
  },
  {
    title: "Customised Point Solutions",
    desc: "Build tailored software solutions aligned to your exact needs.",
    path: "components/services/custom-solutions",
  },
  {
    title: "API Integrations & Development",
    desc: "Secure, scalable integrations powering modern systems.",
    path: "components/services/api-integration",
  },
  {
    title: "Website & App Development",
    desc: "High-performing websites and apps built for growth.",
    path: "components/services/web-development",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-4 bg-brandLightBg">
      <div className="max-w-7xl mx-auto px-10">

        {/* HEADER */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-brandBlue mb-4">
            Our Services
          </h2>
          <p className="text-brandGreyBlue max-w-2xl">
            We design and build scalable digital systems tailored to your business needs.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => {
            const { ref, isVisible } = useInView();

            return (
              <Link key={index} href={service.path}>
                <div
                  ref={ref}
                  className={`
                    group p-8 rounded-3xl bg-white shadow-sm border border-gray-100 
                    transition-all duration-700 cursor-pointer h-full flex flex-col justify-between

                    ${isVisible 
                      ? "opacity-100 translate-y-0 scale-100" 
  : "opacity-0 translate-y-16 scale-95"}
                  `}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >

                  {/* TOP */}
                  <div>
                    <div className="w-12 h-1 bg-brandGreen mb-6 group-hover:w-16 transition-all duration-300"></div>

                    <h3 className="text-xl font-semibold text-brandBlue mb-3">
                      {service.title}
                    </h3>

                    <p className="text-brandGreyBlue text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* BOTTOM */}
                  <div className="mt-6 text-brandBlue font-medium flex items-center gap-2">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Explore
                    </span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </div>

                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}