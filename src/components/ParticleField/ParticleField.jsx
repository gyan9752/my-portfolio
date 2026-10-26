import { useEffect, useRef } from 'react';
import './ParticleField.css';

/** Interactive constellation: drifting dots that link up and flee from the cursor. */
export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dots = [];
    let frame;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 14000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          d.x += (dx / dist) * 1.6;
          d.y += (dy / dist) * 1.6;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,255,61,0.8)';
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(124,92,255,${(1 - dist / 120) * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const onMove = (e) => {
      const box = canvas.getBoundingClientRect();
      mouse.x = e.clientX - box.left;
      mouse.y = e.clientY - box.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    resize();
    if (reduce) {
      draw();
      cancelAnimationFrame(frame);
    } else {
      frame = requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles" />;
}
