import styles from './ModelControls.module.scss';
import Button from '../../../../components/common/Button/Button';
import IconButton from '../../../../components/common/IconButton/IconButton';
import PdfButton from './components/PdfButton/PdfButton';
import { useRouter } from 'next/router';
import usePanelsStore from '../../../../hooks/store/usePanelsStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';
import { useCallback, FC } from 'react';
import { WindowId } from '../../../../enums/WindowId';

interface IProps {
  handleClick?: () => void;
}

const ModelControls: FC<IProps> = (props) => {
  const {
    handleClick = () => undefined,
  } = props;

  const router = useRouter();
  const {
    configId,
    isConfigOrder,
    setActiveWindowId,
  } = usePanelsStore();

  const { runRenderer, isLoadingPreview } = useEditorStore();

  const configuratorClickHandler = useCallback(() => {
    handleClick();
    runRenderer();
    router.replace({
      pathname: '/',
      query: {
        uuid: configId,
      },
    });
  }, [configId]);

  const linkClickHandler = useCallback(() => {
    handleClick();
    setActiveWindowId(WindowId.COPY_LINK);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.backDesktop}>
        <Button
          disabled={isConfigOrder && !isLoadingPreview}
          onClick={configuratorClickHandler}
          label="Zurück zum Konfigurator"
          colorScheme="white-outlined"
        />
      </div>

      <div className={styles.backMobile}>
        <IconButton
          iconName="backArrow"
          onClick={configuratorClickHandler}
          disabled={isConfigOrder}
        />
      </div>

      <div className={styles.shareControls}>
        <IconButton
          iconName="open"
          tooltipText="Teilen"
          onClick={linkClickHandler}
          enableTooltip
        />
        <PdfButton />
      </div>
    </div>
  );
};

export default ModelControls;
