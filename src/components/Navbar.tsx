import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isSongsPage = location.pathname === "/songs";

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="text-cyan-400 font-bold text-xl md:text-2xl hover:text-cyan-300 transition whitespace-nowrap"
        >
          Harish&nbsp;Devireddy
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-white items-center">

          <button
            onClick={handleHomeClick}
            className="hover:text-cyan-400 transition duration-300"
          >
            🏠 Home
          </button>

          {!isSongsPage && (
            <>
              <a
                href="#about"
                className="hover:text-cyan-400 transition duration-300"
              >
                About
              </a>

              <a
                href="#skills"
                className="hover:text-cyan-400 transition duration-300"
              >
                Skills
              </a>

              <a
                href="#projects"
                className="hover:text-cyan-400 transition duration-300"
              >
                Projects
              </a>

              <a
                href="#contact"
                className="hover:text-cyan-400 transition duration-300"
              >
                Contact
              </a>

              <Link
                to="/songs"
                className="hover:text-cyan-400 transition duration-300"
              >
                🎵 Passions
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

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72
        bg-gradient-to-b from-slate-900 via-cyan-950 to-slate-900
        border-l-2 border-cyan-400
        shadow-[0_0_30px_rgba(34,211,238,0.3)]
        transform transition-transform duration-300 ease-in-out
        md:hidden
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">

          {/* Sidebar Header */}
          <div className="flex justify-between items-center border-b border-cyan-500/30 pb-4">
            <button
              onClick={() => {
                handleLogoClick();
                setMenuOpen(false);
              }}
              className="text-left"
            >
              <h2 className="text-cyan-400 font-bold text-lg hover:text-cyan-300 transition whitespace-nowrap">
                Harish&nbsp;Devireddy
              </h2>

              <p className="text-gray-400 text-sm">
                Automotive Software Engineer
              </p>
            </button>

            <button
              className="text-white text-xl hover:text-cyan-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* Sidebar Menu */}
          <div className="mt-8 flex flex-col gap-4">

            <button
              onClick={() => {
                handleHomeClick();
                setMenuOpen(false);
              }}
              className="text-left px-4 py-3 rounded-lg bg-slate-800/40 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
            >
              🏠 Home
            </button>

            {!isSongsPage && (
              <>
                <a
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-slate-800/40 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                >
                  👤 About
                </a>

                <a
                  href="#skills"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-slate-800/40 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                >
                  ⚡ Skills
                </a>

                <a
                  href="#projects"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-slate-800/40 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                >
                  🚀 Projects
                </a>

                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-slate-800/40 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                >
                  📩 Contact
                </a>

                <Link
                  to="/songs"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-slate-800/40 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                >
                  🎵 Passions
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;