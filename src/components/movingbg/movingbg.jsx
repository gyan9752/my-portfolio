// import { useEffect, useRef } from "react";
// import "./movingbg.css";

// export default function MovingBg() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let animationFrameId;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", resizeCanvas);
//     resizeCanvas();

//     const particles = [];
//     const particleCount = 65; // Balanced density

//     // Dynamic style configurations
//     let colors = {
//       particle: "rgba(100, 255, 218, 0.6)",
//       line: "rgba(100, 255, 218, 0.12)"
//     };

//     // Color updating function on runtime theme triggers
//     const updateThemeColors = () => {
//       const isLightMode = document.body.classList.contains("light-mode");
//       if (isLightMode) {
//         // Light mode ke liye strong dark-teal colors taaki clear dikhe
//         colors.particle = "rgba(15, 118, 110, 0.65)"; 
//         colors.line = "rgba(15, 118, 110, 0.22)"; // Higher opacity for crisp visibility
//       } else {
//         // Dark mode classic cyan glow
//         colors.particle = "rgba(100, 255, 218, 0.6)"; 
//         colors.line = "rgba(100, 255, 218, 0.12)";
//       }
//     };

//     // Run initially
//     updateThemeColors();

//     // DOM Mutation observer to catch light/dark toggle instantly
//     const observer = new MutationObserver(() => {
//       updateThemeColors();
//     });
//     observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.vx = (Math.random() - 0.5) * 0.7; // Smooth linear velocity
//         this.vy = (Math.random() - 0.5) * 0.7;
//         this.radius = Math.random() * 2.5 + 2; // Slightly bigger dots for better visibility
//       }

//       update() {
//         this.x += this.vx;
//         this.y += this.vy;

//         if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
//         if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
//       }

//       draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fillStyle = colors.particle;
//         ctx.fill();
//       }
//     }

//     for (let i = 0; i < particleCount; i++) {
//       particles.push(new Particle());
//     }

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();

//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           // Line connection threshold range
//           if (distance < 165) {
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.strokeStyle = colors.line;
//             ctx.lineWidth = 1.0; // Thicker lines for light mode balance
//             ctx.stroke();
//           }
//         }
//       }
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//       observer.disconnect();
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="moving-canvas-bg" />;
// }


import { useEffect, useRef } from "react";
import "./movingbg.css";

export default function MovingBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 65;

    // Dynamic style color configurations
    let colors = {
      particle: "rgba(100, 255, 218, 0.6)",
      line: "rgba(100, 255, 218, 0.12)"
    };

    const updateThemeColors = () => {
      if (document.body.classList.contains("theme-purple")) {
        // Space Purple Neon setup
        colors.particle = "rgba(168, 85, 247, 0.7)"; 
        colors.line = "rgba(168, 85, 247, 0.16)";
      } else if (document.body.classList.contains("theme-black")) {
        // Ghost Electric Green/Blue setup
        colors.particle = "rgba(34, 197, 94, 0.7)"; 
        colors.line = "rgba(34, 197, 94, 0.16)";
      } else {
        // Default Cyan Theme
        colors.particle = "rgba(100, 255, 218, 0.6)"; 
        colors.line = "rgba(100, 255, 218, 0.12)";
      }
    };

    updateThemeColors();

    // Catch multitheme shifts tracking structural updates
    const observer = new MutationObserver(() => {
      updateThemeColors();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2.5 + 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 165) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="moving-canvas-bg" />;
}