import { FC } from 'react';
import { useZusatzmodulErweiterunPanelStore } from 'hooks/store/usePanelsStore';
import styles from './ZusatzmodulErweiterunPanelPreview.module.scss';
import cn from 'classnames';

export interface ZusatzmodulErweiterunPanelPreviewProps {
  isPreview?: boolean;
}

const ZusatzmodulErweiterunPanelPreview: FC<ZusatzmodulErweiterunPanelPreviewProps> = (props) => {
  const { isPreview = false } = props;
  const { state } = useZusatzmodulErweiterunPanelStore();

  return (
    <div className={cn(styles.root, { [styles.preview]: isPreview })}>
      <div className={styles.info}>
        <div className={styles.infoLabel}>
          Zusatzmodul
        </div>
        <div className={styles.infoValue}>
          {state.zusatzmodulErweiterung.title}
        </div>
      </div>
    </div>
  );
};

export default ZusatzmodulErweiterunPanelPreview;
