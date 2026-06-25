import "./project.css";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiJsonwebtokens, SiMongoose, SiDocker } from "react-icons/si";

export default function Project() {
  const projects = [
    
    {
      title: "Scriza.in",
      desc: "A complete hostel management platform with admin and student panel, built with server-side rendering and responsive design.",
      tags: [
        { name: "Next.js", icon: <SiNextdotjs style={{ color: "#fff" }} /> },
        { name: "React", icon: <FaReact style={{ color: "#61dafb" }} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#38bdf8" }} /> }
      ],
      liveLink: "https://scriza.in", 
    },
    {
      title: "Coaching Feed App",
      desc: "A full-stack application featuring a real-time feed system for educational coaching institutes, containerized completely using Docker for seamless deployment.",
      tags: [
        { name: "React", icon: <FaReact style={{ color: "#61dafb" }} /> },
        { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
        { name: "Express.js", icon: <SiExpress style={{ color: "#fff" }} /> },
        { name: "MongoDB", icon: <SiMongodb style={{ color: "#47a248" }} /> },
        { name: "Docker", icon: <SiDocker style={{ color: "#2496ed" }} /> }
      ],
      githubLink: "https://github.com/gyan9752/coaching-feed-app", 
    },
    {
      title: "Job Portal Backend",
      desc: "Robust vehicle service, corporate job routing, and booking management system with secure authentication.",
      tags: [
        { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
        { name: "Express.js", icon: <SiExpress style={{ color: "#fff" }} /> },
        { name: "MongoDB", icon: <SiMongodb style={{ color: "#47a248" }} /> },
        { name: "JWT Auth", icon: <SiJsonwebtokens style={{ color: "#ff4154" }} /> }
      ],
      githubLink: "https://github.com/gyan9752/job-portal-backend", 
    },
    {
      title: "E-Commerce Backend",
      desc: "MERN based backend with advanced product query pipelines, authentication, and order APIs.",
      tags: [
        { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
        { name: "Express.js", icon: <SiExpress style={{ color: "#fff" }} /> },
        { name: "MongoDB", icon: <SiMongodb style={{ color: "#47a248" }} /> },
        { name: "Mongoose", icon: <SiMongoose style={{ color: "#880000" }} /> }
      ],
      githubLink: "https://github.com/gyan9752/ecom", 
    },
  ];

  return (
    <section className="projects" id="projects">
      <h2>My Projects</h2>

      {/* Class name fixed to match CSS (.projects-grid) */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            whileHover={{ scale: 1.02 }}
          >
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>

            <div className="project-footer">
              {/* Tech Stack Wrapper matched with CSS */}
              <div className="tech-stack">
                {project.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="tech-badge">
                    {tag.icon} {tag.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons Container */}
              <div className="project-links">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-btn">
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-btn live">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}