import { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import RFIDPanelForm from './RFIDPanelForm/RFIDPanelForm';
import Panel from 'containers/Panels/components/Panel/Panel';
import usePanelsStore, { useRFIDPanelStore } from '../../../../hooks/store/usePanelsStore';
import { BasePanelProps } from '../../types';
import PanelId from '../../../../enums/PanelId';
import RFIDPanelPreview from './RFIDPanelPreview/RFIDPanelPreview';
import ResetStepModal from '../../../Editor/components/ResetStepModal/ResetStepModal';
import RFIDPanelState from '../../../../stores/panels/RFIDPanelState';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const RFIDPanel: FC<BasePanelProps> = observer(({ isPreview = false, isEditable = true }) => {
  const {
    state,
    isActive,
    isCompleted,
    setIsCompleted,
  } = useRFIDPanelStore();

  const {
    setActivePanelId,
    panelIsVisible,
    panelsConfig,
    nextStep,
    getPanelsConfig,
    setNextPanel,
    resetPanels,
    updateConfig,
    configId,
    resetNotCompletePanelState,
    activePanelId,
    updateRFIDPanelConfig,
  } = usePanelsStore();

  const { isInitialize } = useEditorStore();

  const {
    panelTitle,
    setRemixConfig,
    isShowResetModal,
    setIsShowResetModal,
    isRestored,
    setIsRestored,
  } = state;

  const {
    goBack,
  } = useUndoRedoStore();

  useEffect(() => {
    if (panelsConfig[PanelId.RFID] && !isRestored && isInitialize) {
      setRemixConfig();
      setIsCompleted(true);
      setIsRestored(true);
    }
  }, [panelsConfig, isRestored, isInitialize]);

  const headerContent = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <RFIDPanelPreview isPreview={isPreview} />;
    }
  }, [isPreview, isCompleted, isActive, isEditable]);

  const panelMode = useMemo(() => {
    if (!isInitialize) return 'skeleton';

    if (isPreview) return 'preview';

    if (!isEditable) return 'notEditable';

    if (isCompleted) return 'completed';
  }, [isPreview, isCompleted, isEditable, isInitialize]);

  const onCollapseClickHandler = useCallback(() => {
    if (isActive && isCompleted) {
      setActivePanelId(null);
      return;
    }

    const activePanel = activePanelId;
    setActivePanelId(PanelId.RFID);
    if (activePanel) resetNotCompletePanelState(activePanel);
  }, [isCompleted, isActive, activePanelId]);

  const resetStepsConfigHandler = useCallback(() => {
    const resetPromise = resetPanels();
    if (resetPromise) {
      resetPromise.then(() => {
        nextStep();
        setNextPanel();
        getPanelsConfig(configId)
          .then((response) => {
            setIsShowResetModal(false);
            setIsCompleted(false);
            updateRFIDPanelConfig(state);
            updateConfig<RFIDPanelState>(configId, PanelId.RFID, state, response.payload);
          });
      });
    }
  }, [state, configId]);

  const onCancelHandler = useCallback(() => {
    setIsShowResetModal(false);
    goBack(activePanelId);
  }, [activePanelId]);

  if (!panelIsVisible(PanelId.RFID)) return null;

  return (
    <Panel
      header={headerContent}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      title={panelTitle}
      expanded={isActive}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <RFIDPanelForm />
      <ResetStepModal
        isOpen={isShowResetModal}
        onCancelClick={onCancelHandler}
        onResetStepClick={resetStepsConfigHandler}
        onClose={onCancelHandler}
      />
    </Panel>
  );
});

export default RFIDPanel;
