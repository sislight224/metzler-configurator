import { FC } from 'react';
import styles from './ZusatzmodulPanelPreview.module.scss';
import cn from 'classnames';
import { useZusatzmodulPanelStore } from 'hooks/store/usePanelsStore';

export interface ZusatzmodulPanelPreviewProps {
  isPreview?: boolean;
}

const ZusatzmodulPanelPreview: FC<ZusatzmodulPanelPreviewProps> = (props) => {
  const { isPreview = false } = props;
  const { state } = useZusatzmodulPanelStore();

  return (
    <div className={cn(styles.root, { [styles.preview]: isPreview })}>
      <div className={styles.info}>
        <div className={styles.infoLabel}>
          Zusatzmodul
        </div>
        <div className={styles.infoValue}>
          {state.zusatzmodulType.title}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoLabel}>
          Position
        </div>
        <div className={styles.infoValue}>
          {state.zusatzmodulPosition}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoLabel}>
          Anzahl der Reihen
        </div>
        <div className={styles.infoValue}>
          {state.mailBoxesRanksCount}
        </div>
        <div className={styles.nonBlock} />
      </div>
    </div>
  );
};

export default ZusatzmodulPanelPreview;
