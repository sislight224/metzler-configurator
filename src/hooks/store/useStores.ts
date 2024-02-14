import { useContext } from 'react';
import { rootStore, RootStore } from 'stores';

export const useStores = (): RootStore => useContext(rootStore);
