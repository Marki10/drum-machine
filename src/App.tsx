import React from 'react';

import { Controls } from './components/Controls/Controls';
import { DrumSet } from './components/DrumSet/DrumSet';
import { Progress } from './components/Progress/Progress';
import { RecorderProvider } from './context/RecorderProvider';

import styles from './App.module.css';

const App: React.FC = () => (
  <RecorderProvider>
    <main className={styles.appContainer} data-testid="app-root">
      <h1 className={styles.title}>🥁 Drum Machine</h1>

      <DrumSet />
      <Controls />
      <Progress />
    </main>
  </RecorderProvider>
);

export default App;
