import React, { useEffect, useState, useCallback } from 'react';
import { useRecorder } from '../../hooks/hooks';
import type { DrumSound } from '../../types';
import styles from './DrumSet.module.css';

const PAD_CONFIG: Record<
  DrumSound,
  { label: string; key: string; soundFile: string; className: string }
> = {
  kick: { label: 'Bass 🪘', key: 'A', soundFile: '/sounds/kick.wav', className: styles.kick },
  snare: { label: 'Snare 🥁', key: 'S', soundFile: '/sounds/snare.wav', className: styles.snare },
  hihat: { label: 'Hi-Hat 🎶', key: 'D', soundFile: '/sounds/hihat.wav', className: styles.hihat },
};

export const DrumSet: React.FC = () => {
  const { recordHit } = useRecorder();
  const [active, setActive] = useState<Record<DrumSound, boolean>>({
    kick: false,
    snare: false,
    hihat: false,
  });

  const trigger = useCallback((sound: DrumSound) => {
    setActive((a) => ({ ...a, [sound]: true }));
    setTimeout(() => setActive((a) => ({ ...a, [sound]: false })), 180);

    if (import.meta.env.MODE !== 'test') {
      const audio = new Audio(PAD_CONFIG[sound].soundFile);
      audio.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onHit = (e: Event) => {
      const ce = e as CustomEvent<{ sound?: DrumSound }>;
      const name = ce.detail?.sound;
      if (name) trigger(name);
    };
    document.addEventListener('drum-hit', onHit);
    return () => document.removeEventListener('drum-hit', onHit);
  }, [trigger]);

  useEffect(() => {
    const keyMap: Record<string, DrumSound> = { a: 'kick', s: 'snare', d: 'hihat' };
    const onKey = (e: KeyboardEvent) => {
      const name = keyMap[e.key.toLowerCase()];
      if (!name) return;
      trigger(name);
      recordHit(name);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [recordHit, trigger]);

  return (
    <div className={styles.drumSetContainer}>
      {(Object.keys(PAD_CONFIG) as DrumSound[]).map((sound) => {
        const { label, key, className } = PAD_CONFIG[sound];
        return (
          <button
            key={sound}
            className={`${styles.pad} ${className} ${active[sound] ? styles.active : ''}`}
            onClick={() => {
              trigger(sound);
              recordHit(sound);
            }}
          >
            <div className={styles.padContent}>
              <span className={styles.padLabel}>{label}</span>
              <span className={styles.padKey}>{key}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
