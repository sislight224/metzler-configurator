import styles from './KlingeltableuPanelForm.module.scss';
import Slider from 'components/common/Slider/Slider';
import { observer } from 'mobx-react-lite';
import usePanelsStore, { useKlingeltableuPanelStore } from 'hooks/store/usePanelsStore';
import Switch from 'components/common/Switch/Switch';
import { ChangeEvent, useCallback, useEffect } from 'react';
import ColorList from '../../../../../components/ColorList/ColorList';
import RadioGroup from 'components/common/RadioGroup/RadioGroup';
import Radio from 'components/common/Radio/Radio';
import BeschriftungNamensschild from 'enums/data/BeschriftungNamensschild';
import ButtonText from 'components/common/ButtonText/ButtonText';
import themeConfig from '../../../../../../styles/theme/config.module.scss';
import NamensschildList from './components/NamensschildList/NamensschildList';
import Button from 'components/common/Button/Button';
import BeleuchtungColorList from '../../../../../data/BeleuchtungColorList';
import PanelId from '../../../../../enums/PanelId';
import InfoSection from '../../../components/InfoSection/InfoSection';
import { useAppSnackbar } from '../../../../../hooks/useAppSnackbar';
import { WindowId } from '../../../../../enums/WindowId';
import KlingetableuPanelState from '../../../../../stores/panels/KlingetableuPanelState';
import { useUndoRedoStore } from '../../../../../hooks/store/useUndoRedoStore';
import Colors from 'enums/data/Colors';

