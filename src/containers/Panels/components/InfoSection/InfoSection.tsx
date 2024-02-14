import { FC, ReactNode } from 'react';
import styles from './InfoSection.module.scss';
import InfoButton from '../../../../components/common/InfoButton/InfoButton';

export interface InfoSectionProps {
  hintText: string;
  children: ReactNode;
  onHintButtonClick?: () => void;
}

const InfoSection: FC<InfoSectionProps> = (props) => {
  const {
    hintText,
    children,
    onHintButtonClick = () => undefined,
  } = props;

  return (
    <div className={styles.root}>
      {children}
      <InfoButton
        onClick={onHintButtonClick}
        tooltipText={hintText}
      />
    </div>
  );
};

export default InfoSection;
