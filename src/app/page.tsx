import Hero from "./components/Hero";
import ServicesPreview from "./components/ServicesPreview";
import Milestones from "./components/Milestones";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Navbar /> */}
      <Hero />
      
      {/* SECTION 1 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-4xl font-bold text-brandBlue mb-6">
            Our Vision
          </h2>
          <p className="text-brandGreyBlue max-w-3xl leading-relaxed">
            We aim to bridge the gap between technology and business by creating
            systems that are not only scalable but also aligned with your long-term
            goals. Our approach focuses on clarity, efficiency, and growth.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      {/* <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-3 gap-10">
          
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-brandBlue mb-3">
                Service {item}
              </h3>
              <p className="text-brandGreyBlue text-sm leading-relaxed">
                We design and develop scalable digital solutions tailored to your
                business needs, ensuring long-term sustainability and growth.
              </p>
            </div>
          ))}

        </div>
      </section> */}

      <ServicesPreview />

      {/* SECTION 3 */}
      <section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 gap-16 items-center">
    
    {/* LEFT */}
    <div>
      <h2 className="text-4xl font-bold text-brandBlue mb-6">
        Why Choose Us
      </h2>

      <p className="text-brandGreyBlue leading-relaxed mb-4">
        With 50+ years of combined team experience, we have successfully executed
        150+ digital projects and 42 enterprise-grade integrations.
      </p>

      <p className="text-brandGreyBlue leading-relaxed">
        Our approach ensures a 60% cost-to-value advantage while maintaining
        scalable and structured systems.
      </p>
    </div>

    {/* RIGHT */}
    <Milestones />

  </div>
</section>

      {/* SECTION 4 */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-10 text-center">
          <h2 className="text-4xl font-bold text-brandBlue mb-6">
            Let’s Build Together
          </h2>
          <p className="text-brandGreyBlue max-w-2xl mx-auto mb-8">
            Partner with us to transform your ideas into scalable digital
            products that drive real business growth.
          </p>
          <button className="bg-brandBlue text-white px-8 py-3 rounded-full hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </section>

    </main>
  );
}