const KlingeltableuPanelForm = observer(() => {
  const {
    setActivePanelId,
    listPanels,
    stepIndex,
    nextStep,
    activePanelId,
    setActiveWindowId,
    configId,
    updateConfig,
    setNextPanel,
    getPanelsConfig,
    updateKlingeltableuPanelConfig,
    panelsConfig,
  } = usePanelsStore();

  const { state: klingState, isCompleted, setIsCompleted } = useKlingeltableuPanelStore();

  const {
    klingeltasterCount,
    beleuchtungDerKlingeltasterEnabled,
    beschriftungNamensschild,
    namensschildBeleuchtungEnabled,
    setKlingeltasterCount,
    setBeleuchtungDerKlingeltasterEnabled,
    setBeschriftungNamensschild,
    setNamensschildBeleuchtungEnabled,
    schriftart,
    beleuchtungColor,
    namensschildList,
    setBeleuchtungColor,
    setIsError,
    resetNamensschildList,
    setIsShowResetModal,
    compareConfig,
    setLichttasterEnabled,
    lichttasterEnabled,
  } = klingState;

  const {
    addStateRecord,
  } = useUndoRedoStore();

  const { enqueueErrorSnackbar } = useAppSnackbar({
    defaultErrorMessage: '',
  });

  const klingeltasterCountChangeHandler = useCallback((_: ChangeEvent<HTMLInputElement>, value: string) => {
    setKlingeltasterCount(Number(value));
    setIsError(false);
    addStateRecord();

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [setKlingeltasterCount, panelsConfig, isCompleted]);

  const beleuchtungDerKlingeltasterChangeHandler = useCallback(() => {
    addStateRecord();
    setBeleuchtungDerKlingeltasterEnabled(!beleuchtungDerKlingeltasterEnabled);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [beleuchtungDerKlingeltasterEnabled, setBeleuchtungDerKlingeltasterEnabled, panelsConfig, isCompleted]);

  const beschriftungNamensschildChangeHandler = useCallback((_: ChangeEvent<HTMLInputElement>, value: string) => {
    addStateRecord();
    setBeschriftungNamensschild(value as BeschriftungNamensschild);

    if (value === BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER) {
      resetNamensschildList();
    }

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [setBeschriftungNamensschild, panelsConfig, isCompleted]);

  useEffect(() => {
    if (activePanelId === PanelId.KLINGETABLEU) nextStep();
  }, [activePanelId]);

  const namensschildBeleuchtungEnabledChangeHandler = useCallback(() => {
    addStateRecord();
    setNamensschildBeleuchtungEnabled(!namensschildBeleuchtungEnabled);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [namensschildBeleuchtungEnabled, setNamensschildBeleuchtungEnabled, panelsConfig, isCompleted]);

  const beleuchtungColorHandler = useCallback((value: Colors) => {
    addStateRecord();
    setBeleuchtungColor(value);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  const completeClickHandler = useCallback(() => {
    let error;

    if (beschriftungNamensschild === BeschriftungNamensschild.NAMENSSCHILD_MIT_GRAVUR) {
      error = namensschildList.find((item) => !item.value);
    }

    setIsError(!!error);

    if (error) {
      enqueueErrorSnackbar('Bitte füllen Sie alle Felder aus');
      return;
    }

    getPanelsConfig(configId)
      .then((response) => {
        addStateRecord();
        updateKlingeltableuPanelConfig(klingState);
        updateConfig<KlingetableuPanelState>(configId, PanelId.KLINGETABLEU, klingState, response.payload);
        if (!isCompleted) {
          setIsCompleted(true);
        }
        setNextPanel();
        const currentPanel = listPanels && listPanels[stepIndex];
        setActivePanelId(currentPanel || null);
      });
  }, [
    isCompleted,
    listPanels,
    stepIndex,
    namensschildList,
    beschriftungNamensschild,
    configId,
    klingState,
  ]);

  useEffect(() => {
    if (klingeltasterCount > 12) {
      setBeschriftungNamensschild(BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER);
    }
  }, [klingeltasterCount]);

  const lichttasterEnabledChangeHandler = useCallback(() => {
    setLichttasterEnabled(!lichttasterEnabled);
    addStateRecord();

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [lichttasterEnabled, setLichttasterEnabled, isCompleted, panelsConfig]);

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <div className={styles.label}>
          Anzahl der Klingeltaster
        </div>
        <Slider
          value={klingeltasterCount}
          onChange={klingeltasterCountChangeHandler}
          max={15}
        />
        <InfoSection hintText="Beleuchtete LED-Ringe der Edelstahl Klingeltaster weißen Besuchern den Weg zur richtigen Klingel. Die Klingeltaster sind dauerbeleuchtet.">
          <Switch
            onChange={beleuchtungDerKlingeltasterChangeHandler}
            checked={beleuchtungDerKlingeltasterEnabled}
            label="Beleuchtung der Klingeltaster"
          />
        </InfoSection>
      </div>
      {beleuchtungDerKlingeltasterEnabled
        && <ColorList
          colorList={BeleuchtungColorList}
          activeColor={beleuchtungColor}
          onSetColor={beleuchtungColorHandler}
        />}
      <div className={styles.divider} />
      <div className={styles.section}>
        <div className={styles.label}>
          Beschriftung Namensschild
        </div>
        <RadioGroup
          name="MontageType"
          value={beschriftungNamensschild}
          onChange={beschriftungNamensschildChangeHandler}
        >
          <div className={styles.radioGroup}>
            <InfoSection hintText="Nutzen Sie die Einsteckschilder mit Papiereinleger bei häufigem Mieterwechsel. Die Namensschilder können optional hintergrundbeleuchtet ausgeführt werden.">
              <Radio
                title="Einsteckschild mit Papiereinleger"
                value={BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER}
              />
            </InfoSection>
            <InfoSection hintText="Gleichmäßige Hintegrundbeleuchtung der Namensschilder mittels ">
              <Radio
                title="Namensschild mit Gravur"
                value={BeschriftungNamensschild.NAMENSSCHILD_MIT_GRAVUR}
                disabled={klingeltasterCount > 12}
              />
            </InfoSection>
          </div>
        </RadioGroup>
      </div>
      {beschriftungNamensschild === BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER && <div className={styles.section}>
        <InfoSection hintText="Hochwertige Edelstahl-Schilder mit Lasergravur. Dauerhaft witterungsbeständig und exklusiv im Design. Ersatzschilder jederzeit erhältlich.">
          <Switch
            id="namensschildBeleuchtung"
            onChange={namensschildBeleuchtungEnabledChangeHandler}
            checked={namensschildBeleuchtungEnabled}
            label="Namensschild Beleuchtung"
          />
        </InfoSection>
      </div>}
      {beschriftungNamensschild === BeschriftungNamensschild.NAMENSSCHILD_MIT_GRAVUR && (
        <>
          <div className={styles.section}>
            <div className={styles.schriftartAndernContainer}>
              <ButtonText
                onClick={() => setActiveWindowId(WindowId.SCHRIFTART_MODAL)}
                label="Schriftart ändern:"
                background={themeConfig.bannerGreen}
              />
              {schriftart}
            </div>
          </div>
          <NamensschildList />
        </>
      )}
      <div className={styles.divider} />
      <InfoSection
        hintText="Lichttaster für Stromstoßschalter, ideal für Eingangs- oder Hausflurbeleuchtung. Mit LED-Ring und hinterleuchtetem Licht-Symbol."
      >
        <Switch
          id="lichttaster"
          onChange={lichttasterEnabledChangeHandler}
          checked={lichttasterEnabled}
          label="Lichttaster"
        />
      </InfoSection>
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

export default KlingeltableuPanelForm;
