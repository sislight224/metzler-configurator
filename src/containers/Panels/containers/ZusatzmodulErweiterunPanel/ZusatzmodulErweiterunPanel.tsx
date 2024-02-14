import Panel from 'containers/Panels/components/Panel/Panel';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { BasePanelProps } from '../../types';
import { observer } from 'mobx-react-lite';
import usePanelsStore, { useZusatzmodulErweiterunPanelStore } from 'hooks/store/usePanelsStore';
import PanelId from 'enums/PanelId';
import ZusatzmodulErweiterunPanelPreview from './ZusatzmodulErweiterunPanelPreview/ZusatzmodulErweiterunPanelPreview';
import ZusatzmodulErweiterunPanelForm from './ZusatzmodulErweiterunPanelForm/ZusatzmodulErweiterunPanelForm';
import ResetStepModal from '../../../Editor/components/ResetStepModal/ResetStepModal';
import ZusatzmodulErweiterunPanelState from '../../../../stores/panels/ZusatzmodulErweiterunPanelState';
import { PanelList } from '../../../../data/panelList';
import { useUndoRedoStore } from '../../../../hooks/store/useUndoRedoStore';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const ZusatzmodulErweiterunPanel: FC<BasePanelProps> = observer((props) => {
  const { isPreview = false, isEditable = true } = props;

  const { isInitialize } = useEditorStore();

  const {
    setActivePanelId,
    panelIsVisible,
    panelsConfig,
    getPanelsConfig,
    configId,
    updateConfig,
    initList,
    setListPanels,
    resetNotCompletePanelState,
    setNextPanel,
    resetPanels,
    activePanelId,
    updateZusatzmodulErwPanelConfig,
  } = usePanelsStore();

  const {
    goBack,
  } = useUndoRedoStore();

  const {
    isCompleted,
    isActive,
    state,
    setIsCompleted,
  } = useZusatzmodulErweiterunPanelStore();

  const {
    panelTitle,
    setRemixConfig,
    isShowResetModal,
    setIsShowResetModal,
    setIsRestored,
    isRestored,
  } = state;

  const panelMode = useMemo(() => {
    if (!isInitialize) return 'skeleton';

    if (isPreview) return 'preview';

    if (!isEditable) return 'notEditable';

    if (isCompleted) return 'completed';
  }, [isPreview, isCompleted, isEditable, isInitialize]);

  useEffect(() => {
    if (panelsConfig.zusatzmodulErweiterun && panelsConfig.zusatzmodule && !isRestored && isInitialize) {
      const { zusatzmodulType } = panelsConfig.zusatzmodule;
      const { zusatzmodulErweiterunType } = panelsConfig.zusatzmodulErweiterun;
      setRemixConfig();
      setIsCompleted(true);
      // todo: мб вынести куда-нить
      if (zusatzmodulType.value === 'videoGegensprechmodul' || zusatzmodulType.value === 'audioGegensprechmodul') {
        if (zusatzmodulErweiterunType.value === 'klingetaster_rfid') setListPanels(PanelList.klingetaster_rfid);
        if (zusatzmodulErweiterunType.value === 'klingetaster') setListPanels(PanelList.klingetaster);
        if (zusatzmodulErweiterunType.value === 'klingetaster_touchDisplay') setListPanels(PanelList.klingetaster_touchDisplay);
        if (zusatzmodulErweiterunType.value === 'touch_display') setListPanels(PanelList.touch_display);
        initList();
      }
      setIsRestored(true);
    }
  }, [panelsConfig, isRestored, isInitialize]);

  const headerContent = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <ZusatzmodulErweiterunPanelPreview isPreview={isPreview} />;
    }
  }, [isActive, isCompleted, isPreview, isEditable]);

  const onCollapseClickHandler = useCallback(() => {
    if (isActive && isCompleted) {
      setActivePanelId(null);
      return;
    }

    const activePanel = activePanelId;
    setActivePanelId(PanelId.ZUSATZMODUL_ERWEITERUN);
    if (activePanel) resetNotCompletePanelState(activePanel);
  }, [isCompleted, setActivePanelId, isActive, activePanelId]);

  const resetStepsConfigHandler = useCallback(() => {
    const resetPromise = resetPanels();
    if (resetPromise) {
      resetPromise.then(() => {
        setNextPanel();
        getPanelsConfig(configId)
          .then((response) => {
            setIsShowResetModal(false);
            setIsCompleted(false);
            updateZusatzmodulErwPanelConfig(state);
            updateConfig<ZusatzmodulErweiterunPanelState>(configId, PanelId.ZUSATZMODUL_ERWEITERUN, state, response.payload);
          });
      });
    }
  }, [configId]);

  const onCancelHandler = useCallback(() => {
    setIsShowResetModal(false);
    goBack(activePanelId);
  }, [activePanelId]);

  if (!panelIsVisible(PanelId.ZUSATZMODUL_ERWEITERUN)) return null;

  return (
    <Panel
      header={headerContent}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      title={panelTitle}
      expanded={isActive}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <ZusatzmodulErweiterunPanelForm />
      <ResetStepModal
        isOpen={isShowResetModal}
        onCancelClick={onCancelHandler}
        onResetStepClick={resetStepsConfigHandler}
        onClose={onCancelHandler}
      />
    </Panel>
  );
});

export default ZusatzmodulErweiterunPanel;
