import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Modal.module.scss';
import CloseButton from './components/CloseButton/CloseButton';

export interface HeaderProps {
  onClose?: () => void;
  className?: string;
  withCloseIcon?: boolean;
  children: ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
  const {
    onClose = () => undefined,
    className,
    withCloseIcon = false,
    children,
  } = props;

  return (
    <div className={cn(className, styles.header)}>
      {children}
      <div className={styles.closeButton}>
        {withCloseIcon && <CloseButton onClick={onClose} />}
      </div>
    </div>
  );
};

export default Header;
