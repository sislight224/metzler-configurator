import styles from './Preview.module.scss';
import { observer } from 'mobx-react-lite';
import { useControlsStore } from '../../../../hooks/store/useControlsStore';
import { useEffect } from 'react';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const Preview = observer(() => {
  const {
    setMailSizes,
    mailWidth,
    mailDepth,
    mailHeight,
  } = useControlsStore();

  const { previewMailsUrl, isLoadingPreview, isInitialize } = useEditorStore();

  useEffect(() => {
    if (isInitialize) setMailSizes();
  }, [isInitialize]);

  return (
    <div className={styles.root}>
      <div className={styles.modelInfo}>
        {mailWidth}
        {' '}
        x&nbsp;
        {mailHeight}
        {' '}
        x&nbsp;
        {mailDepth}
        {' '}
        mm
        <div className={styles.label}>
          Größe
        </div>
      </div>
      {!isLoadingPreview && <img
        className={styles.preview}
        src={previewMailsUrl}
      />}
    </div>
  );
});

export default Preview;
