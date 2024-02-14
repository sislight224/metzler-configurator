import { useStores } from './useStores';
import UndoRedoStore from '../../stores/UndoRedoStore';

export const useUndoRedoStore = (): UndoRedoStore => useStores().editorStore.undoRedoStore;
