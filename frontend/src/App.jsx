import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes , Route } from "react-router-dom";
import Register from "./pages/Register";
import Hero from "./components/Hero"
import About from "./components/About"
import Works from "./components/Works"
import CTA from "./components/CTA"

function Home() {
  return (
    <>
      <Hero/>
      <About />
      <Works />
      <CTA />
    </>
  )
}

export default function App() {
  return (
    <div className="antialiased text-black bg-white">
      <Navbar />
      
    
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        </Routes>
      </main>
   
       <Footer />
    </div>
  );
}
