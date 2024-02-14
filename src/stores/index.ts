import { createContext } from 'react';
import EditorStore from './EditorStore';

export interface RootStore {
  editorStore: EditorStore;
}

export const rootStore = createContext<RootStore>({
  editorStore: new EditorStore(),
});
