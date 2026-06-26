import { useEffect, useState } from "react";
import "./EasterEgg.css";

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const targetCode = "gyan"; // 🔑 Ye hai aapka secret cheat code
  let inputBuffer = "";

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Sirf alphabet keys ko buffer me add karega
      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        inputBuffer += e.key.toLowerCase();
        // Buffer ko target code ki length tak limit rakhega
        if (inputBuffer.length > targetCode.length) {
          inputBuffer = inputBuffer.substring(inputBuffer.length - targetCode.length);
        }
        
        // Code match hone par easter egg trigger!
        if (inputBuffer === targetCode) {
          setActive(true);
          // 5 seconds baad automatic normal mode me wapas
          setTimeout(() => setActive(false), 5000);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!active) return null;

  return (
    <div className="easter-egg-overlay">
      <div className="matrix-rain">
        <h1>[ MATRIX TERMINAL ACTIVATED ]</h1>
        <p>OVERRIDE BY GYANVENDRA MISHRA...</p>
        <div className="glitch-text">ACCESS GRANTED 🚀</div>
      </div>
    </div>
  );
}