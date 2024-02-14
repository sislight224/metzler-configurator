import { FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './RFIDPanel.module.scss';
import Button from '../../../../../components/common/Button/Button';
import usePanelsStore, { useKlingeltableuPanelStore, useRFIDPanelStore } from '../../../../../hooks/store/usePanelsStore';
import RFIDModule from './components/RFIDModule';
import RFIDPanelState, { RFIDCardsEnum } from '../../../../../stores/panels/RFIDPanelState';
import RFIDCardPicture from '../../../../../assets/RFID/RFIDCard.png';
import Schlusselanhanger from '../../../../../assets/RFID/Schlusselanhanger.png';
import PanelId from '../../../../../enums/PanelId';
import { useUndoRedoStore } from '../../../../../hooks/store/useUndoRedoStore';

const RFIDPanelForm: FC = observer(() => {
  const {
    state: RFIDState,
    isCompleted,
    setIsCompleted,
  } = useRFIDPanelStore();

  const {
    state: klingState,
  } = useKlingeltableuPanelStore();

  const {
    setActivePanelId,
    updateConfig,
    setNextPanel,
    nextStep,
    configId,
    getPanelsConfig,
    panelsConfig,
    updateRFIDPanelConfig,
  } = usePanelsStore();

  const {
    getDataCard,
    setDataCard,
    compareConfig,
    setIsShowResetModal,
  } = RFIDState;

  const {
    addStateRecord,
  } = useUndoRedoStore();

  const { klingeltasterCount } = klingState;

  const completeClickHandler = useCallback(() => {
    getPanelsConfig(configId)
      .then((response) => {
        addStateRecord();
        nextStep();
        setNextPanel();
        updateRFIDPanelConfig(RFIDState);
        updateConfig<RFIDPanelState>(configId, PanelId.RFID, RFIDState, response.payload);
        setActivePanelId(PanelId.BRIEFKASTEN);
        if (!isCompleted) setIsCompleted(true);
      });
  }, [isCompleted, RFIDState]);

  useEffect(() => {
    setDataCard({
      moduleName: RFIDCardsEnum.EXCLUSIVE,
      countModule: klingeltasterCount,
      modulePrice: '0,00',
    });
  }, [klingeltasterCount]);

  const changeRFIDDataHandler = useCallback((cardName: RFIDCardsEnum, count: number, cardPrice: string) => {
    addStateRecord();
    setDataCard({
      moduleName: cardName,
      countModule: count,
      modulePrice: cardPrice,
    });

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  return (
    <div className={styles.root}>
      <RFIDModule
        cardPreview={RFIDCardPicture.src}
        onChangeModulesCount={changeRFIDDataHandler}
        modulePrice={getDataCard(RFIDCardsEnum.EXCLUSIVE)?.modulePrice || '0'}
        moduleName={RFIDCardsEnum.EXCLUSIVE}
        title="RFID Karte"
        moduleCount={getDataCard(RFIDCardsEnum.EXCLUSIVE)?.countModule || 0}
      />
      <RFIDModule
        cardPreview={RFIDCardPicture.src}
        onChangeModulesCount={changeRFIDDataHandler}
        modulePrice={getDataCard(RFIDCardsEnum.REGULAR)?.modulePrice || '0'}
        title="RFID Karte"
        moduleName={RFIDCardsEnum.REGULAR}
        moduleCount={getDataCard(RFIDCardsEnum.REGULAR)?.countModule || 0}
      />
      <RFIDModule
        cardPreview={Schlusselanhanger.src}
        onChangeModulesCount={changeRFIDDataHandler}
        modulePrice={getDataCard(RFIDCardsEnum.SCHLUSSELANHANGER)?.modulePrice || '0'}
        moduleName={RFIDCardsEnum.SCHLUSSELANHANGER}
        title="RFID Schlüsselanhänger"
        moduleCount={getDataCard(RFIDCardsEnum.SCHLUSSELANHANGER)?.countModule || 0}
      />
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

export default RFIDPanelForm;
