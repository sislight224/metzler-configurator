import SummaryStore from '../store/SummaryStore';
import { createContext } from 'react';

export type SummaryContextType = {
  store: SummaryStore;
};

export const SummaryContext = createContext<SummaryContextType | undefined>(undefined);
