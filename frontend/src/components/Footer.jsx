export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-white mb-12">
          {/* Brand */}
          <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-white">
            <a href="#" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-yellow-300 border-2 border-white flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <span
                className="text-xl font-black tracking-tight uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Uni<span className="bg-yellow-300 text-black px-1">Find</span>
              </span>
            </a>
            <p
              className="text-gray-400 text-sm leading-relaxed border-l-4 border-green-400 pl-3"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              A student-powered platform reconnecting campus communities with their lost belongings. Fast. Simple. Free.
            </p>
          </div>

          {/* Quick Links */}
          <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-white">
            <h4
              className="text-xs font-black uppercase tracking-widest text-yellow-300 mb-5 border-b-2 border-yellow-300 pb-2"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {["About", "How It Works", "Report Lost Item", "Report Found Item"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-green-400 hover:pl-2 transition-all font-bold uppercase flex items-center gap-2"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <span className="text-yellow-300">›</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="p-8">
            <h4
              className="text-xs font-black uppercase tracking-widest text-yellow-300 mb-5 border-b-2 border-yellow-300 pb-2"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              {["X", "IG", "GH"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 border-2 border-white flex items-center justify-center text-xs font-black text-white hover:bg-yellow-300 hover:text-black hover:border-yellow-300 transition-all"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {s}
                </a>
              ))}
            </div>
            <p
              className="text-xs text-gray-500 font-bold uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Built for students, by students.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t-2 border-white pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-xs text-gray-500 font-bold uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            © {new Date().getFullYear()} UniFind. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-gray-500 hover:text-yellow-300 transition-colors font-bold uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}