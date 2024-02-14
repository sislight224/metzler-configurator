import {
  ChangeEvent, FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import styles from './Slider.module.scss';
import cn from 'classnames';

const getMarkCount = (start: number, stop: number, step: number) => {
  const result = [];
  for (let i = start; i <= stop; i += step) {
    result.push(i);
  }
  return result;
};

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  disabledMarks?: number[];
  isSwitch?: boolean;
}

const Slider: FC<SliderProps> = (props) => {
  const {
    min = 1,
    max = 10,
    step = 1,
    value = min,
    onChange = () => undefined,
    disabledMarks = [],
    isSwitch,
  } = props;
  const [innerValue, setInnerValue] = useState<number>(value || min);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const steps = useMemo(() => {
    return getMarkCount(min, max, step);
  }, [step, max, min, innerValue]);

  const markIsActive = useCallback((_value: number) => {
    if (isSwitch) {
      return innerValue === _value;
    }

    return (innerValue >= _value) || (_value === min);
  }, [innerValue, min, isSwitch]);

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const disableMark = disabledMarks.find((item) => item === Number(event.target.value));

    if (!disableMark) {
      setInnerValue(Number(event.target.value));
      onChange(event, event.target.value);
    }
  }, [onChange, disabledMarks]);

  return (
    <div className={styles.root}>
      <input
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChangeHandler}
        type="range"
        readOnly
        autoComplete="new-password"
        className={styles.range}
        list="slider"
      />
      <datalist
        id="slider"
        className={styles.indicatorContainer}
      >
        {steps.map((item) => {
          const activeMark = disabledMarks.find((_item) => _item === item);
          return (
            <div
              className={styles.markContainer}
              key={item}
            >
              <div
                className={cn(
                  styles.mark,
                  { [styles.mark_active]: markIsActive(item) },
                  { [styles.mark_disabled]: activeMark },
                )}
              />
              <div className={styles.label}>{item}</div>
            </div>
          );
        })}
      </datalist>
    </div>
  );
};

export default Slider;
