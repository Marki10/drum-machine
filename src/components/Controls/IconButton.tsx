import React from 'react';

import styles from './IconButton.module.css';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconType: 'dot' | 'square' | 'triangle';
  variant?: 'record' | 'stop' | 'play';
  testId?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconType,
  variant,
  testId,
  title,
  ...props
}) => {
  const iconMap = {
    dot: <span className={styles.iconDot} />,
    square: <span className={styles.iconSquare} />,
    triangle: <span className={styles.iconTriangle} />,
  };

  return (
    <button
      {...props}
      data-testid={testId}
      title={title}
      className={`${styles.iconButton} ${variant ? styles[variant] : ''}`}
    >
      {iconMap[iconType]}
    </button>
  );
};
