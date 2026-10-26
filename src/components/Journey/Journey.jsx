import { useRef } from 'react';
import { journey } from '../../data/portfolioData';
import useInView from '../../hooks/useInView';
import useScrollVar from '../../hooks/useScrollVar';
import SplitText from '../SplitText/SplitText';
import './Journey.css';

function Step({ item, index }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  return (
    <li ref={ref} className={`step ${seen ? 'is-in' : ''} ${index % 2 ? 'is-right' : ''}`}>
      <span className={`step__dot ${item.live ? 'is-live' : ''}`} />
      <div className="step__card">
        <span className="step__year">{item.year}</span>
        <h3 className="step__title">{item.title}</h3>
        <p className="step__note">{item.note}</p>
      </div>
    </li>
  );
}

export default function Journey() {
  const listRef = useRef(null);
  useScrollVar(listRef, { start: 0.75, end: 0.15 });

  return (
    <section id="journey" className="journey">
      <div className="journey__head">
        <h2 className="journey__title-row">
          <SplitText as="span" text="MY" className="journey__title" stagger={0.06} />
          <SplitText as="span" text="JOURNEY" className="journey__title journey__title--outline" delay={0.15} stagger={0.05} />
        </h2>
      </div>

      <ol ref={listRef} className="journey__list">
        <span className="journey__rail" />
        <span className="journey__fill" />
        {journey.map((item, i) => (
          <Step key={item.title} item={item} index={i} />
        ))}
      </ol>
    </section>
  );
}
