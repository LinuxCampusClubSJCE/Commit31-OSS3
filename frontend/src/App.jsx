import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="antialiased text-black bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Works />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
