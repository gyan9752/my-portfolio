import { useState } from "react";
import "./WelcomeModal.css";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(() => !sessionStorage.getItem("portfolio_session_visited"));

  const handleClose = () => {
    sessionStorage.setItem("portfolio_session_visited", "true");
    setIsOpen(false);
  };

  // 📱 Mobile Logic: Track custom triple taps on the hint word
  const handleMobileTap = (e) => {
    // Agar mobile user string par fast tap karta hai
    if (e.detail === 3) {
      // Direct window event dispatch karenge jo EasterEgg.jsx listen kar lega
      const event = new KeyboardEvent("keydown", { key: "g" });
      const event2 = new KeyboardEvent("keydown", { key: "y" });
      const event3 = new KeyboardEvent("keydown", { key: "a" });
      const event4 = new KeyboardEvent("keydown", { key: "n" });
      
      window.dispatchEvent(event);
      window.dispatchEvent(event2);
      window.dispatchEvent(event3);
      window.dispatchEvent(event4);
      
      handleClose(); // Override chalne par popup close ho jaye
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            className="welcome-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-title">system_greeting.sh</span>
            </div>

            <div className="welcome-content">
              <h2>🚀 Welcome to Genius CLI</h2>
              <p>
                Hello! I'm <span className="highlight">Gyanvendra Mishra</span>, a Full Stack Developer specializing in building high-performance MERN APIs and scalable architecture.
              </p>
              
              {/* 💡 Responsive Text: Added tap support for mobile devices */}
              <div className="terminal-hint-box">
                <code>
                  <span className="terminal-arrow">➜</span> [HINT]: Type <span className="hint-code" onClick={handleMobileTap}>gyan</span> anywhere on keyboard (or <span className="mobile-only-text">Triple Tap</span> it on mobile) to trigger matrix override.
                </code>
              </div>
              
              <button className="welcome-btn" onClick={handleClose}>
                Initialize Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}