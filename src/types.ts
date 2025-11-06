export type DrumHit = {
  sound: string;
  time: number;
};

export type RecorderContextType = {
  recording: DrumHit[];
  isRecording: boolean;
  isPlaying: boolean;
  recordHit: (sound: string) => void;
  startRecording: () => void;
  stopRecording: () => void;
  playRecording: () => void;
  clearRecording: () => void;
};
