import { createContext } from 'react';
import type { DrumSound } from '../types';

export interface Hit {
  sound: DrumSound;
  time: number;
}

export interface RecorderContextType {
  recording: Hit[];
  isRecording: boolean;
  isPlaying: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  playRecording: () => void;
  recordHit: (sound: DrumSound) => void;
}

export const RecorderContext = createContext<RecorderContextType | undefined>(undefined);
