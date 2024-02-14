import { FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './LichttasterPanel.module.scss';
import Button from '../../../../../components/common/Button/Button';
import usePanelsStore, {
  useLichttasterPanelState,
} from '../../../../../hooks/store/usePanelsStore';
import Switch from '../../../../../components/common/Switch/Switch';
import InfoSection from '../../../components/InfoSection/InfoSection';
import PanelId from '../../../../../enums/PanelId';
import LichttasterPanelState from '../../../../../stores/panels/LichttasterPanelState';
import { useUndoRedoStore } from '../../../../../hooks/store/useUndoRedoStore';

const LichttasterPanelForm: FC = observer(() => {
  const {
    state,
    isCompleted,
    setIsCompleted,
  } = useLichttasterPanelState();

  const {
    setActivePanelId,
    listPanels,
    stepIndex,
    nextStep,
    setNextPanel,
    activePanelId,
    getPanelsConfig,
    configId,
    updateConfig,
    panelsConfig,
    updateLichttasterPanelConfig,
  } = usePanelsStore();

  const {
    isLight,
    setIsShowResetModal,
    compareConfig,
    switchLight,
  } = state;

  const {
    addStateRecord,
  } = useUndoRedoStore();

  useEffect(() => {
    if (PanelId.LICHTTASTER === activePanelId) nextStep();
  }, [activePanelId]);

  const switchLightHandler = useCallback(() => {
    addStateRecord();
    switchLight();

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  const completeClickHandler = useCallback(() => {
    getPanelsConfig(configId)
      .then((response) => {
        addStateRecord();
        updateLichttasterPanelConfig(state);
        updateConfig<LichttasterPanelState>(configId, PanelId.LICHTTASTER, state, response.payload);
        setNextPanel();
        const currentPanel = listPanels && listPanels[stepIndex];
        setActivePanelId(currentPanel || null);

        if (!isCompleted) {
          setIsCompleted(true);
        }
      });
  }, [isCompleted, stepIndex]);

  return (
    <div className={styles.root}>
      <div className={styles.switch}>
        <InfoSection hintText="Lichttaster für Stromstoßschalter, ideal für Eingangs- oder Hausflurbeleuchtung. Mit LED-Ring und hinterleuchtetem Licht-Symbol.">
          <Switch
            id="LED Hintergrundbeleuchtung"
            onChange={switchLightHandler}
            checked={isLight}
            label="Lichttaster"
          />
        </InfoSection>
      </div>
      <div className={styles.saveButton}>
        <Button
          label="Weiter"
          cn="buttonPanelWidth"
          onClick={completeClickHandler}
        />
      </div>
    </div>
  );
});

export default LichttasterPanelForm;
