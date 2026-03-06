export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20">
      {/* Checkerboard corner accent */}
      <div
        className="absolute top-20 right-0 w-40 h-40 opacity-20"
        style={{
          backgroundImage: "repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-56 h-32 opacity-10"
        style={{
          backgroundImage: "repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-green-400 border-2 border-black text-black text-xs font-black px-4 py-2 mb-8 uppercase shadow-[4px_4px_0px_#000]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="w-2 h-2 bg-black rounded-full" />
          Now live across campus
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-black leading-none mb-6 uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Lost Something
          <br />
          <span className="bg-yellow-300 border-4 border-black px-3 inline-block mt-2 shadow-[6px_6px_0px_#000]">
            on Campus?
          </span>
          <br />
          <span className="text-green-500" style={{ WebkitTextStroke: "2px black" }}>
            UniFind
          </span>{" "}
          Gets It Back.
        </h1>

        <p
          className="text-black text-lg max-w-xl mb-10 leading-relaxed border-l-4 border-black pl-4 bg-yellow-50"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          A free, student-run platform connecting those who've lost items with those who've found them.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-start mb-16">
          <a
            href="#report"
            className="flex items-center gap-2 bg-black text-white px-8 py-4 font-black text-sm uppercase border-2 border-black shadow-[5px_5px_0px_#22c55e] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            Report Lost Item
          </a>
          <a
            href="#report"
            className="flex items-center gap-2 bg-green-400 text-black px-8 py-4 font-black text-sm uppercase border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Report Found Item
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-0 border-2 border-black w-fit">
          {[
            ["1,200+", "Items Reported"],
            ["870+", "Items Reunited"],
            ["4,500+", "Students Helped"],
          ].map(([number, label], i) => (
            <div
              key={label}
              className={`px-8 py-5 bg-white flex flex-col items-center ${i !== 2 ? "border-b-2 sm:border-b-0 sm:border-r-2 border-black" : ""}`}
            >
              <span
                className="text-3xl font-black text-black"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {number}
              </span>
              <span
                className="text-xs font-bold uppercase text-gray-600 mt-1"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}