import styles from './Logo.module.scss';
import LogoIcon from '../common/Icons/LogoIcon';
import { FC } from 'react';

interface LogoProps {
  onClick: () => void;
}

const Logo: FC<LogoProps> = ({ onClick }) => {
  return (
    <div
      className={styles.root}
      onClick={onClick}
    >
      <LogoIcon />
    </div>
  );
};

export default Logo;
