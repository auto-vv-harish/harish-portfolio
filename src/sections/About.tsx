const About = () => {
  const joiningDate = new Date("2022-07-04");
  const today = new Date();

  const totalMonths =
    (today.getFullYear() - joiningDate.getFullYear()) * 12 +
    (today.getMonth() - joiningDate.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const experience = `${years} Years ${months} Months`;

  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h2 className="text-5xl font-bold text-center">
        About Me
      </h2>

      <p className="mt-8 text-center text-gray-400 text-lg">
        I'm Harish Devireddy, an Automotive Embedded Software Testing Engineer
        with {experience} of experience, passionate about building reliable,
        high-quality software systems and intelligent automation solutions.
        With experience in Clusters, HUD, Displays, Data Connectivity Units
        (DCU), Amplifiers, Acoustic Sound Design, and Acoustic Vehicle Alerting
        Systems (AVAS), I contribute to developing robust automotive software
        solutions.
      </p>

      <p className="mt-8 text-center text-gray-400 text-lg">
        I thrive on solving complex engineering challenges, improving software
        reliability, and transforming manual processes into efficient automated
        workflows through Embedded Systems expertise, software validation,
        debugging, and Python automation.
      </p>
    </section>
  );
};

export default About;