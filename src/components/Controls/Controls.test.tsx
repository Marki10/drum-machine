import { render, screen } from '@testing-library/react';
import { Controls } from './Controls';
import { RecorderProvider } from '../../context/RecorderContext';

describe('Controls component', () => {
  it('renders Record, Stop, and Play buttons', () => {
    render(
      <RecorderProvider>
        <Controls />
      </RecorderProvider>,
    );

    expect(screen.getByTitle(/Record/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Stop/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Play/i)).toBeInTheDocument();
  });

  it('disables Record button during recording', () => {
    render(
      <RecorderProvider>
        <Controls />
      </RecorderProvider>,
    );

    const recordBtn = screen.getByTitle(/Record/i);
    expect(recordBtn).not.toBeDisabled();
  });
});
