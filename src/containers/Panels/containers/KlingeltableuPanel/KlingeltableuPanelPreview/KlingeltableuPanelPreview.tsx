import { FC, useMemo } from 'react';
import styles from './KlingeltableuPanelPreview.module.scss';
import cn from 'classnames';
import { useKlingeltableuPanelStore } from 'hooks/store/usePanelsStore';
import BeschriftungNamensschild from 'enums/data/BeschriftungNamensschild';
import { observer } from 'mobx-react-lite';

export interface KlingeltableuPanelPreviewProps {
  isPreview?: boolean;
}

const KlingeltableuPanelPreview: FC<KlingeltableuPanelPreviewProps> = observer((props) => {
  const { isPreview } = props;
  const { state } = useKlingeltableuPanelStore();
  const {
    klingeltasterCount,
    beleuchtungColor,
    beschriftungNamensschild,
    namensschildBeleuchtungEnabled,
    namensschildList,
    lichttasterEnabled,
    schriftart,
  } = state;

  const beschriftungNamensschildTitle = useMemo(() => {
    return beschriftungNamensschild === BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER
      ? 'Einsteckschild mit Papiereinleger'
      : 'Namensschild mit Gravur';
  }, [beschriftungNamensschild]);

  return (
    <div className={styles.root}>
      <div className={cn(styles.row, { [styles.preview]: isPreview })}>
        <div className={styles.info}>
          <div className={styles.infoLabel}>
            Klingeln
          </div>
          <div className={styles.infoValue}>
            {klingeltasterCount}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoLabel}>
            Klingeltaster Beleuchtung
          </div>
          <div className={styles.infoValue}>
            {beleuchtungColor}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoValue}>
            {beschriftungNamensschildTitle}
          </div>
        </div>
        {
          namensschildBeleuchtungEnabled
          && <div className={styles.info}>
            <div className={styles.infoValue}>
              Namensschild Beleuchtung
            </div>
          </div>
        }
        {
          lichttasterEnabled
          && <div className={styles.info}>
            <div className={styles.infoValue}>
              Lichttaster
            </div>
          </div>
        }
        {
          isPreview
          && <div className={styles.info}>
            <div className={styles.infoLabel}>
              Schriftart
            </div>
            <div className={styles.infoValue}>
              {schriftart}
            </div>
          </div>
        }
      </div>
      {(namensschildList && isPreview && beschriftungNamensschild !== BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER)
        && <div className={styles.row}>
          {namensschildList.map((item) => (
            <p
              key={item.id}
              className={styles.infoValue}
            >
              {item.value}
            </p>
          ))}
          </div>}
    </div>
  );
});

export default KlingeltableuPanelPreview;
