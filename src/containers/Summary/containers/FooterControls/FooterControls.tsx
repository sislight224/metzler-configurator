import styles from './FooterControls.module.scss';
import ConfirmConfiguration from '../../components/ConfirmConfiguration/ConfirmConfiguration';
import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import usePanelsStore from '../../../../hooks/store/usePanelsStore';
import { useAppSnackbar } from '../../../../hooks/useAppSnackbar';
import ModelControls from '../ModelControls/ModelControls';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';

const FooterControls = observer(() => {
  const {
    orderPanelsConfig,
    configId,
    setIsOrderConfig,
  } = usePanelsStore();

  const { enqueueErrorSnackbar } = useAppSnackbar({
    defaultErrorMessage: '',
  });

  const {
    cleanUndoRedo,
  } = useUndoRedoStore();

  const confirmConfigurationHandler = useCallback(() => {
    orderPanelsConfig(configId)
      .then(() => {
        setIsOrderConfig(true);
        cleanUndoRedo();
      })
      .catch((error) => {
        enqueueErrorSnackbar(error.message);
      });
  }, [configId]);

  return (
    <div className={styles.root}>
      <div className={styles.modelControls}>
        <ModelControls />
      </div>
      <ConfirmConfiguration
        onConfirm={confirmConfigurationHandler}
      />
    </div>
  );
});

export default FooterControls;
