import React, { useEffect, useState } from 'react';
import { useRecorder } from '../../context/RecorderContext';
import styles from './DrumSet.module.css';

export const DrumSet: React.FC = () => {
  const { recordHit } = useRecorder();
  const pads = ['kick', 'snare', 'hihat'];
  const [active, setActive] = useState<Record<string, boolean>>({});

  const drumLabels: Record<string, string> = {
    kick: 'Bass 🪘',
    snare: 'Snare 🥁',
    hihat: 'Hi-Hat 🎶',
  };

  const keyBindings: Record<string, string> = {
    kick: 'A',
    snare: 'S',
    hihat: 'D',
  };

  const trigger = (name: string) => {
    setActive((a) => ({ ...a, [name]: true }));
    setTimeout(() => setActive((a) => ({ ...a, [name]: false })), 120);

    if (import.meta.env.MODE !== 'test') {
      const audio = new Audio(`/sounds/${name}.wav`);
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    const map: Record<string, string> = { a: 'kick', s: 'snare', d: 'hihat' };
    const onKey = (e: KeyboardEvent) => {
      const name = map[e.key.toLowerCase()];
      if (!name) return;
      trigger(name);
      recordHit(name);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [recordHit]);

  return (
    <div className={styles.drumSet}>
      {pads.map((name) => (
        <button
          key={name}
          data-testid={`pad-${name}`}
          className={`${styles.pad} ${styles[name]} ${active[name] ? styles.active : ''}`}
          onClick={() => {
            trigger(name);
            recordHit(name);
          }}
          aria-pressed={!!active[name]}
        >
          <div className={styles.padContent}>
            <span className={styles.padLabel}>{drumLabels[name]}</span>
            <span className={styles.padKey}>{keyBindings[name]}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
