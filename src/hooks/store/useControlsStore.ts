import { useStores } from './useStores';
import ControlsStore from '../../stores/ControlsStore';

export const useControlsStore = (): ControlsStore => useStores().editorStore.controlsStore;
