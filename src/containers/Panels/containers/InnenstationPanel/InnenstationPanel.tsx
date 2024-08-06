import { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import InnenstationPanelForm from './InnestationPanelForm/InnenstationPanelForm';
import Panel from 'containers/Panels/components/Panel/Panel';
import usePanelsStore, { useInnestationPanelStore } from '../../../../hooks/store/usePanelsStore';
import { BasePanelProps } from '../../types';
import PanelId from '../../../../enums/PanelId';
import InnenstationPanelPreview from './InnenstationPanelPreview/InnenstationPanelPreview';
import ResetStepModal from '../../../Editor/components/ResetStepModal/ResetStepModal';
import InnenstationPanelState from '../../../../stores/panels/InnenstationPanelState';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const InnenstationPanel: FC<BasePanelProps> = observer(({ isPreview = false, isEditable = true }) => {
  const {
    state,
    isActive,
    isCompleted,
    setIsCompleted,
  } = useInnestationPanelStore();

  const { isInitialize } = useEditorStore();

  const {
    setActivePanelId,
    panelIsVisible,
    panelsConfig,
    setNextPanel,
    activePanelId,
    resetPanels,
    updateConfig,
    getPanelsConfig,
    resetNotCompletePanelState,
    configId,
    updateInnenstationPanelConfig,
  } = usePanelsStore();

  const {
    panelTitle,
    isShowResetModal,
    setIsShowResetModal,
    isRestored,
    setIsRestored,
    initInnestationsModules,
    setRemixConfig,
  } = state;

  const { goBack } = useUndoRedoStore();

  useEffect(() => {
    if (panelsConfig.innenstation && isInitialize && /*!isRestored */) {
      setIsCompleted(true);
      setRemixConfig();
      setIsRestored(true);
    } else initInnestationsModules();
  }, [panelsConfig, isInitialize]);

  const headerContent = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <InnenstationPanelPreview isPreview={isPreview} />;
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
    setActivePanelId(PanelId.INNENSTATION);
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
            updateInnenstationPanelConfig(state);
            updateConfig<InnenstationPanelState>(configId, PanelId.INNENSTATION, state, response.payload);
          });
      });
    }
  }, [state, configId]);

  const onCancelHandler = useCallback(() => {
    setIsShowResetModal(false);
    goBack(activePanelId);
  }, [activePanelId]);

  if (!panelIsVisible(PanelId.INNENSTATION)) return null;

  return (
    <Panel
      header={headerContent}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      title={panelTitle}
      expanded={isActive}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <InnenstationPanelForm />
      <ResetStepModal
        isOpen={isShowResetModal}
        onCancelClick={onCancelHandler}
        onResetStepClick={resetStepsConfigHandler}
        onClose={onCancelHandler}
      />
    </Panel>
  );
});

export default InnenstationPanel;
