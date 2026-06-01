import { TypeAnimation } from "react-type-animation";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import profilePic from "../assets/profile.jpeg";


const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">

      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-20 left-20"></div>

      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-20 right-20"></div>

      {/* Hero Content */}
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
          Passionate Automotive Engineer specializing in
          Embedded Systems, CANoe, VectorCAST,
          Requirement Testing and Python Automation.
        </p>

        <div className="flex justify-center gap-4 mt-8">

          <button className="bg-cyan-500 px-6 py-3 rounded-lg hover:scale-105 transition">
            View Projects
          </button>

<a
  href="/Harish_Devireddy_Resume.pdf"
  download
  className="border border-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-400 hover:text-black transition"
>
  Download Resume
</a>

        </div>
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