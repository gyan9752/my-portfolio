import { useState, useEffect } from "react"; 
import Navbar from "./components/navbar/navbar.jsx";
import Hero from "./components/hero-main/herosection.jsx";
import About from "./components/about/about.jsx";
import Skills from "./components/skills/skill.jsx";
import Project from "./components/project/project.jsx";
import Timeline from "./components/timeline/timeline.jsx";
import Contact from "./components/contact/contact.jsx";
import Footer from "./components/footer/footer.jsx";
import Theme from "./components/themeToggle/theme.jsx";
import ScrollTop from "./components/scrollTop/scrollTop.jsx";
import Certificate from "./components/certifications/certificate.jsx";  
import Stats from "./components/stats/stats.jsx";
import Service from "./components/service/service.jsx";
import Profile from "./components/profile/profile.jsx";
import Testimonial from "./components/testimonial/testimonial.jsx";
import Faq from "./components/faq/faq.jsx";
import Terminal from "./components/terminal/terminal.jsx"; 
import MovingBg from "./components/movingbg/movingbg.jsx"; 
//import CustomCursor from "./components/CustomCursor/CustomCursor.jsx";
import WelcomeModal from "./components/WelcomeModal/WelcomeModal.jsx";
import EasterEgg from "./components/EasterEgg/EasterEgg.jsx";
import AccessGate from "./components/AccessGate/AccessGate.jsx";
import TechOrb from "./components/TechOrb/TechOrb.jsx";

function App() {
  const [hackerMode, setHackerMode] = useState(false);

  useEffect(() => {
    // Body tag par class dynamic control trigger
    if (hackerMode) {
      document.body.classList.add("hacker-matrix-mode");
    } else {
      document.body.classList.remove("hacker-matrix-mode");
    }
  }, [hackerMode]);

  return (
    <div className={`portfolio-app-root ${hackerMode ? "matrix-cyber-active" : ""}`}>
      
      {/* 🕶️ Master Hacker Switch Button Fixed */}
      <button 
        className={`hacker-toggle-floating-btn ${hackerMode ? "active-neon" : ""}`}
        onClick={() => setHackerMode(!hackerMode)}
        title="Toggle Recruiter/Hacker Mode"
      >
        {hackerMode ? "🌐 NORMAL" : "Mode On"}
      </button>

      {/* Interactive Wave Background Layer */}
      <MovingBg />

      {/* Navigation & Core Hero */}
      {/* <CustomCursor /> */}
      <AccessGate />
      <WelcomeModal /> 
      <EasterEgg />
      <Navbar />
      <Hero />
      <Terminal /> 
      <Theme />
      <ScrollTop />

      {/* --- SECTION 1: TECHNICAL & PROFESSIONAL FIELD --- */}
      <About />
      <Skills />
      <Project />
      <Service />      
      <Stats />       
      <Profile />      
      <Timeline />     
      <Testimonial />  
      
      {/* --- SECTION 2: PERSONAL & ADDITIONAL FIELD --- */}
      <Certificate />   
      <Faq />          
      <Contact />
            <TechOrb />
      <Footer />

    </div>
  );
}

export default App;