import { FC, useCallback } from 'react';
import styles from './ButtonText.module.scss';

export interface ButtonTextProps {
  label: string;
  disabled?: boolean;
  background?: string;
  onClick?: () => void;
}

const ButtonText: FC<ButtonTextProps> = (props) => {
  const {
    label,
    disabled,
    background = 'transparent',
    onClick = () => undefined,
  } = props;

  const clickHandler = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={clickHandler}
      className={styles.root}
      style={{ background }}
    >
      <div className={styles.label}>
        {label}
      </div>
    </button>
  );
};

export default ButtonText;
