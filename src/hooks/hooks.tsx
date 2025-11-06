import { useContext } from 'react';
import { RecorderContext } from '../context/RecorderContext';

export const useRecorder = () => {
  const ctx = useContext(RecorderContext);
  if (!ctx) {
    throw new Error('useRecorder must be used within a RecorderProvider');
  }
  return ctx;
};
