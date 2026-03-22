"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Why Us", path: "/about" },
    { name: "Our Services", path: "services" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
  { name: "Data Visualization & Analysis", path: "/services/data-visualization" },
  { name: "Digitisation & Automations", path: "/services/digitisation-automation" },
  { name: "Customised Point Solutions", path: "/services/custom-solutions" },
  { name: "API Integrations & Development", path: "/services/api-integration" },
  { name: "Website & App Development", path: "/services/web-development" },
];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">

        {/* Logo */}
        {/* <div className="flex items-center gap-3">
  <Image
    src="/logo.jpg"
    alt="ScaleLoom Logo"
    width={50}
    height={50}
    className="object-contain rounded-2xl"
  />
  <span className="font-bold text-xl text-[#1E2F8A]">
    ScaleLoom
  </span>
</div> */}

        {/* Nav Links */}
        <div className="flex gap-10 ml-auto">
          {navItems.map((item) => {
  const isActive = pathname === item.path;

  // 🔥 SERVICES DROPDOWN
  if (item.name === "Our Services") {
    return (
      <div key={item.name} className="relative group">
        
        {/* MAIN TAB */}
        <div
          className={`cursor-pointer text-[15px] font-medium transition-all duration-300
          text-brandGreyBlue group-hover:text-brandBlue`}
        >
          {item.name}

          <span className="absolute left-0 -bottom-1 h-0.5 bg-brandBlue w-0 group-hover:w-full transition-all duration-300" />
        </div>

        {/* DROPDOWN */}
        <div className="absolute top-8 left-0 bg-white shadow-lg rounded-xl py-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

          {services.map((service, index) => (
            <Link
              key={index}
              href={service.path}
              className="block px-5 py-2 text-sm text-brandGreyBlue hover:text-brandBlue hover:bg-gray-50 transition"
            >
              {service.name}
            </Link>
          ))}

        </div>
      </div>
    );
  }

  // 🔹 NORMAL LINKS
  return (
    <Link
      key={item.name}
      href={item.path}
      className={`group relative text-[15px] font-medium transition-all duration-300
      ${
        isActive
          ? "text-brandBlue"
          : "text-brandGreyBlue hover:text-brandBlue"
      }`}
    >
      {item.name}

      <span
        className={`absolute left-0 -bottom-1 h-0.5 bg-brandBlue transition-all duration-300
        ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </Link>
  );
})}
        </div>
      </div>
    </nav>
  );
}