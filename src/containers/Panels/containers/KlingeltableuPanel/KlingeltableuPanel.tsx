import Panel from 'containers/Panels/components/Panel/Panel';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { BasePanelProps } from '../../types';
import { observer } from 'mobx-react-lite';
import usePanelsStore, { useKlingeltableuPanelStore } from 'hooks/store/usePanelsStore';
import PanelId from 'enums/PanelId';
import KlingeltableuPanelPreview from './KlingeltableuPanelPreview/KlingeltableuPanelPreview';
import KlingeltableuPanelForm from './KlingeltableuPanelForm/KlingeltableuPanelForm';
import ResetStepModal from '../../../Editor/components/ResetStepModal/ResetStepModal';
import KlingetableuPanelState from '../../../../stores/panels/KlingetableuPanelState';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const KlingeltableuPanel: FC<BasePanelProps> = observer((props) => {
  const {
    isPreview = false,
    isEditable = true,
  } = props;

  const {
    setActivePanelId,
    panelIsVisible,
    panelsConfig,
    getPanelsConfig,
    configId,
    updateConfig,
    setNextPanel,
    resetPanels,
    resetNotCompletePanelState,
    activePanelId,
    updateKlingeltableuPanelConfig,
  } = usePanelsStore();

  const {
    state,
    isActive,
    isCompleted,
    setIsCompleted,
  } = useKlingeltableuPanelStore();

  const {
    panelTitle,
    setRemixConfig,
    isShowResetModal,
    setIsShowResetModal,
    isRestored,
    setIsRestored,
  } = state;

  const { isInitialize } = useEditorStore();

  const {
    goBack,
  } = useUndoRedoStore();

  useEffect(() => {
    if (panelsConfig[PanelId.KLINGETABLEU] && !isRestored && isInitialize) {
      setRemixConfig();
      setIsCompleted(true);
      setIsRestored(true);
    }
  }, [panelsConfig, isRestored, isInitialize]);

  const panelMode = useMemo(() => {
    if (!isInitialize) return 'skeleton';

    if (isPreview) return 'preview';

    if (!isEditable) return 'notEditable';

    if (isCompleted) return 'completed';
  }, [isPreview, isCompleted, isEditable, isInitialize]);

  const headerContent = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <KlingeltableuPanelPreview isPreview={isPreview} />;
    }
  }, [isActive, isCompleted, isPreview, isEditable]);

  const onCollapseClickHandler = useCallback(() => {
    if (isActive && isCompleted) {
      setActivePanelId(null);
      return;
    }

    const activePanel = activePanelId;
    setActivePanelId(PanelId.KLINGETABLEU);
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
            updateKlingeltableuPanelConfig(state);
            updateConfig<KlingetableuPanelState>(configId, PanelId.KLINGETABLEU, state, response.payload);
          });
      });
    }
  }, [state, configId]);

  const onCancelHandler = useCallback(() => {
    setIsShowResetModal(false);
    goBack(activePanelId);
  }, [activePanelId]);

  if (!panelIsVisible(PanelId.KLINGETABLEU)) return null;

  return (
    <Panel
      header={headerContent}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      title={panelTitle}
      expanded={isActive}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <KlingeltableuPanelForm />
      <ResetStepModal
        isOpen={isShowResetModal}
        onCancelClick={onCancelHandler}
        onResetStepClick={resetStepsConfigHandler}
        onClose={onCancelHandler}
      />
    </Panel>
  );
});

export default KlingeltableuPanel;
