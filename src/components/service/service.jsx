import "./service.css";
import {
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaBug,
  FaMobileAlt,
  FaLink,
} from "react-icons/fa";

export default function Service() {
  const services = [
    {
      icon: <FaLaptopCode />,
      title: "Frontend Development",
    },
    {
      icon: <FaServer />,
      title: "Backend Development",
    },
    {
      icon: <FaDatabase />,
      title: "Database Design",
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Web Design",
    },
    {
      icon: <FaLink />,
      title: "API Integration",
    },
    {
      icon: <FaBug />,
      title: "Bug Fixing & Optimization",
    },
  ];

  return (
    <section className="service">
      <h2>My Services</h2>

      <div className="service-grid">
        {services.map((item, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{item.icon}</div>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
