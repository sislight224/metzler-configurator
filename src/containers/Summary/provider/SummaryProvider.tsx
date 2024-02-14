import { SummaryContext } from '../context/SummaryContext';
import { useEditorStore } from 'hooks/store/useEditorStore';
import { FC, ReactNode, useMemo } from 'react';
import SummaryStore from '../store/SummaryStore';

export interface SummaryProviderProps {
  children?: ReactNode;
}

const SummaryProvider: FC<SummaryProviderProps> = (props) => {
  const { children } = props;
  const { panelsStore } = useEditorStore();

  const store = useMemo(() => new SummaryStore(panelsStore), []);

  return (
    <SummaryContext.Provider value={{ store }}>
      {children}
    </SummaryContext.Provider>
  );
};

export default SummaryProvider;
