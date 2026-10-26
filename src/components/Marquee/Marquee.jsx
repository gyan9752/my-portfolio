import { useEffect, useRef } from 'react';
import { marqueeRows } from '../../data/portfolioData';
import './Marquee.css';

function Row({ words, reverse, outline }) {
  // Content is duplicated so the -50% translate loops seamlessly
  const loop = [...words, ...words, ...words, ...words];
  return (
    <div className={`marquee__row ${reverse ? 'is-reverse' : ''} ${outline ? 'is-outline' : ''}`}>
      <div className="marquee__track">
        {loop.map((word, i) => (
          <span className="marquee__item" key={`${word}-${i}`}>
            {word}
            <i className="marquee__star">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const ref = useRef(null);

  // Skew the bands based on scroll speed for a "rubber" feel
  useEffect(() => {
    let last = window.scrollY;
    let skew = 0;
    let frame;
    const loop = () => {
      const y = window.scrollY;
      const target = Math.max(-9, Math.min(9, (y - last) * 0.25));
      last = y;
      skew += (target - skew) * 0.12;
      if (ref.current) ref.current.style.setProperty('--skew', `${skew.toFixed(2)}deg`);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section ref={ref} className="marquee" aria-hidden="true">
      <Row words={marqueeRows[0]} />
      <Row words={marqueeRows[1]} reverse outline />
    </section>
  );
}
