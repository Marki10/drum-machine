import React from 'react';

import { useRecorder } from '../../hooks/hooks';
import { IconButton } from './IconButton';

import styles from './Controls.module.css';

export const Controls: React.FC = () => {
  const { startRecording, stopRecording, playRecording, isRecording, isPlaying } = useRecorder();

  const buttons = [
    {
      id: 'record',
      onClick: startRecording,
      disabled: isRecording || isPlaying,
      iconType: 'dot' as const,
      variant: 'record' as const,
      testId: 'record-btn',
      title: 'Record',
    },
    {
      id: 'stop',
      onClick: stopRecording,
      disabled: !isRecording,
      iconType: 'square' as const,
      variant: 'stop' as const,
      testId: 'stop-btn',
      title: 'Stop',
    },
    {
      id: 'play',
      onClick: playRecording,
      disabled: isRecording || isPlaying,
      iconType: 'triangle' as const,
      variant: 'play' as const,
      testId: 'play-btn',
      title: 'Play',
    },
  ];

  return (
    <div className={styles.controls}>
      {buttons.map(({ id, onClick, disabled, iconType, variant, testId, title }) => (
        <IconButton
          key={id}
          onClick={onClick}
          disabled={disabled}
          iconType={iconType}
          variant={variant}
          testId={testId}
          title={title}
        />
      ))}
    </div>
  );
};
