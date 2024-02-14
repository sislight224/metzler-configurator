import { FC } from 'react';
import styles from './InnenstationPanelPreview.module.scss';
import cn from 'classnames';
import { useInnestationPanelStore } from 'hooks/store/usePanelsStore';

export interface KlingeltableuPanelPreviewProps {
  isPreview?: boolean;
}

const InnenstationPanelPreview: FC<KlingeltableuPanelPreviewProps> = (props) => {
  const { isPreview } = props;
  const { state } = useInnestationPanelStore();
  const {
    innenstationType,
    innestationsModulesCount,
  } = state;

  return (
    <div className={cn(styles.root, { [styles.preview]: isPreview })}>
      <div className={styles.info}>
        <div className={styles.infoValue}>{innenstationType}</div>
      </div>
      {innestationsModulesCount.map((item) => {
        if (item.value > 0) {
          return (
            <div
              key={item.moduleName}
              className={styles.info}
            >
              <div className={styles.infoLabel}>{item.moduleName}</div>
              <div className={styles.infoValue}>{item.value}</div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default InnenstationPanelPreview;
