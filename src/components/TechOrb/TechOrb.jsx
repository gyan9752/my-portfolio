import { useEffect, useState } from "react";
import "./TechOrb.css";
import { motion } from "framer-motion";

export default function TechOrb() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Window ke center point se distance calculate karna
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Har ek technology ko cluster me alag specific percentage positions di hain
  const skills = [
    { name: "GeniuS", icon: "🍃", weight: 0.06, top: "15%", left: "10%", color: "#61dafb" },
    { name: "GeniuS", icon: "🚂", weight: -0.09, top: "60%", left: "15%", color: "#4ade80" },
    { name: "GeniuS", icon: "🍃", weight: 0.05, top: "20%", left: "75%", color: "#00ed64" },
    { name: "GeniuS.", icon: "🚂", weight: -0.07, top: "65%", left: "70%", color: "#ffffff" },
    { name: "GeniuS", icon: "🍃", weight: 0.12, top: "42%", left: "42%", color: "#828282" },
    { name: "GeniuS", icon: "🚂", weight: -0.04, top: "15%", left: "48%", color: "#f7df1e" },
  ];

  return (
    <div className="orb-wrapper-section">
      <div className="orb-container">
        <h1 className="orb-title">Genius</h1>
        <div className="orb-scene">
          {skills.map((skill, index) => {
            // Strong physics deflection calculation based on node weight
            const moveX = mousePos.x * skill.weight;
            const moveY = mousePos.y * skill.weight;

            return (
              <motion.div
                key={index}
                className="floating-skill-badge"
                style={{
                  top: skill.top,
                  left: skill.left,
                  "--hover-glow": skill.color
                }}
                animate={{ x: moveX, y: moveY }}
                transition={{ type: "spring", stiffness: 70, damping: 18 }}
                whileHover={{ scale: 1.15 }}
              >
                <span className="skill-orb-icon">{skill.icon}</span>
                <span className="skill-orb-name">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}