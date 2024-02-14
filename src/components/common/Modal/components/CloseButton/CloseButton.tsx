import styles from './CloseButton.module.scss';
import { FC } from 'react';
import CloseIcon from '../../../Icons/CloseIcon';

export interface CloseButtonProps {
  onClick?: () => void;
}

const CloseButton: FC<CloseButtonProps> = (props) => {
  const {
    onClick = () => undefined,
  } = props;

  return (
    <button
      type="button"
      className={styles.root}
      onClick={onClick}
    >
      <CloseIcon />
    </button>
  );
};

export default CloseButton;
