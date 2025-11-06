import { render, screen, fireEvent } from '@testing-library/react';
import { DrumSet } from './DrumSet';
import { RecorderProvider } from '../../context/RecorderContext';

describe('DrumSet component', () => {
  it('renders all drum pads', () => {
    render(
      <RecorderProvider>
        <DrumSet />
      </RecorderProvider>,
    );

    expect(screen.getByRole('button', { name: /Bass/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Snare/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Hi-Hat/i })).toBeInTheDocument();
  });

  it('activates visual feedback when a pad is clicked', () => {
    render(
      <RecorderProvider>
        <DrumSet />
      </RecorderProvider>,
    );

    const snareButton = screen.getByRole('button', { name: /Snare/i });
    fireEvent.click(snareButton);

    expect(snareButton.className).toContain('active');
  });
});
