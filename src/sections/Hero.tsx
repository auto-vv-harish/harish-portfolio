import { TypeAnimation } from "react-type-animation";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import profilePic from "../assets/profile.jpeg";
import { useState, useEffect } from "react";
import { incrementAndGetViews } from "../lib/viewCounter";

const Hero = () => {
  const [showAbout, setShowAbout] = useState(false);
 const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const loadViews = async () => {
      const count = await incrementAndGetViews();
      setViewCount(count);
    };

    loadViews();
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-20 right-20"></div>

      <div className="relative z-10 text-center">

        <img
          src={profilePic}
          alt="Harish Devireddy"
          className="w-48 h-48 rounded-full mx-auto border-4 border-cyan-400 object-cover mb-6"
        />

        <h1 className="text-6xl md:text-8xl font-bold">
          Harish
        </h1>

        <h1 className="text-6xl md:text-8xl font-bold text-cyan-400">
          Devireddy
        </h1>

        <div className="mt-6 text-xl md:text-3xl">
          <TypeAnimation
            sequence={[
              "Automotive Software Engineer",
              2000,
              "Embedded Systems Engineer",
              2000,
              "Python Automation Developer",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </div>

        <p className="max-w-2xl mx-auto mt-6 text-gray-400">
          Passionate Automotive Engineer specializing in Embedded Systems,
          CANoe, VectorCAST, Requirement Testing and Python Automation.
        </p>
       
       <p className="mt-4 text-cyan-400 text-lg font-semibold">
  👀 Portfolio Views: {viewCount}
      </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">

          <button
            onClick={() => setShowAbout(!showAbout)}
            className="bg-cyan-500 px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            Projects
          </button>

          <a
            href="/Harish_Devireddy_Resume.pdf"
            download
            className="border border-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-400 hover:text-black transition"
          >
            Download Resume
          </a>

        </div>

      {/* About Section */}
{showAbout && (
  <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg text-white text-left">
    <h3 className="text-2xl font-bold text-cyan-400 mb-4">
      Key Projects
    </h3>

    <ul className="space-y-3">
      <li>
        🚗 <strong>Digital Cluster & Display System</strong> –
        Performed Unit & Integration Testing, software debugging,
        and functional safety validation.
      </li>

      <li>
        🌐 <strong>Data Connectivity Unit (DCU)</strong> –
        Conducted requirement analysis, communication module
        validation, and debugging of UART & D-Bus components.
      </li>

      <li>
        🔊 <strong>Virtual Engine Sound System (VESS)</strong> –
        Tested and validated virtual engine sound functionalities
        across multiple automotive platforms.
      </li>

      <li>
        🎵 <strong>Acoustic Design Process & Amplifier</strong> –
        Performed UDS diagnostic testing, CAN communication
        analysis, and software debugging.
      </li>

      <li>
        🖥️ <strong>Disassociated Centre Stack Display (DCSD)</strong> –
        Conducted diagnostic software validation, interface
        analysis, and debugging activities.
      </li>
    </ul>
  </div>
)}

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">

          <a
            href="https://in.linkedin.com/in/harishdevireddy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <FaLinkedin size={24} />
            LinkedIn
          </a>

          <a
            href="https://github.com/auto-vv-harish"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <FaGithub size={24} />
            GitHub
          </a>

          <a
            href="https://www.naukri.com/mnjuser/profile"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Naukri
          </a>

        </div>

      </div>
    </section>
  );
};

export default Hero;