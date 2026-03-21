"use client";

import useInView from "../hooks/useInView";

function MilestoneItem({ item, index }: any) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`
        flex items-center
        transition-all duration-1000 ease-out

        ${isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 translate-x-20 scale-95"}
      `}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* CIRCLE */}
      <div className="w-24 h-24 rounded-full bg-brandBlue flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-lg">
        {item.value}
      </div>

      {/* CONNECTOR */}
      <div className="h-1 w-6 bg-brandBlue"></div>

      {/* TEXT */}
      <div className="bg-brandBlue text-white px-6 py-4 rounded-full text-sm leading-relaxed shadow-md">
        {item.text}
      </div>
    </div>
  );
}

export default function Milestones() {
  const data = [
    {
      value: "150+",
      text: "Websites & multiple B2B & B2C apps delivered across domains like e-commerce, healthcare, travel and manufacturing.",
    },
    {
      value: "42",
      text: "Reliable & secure integrations done. Integrated marketplaces with warehousing systems.",
    },
    {
      value: "60%",
      text: "Cost reduction for our clients outsourcing to us.",
    },
  ];

  return (
    <div className="space-y-10">
      {data.map((item, index) => (
        <MilestoneItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}