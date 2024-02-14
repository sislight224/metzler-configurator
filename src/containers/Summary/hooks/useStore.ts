import { useContext } from 'react';
import SummaryStore from '../store/SummaryStore';
import { SummaryContext } from '../context/SummaryContext';

export const useStore = (): SummaryStore => {
  const rootContext = useContext(SummaryContext);
  if (!rootContext) {
    throw new Error('No SummaryContext provider found');
  }
  return rootContext.store;
};
