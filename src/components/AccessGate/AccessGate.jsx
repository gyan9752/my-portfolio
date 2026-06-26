import { useState } from "react";
import "./AccessGate.css";
import { motion, AnimatePresence } from "framer-motion";

export default function AccessGate() {
  // ✅ Linter Fix: Seedha initialization ke waqt hi check karo, useEffect ki zaroorat nahi padegi
  const [userName, setUserName] = useState(() => {
    return sessionStorage.getItem("portfolio_visitor_name") || "";
  });
  
  const [showGate, setShowGate] = useState(() => {
    return !sessionStorage.getItem("portfolio_visitor_name");
  });

  const [showWelcome, setShowWelcome] = useState(false);

  const handleAccessSubmit = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    const finalName = inputName.trim();
    sessionStorage.setItem("portfolio_visitor_name", finalName);
    setUserName(finalName);
    setShowGate(false);
    setShowWelcome(true);
  };

  const [inputName, setInputName] = useState("");

  return (
    <>
      {/* PHASE 1: INITIAL ENTRY GATE (ASK NAME) */}
      <AnimatePresence>
        {showGate && (
          <motion.div 
            className="access-gate-overlay"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="gate-terminal-box">
              <div className="gate-scanner"></div>
              <h3>// SECURE PORTAL ACCESS</h3>
              <p className="gate-subtitle">Identify yourself to initialize full stack ecosystem mapping.</p>
              
              <form onSubmit={handleAccessSubmit} className="gate-form">
                <input 
                  type="text" 
                  placeholder="Enter your name..." 
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  maxLength={20}
                  autoFocus
                  className="gate-input"
                />
                <button type="submit" className="gate-submit-btn">
                  INITIALIZE REQ_
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: PERSONALIZED WELCOME MODAL */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className="welcome-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="welcome-card-box"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="welcome-glow-bar"></div>
              <h2>⚡ ACCESS GRANTED</h2>
              <p className="welcome-greet">
                Welcome, <span className="highlight-visitor">{userName}</span> to my portfolio!
              </p>
              <p className="welcome-desc">
                The full-stack MERN ecosystem, dynamic 3D physics mapping, and server-side logs are now fully operational for your session.
              </p>
              <button className="welcome-close-btn" onClick={() => setShowWelcome(false)}>
                EXPLORE ECOSYSTEM
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}