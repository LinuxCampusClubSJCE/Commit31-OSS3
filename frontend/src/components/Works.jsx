const steps = [
  {
    number: "01",
    color: "bg-yellow-300",
    title: "Submit a Report",
    description: "Fill out a quick form describing your lost item — or report something you found. Include photo, location, and details.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    number: "02",
    color: "bg-green-400",
    title: "Item Goes Live",
    description: "Your report is instantly published. Students across campus can browse or search for matching items in real-time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    number: "03",
    color: "bg-pink-400",
    title: "Smart Matching",
    description: "UniFind highlights potential matches between reports. Get notified when a likely match appears for your item.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "04",
    color: "bg-cyan-300",
    title: "Reunited!",
    description: "Connect securely and arrange a safe handoff. Mark the item as returned and close the loop for the community.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function Works() {
  return (
    <section id="how-it-works" className="py-24 bg-yellow-50 border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-black uppercase tracking-widest text-black bg-green-400 border-2 border-black px-3 py-1 inline-block mb-4 shadow-[3px_3px_0px_#000]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            The Process
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-black uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            How UniFind
            <span className="bg-black text-white px-2 ml-2">Works</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`${step.color} border-2 border-black p-6 shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-200`}
            >
              {/* Number + Icon row */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-4xl font-black text-black opacity-30"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {step.number}
                </span>
                <div className="w-12 h-12 bg-black flex items-center justify-center text-white border-2 border-black">
                  {step.icon}
                </div>
              </div>
              <h3
                className="text-base font-black text-black uppercase mb-3"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm text-black leading-relaxed"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 bg-black border-2 border-black p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4
              className="text-xl font-black text-yellow-300 uppercase mb-1"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Takes less than 2 minutes
            </h4>
            <p
              className="text-sm text-gray-400"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Quick, easy, and completely free for all students.
            </p>
          </div>
          <a
            href="#report"
            className="shrink-0 flex items-center gap-2 bg-green-400 text-black px-7 py-3.5 font-black text-sm uppercase border-2 border-green-400 shadow-[4px_4px_0px_#22c55e] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Get started now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}