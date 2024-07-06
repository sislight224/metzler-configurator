import { FC } from "react";
import styles from "./BriefkastenPanelPreview.module.scss";
import cn from "classnames";
import { useBriefkastenPanelStore } from "hooks/store/usePanelsStore";
import { observer } from "mobx-react-lite";

export interface KlingeltableuPanelPreviewProps {
  isPreview?: boolean;
}

const BriefkastenPanelPreview: FC<KlingeltableuPanelPreviewProps> = observer(
  (props) => {
    const { isPreview } = props;
    const { state } = useBriefkastenPanelStore();
    const {
      briefkasteType,
      griffleisteColor,
      schriftart,
      namensschildList,
      visibleBriefkasteType,
    } = state;

    return (
      <div className={styles.root}>
        <div className={cn(styles.row, { [styles.preview]: isPreview })}>
          {visibleBriefkasteType && (
            <div className={styles.info}>
              <div className={styles.infoValue}>{briefkasteType}</div>
            </div>
          )}
          <div className={styles.info}>
            <div className={styles.infoLabel}>Schriftart</div>
            <div className={styles.infoValue}>{schriftart}</div>
          </div>
          <div className={styles.info}>
            <div className={styles.infoLabel}>Farbe der Griffleiste</div>
            <div className={styles.infoValue}>{griffleisteColor}</div>
          </div>
        </div>
        {namensschildList && isPreview && (
          <div className={styles.row}>
            {namensschildList.map((item) => (
              <p key={item.id} className={styles.infoValue}>
                {item.value}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default BriefkastenPanelPreview;
