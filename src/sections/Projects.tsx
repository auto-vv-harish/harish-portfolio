
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Automotive Test Automation Framework",
    tech: ["Shell", "C", "C++"],
    github:
      "https://github.com/auto-vv-harish/automotive-cpp-testing-framework",
  },
  {
    title: "Smart Water Management System",
    tech: ["Arduino", "C", "C++"],
    github:
      "https://github.com/auto-vv-harish/Smart-Residential-and-Agricultural-Water-Management-System",
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-cyan-400 p-6 rounded-xl bg-white/5 hover:border-cyan-300 transition"
          >
            <h3 className="text-2xl font-semibold text-cyan-400">
              {project.title}
            </h3>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-cyan-400 hover:text-cyan-300"
            >
              <FaGithub />
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;