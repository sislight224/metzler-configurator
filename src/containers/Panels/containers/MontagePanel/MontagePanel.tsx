import Panel from 'containers/Panels/components/Panel/Panel';
import { FC, useCallback, useEffect, useMemo } from 'react';
import MontagePanelForm from './MontagePanelForm/MontagePanelForm';
import MontagePanelPreview from './MontagePanelPreview/MontagePanelPreview';
import usePanelsStore, { useMontagePanelStore } from 'hooks/store/usePanelsStore';
import PanelId from 'enums/PanelId';
import { observer } from 'mobx-react-lite';
import { BasePanelProps } from '../../types';
import ResetStepModal from '../../../Editor/components/ResetStepModal/ResetStepModal';
import MontagePanelState from '../../../../stores/panels/MontagePanelState';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const MontagePanel: FC<BasePanelProps> = observer((props) => {
  const {
    isPreview = false,
    isEditable = true,
  } = props;

  const {
    setActivePanelId,
    panelsConfig,
    getPanelsConfig,
    updateConfig,
    configId,
    activePanelId,
    resetPanels,
    updateMontagePanelConfig,
    resetNotCompletePanelState,
  } = usePanelsStore();

  const { isInitialize } = useEditorStore();

  const {
    isActive,
    state,
    isCompleted,
    setIsCompleted,
  } = useMontagePanelStore();

  const {
    goBack,
  } = useUndoRedoStore();

  const {
    panelTitle,
    setRemixConfig,
    setIsShowResetModal,
    setIsRestored,
    isRestored,
    isShowResetModal,
    setIsAddon,
  } = state;

  useEffect(() => {
    if (activePanelId === PanelId.MONTAGE) setIsAddon();
  }, [activePanelId]);

  const panelMode = useMemo(() => {
    if (!isInitialize) return 'skeleton';

    if (isPreview) return 'preview';

    if (!isEditable) return 'notEditable';

    if (isCompleted) return 'completed';
  }, [isPreview, isCompleted, isEditable, isInitialize]);

  const panelHeader = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <MontagePanelPreview isPreview={isPreview} />;
    }
  }, [isPreview, isCompleted, isActive, isEditable]);

  const onCollapseClickHandler = useCallback(() => {
    if (isActive && isCompleted) {
      setActivePanelId(null);
      return;
    }

    const activePanel = activePanelId;
    setActivePanelId(PanelId.MONTAGE);
    if (activePanel) resetNotCompletePanelState(activePanel);
  }, [isCompleted, isActive, activePanelId]);

  useEffect(() => {
    if (panelsConfig.montage && !isRestored && isInitialize) {
      setRemixConfig();
      setIsRestored(true);
      setIsCompleted(true);
    }
  }, [panelsConfig, isRestored, isInitialize]);

  const resetStepsConfigHandler = useCallback(() => {
    const resetPromise = resetPanels();
    if (resetPromise) {
      resetPromise.then(() => {
        getPanelsConfig(configId)
          .then((response) => {
            setIsShowResetModal(false);
            setIsCompleted(false);
            updateMontagePanelConfig(state);
            updateConfig<MontagePanelState>(configId, PanelId.MONTAGE, state, response.payload);
            if (!isCompleted) setIsCompleted(true);
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
      header={panelHeader}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      title={panelTitle}
      expanded={isActive}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <>
        <MontagePanelForm />
        <ResetStepModal
          isOpen={isShowResetModal}
          onCancelClick={onCancelHandler}
          onResetStepClick={resetStepsConfigHandler}
          onClose={onCancelHandler}
        />
      </>
    </Panel>
  );
});

export default MontagePanel;
