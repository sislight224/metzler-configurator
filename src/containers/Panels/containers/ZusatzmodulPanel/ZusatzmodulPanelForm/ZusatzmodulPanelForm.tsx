import styles from './ZusatzmodulPanelForm.module.scss';
import { observer } from 'mobx-react-lite';
import usePanelsStore, { useMontagePanelStore, useZusatzmodulPanelStore } from 'hooks/store/usePanelsStore';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import RadioGroup from 'components/common/RadioGroup/RadioGroup';
import Radio from 'components/common/Radio/Radio';
import ZusatzmodulPosition from 'enums/data/ZusatzmodulPosition';
import Button from 'components/common/Button/Button';
import ZusatzmodulsList from './components/ZusatzmodulsList';
import Slider from '../../../../../components/common/Slider/Slider';
import PanelId from '../../../../../enums/PanelId';
import InfoSection from '../../../components/InfoSection/InfoSection';
import ZusatzmodulPanelState from '../../../../../stores/panels/ZusatzmodulPanelState';
import { PanelList } from '../../../../../data/panelList';
import { useUndoRedoStore } from '../../../../../hooks/store/useUndoRedoStore';
import getNearestFreeRank from '../../../../../helpers/getNearestFreeRank';

const ZusatzmodulPanelForm = observer(() => {
  const {
    setActivePanelId,
    stepIndex,
    listPanels,
    updateConfig,
    getPanelsConfig,
    configId,
    activePanelId,
    setListPanels,
    nextStep,
    setNextPanel,
    updateZusatzmodulPanelConfig,
    setIsManifestation,
    isManifestation,
    panelsConfig,
  } = usePanelsStore();

  const {
    state: { mailBoxesCount },
  } = useMontagePanelStore();

  const { state, isCompleted, setIsCompleted } = useZusatzmodulPanelStore();
  const {
    zusatzmodulPosition,
    setZusatzmodulPosition,
    setMailBoxesRanksCount,
    mailBoxesRanksCount,
    zusatzmodulType,
    compareConfig,
    resetPanelConfig,
    isHasAddonModule,
    setIsShowResetModal,
  } = state;

  const {
    addStateRecord,
  } = useUndoRedoStore();

  useEffect(() => {
    if (activePanelId === PanelId.ZUSATZMODUL) {
      const step = PanelList[zusatzmodulType.value];
      if (step) setListPanels(step);
      else setListPanels(PanelList.klingetaster);
      nextStep();
    }
  }, [activePanelId, zusatzmodulType]);

  const mailBoxesCountRanksHandler = useCallback((_: ChangeEvent<HTMLInputElement>, value: string) => {
    addStateRecord();
    setMailBoxesRanksCount(Number(value));

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  const zusatzmodulPositionChangeHandler = useCallback((_: ChangeEvent<HTMLInputElement>, value: string) => {
    addStateRecord();
    setZusatzmodulPosition(value as ZusatzmodulPosition);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  const completeClickHandler = useCallback(() => {
    getPanelsConfig(configId)
      .then((response) => {
        addStateRecord();
        if (!isManifestation) {
          setIsManifestation(true);
        }
        updateZusatzmodulPanelConfig(state);
        updateConfig<ZusatzmodulPanelState>(configId, PanelId.ZUSATZMODUL, state, response.payload);
        const currentPanel = listPanels && listPanels[stepIndex];
        setNextPanel();
        setActivePanelId(currentPanel || null);
        resetPanelConfig();
        if (!isCompleted) setIsCompleted(true);
      });
  }, [isCompleted, listPanels, stepIndex, configId, state, isManifestation]);

  const countDisabledMarks = useMemo(() => {
    let result = [];

    switch (mailBoxesCount) {
      case 1: {
        result = isHasAddonModule ? [3] : [2, 3];
        break;
      }
      case 2: {
        result = [3];
        break;
      }
      case 3: {
        result = isHasAddonModule ? [3] : [];
        break;
      }
      case 4: {
        result = isHasAddonModule ? [] : [3];
        break;
      }
      case 5: {
        result = isHasAddonModule ? [1] : [];
        break;
      }
      case 6:
      case 7:
      case 8:
      case 9: {
        result = [1];
        break;
      }
      case 10: {
        result = isHasAddonModule ? [1, 2] : [1];
        break;
      }
      default: {
        result = [1, 2];
      }
    }

    if (result.includes(mailBoxesRanksCount)) {
      const newRank = getNearestFreeRank(result);
      setMailBoxesRanksCount(newRank);

      const isEqual = compareConfig(panelsConfig);
      if (!isEqual && isCompleted) {
        setIsShowResetModal(true);
      }
    }

    return result;
  }, [mailBoxesCount, isHasAddonModule, mailBoxesRanksCount]);

  return (
    <div className={styles.root}>
      <ZusatzmodulsList />
      {mailBoxesCount === 15 && <div className={styles.text}>
        Bitte beachten Sie, dass ab einer Anzahl von 15 Briefkästen kein Zusatzmodul mehr ausgewählt werden kann
      </div>}
      <div className={styles.zusatzmodulPosition}>
        <InfoSection hintText="Platzieren Sie das Zusatzmodul auf unserer virtuellen Bühne links oder rechts.
        Da die Lieferung in einzelnen Komponenten erfolgt ist die endgültige Ausrichtung auch nach der Bestellung bei der Endmontage frei."
        >
          <div className={styles.text}>Position des Zusatzmoduls</div>
        </InfoSection>
        <RadioGroup
          name="ZusatzmodulPosition"
          value={zusatzmodulPosition}
          onChange={zusatzmodulPositionChangeHandler}
        >
          <div className={styles.radioGroup}>
            <Radio
              disabled={mailBoxesCount === 15}
              title="Links"
              value={ZusatzmodulPosition.LINKS}
            />
            <Radio
              disabled={mailBoxesCount === 15}
              title="Rechts"
              value={ZusatzmodulPosition.RECHTS}
            />
          </div>
        </RadioGroup>
      </div>
      <div className={styles.divider} />
      <div className={styles.slider}>
        <div
          className={styles.text}
        >
          Anzahl der Reihen
        </div>
        <Slider
          disabledMarks={countDisabledMarks}
          value={mailBoxesRanksCount}
          onChange={mailBoxesCountRanksHandler}
          step={1}
          max={3}
          isSwitch
        />
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

export default ZusatzmodulPanelForm;
