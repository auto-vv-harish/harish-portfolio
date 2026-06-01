const achievements = [
  {
    title: "🏆 Stellar Award",
    description: "Recognized for outstanding performance and contribution.",
  },
  {
    title: "🥉 Mobis Hackathon 2024",
    description: "Won 3rd Prize for Code Comparison Tool.",
  },
  {
    title: "⚡ Test Automation",
    description: "Automated testing activities and improved productivity.",
  },
];

function Achievements() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold text-center">
        Achievements
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="border border-cyan-400 p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-cyan-400">
              {item.title}
            </h3>

            <p className="mt-3 text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Achievements;