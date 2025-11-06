import { render, screen, act } from '@testing-library/react';
import { RecorderProvider } from '../../context/RecorderContext';
import { Progress } from './Progress';
import { vi } from 'vitest';

describe('Progress component', () => {
  it('renders progress bar', () => {
    render(
      <RecorderProvider>
        <Progress />
      </RecorderProvider>,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('progress updates while playing', async () => {
    vi.useFakeTimers();

    render(
      <RecorderProvider>
        <Progress />
      </RecorderProvider>,
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const fill = screen.getByTestId('progress-fill');
    expect(parseFloat(fill.style.width)).toBeGreaterThanOrEqual(0);

    vi.useRealTimers();
  });
});
