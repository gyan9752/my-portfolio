import "./profile.css";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import TiltWrapper from "../TiltWrapper/TiltWrapper"; // ✅ Implemented universal wrapper link

export default function Profile() {
  const profiles = [
    {
      icon: <FaGithub />,
      title: "GitHub",
      link: "https://github.com/gyan9752", 
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      link: "https://linkedin.com/in/gyanvendra-mishra25122002", 
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      link: "mailto:gyanvendram@gmail.com", 
    },
  ];

  return (
    <section className="profile" id="profiles">
      <h2>Coding Profiles</h2>

      <div className="profile-grid">
        {profiles.map((item, index) => (
          /* ✅ Wrapper lagaya jisse har ek identity card premium 3D tilt ho */
          <TiltWrapper key={index} weight={15}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-card"
              style={{ display: "flex" }} /* Layout consistency track check */
            >
              <div className="profile-icon">{item.icon}</div>
              <h3>{item.title}</h3>
            </a>
          </TiltWrapper>
        ))}
      </div>
    </section>
  );
}