import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBg = () => {
  const [init, setInit] = useState(false);

  // Particles engine ko initialize karne ke liye
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10" // Yeh background ko piche bhej dega
      options={{
        background: {
          color: {
            value: "#0a0505", // Dark/Blackish background
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Mouse le jaane par lines judengi
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: {
            value: "#ff5722", // Dots ka color (Orange)
          },
          links: {
            color: "#b03a2e", // Lines ka color (Reddish-Brown)
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1.5, // Particles ki speed
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 100, // Screen par kitne dots dikhenge
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBg;