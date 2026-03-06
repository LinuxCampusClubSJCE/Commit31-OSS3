export default function Cta() {
  return (
    <section id="report" className="py-24 bg-white border-t-4 border-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative bg-yellow-300 border-4 border-black shadow-[10px_10px_0px_#000] overflow-hidden px-8 py-20 text-center">

          {/* Decorative corner dots */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-black rounded-full" />
          <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full" />
          <div className="absolute bottom-4 left-4 w-4 h-4 bg-black rounded-full" />
          <div className="absolute bottom-4 right-4 w-4 h-4 bg-black rounded-full" />

          {/* Stripes accent */}
          <div
            className="absolute top-0 left-0 w-full h-3 bg-black opacity-80"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, #000 0px, #000 20px, #22c55e 20px, #22c55e 40px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-3"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, #000 0px, #000 20px, #22c55e 20px, #22c55e 40px)",
            }}
          />

          <div className="relative z-10 pt-4">
            {/* Label */}
            <div
              className="inline-flex items-center gap-2 bg-black text-yellow-300 text-xs font-black px-4 py-2 mb-8 uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#22c55e]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Join the Community
            </div>

            <h2
              className="text-4xl md:text-6xl font-black text-black uppercase leading-tight mb-6"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Be the reason
              <br />
              someone smiles
              <br />
              <span
                className="bg-black text-green-400 px-3 inline-block mt-1"
                style={{ WebkitTextStroke: "0px" }}
              >
                today.
              </span>
            </h2>

            <p
              className="text-black text-base max-w-xl mx-auto mb-12 leading-relaxed border-2 border-black bg-white px-6 py-4 shadow-[4px_4px_0px_#000]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Whether you've lost something or found something — your report could make all the difference. Two minutes. Zero cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#"
                className="flex items-center gap-2.5 bg-black text-white px-9 py-4 font-black text-sm uppercase border-2 border-black shadow-[5px_5px_0px_#22c55e] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                Report Lost Item
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 bg-green-400 text-black px-9 py-4 font-black text-sm uppercase border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Report Found Item
              </a>
            </div>

            <p
              className="mt-8 text-xs text-black font-bold uppercase flex items-center justify-center gap-3"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span>Free forever</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              <span>No account to browse</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              <span>Verified students</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}