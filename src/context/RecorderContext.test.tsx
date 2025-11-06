import { renderHook, act, waitFor } from '@testing-library/react';
import { RecorderProvider, useRecorder } from './RecorderContext';

describe('RecorderContext', () => {
  it('records drum hits correctly', async () => {
    const { result } = renderHook(() => useRecorder(), { wrapper: RecorderProvider });

    act(() => {
      result.current.startRecording();
    });

    await waitFor(() => {
      expect(result.current.isRecording).toBe(true);
    });

    act(() => {
      result.current.recordHit('snare');
    });

    await waitFor(() => {
      expect(result.current.recording.length).toBeGreaterThan(0);
    });

    expect(result.current.recording[0].sound).toBe('snare');
  });
});
