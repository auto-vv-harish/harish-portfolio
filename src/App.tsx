import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-[#0B1120] text-white">

      <Navbar />

      <Hero />

      <About />

      <Skills />

      <Projects />

      <Achievements />

     

      <Contact />

      <Footer />

    </div>
  );
}

export default App;