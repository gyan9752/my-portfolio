import { useRef } from 'react';
import './Magnetic.css';

/** Wraps any element so it gently pulls toward the cursor. */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const box = ref.current.getBoundingClientRect();
    const x = (e.clientX - (box.left + box.width / 2)) * strength;
    const y = (e.clientY - (box.top + box.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
    ref.current.classList.add('is-active');
  };

  const onLeave = () => {
    ref.current.style.transform = '';
    ref.current.classList.remove('is-active');
  };

  return (
    <div ref={ref} className={`magnetic ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
