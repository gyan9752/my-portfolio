import { useState } from "react";
//import "./Hero.css";
import "./hero.css"; 
import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import profile from "../../assets/image/photo.jpeg";
import myResume from "../../assets/resume/gyanresume.pdf"; 

export default function Hero() {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowCaptcha(true); // Captcha popup show karega
  };

  const verifyAndDownload = () => {
    const answer = captchaInput.trim().toLowerCase();
    
    // Check verification criteria
    if (answer === "sweet" || answer === "hp") {
      setIsError(false);
      setShowCaptcha(false);
      setCaptchaInput("");
      
      // Native download trigger pipeline using your local pdf asset
      const link = document.createElement("a");
      link.href = myResume;
      link.download = "Gyanvendra_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setIsError(true); // Shows error row
    }
  };

  return (
    <section className="hero" id="home">
      {/* Profile Image Wrapper */}
      <div className="hero-image">
        <img src={profile} alt="Gyanvendra Mishra Profile" />
      </div>

      {/* Hero Content Wrapper */}
      <div className="hero-content">
        <h1>
          Hi, I'm <span>Gyanvendra Mishra</span>
        </h1>

        <h2>
          <Typewriter
            words={[
              "Software Engineer",
              "Full Stack (MERN) Developer",
              "Backend & API Specialist"
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
          />
        </h2>

        <p>
          "MERN Stack Specialist with a passion for engineering high-performance APIs and interactive web solutions. Driven by curiosity, I focus on building secure, scalable, and impactful digital products that solve real-world problems."
        </p>

        {/* Action Buttons & Links */}
        <div className="hero-actions">
          <button className="btn-resume" onClick={handleDownloadClick}>
            Download Resume
          </button>
        </div>

        {/* Social Icons Section */}
        <div className="social-icons">
          <a
            href="https://github.com/gyan9752"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/gyanvendra-mishra25122002"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://instagram.com/shivats25"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* ==========================================
         INTERACTIVE CRYPTO CAPTCHA POPUP MODAL
         ========================================== */}
      {showCaptcha && (
        <div className="captcha-overlay" onClick={() => setShowCaptcha(false)}>
          <div className="captcha-box" onClick={(e) => e.stopPropagation()}>
            <div className="captcha-header">
              <span className="captcha-dot"></span>
              <h4>Security Check</h4>
            </div>
            
            <div className="captcha-body">
              <p className="prompt-text">
                gyan@auth:~$ Enter my first name to unlock the payload: Hint (HP)
              </p>
              
              <div className="captcha-input-row">
                <span className="arrow-symbol">&gt;</span>
                <input
                  type="text"
                  placeholder="Type name here..."
                  value={captchaInput}
                  onChange={(e) => {
                    setCaptchaInput(e.target.value);
                    if(isError) setIsError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && verifyAndDownload()}
                  autoFocus
                />
              </div>

              {isError && (
                <p className="error-msg">!! Access Denied: Incorrect authentication code.</p>
              )}

              <div className="captcha-actions">
                <button className="cancel" onClick={() => setShowCaptcha(false)}>Abort</button>
                <button className="confirm" onClick={verifyAndDownload}>Execute</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}