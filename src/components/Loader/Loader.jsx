import { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  // Fake-but-smooth progress counter
  useEffect(() => {
    let value = 0;
    const timer = setInterval(() => {
      value = Math.min(100, value + Math.ceil(Math.random() * 7));
      setCount(value);
      if (value >= 100) {
        clearInterval(timer);
        setTimeout(() => setLeaving(true), 350);
      }
    }, 55);
    return () => clearInterval(timer);
  }, []);

  // Curtains lift, then hand control to the page
  useEffect(() => {
    if (!leaving) return undefined;
    const early = setTimeout(onDone, 650);
    const late = setTimeout(() => setGone(true), 1300);
    return () => {
      clearTimeout(early);
      clearTimeout(late);
    };
  }, [leaving, onDone]);

  if (gone) return null;

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`}>
      <div className="loader__curtain loader__curtain--back" />
      <div className="loader__curtain">
        <div className="loader__content">
          <div className="loader__mark">
            <span>G</span>
            <span>M</span>
          </div>
          <div className="loader__count">{String(count).padStart(3, '0')}</div>
          <div className="loader__bar">
            <div className="loader__fill" style={{ transform: `scaleX(${count / 100})` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
