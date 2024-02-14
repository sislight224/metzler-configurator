import { FC, useCallback, useRef } from 'react';
import styles from './InputNumber.module.scss';
import classNames from 'classnames';
import Icon from '../Icons/Icon';

export interface InputNumberProps {
  onChange?: (value: number) => void;
  maxWidth?: number;
  min: number;
  max: number;
  step: number;
  value?: number;
  disabled?: boolean;
}

const InputNumber: FC<InputNumberProps> = (props) => {
  const {
    maxWidth,
    value = 666,
    max = Infinity,
    min = 0,
    step = 1,
    onChange = () => undefined,
    disabled = false,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const minusClickHandler = useCallback(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.stepDown(step);
      onChange(Number(inputRef.current.value));
    }
  }, [step, onChange, disabled]);

  const plusClickHandler = useCallback(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.stepUp(step);
      onChange(Number(inputRef.current.value));
    }
  }, [step, onChange, disabled]);

  return (
    <div
      style={{ maxWidth }}
      className={styles.root}
    >
      <div
        className={classNames(
          styles.icon,
          { [styles.disabled]: value - step < min || disabled },
        )}
        onClick={minusClickHandler}
      >
        <Icon name="minus" />
      </div>
      <input
        ref={inputRef}
        className={classNames(
          styles.input,
          { [styles.input_withValue]: value > 0 },
        )}
        step={step}
        readOnly
        min={min}
        max={max}
        type="number"
        value={value}
      />
      <div
        onClick={plusClickHandler}
        className={classNames(
          styles.icon,
          { [styles.disabled]: value + step > max || disabled },
        )}
      >
        <Icon name="plus" />
      </div>
    </div>
  );
};

export default InputNumber;
