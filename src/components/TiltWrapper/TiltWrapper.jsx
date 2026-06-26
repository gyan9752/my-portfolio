import { useEffect, useState, useRef } from "react";

export default function TiltWrapper({ children, weight = 15 }) {
  const [transformStyle, setTransformStyle] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = -(y / (rect.height / 2)) * weight;
      const rotateY = (x / (rect.width / 2)) * weight;

      setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
      setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [weight]);

  return (
    <div 
      ref={cardRef} 
      style={{ 
        transform: transformStyle,
        transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "transform",
        display: "block", /* Grid dimensions layout auto fit match */
        width: "100%",
        height: "100%"
      }}
    >
      {children}
    </div>
  );
}