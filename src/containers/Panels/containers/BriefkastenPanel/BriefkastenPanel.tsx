import { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import BriefkastenPanelForm from './BriefkastenPanelForm/BriefkastenPanelForm';
import Panel from 'containers/Panels/components/Panel/Panel';
import usePanelsStore, { useBriefkastenPanelStore } from '../../../../hooks/store/usePanelsStore';
import { BasePanelProps } from '../../types';
import PanelId from '../../../../enums/PanelId';
import BriefkastenPanelPreview from './BriefkastenPanelPreview/BriefkastenPanelPreview';
import ResetStepModal from '../../../Editor/components/ResetStepModal/ResetStepModal';
import BriefkastenPanelState from '../../../../stores/panels/BriefkastenPanelState';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';
import briefkastenType from '../../../../enums/data/BriefkastenType';

const BriefkastenPanel: FC<BasePanelProps> = observer(({ isPreview = false, isEditable = true }) => {
  const {
    state,
    isActive,
    isCompleted,
    setIsCompleted,
  } = useBriefkastenPanelStore();

  const {
    setActivePanelId,
    panelsConfig,
    getPanelsConfig,
    configId,
    setNextPanel,
    resetPanels,
    resetNotCompletePanelState,
    updateConfig,
    updateBriefkastenPanelConfig,
    activePanelId,
  } = usePanelsStore();

  const {
    panelTitle,
    isShowResetModal,
    setIsShowResetModal,
    setRemixConfig,
    setIsRestored,
    setBriefkasteType,
    isRestored,
  } = state;

  const { isInitialize } = useEditorStore();

  const {
    goBack,
  } = useUndoRedoStore();

  useEffect(() => {
    if (panelsConfig.briefkasten && !isRestored && isInitialize) {
      setRemixConfig();
      setIsCompleted(true);
      setIsRestored(true);
    } else if (!panelsConfig[PanelId.BRIEFKASTEN] && isInitialize) {
      setBriefkasteType(briefkastenType.PAPIEREINLEGER);
    }
  }, [panelsConfig, isRestored, isInitialize]);

  const headerContent = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <BriefkastenPanelPreview isPreview={isPreview} />;
    }
  }, [isPreview, isActive, isCompleted, isEditable]);

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
    setActivePanelId(PanelId.BRIEFKASTEN);
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
            updateBriefkastenPanelConfig(state);
            updateConfig<BriefkastenPanelState>(configId, PanelId.ZUSATZMODUL_ERWEITERUN, state, response.payload);
          });
      });
    }
  }, [state, configId]);

  const onCancelHandler = useCallback(() => {
    setIsShowResetModal(false);
    goBack(activePanelId);
  }, [activePanelId]);

  return (
    <Panel
      header={headerContent}
      title={panelTitle}
      expanded={isActive}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <BriefkastenPanelForm />
      <ResetStepModal
        isOpen={isShowResetModal}
        onCancelClick={onCancelHandler}
        onResetStepClick={resetStepsConfigHandler}
        onClose={onCancelHandler}
      />
    </Panel>
  );
});

export default BriefkastenPanel;
