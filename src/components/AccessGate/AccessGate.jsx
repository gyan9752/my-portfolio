import React, { useState, useEffect, useRef } from "react";
import "./AccessGate.css";
import { motion, AnimatePresence } from "framer-motion";

export default function AccessGate() {
  const [stage, setStage] = useState(() => {
    return sessionStorage.getItem("portfolio_session_unlocked") ? null : "gate";
  }); // stages: gate -> granted -> welcome -> null
  const [input, setInput] = useState("");
  const canvasRef = useRef(null);

  // 📱 Mobile Logic: Triple tap on the word 'gyan' in the hint
  const handleMobileTripleTap = (e) => {
    if (e.detail === 3) {
      setStage("granted");
    }
  };

  // 🛠️ Matrix Rain Animation Effect
  useEffect(() => {
    if (stage === "granted") {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const letters = "GYANVENDRAMISHRA0123456789";
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const drops = Array.from({ length: columns }).fill(1);

      const draw = () => {
        ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#4ade80";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      };

      const interval = setInterval(draw, 33);
      // 3 seconds baad Success screen se Welcome screen par jayega
      const timer = setTimeout(() => setStage("welcome"), 3000); 
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [stage]);

  const handleInput = (e) => {
    const val = e.target.value.toLowerCase();
    setInput(val);
    if (val === "gyan") {
      setStage("granted");
    }
  };

  const finalizeAccess = () => {
    sessionStorage.setItem("portfolio_session_unlocked", "true");
    setStage(null);
  };

  if (!stage) return null;

  return (
    <div className="access-overlay">
      <AnimatePresence>
        {/* --- STAGE 1: THE GATE --- */}
        {stage === "gate" && (
          <motion.div 
            className="gate-card" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="terminal-header">
                <div className="dots"><span className="r"></span><span className="y"></span><span className="g"></span></div>
                <span className="title">security_login.sh</span>
            </div>
            <div className="gate-content">
              <h2>🔒 SYSTEM LOCKED</h2>
              <p>Type the access key to initialize portfolio_session.</p>
              <input 
                autoFocus 
                type="text" 
                placeholder="Access Key..." 
                value={input} 
                onChange={handleInput}
                className="access-input"
              />
              <div className="hint">
                ➜ [HINT]: Type <span className="hint-code" onClick={handleMobileTripleTap}>gyan</span> anywhere (or Triple Tap it on mobile).
              </div>
            </div>
          </motion.div>
        )}

        {/* --- STAGE 2: ACCESS GRANTED (MATRIX) --- */}
        {stage === "granted" && (
          <motion.div className="success-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <canvas ref={canvasRef} className="matrix-canvas" />
            <div className="success-banner">
                <h1 className="glitch-text">ACCESS GRANTED</h1>
                <p>Establishing secure connection...</p>
            </div>
          </motion.div>
        )}

        {/* --- STAGE 3: WELCOME MODAL --- */}
        {stage === "welcome" && (
          <motion.div 
            className="welcome-card" 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
          >
             <div className="terminal-header">
                <div className="dots"><span className="r"></span><span className="y"></span><span className="g"></span></div>
                <span className="title">welcome_intro.js</span>
            </div>
            <div className="welcome-content">
              <h2>🚀 Welcome to Gyan.dev</h2>
              <p>Hello! I'm <span className="green">Gyanvendra Mishra</span>, a Full Stack Developer specialized in MERN APIs.</p>
              <p className="sub-text">System is now operational and ready for exploration.</p>
              <button className="init-btn" onClick={finalizeAccess}>Initialize Portfolio</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}