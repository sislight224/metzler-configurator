import { FC } from 'react';
import { SwitchWrapper } from './style';
import style from './Switch.module.scss';

interface SwitchProps {
  label?: string;
  onChange: () => void;
  checked: boolean;
  id?: string;
}

const Switch: FC<SwitchProps> = ({ onChange, checked, label, id }) => {
  return (
    <div>
      <SwitchWrapper
        id={id}
        checked={checked}
        onChange={onChange}
        disableRipple
      />
      <label
        htmlFor={id}
        className={style.label}
      >
        {label}
      </label>
    </div>
  );
};

export default Switch;
