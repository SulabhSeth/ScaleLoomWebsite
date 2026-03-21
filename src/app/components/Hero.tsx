import Image from "next/image";
import Link from "next/link";
import GreenBackground from "./GreenBackground";

export default function Hero() {
  // const services = [
  //   {
  //     name: "Data Visualization & Analysis",
  //     path: "components/services/data-visualization",
  //   },
  //   {
  //     name: "Digitisation & Automations",
  //     path: "components/services/digitisation-automation",
  //   },
  //   {
  //     name: "Customised Point Solutions",
  //     path: "components/services/custom-solutions",
  //   },
  //   {
  //     name: "API Integrations & Development",
  //     path: "components/services/api-integration",
  //   },
  //   {
  //     name: "Website & App Development",
  //     path: "components/services/web-development",
  //   },
  // ];

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-visible">
      <GreenBackground />

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 gap-16 items-center relative z-10 pt-20">

        {/* LEFT */}
        <div className="flex justify-center items-center h-[450px] bg-white rounded-3xl shadow-2xl border border-gray-100">
          <Image
            src="/logo.jpg"
            alt="ScaleLoom Logo"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* RIGHT */}
        <div className="max-w-xl">

          <h1 className="text-6xl font-bold text-brandBlue mb-6 leading-tight">
            SCALE
            <span className="bg-brandBlue text-white px-3 ml-3">
              LOOM
            </span>
          </h1>

          <p className="text-brandGreyBlue leading-relaxed mb-6">
            In the digital age, most businesses aren't suffering from a lack of
            technology—they're suffering from a lack of cohesion.
          </p>

          <p className="text-brandGreyBlue leading-relaxed mb-8">
            We weave your technical capabilities into your brand's ambition and
            build scalable digital systems.
          </p>

          {/* ✅ SERVICES LINKS */}
          {/* <div className="space-y-3">
            {services.map((service, index) => (
              <Link key={index} href={service.path}>
                <div className="text-brandBlue font-medium hover:translate-x-2 transition duration-300 cursor-pointer">
                  → {service.name}
                </div>
              </Link>
            ))}
          </div> */}

        </div>
      </div>
    </section>
  );
}