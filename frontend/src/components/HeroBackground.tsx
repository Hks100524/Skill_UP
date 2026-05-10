export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundColor: "#fcfbff",
          backgroundImage:
            "radial-gradient(circle at top, rgba(235, 226, 255, 0.75), transparent 36%), linear-gradient(180deg, #ffffff 0%, #fcfbff 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundColor: "#0d0c13",
          backgroundImage:
            "radial-gradient(circle at top, rgba(117, 93, 194, 0.28), transparent 34%), linear-gradient(180deg, #0d0c13 0%, #12101b 100%)",
        }}
      />

      <div className="absolute -left-24 top-20 h-[24rem] w-[24rem] rounded-full bg-[#eadfff]/75 blur-[120px] animate-float dark:bg-[#6d4fd0]/25" />
      <div className="absolute right-[-7rem] top-28 h-[28rem] w-[28rem] rounded-full bg-[#ece2ff]/70 blur-[140px] dark:bg-[#8b5cf6]/20" />
      <div className="absolute bottom-[-8rem] left-[12%] h-[22rem] w-[26rem] rounded-full bg-[#f0e7ff]/75 blur-[140px] dark:bg-[#7b61ce]/20" />
      <div className="absolute bottom-[-10rem] right-[8%] h-[24rem] w-[24rem] rounded-full bg-[#e9ddff]/65 blur-[140px] animate-float dark:bg-[#5b47a6]/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#0d0c13] dark:via-[#0d0c13]/90" />
    </div>
  );
}
