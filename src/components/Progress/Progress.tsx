import React, { useEffect, useState } from 'react';
import { useRecorder } from '../../context/RecorderContext';
import styles from './Progress.module.css';

export const Progress: React.FC = () => {
  const { recording, isPlaying } = useRecorder();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const total = recording.at(-1)?.time || 0;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / total) * 100, 100));
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, recording]);

  return (
    <div className={styles.progressBar} role="progressbar" data-testid="progress-bar">
      <div
        className={styles.progressFill}
        data-testid="progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
