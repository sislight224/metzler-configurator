import { ChangeEvent, FC, useCallback, useMemo, useRef } from 'react';
import styles from './Radio.module.scss';
import useRadioGroup from '../RadioGroup/useRadioGroup';
import classnames from 'classnames';

export interface RadioProps {
  value?: string;
  name?: string;
  title?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  disabled?: boolean;
}

const Radio: FC<RadioProps> = (props) => {
  const {
    value: pValue,
    name: pName,
    title,
    checked = false,
    onChange: pOnChange = () => undefined,
    disabled,
  } = props;

  const radioGroup = useRadioGroup();
  const radio = useRef<HTMLInputElement>(null);

  const isChecked = useMemo(() => {
    if (radioGroup?.value) {
      return radioGroup?.value === pValue;
    }

    return checked;
  }, [checked, radioGroup?.value]);

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (radioGroup?.onChange) {
      radioGroup.onChange(event, event.target.value);
      return;
    }

    pOnChange(event, event.target.value);
  }, [pOnChange, radioGroup?.onChange]);

  return (
    <label className={classnames(
      styles.root,
      { [styles.root_disabled]: disabled },
    )}
    >
      <input
        ref={radio}
        type="radio"
        value={pValue}
        name={radioGroup?.name || pName}
        checked={isChecked}
        onChange={onChangeHandler}
        className={styles.radio}
        disabled={disabled}
      />
      {title}
    </label>
  );
};

export default Radio;
