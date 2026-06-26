import { useState, useEffect } from "react";
import "./WelcomeModal.css";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check karega ki kya user pehle aa chuka hai
    const hasVisited = localStorage.getItem("portfolio_visited");
    if (!hasVisited) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("portfolio_visited", "true"); // LocalStorage me entry lock
    setIsOpen(false);
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
              <h2>🚀 Welcome to Gyan.dev</h2>
              <p>
                Hello! I'm <span className="highlight">Gyanvendra Mishra</span>, a Full Stack Developer specializing in building high-performance MERN APIs and scalable architecture.
              </p>
              <p className="sub-text">
                Explore my technical projects, core coding statistics, and developer services.
              </p>
              
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