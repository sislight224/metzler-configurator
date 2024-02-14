import styles from './TextleistePanelPreview.module.scss';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useTextleistePanelStore } from 'hooks/store/usePanelsStore';
import cn from 'classnames';

export interface TextleistePanelPreviewProps {
  isPreview?: boolean;
}

const convertTextausrichtung = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

const TextleistePanelPreview: FC<TextleistePanelPreviewProps> = observer((props) => {
  const { isPreview } = props;

  const { state } = useTextleistePanelStore();
  const {
    beschriftungOberhalbIsEnabled,
    beschriftung,
    textausrichtung,
    hintergrundbeleuchtungIsEnabled,
  } = state;

  return (
    <div className={cn(styles.root, { [styles.preview]: isPreview })}>
      <div className={styles.info}>
        <div className={styles.infoValue}>
          {!beschriftungOberhalbIsEnabled ? 'Ohne' : 'Beschriftung oberhalb'}
        </div>
      </div>
      {beschriftungOberhalbIsEnabled && (
        <>
          <div className={styles.info}>
            <div className={styles.infoLabel}>
              Теxtausrichtung
            </div>
            <div className={styles.infoValue}>
              {convertTextausrichtung(textausrichtung)}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.infoValue}>
              {hintergrundbeleuchtungIsEnabled && 'LED Hintergrundbeleuchtung'}
            </div>
          </div>
          {
            isPreview
            && <div className={styles.info}>
              <div className={styles.infoValue}>{beschriftung}</div>
            </div>
          }
        </>
      )}
    </div>
  );
});

export default TextleistePanelPreview;
