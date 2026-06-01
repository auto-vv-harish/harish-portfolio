const skills = [
  { name: "Embedded C", level: 90 },
  { name: "Python", level: 85 },
  { name: "CANoe", level: 95 },
  { name: "VectorCAST", level: 90 },
  { name: "Polarion", level: 85 },
  { name: "Git", level: 80 },
  { name: "Requirement Testing", level: 95 },
  { name: "Integration Testing", level: 95 },
  { name: "Black Box Testing", level: 90 },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h2 className="text-5xl font-bold text-center">
        Skills
      </h2>

      <div className="grid md:grid-cols-4 gap-6 mt-16">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group relative bg-white/5 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-center">
              {skill.name}
            </h3>

            {/* Hover Content */}
            <div className="absolute inset-0 bg-gray-900/95 rounded-xl flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              
              <p className="text-cyan-400 text-2xl font-bold">
                {skill.level}%
              </p>

              <div className="w-32 bg-gray-700 rounded-full h-2 mt-3">
                <div
                  className="bg-cyan-400 h-2 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-300 mt-3">
                Proficiency Level
              </p>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;