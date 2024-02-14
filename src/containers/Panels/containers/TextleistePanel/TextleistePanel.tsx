import { FC, useCallback, useEffect, useMemo } from 'react';
import { BasePanelProps } from '../../types';
import usePanelsStore, { useTextleistePanelStore } from 'hooks/store/usePanelsStore';
import TextleistePanelPreview from './TextleistePanelPreview/TextleistePanelPreview';
import TextleistePanelForm from './TextleistePanelForm/TextleistePanelForm';
import PanelId from 'enums/PanelId';
import Panel from 'containers/Panels/components/Panel/Panel';
import { observer } from 'mobx-react-lite';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const TextleistePanel: FC<BasePanelProps> = observer((props) => {
  const {
    isPreview = false,
    isEditable = true,
  } = props;

  const { setActivePanelId, panelsConfig, activePanelId, resetNotCompletePanelState } = usePanelsStore();

  const { isInitialize } = useEditorStore();

  const {
    state: textleisteState,
    isActive,
    isCompleted,
    setIsCompleted,
  } = useTextleistePanelStore();

  const {
    panelTitle,
    setRemixConfig,
    setIsAddon,
    isRestored,
    setIsRestored,
  } = textleisteState;

  useEffect(() => {
    if (PanelId.TEXTLEISTE === activePanelId) setIsAddon();
  }, [activePanelId]);

  useEffect(() => {
    if (panelsConfig.textleiste && !isRestored && isInitialize) {
      setIsCompleted(true);
      setRemixConfig();
      setIsRestored(true);
    }
    if (panelsConfig[PanelId.MONTAGE]) setActivePanelId(null);
    else if (!panelsConfig[PanelId.MONTAGE]) setActivePanelId(PanelId.MONTAGE);
  }, [panelsConfig, isRestored, isInitialize]);

  const panelMode = useMemo(() => {
    if (!isInitialize) return 'skeleton';

    if (isPreview) return 'preview';

    if (!isEditable) return 'notEditable';

    if (isCompleted) return 'completed';
  }, [isPreview, isCompleted, isEditable, isInitialize]);

  const headerContent = useMemo(() => {
    if ((isPreview || !isEditable) || (isCompleted && !isActive)) {
      return <TextleistePanelPreview isPreview={isPreview} />;
    }
  }, [isActive, isCompleted, isPreview, isEditable]);

  const onCollapseClickHandler = useCallback(() => {
    if (isActive && isCompleted) {
      setActivePanelId(null);
      return;
    }

    const activePanel = activePanelId;
    setActivePanelId(PanelId.TEXTLEISTE);
    if (activePanel) resetNotCompletePanelState(activePanel);
  }, [isCompleted, isActive, activePanelId]);

  return (
    <Panel
      header={headerContent}
      collapseIsEnabled={(isActive || isCompleted) && !isPreview}
      title={panelTitle}
      expanded={isActive}
      onPanelClick={() => onCollapseClickHandler()}
      mode={panelMode}
    >
      <TextleistePanelForm />
    </Panel>
  );
});

export default TextleistePanel;
