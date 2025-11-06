import React from 'react';
import { useRecorder } from '../../context/RecorderContext';
import styles from './Controls.module.css';

export const Controls: React.FC = () => {
  const { startRecording, stopRecording, playRecording, isRecording, isPlaying } = useRecorder();

  return (
    <div className={styles.controls}>
      <button
        onClick={startRecording}
        data-testid="record-btn"
        disabled={isRecording || isPlaying}
        className={`${styles.iconButton} ${styles.record}`}
        title="Record"
      >
        <span className={styles.iconDot}></span>
      </button>

      <button
        onClick={stopRecording}
        data-testid="stop-btn"
        disabled={!isRecording}
        className={`${styles.iconButton} ${styles.stop}`}
        title="Stop"
      >
        <span className={styles.iconSquare}></span>
      </button>

      <button
        onClick={playRecording}
        data-testid="play-btn"
        disabled={isRecording || isPlaying}
        className={`${styles.iconButton} ${styles.play}`}
        title="Play"
      >
        <span className={styles.iconTriangle}></span>
      </button>
    </div>
  );
};
