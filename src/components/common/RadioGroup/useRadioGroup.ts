import { RadioGroupContext, RadioGroupContextValue } from './RadioGroupContext';
import { useContext } from 'react';

export default function useRadioGroup(): RadioGroupContextValue | undefined {
  return useContext(RadioGroupContext);
}
