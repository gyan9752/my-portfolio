import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

const INTERACTIVE = 'a, button, input, textarea, [data-cursor]';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame;

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    };
    const over = (e) => {
      const el = e.target.closest?.(INTERACTIVE);
      setHover(Boolean(el));
      setLabel(el?.dataset?.cursor || '');
    };
    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.16;
      pos.y += (mouse.y - pos.y) * 0.16;
      ring.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} className="cursor__dot" />
      <div ref={ring} className="cursor__ring-pos">
        <div className={`cursor__ring ${hover ? 'is-hover' : ''} ${label ? 'has-label' : ''}`}>
          <span>{label}</span>
        </div>
      </div>
    </>
  );
}
