import { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import LichttasterPanelForm from './LichttasterPanelForm/LichttasterPanelForm';
import Panel from 'containers/Panels/components/Panel/Panel';
import usePanelsStore, { useLichttasterPanelState } from '../../../../hooks/store/usePanelsStore';
import { BasePanelProps } from '../../types';
import PanelId from '../../../../enums/PanelId';
import LichttasterPanelPreview from './LichttasterPanelPreview/LichttasterPanelPreview';
import ResetStepModal from '../../../Editor/components/ResetStepModal/ResetStepModal';
import LichttasterPanelState from '../../../../stores/panels/LichttasterPanelState';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const LichttasterPanel: FC<BasePanelProps> = observer(({ isPreview = false, isEditable = true }) => {
  const {
    state,
    isActive,
    isCompleted,
    setIsCompleted,
  } = useLichttasterPanelState();

  const {
    setActivePanelId,
    panelIsVisible,
    panelsConfig,
    activePanelId,
    resetPanels,
    getPanelsConfig,
    resetNotCompletePanelState,
    updateConfig,
    setNextPanel,
    configId,
    updateLichttasterPanelConfig,
  } = usePanelsStore();

  const {
    panelTitle,
    setRemixConfig,
    isShowResetModal,
    setIsShowResetModal,
    setIsAddon,
    isRestored,
    setIsRestored,
  } = state;

  const {
    goBack,
  } = useUndoRedoStore();

  const { isInitialize } = useEditorStore();

  useEffect(() => {
    if (activePanelId === PanelId.LICHTTASTER) setIsAddon();
  }, [activePanelId]);

  useEffect(() => {
    if (panelsConfig.lichttaster && !isRestored && isInitialize) {
      setIsCompleted(true);
      setIsRestored(true);
      setRemixConfig();
    }
  }, [panelsConfig, isRestored, isInitialize]);

  const headerContent = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <LichttasterPanelPreview isPreview={isPreview} />;
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
    setActivePanelId(PanelId.LICHTTASTER);
    if (activePanel) resetNotCompletePanelState(activePanel);
  }, [isCompleted, isActive, activePanelId]);

  const resetStepsConfigHandler = useCallback(() => {
    const resetPromise = resetPanels();
    if (resetPromise) {
      resetPromise.then(() => {
        setNextPanel();
        getPanelsConfig(configId)
          .then((response) => {
            setIsShowResetModal(false);
            setIsCompleted(false);
            updateLichttasterPanelConfig(state);
            updateConfig<LichttasterPanelState>(configId, PanelId.KLINGETABLEU, state, response.payload);
          });
      });
    }
  }, [state, configId]);

  const onCancelHandler = useCallback(() => {
    setIsShowResetModal(false);
    goBack(activePanelId);
  }, [activePanelId]);

  if (!panelIsVisible(PanelId.LICHTTASTER)) return null;

  return (
    <Panel
      header={headerContent}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      title={panelTitle}
      expanded={isActive}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <LichttasterPanelForm />
      <ResetStepModal
        isOpen={isShowResetModal}
        onCancelClick={onCancelHandler}
        onResetStepClick={resetStepsConfigHandler}
        onClose={onCancelHandler}
      />
    </Panel>
  );
});

export default LichttasterPanel;
