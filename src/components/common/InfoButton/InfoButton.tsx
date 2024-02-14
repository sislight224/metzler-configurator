import { FC } from 'react';
import styles from './InfoButton.module.scss';
import Icon from '../Icons/Icon';
import dynamic from 'next/dynamic';

const Tooltip = dynamic(() => import('../Tooltip/Tooltip'), { ssr: false });

export interface InfoButtonProps {
  tooltipText: string;
  onClick?: () => void;
}

const InfoButton: FC<InfoButtonProps> = (props) => {
  const {
    tooltipText,
    onClick = () => undefined,
  } = props;

  return (
    <div className={styles.root}>
      <Tooltip
        style={{
          border: '1px solid #DDDDDD',
          maxWidth: '310px',
        }}
        placement="top"
        trigger="hover"
        backgroundColor="#FFFFFF"
        content={() => (
          <div className={styles.tooltip}>{tooltipText}</div>
        )}
      >
        <button
          onClick={onClick}
          className={styles.infoButton}
          type="button"
        >
          <Icon
            name="info"
            width={16}
            height={16}
          />
        </button>
      </Tooltip>
    </div>
  );
};

export default InfoButton;
