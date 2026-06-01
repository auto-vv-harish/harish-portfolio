const skills = [
  "Embedded C",
  "Python",
  "CANoe",
  "VectorCAST",
  "Polarion",
  "Git",
  "Requirement Testing",
  "Integration Testing",
  "Blck Box Testing",
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
            key={skill}
            className="bg-white/5 p-6 rounded-xl"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;