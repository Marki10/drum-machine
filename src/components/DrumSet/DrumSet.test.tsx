import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { DrumSet } from './DrumSet';
import { RecorderProvider } from '../../context/RecorderProvider';

describe('DrumSet component', () => {
  it('renders all drum pads', () => {
    render(
      <RecorderProvider>
        <DrumSet />
      </RecorderProvider>,
    );

    expect(screen.getByText(/Bass 🪘/i)).toBeInTheDocument();
    expect(screen.getByText(/Snare 🥁/i)).toBeInTheDocument();
    expect(screen.getByText(/Hi-Hat 🎶/i)).toBeInTheDocument();
  });

  it('activates visual feedback when a pad is clicked', async () => {
    render(
      <RecorderProvider>
        <DrumSet />
      </RecorderProvider>,
    );

    const snareButton = screen.getByText(/Snare 🥁/i).closest('button');
    expect(snareButton).toBeInTheDocument();

    fireEvent.click(snareButton!);

    await waitFor(() => {
      expect(snareButton!.className).toMatch(/_pad_09af01 _snare_09af01/);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 150));
    });

    expect(snareButton!.className).not.toMatch(/active/);
  });
});
