export type DrumHit = {
  sound: DrumSound;
  time: number;
};

export type RecorderContextType = {
  recording: DrumHit[];
  isRecording: boolean;
  isPlaying: boolean;
  recordHit: (sound: DrumSound) => void;
  startRecording: () => void;
  stopRecording: () => void;
  playRecording: () => void;
  clearRecording: () => void;
};

export type DrumSound = 'kick' | 'snare' | 'hihat';
