import clsx from 'clsx';
import { useCallback, MouseEvent } from 'react';
import classNames from './Button.module.scss';

export type ColorScheme = 'primary' | 'outline' | 'white-outlined' | 'white-pine';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  colorScheme?: ColorScheme;
  cn?: string;
  width?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    label,
    disabled = false,
    loading = false,
    colorScheme = 'primary',
    cn,
    width,
    onClick = () => undefined,
  } = props;

  const clickHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      onClick(e);
    },
    [disabled, loading, onClick],
  );

  return (
    <button
      type="button"
      className={
        clsx(
          classNames.root,
          classNames[`root_colorScheme_${colorScheme.toLowerCase()}`],
          classNames[`${cn}`],
        )
      }
      disabled={disabled}
      style={{ width: width || '' }}
      onClick={clickHandler}
    >
      {label}
    </button>
  );
};

export default Button;
