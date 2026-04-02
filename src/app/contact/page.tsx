"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-16 bg-white overflow-hidden">

      <section className="relative">

        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* TITLE */}
            <h1 className="text-3xl md:text-5xl font-bold text-brandBlue leading-tight mb-8">
              Don't Hesitate <br /> To Contact Us
            </h1>

            {/* CONTACT INFO */}
            <div className="space-y-6">

              {/* WEBSITE */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brandBlue text-white flex items-center justify-center flex-shrink-0">
                  🌐
                </div>
                <p className="text-brandBlue font-medium text-sm md:text-base">
                  www.scaleloomservices.com
                </p>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brandBlue text-white flex items-center justify-center flex-shrink-0">
                  ✉️
                </div>
                <p className="text-brandBlue font-medium text-sm md:text-base">
                  contact@scaleloomservices.com
                </p>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brandBlue text-white flex items-center justify-center flex-shrink-0">
                  📞
                </div>
                <p className="text-brandBlue font-medium text-sm md:text-base">
                  +91-9999630334 / +91-9873310479
                </p>
              </div>
            </div>

            {/* DECORATIVE LINE */}
            <div className="w-20 h-1 bg-brandGreyBlue mt-10"></div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">

            <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/scaleloomLogo.gif"
                alt="Contact"
                fill
                className="object-cover"
              />
            </div>

            {/* GREEN GLOW EFFECT */}
            <div className="absolute -top-10 right-[-40px] w-60 h-60 bg-brandGreen/40 blur-3xl rounded-full"></div>

            {/* WHITE RING */}
            <div className="absolute top-20 right-10 w-12 h-12 border-4 border-white/70 rounded-full"></div>

          </div>

        </div>

        {/* BOTTOM WAVE */}
        <div className="absolute bottom-0 left-0 w-lg h-20 bg-gradient-to-r from-brandGreen/40 via-brandGreen/20 to-transparent"></div>

      </section>
    </main>
  );
}