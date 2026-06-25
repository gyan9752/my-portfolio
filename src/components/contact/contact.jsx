// import "./contact.css";
// import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

// export default function Contact() {
//   return (
//     <section className="contact" id="contact">
//       <h2>Contact Me</h2>

//       <div className="contact-container">
//         <div className="contact-card">
//           <FaEnvelope className="icon" />
//           <h3>Email</h3>
//           <p>gyanvendram@gmail.com</p>
//         </div>

//         <div className="contact-card">
//           <FaPhone className="icon" />
//           <h3>Phone</h3>
//           <p>+91 9026926216</p>
//         </div>

//         <div className="contact-card">
//           <FaMapMarkerAlt className="icon" />
//           <h3>Location</h3>
//           <p>Kushinagar,Noida</p>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import "./contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); 

  // Revealed states toggles
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);

  const handleContactClick = (e, type) => {
    e.preventDefault();
    
    // Agar pehle se hi revealed hai, toh direct action call karo (dobara captcha nahi mangega)
    if (type === "email" && isEmailRevealed) {
      window.location.href = "mailto:gyanvendram@gmail.com";
      return;
    }
    if (type === "phone" && isPhoneRevealed) {
      window.location.href = "tel:+919026926216";
      return;
    }

    setPendingAction(type); 
    setShowCaptcha(true);   
  };

  const verifyAndExecute = () => {
    const answer = captchaInput.trim().toLowerCase();
    
    if (answer === "gyan" || answer === "gyanvendra") {
      setIsError(false);
      setShowCaptcha(false);
      setCaptchaInput("");
      
      // Successfully reveal data on screen and then trigger native actions
      if (pendingAction === "email") {
        setIsEmailRevealed(true);
        window.location.href = "mailto:gyanvendram@gmail.com";
      } else if (pendingAction === "phone") {
        setIsPhoneRevealed(true);
        window.location.href = "tel:+919026926216";
      }
    } else {
      setIsError(true); 
    }
  };

  return (
    <section className="contact" id="contact">
      <h2>Contact Me</h2>

      <div className="contact-container">
        {/* Email Card */}
        <div className="contact-card" onClick={(e) => handleContactClick(e, "email")} style={{ cursor: "pointer" }}>
          <FaEnvelope className="icon" />
          <h3>Email</h3>
          {/* Conditional concealment render setup */}
          <p className={isEmailRevealed ? "revealed-text" : "masked-text"}>
            {isEmailRevealed ? "gyanvendram@gmail.com" : "gyan••••@gmail.com (Click to Unlock)"}
          </p>
        </div>

        {/* Phone Card */}
        <div className="contact-card" onClick={(e) => handleContactClick(e, "phone")} style={{ cursor: "pointer" }}>
          <FaPhone className="icon" />
          <h3>Phone</h3>
          {/* Conditional concealment render setup */}
          <p className={isPhoneRevealed ? "revealed-text" : "masked-text"}>
            {isPhoneRevealed ? "+91 9026926216" : "+91 9026••••16 (Click to Unlock)"}
          </p>
        </div>

        {/* Location Card */}
        <div className="contact-card">
          <FaMapMarkerAlt className="icon" />
          <h3>Location</h3>
          <p>Kushinagar, Noida</p>
        </div>
      </div>

      {/* ==========================================
         SECURE CONTACT AUTH CAPTCHA POPUP
         ========================================== */}
      {showCaptcha && (
        <div className="captcha-overlay" onClick={() => setShowCaptcha(false)}>
          <div className="captcha-box" onClick={(e) => e.stopPropagation()}>
            <div className="captcha-header">
              <span className="captcha-dot"></span>
              <h4>Verification Required</h4>
            </div>
            
            <div className="captcha-body">
              <p className="prompt-text">
                gyan@secure_gate:~$ Enter my first name to initialize communication protocols: Hint (GYAN)
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
                  onKeyDown={(e) => e.key === "Enter" && verifyAndExecute()}
                  autoFocus
                />
              </div>

              {isError && (
                <p className="error-msg">!! Access Denied: Verification code mismatch.</p>
              )}

              <div className="captcha-actions">
                <button className="cancel" onClick={() => setShowCaptcha(false)}>Abort</button>
                <button className="confirm" onClick={verifyAndExecute}>Connect</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}