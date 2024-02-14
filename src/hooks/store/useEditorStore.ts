import EditorStore from 'stores/EditorStore';
import { useStores } from './useStores';

export const useEditorStore = (): EditorStore => useStores().editorStore;
