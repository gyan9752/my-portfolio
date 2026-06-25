import "./experience.css";
import { motion } from "framer-motion";

export default function Experience() {
  const experience = [
    {
      company: "Tech Company Pvt Ltd",
      role: "Software Engineer",
      duration: "2025 - Present",
      desc: "Building scalable web applications using React and Node.js."
    },
    {
      company: "Startup XYZ",
      role: "Frontend Developer",
      duration: "2024 - 2025",
      desc: "Worked on UI development and API integrations."
    }
  ];

  return (
    <section className="experience">
      <h2>Experience</h2>

      <div className="experience-container">
        {experience.map((item, index) => (
          <motion.div
            className="experience-card"
            key={index}
            whileHover={{ scale: 1.03 }}
          >
            <h3>{item.role}</h3>
            <h4>{item.company}</h4>
            <span>{item.duration}</span>

            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}