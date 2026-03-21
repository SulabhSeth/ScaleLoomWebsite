export default function GreenBackground() {
  return (
    <div className="absolute top-0 left-0 h-full w-[420px] z-0">

      {/* Main big shape */}
      <div className="absolute top-0 left-0 h-full w-full
        bg-gradient-to-b from-brandGreen to-brandGreenAlt
        rounded-r-[200px] opacity-90"
      />

      {/* Layer 2 */}
      <div className="absolute top-0 left-6 h-full w-[85%]
        bg-gradient-to-b from-brandGreen to-brandGreenAlt
        rounded-r-[180px] opacity-50 blur-sm"
      />

      {/* Layer 3 */}
      <div className="absolute top-0 left-0 h-full w-[60%]
        bg-gradient-to-b from-brandGreen to-brandGreenAlt
        rounded-r-[140px] opacity-70"
      />

      {/* Highlight */}
      <div className="absolute top-0 left-[120px] h-full w-[60px]
        bg-gradient-to-b from-white/40 to-transparent
        rounded-r-[120px]"
      />

    </div>
  );
}