import { FC } from 'react';
import styles from './RFIDPanelPreview.module.scss';
import cn from 'classnames';
import { useRFIDPanelStore } from 'hooks/store/usePanelsStore';
import { RFIDCardsEnum } from '../../../../../stores/panels/RFIDPanelState';

export interface KlingeltableuPanelPreviewProps {
  isPreview?: boolean;
}

const RFIDPanelPreview: FC<KlingeltableuPanelPreviewProps> = (props) => {
  const { isPreview } = props;

  const { state } = useRFIDPanelStore();

  const { getDataCard } = state;

  const exclusiveCount = getDataCard(RFIDCardsEnum.EXCLUSIVE)?.countModule || 0;
  const regularCount = getDataCard(RFIDCardsEnum.REGULAR)?.countModule || 0;
  const total = exclusiveCount + regularCount;

  return (
    <div className={cn(styles.root, { [styles.preview]: isPreview })}>
      {total > 0 && (<div className={styles.info}>
        <div className={styles.infoLabel}>RFID Karte</div>
        <div className={styles.infoValue}>{total}</div>
      </div>)}
      {getDataCard(RFIDCardsEnum.SCHLUSSELANHANGER)!.countModule > 0 && (<div className={styles.info}>
        <div className={styles.infoLabel}>RFID Schlüsselanhänger</div>
        <div className={styles.infoValue}>{getDataCard(RFIDCardsEnum.SCHLUSSELANHANGER)?.countModule}</div>
      </div>)}
    </div>
  );
};

export default RFIDPanelPreview;
