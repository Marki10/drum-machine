import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';
import { RecorderProvider, useRecorder } from '../../context/RecorderContext';
import React from 'react';

const Wrapper: React.FC<{ playing?: boolean }> = ({ playing = false }) => {
  const { startRecording, recordHit, stopRecording, playRecording } = useRecorder();

  React.useEffect(() => {
    startRecording();
    recordHit('snare');
    stopRecording();

    if (playing) playRecording();
  }, [playing]);

  return <Progress />;
};

describe('Progress component', () => {
  it('renders the progress bar', () => {
    render(
      <RecorderProvider>
        <Progress />
      </RecorderProvider>,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('resets to 0% when playback stops', () => {
    const { rerender } = render(
      <RecorderProvider>
        <Wrapper playing={true} />
      </RecorderProvider>,
    );

    const fill = screen.getByTestId('progress-fill');

    rerender(
      <RecorderProvider>
        <Wrapper playing={false} />
      </RecorderProvider>,
    );

    expect(fill.style.width).toBe('0%');
  });
});
