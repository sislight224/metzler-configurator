import { FC } from 'react';
import styles from './LichttasterPanelPreview.module.scss';
import cn from 'classnames';
import { useLichttasterPanelState } from 'hooks/store/usePanelsStore';

export interface KlingeltableuPanelPreviewProps {
  isPreview?: boolean;
}

const LichttasterPanelPreview: FC<KlingeltableuPanelPreviewProps> = (props) => {
  const { isPreview } = props;
  const { state } = useLichttasterPanelState();
  const { isLight } = state;

  return (
    <div className={cn(styles.root, { [styles.preview]: isPreview })}>
      <div className={styles.info}>
        <div className={styles.infoValue}>
          {isLight ? 'Mit Lichttaster' : 'Ohne Lichttaster' }
        </div>
      </div>

    </div>
  );
};

export default LichttasterPanelPreview;
