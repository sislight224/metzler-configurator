import { useStores } from './useStores';
import CalculatorStore from '../../stores/CalculatorStore';

export const useCalculatorStore = (): CalculatorStore => useStores().editorStore.calculatorStore;
