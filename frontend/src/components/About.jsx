const cards = [
  {
    bg: "bg-yellow-300",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Student-Powered",
    description: "Built by students, for students. Every report is made by a real person on your campus.",
  },
  {
    bg: "bg-green-400",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: "Smart Matching",
    description: "Cross-references lost and found reports so students can identify if their item was already found.",
  },
  {
    bg: "bg-pink-400",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Safe & Trusted",
    description: "Only verified students can post. Ownership is confirmed before every handoff.",
  },
  {
    bg: "bg-cyan-300",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Always Free",
    description: "No fees, no ads, no catch. A nonprofit community project — forever.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className="text-xs font-black uppercase tracking-widest text-black bg-yellow-300 border-2 border-black px-3 py-1 inline-block mb-4 shadow-[3px_3px_0px_#000]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              About UniFind
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-black uppercase leading-tight"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Campus lost &amp; found,
              <br />
              <span className="bg-black text-white px-2">finally fixed.</span>
            </h2>
          </div>
          <p
            className="text-sm text-black max-w-sm border-l-4 border-black pl-4 leading-relaxed"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Thousands of students lose items every semester. UniFind bridges the gap with a raw, no-nonsense platform built for real people.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-black">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`${card.bg} p-7 border-black ${i !== cards.length - 1 ? "border-b-2 lg:border-b-0 lg:border-r-2" : ""} group hover:-translate-y-1 hover:shadow-[0_8px_0px_#000] transition-all duration-200`}
            >
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white mb-5 border-2 border-black group-hover:bg-white group-hover:text-black transition-colors">
                {card.icon}
              </div>
              <h3
                className="text-base font-black text-black uppercase mb-3"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm text-black leading-relaxed"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-10 bg-black text-yellow-300 py-4 px-6 flex items-center justify-center gap-3 border-2 border-black">
          <span className="w-3 h-3 bg-green-400 rounded-full" />
          <p
            className="text-xs font-black uppercase tracking-widest"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Trusted by students at 12+ universities
          </p>
          <span className="w-3 h-3 bg-green-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}