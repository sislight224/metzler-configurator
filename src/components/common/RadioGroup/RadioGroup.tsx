import { ChangeEvent, FC, ReactNode, useMemo } from 'react';
import { RadioGroupContext } from './RadioGroupContext';

export interface RadioGroupProps {
  children?: ReactNode;
  value?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {
    children,
    value,
    name,
    onChange = () => undefined,
  } = props;

  const contextValue = useMemo(() => {
    return {
      value,
      name,
      onChange,
    };
  }, [value, name, onChange]);

  return (
    <RadioGroupContext.Provider value={contextValue}>
      {children}
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
