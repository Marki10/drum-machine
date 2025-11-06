import React, { useEffect } from 'react';
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

  const trigger = (sound: DrumSound) => {
    if (import.meta.env.MODE !== 'test') {
      const audio = new Audio(PAD_CONFIG[sound].soundFile);
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    const onHit = (e: Event) => {
      const name = (e as CustomEvent).detail?.sound;
      if (!name) return;
      trigger(name);
    };

    document.addEventListener('drum-hit', onHit as EventListener);
    return () => document.removeEventListener('drum-hit', onHit as EventListener);
  }, []);

  return (
    <div className={styles.drumSetContainer}>
      {(Object.keys(PAD_CONFIG) as DrumSound[]).map((sound) => {
        const { label, key, className } = PAD_CONFIG[sound];
        return (
          <button
            key={sound}
            data-testid={`pad-${sound}`}
            className={`${styles.pad} ${className}`}
            onClick={() => {
              trigger(sound);
              recordHit(sound);
            }}
            aria-label={label}
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
