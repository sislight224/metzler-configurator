import Panel from '../../components/Panel/Panel';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { BasePanelProps } from '../../types';
import { observer } from 'mobx-react-lite';
import usePanelsStore, { useZusatzmodulPanelStore } from '../../../../hooks/store/usePanelsStore';
import PanelId from '../../../../enums/PanelId';
import ZusatzmodulPanelPreview from './ZusatzmodulPanelPreview/ZusatzmodulPanelPreview';
import ZusatzmodulPanelForm from './ZusatzmodulPanelForm/ZusatzmodulPanelForm';
import ResetStepModal from '../../../Editor/components/ResetStepModal/ResetStepModal';
import ZusatzmodulPanelState from '../../../../stores/panels/ZusatzmodulPanelState';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const ZusatzmodulPanel: FC<BasePanelProps> = observer((props) => {
  const { isPreview = false, isEditable = true } = props;

  const {
    setActivePanelId,
    panelsConfig,
    configId,
    updateConfig,
    setNextPanel,
    getPanelsConfig,
    resetNotCompletePanelState,
    initList,
    resetPanels,
    activePanelId,
    updateZusatzmodulPanelConfig,
  } = usePanelsStore();

  const { isInitialize } = useEditorStore();

  const {
    state,
    isActive,
    isCompleted,
    setIsCompleted,
  } = useZusatzmodulPanelStore();

  const {
    panelTitle,
    isShowResetModal,
    setIsShowResetModal,
    setRemixConfig,
    zusatzmodulType,
    resetPanelConfig,
    setIsRestored,
    isRestored,
  } = state;

  const { goBack } = useUndoRedoStore();

  const panelMode = useMemo(() => {
    if (!isInitialize) return 'skeleton';

    if (isPreview) return 'preview';

    if (!isEditable) return 'notEditable';

    if (isCompleted) return 'completed';
  }, [isPreview, isCompleted, isEditable, isInitialize]);

  const headerContent = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <ZusatzmodulPanelPreview isPreview={isPreview} />;
    }
  }, [isActive, isCompleted, isPreview, isEditable]);

  const onCollapseClickHandler = useCallback(() => {
    if (isActive && isCompleted) {
      setActivePanelId(null);
      return;
    }

    const activePanel = activePanelId;
    setActivePanelId(PanelId.ZUSATZMODUL);
    if (activePanel) resetNotCompletePanelState(activePanel);
  }, [isCompleted, zusatzmodulType, activePanelId, isActive]);

  useEffect(() => {
    if (panelsConfig.zusatzmodule && !isRestored && isInitialize) {
      setRemixConfig();
      setIsCompleted(true);
      setIsRestored(true);
      initList();
    }
  }, [panelsConfig, isRestored, isInitialize]);

  const resetStepsConfigHandler = useCallback(() => {
    const resetPromise = resetPanels();
    if (resetPromise) {
      resetPromise.then(() => {
        setNextPanel();
        getPanelsConfig(configId)
          .then((response) => {
            setIsShowResetModal(false);
            resetPanelConfig();
            setIsCompleted(false);
            updateZusatzmodulPanelConfig(state);
            updateConfig<ZusatzmodulPanelState>(configId, PanelId.ZUSATZMODUL_ERWEITERUN, state, response.payload);
          });
      });
    }
  }, [state, isCompleted, configId]);

  const onCancelHandler = useCallback(() => {
    setIsShowResetModal(false);
    goBack(activePanelId);
  }, [activePanelId]);

  return (
    <Panel
      header={headerContent}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      title={panelTitle}
      expanded={isActive}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <ZusatzmodulPanelForm />
      <ResetStepModal
        isOpen={isShowResetModal}
        onCancelClick={onCancelHandler}
        onResetStepClick={resetStepsConfigHandler}
        onClose={onCancelHandler}
      />
    </Panel>
  );
});

export default ZusatzmodulPanel;
