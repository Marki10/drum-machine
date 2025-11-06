/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { DrumHit, RecorderContextType } from '../types';

const RecorderContext = createContext<RecorderContextType | undefined>(undefined);

export const RecorderProvider = ({ children }: { children: ReactNode }) => {
  const [recording, setRecording] = useState<DrumHit[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('drumRecording');
    if (saved) setRecording(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('drumRecording', JSON.stringify(recording));
  }, [recording]);

  const startRecording = () => {
    setRecording([]);
    setIsRecording(true);
    startTimeRef.current = Date.now();
  };

  const stopRecording = () => {
    setIsRecording(false);
    startTimeRef.current = null;
  };

  const recordHit = (sound: string) => {
    playSound(sound);
    if (isRecording && startTimeRef.current) {
      const now = Date.now();
      const time = now - startTimeRef.current;
      setRecording((prev) => [...prev, { sound, time }]);
    }
  };

  const playRecording = async () => {
    if (recording.length === 0) return;
    setIsPlaying(true);

    let prev = 0;
    for (const hit of recording) {
      const delay = hit.time - prev;
      await new Promise((resolve) => setTimeout(resolve, delay));
      playSound(hit.sound);
      prev = hit.time;
    }

    setIsPlaying(false);
  };

  const clearRecording = () => {
    setRecording([]);
    localStorage.removeItem('drumRecording');
  };

  const playSound = (sound: string) => {
    const audio = new Audio(`/sounds/${sound}.wav`);
    audio.currentTime = 0;
    audio.play();
    flashPad(sound);
  };

  const flashPad = (sound: string) => {
    document.dispatchEvent(new CustomEvent('drum-hit', { detail: { sound } }));
  };

  useEffect(() => {
    if (isPlaying) {
      const refsSnapshot = [...timeoutRefs.current];
      return () => refsSnapshot.forEach(clearTimeout);
    }
  }, [isPlaying]);

  return (
    <RecorderContext.Provider
      value={{
        recording,
        isRecording,
        isPlaying,
        recordHit,
        startRecording,
        stopRecording,
        playRecording,
        clearRecording,
      }}
    >
      {children}
    </RecorderContext.Provider>
  );
};

export const useRecorder = (): RecorderContextType => {
  const ctx = useContext(RecorderContext);
  if (!ctx) throw new Error('useRecorder must be used within RecorderProvider');
  return ctx;
};
