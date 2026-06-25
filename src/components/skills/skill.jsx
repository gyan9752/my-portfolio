// import "./skill.css";
// import { motion } from "framer-motion";
// import {
//   FaReact,
//   FaNodeJs,
//   FaGitAlt,
//   FaHtml5,
//   FaCss3Alt,
// } from "react-icons/fa";
// import { SiJavascript, SiMongodb } from "react-icons/si";

// export default function Skills() {
//   const skills = [
//     { icon: <FaReact />, name: "React" },
//     { icon: <FaNodeJs />, name: "Node.js" },
//     { icon: <SiMongodb />, name: "MongoDB" },
//     { icon: <SiJavascript />, name: "JavaScript" },
//     { icon: <FaGitAlt />, name: "Git" },
//     { icon: <FaHtml5 />, name: "HTML" },
//     { icon: <FaCss3Alt />, name: "CSS" },
//   ];

//   return (
//     <section className="skills">
//       <h2>My Skills</h2>

//       <div className="skills-grid">
//         {skills.map((skill, index) => (
//           <motion.div
//             className="skill-card"
//             key={index}
//             whileHover={{ scale: 1.08 }}
//           >
//             <div className="skill-icon">{skill.icon}</div>
//             <h3>{skill.name}</h3>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

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

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { icon: <FaReact />, name: "React" },
        { icon: <SiNextdotjs />, name: "Next.js" }, // Added Next.js
        { icon: <SiTailwindcss />, name: "Tailwind CSS" }, // Added Tailwind
        { icon: <SiJavascript />, name: "JavaScript" },
        { icon: <SiTypescript />, name: "TypeScript" }, // Added TypeScript (highly demanded)
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
        { icon: <SiMongoose />, name: "Mongoose" }, // Added Mongoose ODM
        { icon: <TbApi />, name: "REST APIs" },
        { icon: <SiJsonwebtokens />, name: "JWT Auth" }, // Added Authentication focus
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
                <motion.div
                  className="skill-card"
                  key={index}
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}