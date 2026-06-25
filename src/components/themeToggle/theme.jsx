// import "./theme.css";
// import { FaMoon } from "react-icons/fa";

// export default function Theme() {
//   const changeTheme = () => {
//     document.body.classList.toggle("light-mode");
//   };

//   return (
//     <div className="theme-toggle" onClick={changeTheme} title="Toggle Theme">
//       <FaMoon />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./theme.css";
import { FaPalette } from "react-icons/fa";

export default function Theme() {
  const themes = ["theme-cyan", "theme-purple", "theme-black"];
  const [currentTheme, setCurrentTheme] = useState("theme-cyan");

  // Initial set up safely
  useEffect(() => {
    // Purani saari mode classes clear karo pehle
    document.body.classList.remove("light-mode", "theme-purple", "theme-black");
    document.body.classList.add("theme-cyan");
  }, []);

  const changeTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    // DIRECT DOM MANIPULATION (Yeh instantly trigger karega bina state delay ke)
    document.body.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        document.body.classList.remove(className);
      }
    });

    document.body.classList.add(nextTheme);
    setCurrentTheme(nextTheme); // Update state for next rotation
  };

  return (
    <div className="theme-toggle" onClick={changeTheme} title="Switch Theme Mode">
      <FaPalette />
    </div>
  );
}