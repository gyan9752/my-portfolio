import { orbitRings } from '../../data/portfolioData';
import SplitText from '../SplitText/SplitText';
import './Stack.css';

export default function Stack() {
  return (
    <section id="stack" className="stack">
      <div className="stack__head">
        <h2 className="stack__title-row">
          <SplitText as="span" text="MY" className="stack__title" stagger={0.06} />
          <SplitText as="span" text="STACK" className="stack__title stack__title--outline" delay={0.15} stagger={0.06} />
        </h2>
      </div>

      <div className="stack__stage">
        <div className="stack__orbit">
          <div className="stack__core">
            <span>{'</>'}</span>
          </div>

          {orbitRings.map((ring, r) => (
            <div
              key={r}
              className={`orbit ${ring.reverse ? 'is-reverse' : ''}`}
              style={{ '--r': `${ring.radius}px`, '--dur': `${ring.duration}s` }}
            >
              <span className="orbit__line" />
              {ring.items.map((item, i) => (
                <span className="orbit__slot" key={item} style={{ '--a': `${(360 / ring.items.length) * i}deg` }}>
                  <span className="orbit__upright">
                    <span className="orbit__counter">
                      <span className="orbit__chip">{item}</span>
                    </span>
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
