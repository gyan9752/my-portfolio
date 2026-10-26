import { useRef } from 'react';
import useInView from '../../hooks/useInView';
import './SplitText.css';

/**
 * Reveals text letter-by-letter (or word-by-word) from behind a mask.
 * Pass `when` to control it manually, otherwise it plays when scrolled into view.
 */
export default function SplitText({ text, className = '', delay = 0, stagger = 0.04, by = 'char', when, as: Tag = 'span' }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const show = when === undefined ? seen : when;
  let counter = 0;

  return (
    <Tag ref={ref} className={`split ${show ? 'is-in' : ''} ${className}`} aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span className="split__word" key={`${word}-${w}`} aria-hidden="true">
          {(by === 'char' ? word.split('') : [word]).map((part, c) => (
            <span className="split__part" key={c} style={{ '--d': `${(delay + counter++ * stagger).toFixed(3)}s` }}>
              {part}
            </span>
          ))}
          <span className="split__space">&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}
