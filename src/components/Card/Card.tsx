import styles from './Card.module.scss';
import { FC, ReactNode, useCallback } from 'react';
import cn from 'classnames';

export interface SelectModuleProps {
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const Card: FC<SelectModuleProps> = (props) => {
  const {
    isActive = false,
    disabled = false,
    onClick = () => undefined,
    children,
  } = props;

  const cardClickHandler = useCallback(() => {
    if (!disabled) onClick();
  }, [onClick, disabled]);

  return (
    <div
      className={cn(
        styles.root,
        { [styles.active]: isActive },
        { [styles.disabled]: disabled },
      )}
      onClick={cardClickHandler}
    >
      {children}
    </div>
  );
};

export default Card;
