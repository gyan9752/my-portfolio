import { useState, useEffect, useRef } from "react";
import "./terminal.css";
import { FaTerminal } from "react-icons/fa";

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false); // Toggle state
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome to Gyan.dev CLI [Version 1.0.0]" },
    { type: "system", text: "Type 'help' to see available commands." }
  ]);
  
  const bottomRef = useRef(null);

  // Auto scroll to bottom when new command enters
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const trimmedInput = input.trim().toLowerCase();
      if (!trimmedInput) return;

      const newHistory = [...history, { type: "user", text: `gyan@user:~$ ${input}` }];

      if (trimmedInput === "help") {
        newHistory.push({ type: "reply", text: "Available commands: about | skills | projects | contact | clear" });
      } else if (trimmedInput === "about") {
        newHistory.push({ type: "reply", text: "Gyanvendra Mishra - Full Stack Developer specializing in MERN & Backend." });
      } else if (trimmedInput === "skills") {
        newHistory.push({ type: "reply", text: "React, Node.js, Express, MongoDB, Next.js, Docker, Git" });
      } else if (trimmedInput === "projects") {
        newHistory.push({ type: "reply", text: "1. Coaching Feed App | 2. Scriza.in | 3. Job Portal Backend" });
      } else if (trimmedInput === "contact") {
        newHistory.push({ type: "reply", text: "Email: gyanvendram@gmail.com | Phone: +91 9026926216" });
      } else if (trimmedInput === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else {
        newHistory.push({ type: "error", text: `Command not found: ${input}. Type 'help' for options.` });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <>
      {/* 1. Floating Terminal Toggle Button (Hamesha visible rahega left corner me) */}
      <div className="terminal-toggle-btn" onClick={() => setIsOpen(true)}>
        <FaTerminal />
        <span className="blink-dot"></span>
      </div>

      {/* 2. Actual Terminal Overlay Modal (Sirf tabhi khulega jab isOpen true ho) */}
      {isOpen && (
        <div className="terminal-overlay" onClick={() => setIsOpen(false)}>
          {/* stopPropagation isliye taaki terminal ke andar click karne par window close na ho */}
          <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="dot close" onClick={() => setIsOpen(false)}></span>
                <span className="dot minimize" onClick={() => setIsOpen(false)}></span>
                <span className="dot maximize"></span>
              </div>
              <div className="terminal-title">bash - gyan@developer</div>
              <button className="terminal-close-x" onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="terminal-body" onClick={() => document.getElementById("terminal-input-id")?.focus()}>
              {history.map((line, index) => (
                <div key={index} className={`terminal-line ${line.type}`}>
                  {line.text}
                </div>
              ))}
              
              <div className="terminal-input-row">
                <span className="terminal-prompt">gyan@user:~$</span>
                <input
                  id="terminal-input-id"
                  type="text"
                  className="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}