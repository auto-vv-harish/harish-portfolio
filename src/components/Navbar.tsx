import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isSongsPage = location.pathname === "/songs";

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-cyan-400 font-bold text-2xl">
          Harish Devireddy
        </h1>

        <div className="flex flex-wrap gap-4 text-white">
          {isSongsPage ? (
            <>
              <Link to="/" className="hover:text-cyan-400">
                Home
              </Link>

              <Link to="/songs" className="hover:text-cyan-400">
                Songs
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
      </div>
    </nav>
  );
};

export default Navbar;