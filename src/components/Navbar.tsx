import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isSongsPage = location.pathname === "/songs";

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-cyan-400 font-bold text-2xl">
          Harish Devireddy
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-white">
          {isSongsPage ? (
            <>
              <Link to="/" className="hover:text-cyan-400">
                Home
              </Link>

              <Link to="/songs" className="hover:text-cyan-400">
                Beyond Work
              </Link>
            </>
          ) : (
            <>
              <a href="#about" className="hover:text-cyan-400">
                About
              </a>

              <a href="#skills" className="hover:text-cyan-400">
                Skills
              </a>

              <a href="#projects" className="hover:text-cyan-400">
                Projects
              </a>

              <a href="#contact" className="hover:text-cyan-400">
                Contact
              </a>

              <Link to="/songs" className="hover:text-cyan-400">
                Beyond Work
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#0B1120] border-l border-cyan-500 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6 text-white">
          <button
            className="self-end text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>

          {isSongsPage ? (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link to="/songs" onClick={() => setMenuOpen(false)}>
                Beyond Work
              </Link>
            </>
          ) : (
            <>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>

              <a href="#skills" onClick={() => setMenuOpen(false)}>
                Skills
              </a>

              <a href="#projects" onClick={() => setMenuOpen(false)}>
                Projects
              </a>

              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>

              <Link to="/songs" onClick={() => setMenuOpen(false)}>
                Beyond Work
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;