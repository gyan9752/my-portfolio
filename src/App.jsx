// import Navbar from "./components/Navbar/Navbar";
// import Hero from "./components/Hero/Hero";
// import About from "./components/About/About";
// import Skills from "./components/skills/skill.jsx";
// import Project from "./components/project/project.jsx";
// import Timeline from "./components/timeline/timeline.jsx";
// import Contact from "./components/contact/contact.jsx";
// import Footer from "./components/footer/footer.jsx";
// import Theme from "./components/themeToggle/theme.jsx";
// import ScrollTop from "./components/scrollTop/scrollTop.jsx";
// import Certificate from "./components/certifications/certificate.jsx";  
// // import Gallery from "./components/gallary/gallary.jsx";
// import Stats from "./components/stats/stats.jsx";
// import Service from "./components/service/service.jsx";
// import Profile from "./components/profile/profile.jsx";
// import Testimonial from "./components/testimonial/testimonial.jsx";
// import Faq from "./components/faq/faq.jsx";
// import Terminal from "./components/terminal/terminal.jsx"; 
// import MovingBg from "./components/movingbg/movingbg.jsx";
// function App() {
//   return (
//     <>
//       {/* 2. Interactive Wave Background Layer (Sabse piche chalega) */}
//       <MovingBg />

//       {/* Navigation & Core Hero */}
//       <Navbar />
//       <Hero />
//       <Terminal /> 
//       <Theme />
//       <ScrollTop />

//       {/* --- SECTION 1: TECHNICAL & PROFESSIONAL FIELD (Top Priority) --- */}
//       <About />
//       <Skills />
//       <Project />
//       <Service />      
//       <Stats />       
//       <Profile />      
//       <Timeline />     
//       <Testimonial />  
      
//       {/* --- SECTION 2: PERSONAL & ADDITIONAL FIELD (Bottom Layer) --- */}
//       <Certificate />   
//       {/* <Gallery />   */}
//       <Faq />          
//       <Contact />
//       <Footer />
//     </>
//   );
// }

// export default App;


import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
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
import MovingBg from "./components/movingbg/movingbg"; 

function App() {
  return (
    <>
      {/* Interactive Wave Background Layer */}
      <MovingBg />

      {/* Navigation & Core Hero */}
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
      <Footer />
    </>
  );
}

export default App;