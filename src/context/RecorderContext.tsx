import { createContext } from 'react';
import type { RecorderContextType } from '../types';

export const RecorderContext = createContext<RecorderContextType | undefined>(undefined);
