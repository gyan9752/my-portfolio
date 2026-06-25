import "./profile.css";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

export default function Profile() {
  const profiles = [
    {
      icon: <FaGithub />,
      title: "GitHub",
      link: "https://github.com/gyan9752", // Updated with your username
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      link: "https://linkedin.com/in/gyanvendra-mishra25122002", // Updated with your link
    },
    // {
    //   icon: <SiLeetcode />,
    //   title: "LeetCode",
    //   link: "https://leetcode.com/u/gyan9752/", // standard format mapped with your tag
    // },
    // {
    //   icon: <SiHackerrank />,
    //   title: "HackerRank",
    //   link: "https://www.hackerrank.com/profile/gyan9752", // configured standard profile URL
    // },
    {
      icon: <FaEnvelope />,
      title: "Email",
      link: "mailto:gyanvendram@gmail.com", // Integrated your email directly
    },
  ];

  return (
    <section className="profile" id="profiles">
      <h2>Coding Profiles</h2>

      <div className="profile-grid">
        {profiles.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-card"
          >
            <div className="profile-icon">{item.icon}</div>
            <h3>{item.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}