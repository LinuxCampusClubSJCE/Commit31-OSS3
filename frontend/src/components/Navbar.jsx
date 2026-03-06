import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-yellow-300 border-b-4 border-black transition-all duration-200 ${
        scrolled ? "shadow-[0_4px_0px_0px_#000]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-black rounded-none flex items-center justify-center border-2 border-black group-hover:bg-green-400 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight text-black uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
            Uni<span className="bg-black text-yellow-300 px-1">Find</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-black uppercase text-black border-2 border-black px-4 py-2 hover:bg-black hover:text-yellow-300 transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#report"
            className="text-sm font-black uppercase text-black border-2 border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition-colors shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Lost Item
          </a>
          <a
            href="#report"
            className="text-sm font-black uppercase text-black border-2 border-black px-4 py-2 bg-green-400 hover:bg-black hover:text-green-400 transition-colors shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Found Item
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden w-10 h-10 border-2 border-black bg-white flex flex-col gap-1.5 items-center justify-center hover:bg-black group transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-black group-hover:bg-yellow-300 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-black group-hover:bg-yellow-300 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-black group-hover:bg-yellow-300 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-200 ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <div className="border-t-4 border-black flex flex-col bg-yellow-300">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-black uppercase text-black border-b-2 border-black px-6 py-4 hover:bg-black hover:text-yellow-300 transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {l.label}
            </a>
          ))}
          <a href="#report" onClick={() => setMenuOpen(false)} className="text-sm font-black uppercase text-black border-b-2 border-black px-6 py-4 bg-white hover:bg-black hover:text-white transition-colors" style={{ fontFamily: "'Space Mono', monospace" }}>
            Report Lost Item
          </a>
          <a href="#report" onClick={() => setMenuOpen(false)} className="text-sm font-black uppercase text-black px-6 py-4 bg-green-400 hover:bg-black hover:text-green-400 transition-colors" style={{ fontFamily: "'Space Mono', monospace" }}>
            Report Found Item
          </a>
        </div>
      </div>
    </nav>
  );
}