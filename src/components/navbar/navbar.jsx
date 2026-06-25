// import "./Navbar.css";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       {/* span lagaya taaki .dev part cyan ho sake */}
//       <h2 className="logo">Gyan<span>.dev</span></h2>

//       <ul>
//         <li><a href="#home">Home</a></li>
//         <li><a href="#about">About</a></li>
//         <li><a href="#projects">Projects</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//     </nav>
//   );
// }

import "./Navbar.css";
import { FaCode } from "react-icons/fa"; // Coding logo import kiya

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo Wrapper Container */}
      <div className="logo-container">
        <FaCode className="nav-logo-icon" />
        <h2 className="logo">Gyan<span>.dev</span></h2>
      </div>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}