import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-10">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h3 className="text-xl font-bold text-cyan-400">
          Harish Devireddy
        </h3>

        <p className="text-gray-400 mt-2">
          Automotive Software Engineer |
          Embedded Systems Engineer |
          Python Automation Developer
        </p>

        <div className="flex justify-center gap-6 mt-4">

          <a
            href="https://in.linkedin.com/in/harishdevireddy"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={24} />
          </a>

          <a
            href="https://github.com/auto-vv-harish"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={24} />
          </a>

        </div>

        <p className="text-gray-500 text-sm mt-6">
          © 2026 Harish Devireddy. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;