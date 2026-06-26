import "./skill.css";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { 
  SiJavascript, 
  SiMongodb, 
  SiExpress, 
  SiPostman, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript,
  SiJsonwebtokens,
  SiMongoose
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import TiltWrapper from "../TiltWrapper/TiltWrapper";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { icon: <FaReact />, name: "React" },
        { icon: <SiNextdotjs />, name: "Next.js" },
        { icon: <SiTailwindcss />, name: "Tailwind CSS" },
        { icon: <SiJavascript />, name: "JavaScript" },
        { icon: <SiTypescript />, name: "TypeScript" },
        { icon: <FaHtml5 />, name: "HTML" },
        { icon: <FaCss3Alt />, name: "CSS" },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { icon: <FaNodeJs />, name: "Node.js" },
        { icon: <SiExpress />, name: "Express.js" },
        { icon: <SiMongodb />, name: "MongoDB" },
        { icon: <SiMongoose />, name: "Mongoose" },
        { icon: <TbApi />, name: "REST APIs" },
        { icon: <SiJsonwebtokens />, name: "JWT Auth" },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { icon: <FaGitAlt />, name: "Git" },
        { icon: <SiPostman />, name: "Postman" },
      ],
    },
  ];

  return (
    <section className="skills" id="skills">
      <h2>My Skills</h2>

      <div className="skills-container">
        {skillCategories.map((category, catIndex) => (
          <div className="skills-category-section" key={catIndex}>
            <h3 className="category-title">{category.title}</h3>
            
            <div className="skills-grid">
              {category.skills.map((skill, index) => (
                <TiltWrapper key={index} weight={15}>
                  <motion.div
                    className="skill-card"
                    whileHover={{ scale: 1.02 }} /* Tilt wrapper provides independent scale control */
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <h3>{skill.name}</h3>
                  </motion.div>
                </TiltWrapper>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}