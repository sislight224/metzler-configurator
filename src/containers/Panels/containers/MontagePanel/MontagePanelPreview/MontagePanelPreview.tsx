import styles from './MontagePanelPreview.module.scss';
import { observer } from 'mobx-react-lite';
import { useMontagePanelStore } from 'hooks/store/usePanelsStore';
import { FC } from 'react';
import cn from 'classnames';

export interface MontagePanelPreviewProps {
  isPreview?: boolean;
}

const MontagePanelPreview: FC<MontagePanelPreviewProps> = observer((props) => {
  const { isPreview = false } = props;
  const { state } = useMontagePanelStore();

  return (
    <div className={cn(styles.root, { [styles.preview]: isPreview })}>
      <div className={styles.info}>
        <div className={styles.infoLabel}>
          Montageart
        </div>
        <div className={styles.infoValue}>
          {state.montageType}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoLabel}>
          Briefkästen
        </div>
        <div className={styles.infoValue}>
          {state.mailBoxesCount}
        </div>
      </div>
    </div>
  );
});

export default MontagePanelPreview;
