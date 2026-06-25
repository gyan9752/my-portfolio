// import "./timeline.css";

// export default function Timeline() {
//   const timeline = [
//     {
//       year: "2018",
//       title: "High School",
//       desc: "Completed school education and developed interest in technology."
//     },
//     {
//       year: "2021",
//       title: "Polytechnic (Diploma)",
//       desc: "Started learning web development and programming."
//     },
//     {
//       year: "2025",
//       title: "B.Tech in CSE",
//       desc: "Worked on real-world projects and gained practical experience."
//     },
//     {
//       year: "2025",
//       title: "Software Engineer",
//       desc: "Working on modern web applications and learning new technologies."
//     }
//   ];

//   return (
//     <section className="timeline">
//       <h2>My Journey</h2>

//       <div className="timeline-container">
//         {timeline.map((item, index) => (
//           <div className="timeline-card" key={index}>
//             <div className="year">{item.year}</div>

//             <div className="content">
//               <h3>{item.title}</h3>
//               <p>{item.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import "./timeline.css";
import { motion } from "framer-motion";

export default function Timeline() {
  const timeline = [
    {
      year: "2018",
      title: "High School",
      desc: "Completed school education and developed interest in technology."
    },
    {
      year: "2021",
      title: "Polytechnic (Diploma)",
      desc: "Started learning web development and programming."
    },
    {
      year: "2025",
      title: "B.Tech in CSE",
      desc: "Worked on real-world projects and gained practical experience."
    },
    {
      year: "2025",
      title: "Software Engineer",
      desc: "Working on modern web applications and learning new technologies."
    }
  ];

  return (
    <section className="timeline" id="journey">
      <h2>My Journey</h2>

      <div className="timeline-container">
        {timeline.map((item, index) => (
          <motion.div 
            className="timeline-card" 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Timeline Dot Indicator */}
            <div className="timeline-dot"></div>

            <div className="year">{item.year}</div>

            <div className="content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}