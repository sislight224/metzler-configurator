import { ChangeEvent, FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import RadioGroup from '../../../../../components/common/RadioGroup/RadioGroup';
import InfoSection from '../../../components/InfoSection/InfoSection';
import Radio from '../../../../../components/common/Radio/Radio';
import styles from './BriefkastenPanel.module.scss';
import ColorList from '../../../../../components/ColorList/ColorList';
import GriffleisteColorList from '../../../../../data/GriffleisteColorList';
import Button from '../../../../../components/common/Button/Button';
import usePanelsStore, { useBriefkastenPanelStore } from '../../../../../hooks/store/usePanelsStore';
import BriefkastenType from '../../../../../enums/data/BriefkastenType';
import NamensschildList from './components/NamensschildList/NamensschildList';
import ButtonText from '../../../../../components/common/ButtonText/ButtonText';
import themeConfig from '../../../../../../styles/theme/config.module.scss';
import panelId from '../../../../../enums/PanelId';
import PanelId from '../../../../../enums/PanelId';
import { useAppSnackbar } from '../../../../../hooks/useAppSnackbar';
import { WindowId } from '../../../../../enums/WindowId';
import BriefkastenPanelState from '../../../../../stores/panels/BriefkastenPanelState';
import { useUndoRedoStore } from '../../../../../hooks/store/useUndoRedoStore';
import Colors from 'enums/data/Colors';

const BriefkastenPanelForm: FC = observer(() => {
  const {
    state,
    isCompleted,
    setIsCompleted,
  } = useBriefkastenPanelStore();

  const {
    setActivePanelId,
    setActiveWindowId,
    updateConfig,
    configId,
    nextStep,
    setNextPanel,
    getPanelsConfig,
    panelsConfig,
    updateBriefkastenPanelConfig,
  } = usePanelsStore();

  const { addStateRecord } = useUndoRedoStore();

  const {
    griffleisteColor,
    setGriffleisteColor,
    setBriefkasteType,
    briefkasteType,
    schriftart,
    setIsError,
    namensschildList,
    visibleBriefkasteType,
    compareConfig,
    setIsShowResetModal,
  } = state;

  const { enqueueErrorSnackbar } = useAppSnackbar({
    defaultErrorMessage: '',
  });

  const briefkasteTypeChangeHandler = useCallback((_: ChangeEvent<HTMLInputElement>, type: string) => {
    addStateRecord();
    setBriefkasteType(type as BriefkastenType);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [setBriefkasteType, isCompleted, panelsConfig]);

  const griffleisteColorHandler = useCallback((color: Colors) => {
    addStateRecord();
    setGriffleisteColor(color);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  const completeClickHandler = useCallback(() => {
    let error = false;

    if (briefkasteType === BriefkastenType.GRAVUR) {
      error = !!namensschildList.find((item) => !item.value);
    }

    setIsError(error);

    if (error) {
      enqueueErrorSnackbar('Bitte füllen Sie alle Felder aus');
      return;
    }

    addStateRecord();
    getPanelsConfig(configId)
      .then((response) => {
        nextStep();
        updateBriefkastenPanelConfig(state);
        updateConfig<BriefkastenPanelState>(configId, PanelId.BRIEFKASTEN, state, response.payload);
        if (!isCompleted) setIsCompleted(true);
        setNextPanel();
        setActivePanelId(panelId.TEXTLEISTE);
      });
  }, [isCompleted, namensschildList, briefkasteType, state, configId]);

  return (
    <div className={styles.root}>
      <RadioGroup
        name="BriefkasteType"
        value={briefkasteType}
        onChange={briefkasteTypeChangeHandler}
      >
        {visibleBriefkasteType && <div className={styles.radioGroup}>
          <InfoSection
            hintText="Nutzen Sie die Einsteckschilder mit Papiereinleger bei häufigem Mieterwechsel. Die Namensschilder können optional hintergrundbeleuchtet ausgeführt werden."
          >
            <Radio
              title="Einsteckschild mit Papiereinleger"
              value={BriefkastenType.PAPIEREINLEGER}
            />
          </InfoSection>
          <InfoSection
            hintText="Hochwertige Edelstahl-Schilder mit Lasergravur. Dauerhaft witterungsbeständig und exklusiv im Design. Ersatzschilder jederzeit erhältlich."
          >
            <Radio
              title="Namensschild mit Gravur"
              value={BriefkastenType.GRAVUR}
            />
          </InfoSection>
        </div>}
      </RadioGroup>
      <InfoSection hintText="Wählen Sie die gewünschte Ausführung des Briefkastengriffs. Beide Varianten sind stets im Lieferumfang enthalten und können nach belieben selbst getauscht werden">
        <span className={styles.textHeading}>Farbe der Griffleiste</span>
      </InfoSection>
      <ColorList
        colorList={GriffleisteColorList}
        activeColor={griffleisteColor}
        onSetColor={(color) => griffleisteColorHandler(color)}
      />
      {(BriefkastenType.GRAVUR === briefkasteType) && (
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

export default BriefkastenPanelForm;
