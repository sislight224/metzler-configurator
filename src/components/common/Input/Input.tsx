import {
  ChangeEvent, FC, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputThemeType = 'success' | 'error' | 'default';

export interface InputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  value?: string;
  placeholder?: string;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  disabled?: boolean;
  maxLength?: number;
  maxWidth?: number;
  hint?: string;
  theme?: InputThemeType;
  label?: string;
  height?: number;
  showHint?: boolean;
}

const Input: FC<InputProps> = (props) => {
  const {
    placeholder = '',
    value = '',
    onChange = () => undefined,
    onBlur = () => undefined,
    onFocus = () => undefined,
    disabled = false,
    showHint = false,
    suffixIcon,
    prefixIcon,
    theme,
    maxLength = Infinity,
    maxWidth,
    hint = '',
    label = '',
    height,
  } = props;

  const [innerValue, setInnerValue] = useState<string>(value);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const inputStyle = useMemo(() => {
    return classNames(
      styles.input,
      {
        [styles.input_default]: innerValue.length > 0,
        [styles.input_empty]: innerValue.length === 0,
      },
      styles[`input_${theme}`],
      { [styles.input_prefixIcon]: prefixIcon },
      { [styles.input_suffixIcon]: suffixIcon },
    );
  }, [theme, innerValue, prefixIcon, suffixIcon]);

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInnerValue(event.target.value);
    onChange(event);
  }, [setInnerValue, onChange]);

  return (
    <div
      className={styles.root}
      style={{ maxWidth }}
    >
      <div className={styles.label}>{label}</div>
      <div className={styles.wrapper}>
        {prefixIcon && <div className={classNames(
          styles.prefixIcon,
          { [styles.disabled_prefixIcon]: disabled },
        )}
        >
          {prefixIcon}
        </div>}
        <input
          style={{ height }}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          value={innerValue}
          onChange={onChangeHandler}
          onBlur={onBlur}
          onFocus={onFocus}
          className={inputStyle}
        />
        {suffixIcon && <div className={classNames(
          styles.suffixIcon,
          styles[`suffixIcon_${theme}`],
          { [styles.disabled_prefixIcon]: disabled },
        )}
        >
          {suffixIcon}
        </div>}
      </div>
      {showHint && <span className={classNames(
        styles.hint,
        styles[`hint_${theme}`],
      )}
      >
        {hint}
      </span>}
    </div>
  );
};

export default Input;
