import styles from './ZusatzmodulErweiterunPanelForm.module.scss';
import { ZusatzmodulErweiterun } from 'data';
import Card from 'components/Card/Card';
import { observer } from 'mobx-react-lite';
import usePanelsStore, { useZusatzmodulErweiterunPanelStore } from 'hooks/store/usePanelsStore';
import Button from 'components/common/Button/Button';
import { useCallback, useEffect } from 'react';
import PanelId from '../../../../../enums/PanelId';
import InfoSection from '../../../components/InfoSection/InfoSection';
import ZusatzmodulErweiterunPanelState from '../../../../../stores/panels/ZusatzmodulErweiterunPanelState';
import { PanelList } from '../../../../../data/panelList';
import { useUndoRedoStore } from '../../../../../hooks/store/useUndoRedoStore';
import { ZusatzmodulErweiterunType } from '../../../../../data/ZusatzmodulErweiterun';

const ZusatzmodulErweiterunPanelForm = observer(() => {
  const {
    setActivePanelId,
    listPanels,
    stepIndex,
    configId,
    updateConfig,
    getPanelsConfig,
    activePanelId,
    setListPanels,
    nextStep,
    setNextPanel,
    updateZusatzmodulErwPanelConfig,
    panelsConfig,
  } = usePanelsStore();

  const { isCompleted, setIsCompleted, state } = useZusatzmodulErweiterunPanelStore();
  const {
    zusatzmodulErweiterung,
    setZusatzmodulErweiterung,
    compareConfig,
    resetPanelConfig,
    setIsShowResetModal,
  } = state;

  const {
    addStateRecord,
  } = useUndoRedoStore();

  const completeClickHandler = useCallback(() => {
    addStateRecord();
    getPanelsConfig(configId)
      .then((response) => {
        if (!isCompleted) setIsCompleted(true);
        setNextPanel();
        const currentPanel = listPanels && listPanels[stepIndex];
        setActivePanelId(currentPanel || null);
        resetPanelConfig();
        updateZusatzmodulErwPanelConfig(state);
        updateConfig<ZusatzmodulErweiterunPanelState>(configId, PanelId.ZUSATZMODUL_ERWEITERUN, state, response.payload);
      });
  }, [isCompleted, listPanels, stepIndex, configId, state]);

  useEffect(() => {
    if (activePanelId === PanelId.ZUSATZMODUL_ERWEITERUN) {
      setListPanels(PanelList[zusatzmodulErweiterung.value]);
      nextStep();
    }
  }, [activePanelId, zusatzmodulErweiterung]);

  const zusatzmodulErweiterungHandler = useCallback((item: ZusatzmodulErweiterunType) => {
    addStateRecord();
    setZusatzmodulErweiterung(item);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {ZusatzmodulErweiterun.map((item) => (
          <Card
            isActive={zusatzmodulErweiterung.value === item.value}
            onClick={() => zusatzmodulErweiterungHandler(item)}
            key={item.value}
          >
            <InfoSection hintText={item.description || ''}>
              <div className={styles.module}>
                <picture>
                  <source
                    srcSet={item.preview?.mobile || ''}
                    media="(max-width:375px)"
                  />
                  <source
                    srcSet={item.preview?.desktop || ''}
                    media="(max-width:1023px)"
                  />
                  <source
                    srcSet={item.preview?.mobile || ''}
                    media="(max-width:1439px)"
                  />
                  <img
                    className={styles.preview}
                    src={item.preview?.desktop || ''}
                  />
                </picture>
                <div className={styles.label}>{item.title}</div>
              </div>
            </InfoSection>
          </Card>
        ))}
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

export default ZusatzmodulErweiterunPanelForm;
