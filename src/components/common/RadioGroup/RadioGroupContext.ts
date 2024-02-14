import { ChangeEvent, createContext } from 'react';

export type RadioGroupContextValue = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  name?: string;
};

export const RadioGroupContext = createContext<RadioGroupContextValue>({});
