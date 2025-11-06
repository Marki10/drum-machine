import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RecorderContext } from './RecorderContext';
import type { DrumSound, DrumHit } from '../types';

export const RecorderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recording, setRecording] = useState<DrumHit[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('drumRecording');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setRecording(parsed as DrumHit[]);
      } catch {
        console.warn('Invalid saved recording data');
      }
    }
  }, []);

  useEffect(() => {
    if (!isRecording && recording.length > 0) {
      localStorage.setItem('drumRecording', JSON.stringify(recording));
    }
  }, [recording, isRecording]);

  const startRecording = useCallback(() => {
    setRecording([]);
    startTime.current = Date.now();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    startTime.current = null;
  }, []);

  const recordHit = useCallback(
    (sound: DrumSound) => {
      if (!isRecording || !startTime.current) return;
      const time = Date.now() - startTime.current;
      setRecording((prev) => [...prev, { sound, time }]);
    },
    [isRecording],
  );

  const clearRecording = useCallback(() => {
    setRecording([]);
    localStorage.removeItem('drumRecording');
  }, []);

  const playRecording = useCallback(async () => {
    if (recording.length === 0) return;
    setIsPlaying(true);
    let prev = 0;

    for (const hit of recording) {
      const delay = hit.time - prev;
      await new Promise((resolve) => setTimeout(resolve, delay));
      document.dispatchEvent(new CustomEvent('drum-hit', { detail: { sound: hit.sound } }));
      prev = hit.time;
    }

    setIsPlaying(false);
  }, [recording]);

  return (
    <RecorderContext.Provider
      value={{
        recording,
        isRecording,
        isPlaying,
        startRecording,
        stopRecording,
        playRecording,
        recordHit,
        clearRecording,
      }}
    >
      {children}
    </RecorderContext.Provider>
  );
};
