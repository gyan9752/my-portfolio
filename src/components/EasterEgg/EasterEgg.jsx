import { useEffect, useState, useRef } from "react";
import "./EasterEgg.css";

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const targetCode = "gyan";
  const bufferRef = useRef(""); 

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        bufferRef.current += e.key.toLowerCase();
        
        if (bufferRef.current.length > targetCode.length) {
          bufferRef.current = bufferRef.current.substring(bufferRef.current.length - targetCode.length);
        }
        
        if (bufferRef.current === targetCode) {
          setActive(true);
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