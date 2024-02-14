import styles from './MontagePanelForm.module.scss';
import { ChangeEvent, useCallback } from 'react';
import RadioGroup from 'components/common/RadioGroup/RadioGroup';
import Radio from 'components/common/Radio/Radio';
import Button from 'components/common/Button/Button';
import Slider from 'components/common/Slider/Slider';
import { observer } from 'mobx-react-lite';
import usePanelsStore, {
  useBriefkastenPanelStore,
  useKlingeltableuPanelStore,
  useMontagePanelStore,
  useZusatzmodulPanelStore,
} from 'hooks/store/usePanelsStore';
import MontageType from 'enums/data/MontageType';
import InfoSection from 'containers/Panels/components/InfoSection/InfoSection';
import PanelId from '../../../../../enums/PanelId';
import MontagePanelState from '../../../../../stores/panels/MontagePanelState';
import { useUndoRedoStore } from '../../../../../hooks/store/useUndoRedoStore';
import updateRanks from '../../../../../helpers/updateRanks';

const MontagePanelForm = observer(() => {
  const {
    updateConfig,
    configId,
    getPanelsConfig,
    setActivePanelId,
    updateMontagePanelConfig,
    panelsConfig,
  } = usePanelsStore();

  const { isCompleted, setIsCompleted, state, nextPanel } = useMontagePanelStore();
  const { state: { setMailBoxesRanksCount, isHasAddonModule } } = useZusatzmodulPanelStore();

  const { state: { setKlingeltasterCount, klingeltasterCount } } = useKlingeltableuPanelStore();
  const { state: { setIsError } } = useBriefkastenPanelStore();

  const {
    montageType,
    setMontageType,
    mailBoxesCount,
    setMailBoxesCount,
    compareConfig,
    setIsShowResetModal,
  } = state;

  const {
    addStateRecord,
  } = useUndoRedoStore();

  const montageTypeChangeHandler = useCallback((_: ChangeEvent<HTMLInputElement>, value: string) => {
    const type = value as MontageType;
    addStateRecord();
    setMontageType(type);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [montageType, panelsConfig, isCompleted]);

  const mailBoxesCountChangeHandler = useCallback((_: ChangeEvent<HTMLInputElement>, value: string) => {
    addStateRecord();
    const mailCount = Number(value);
    setMailBoxesCount(mailCount);
    setKlingeltasterCount(mailCount);

    updateRanks(
      mailCount,
      isHasAddonModule,
      setMailBoxesRanksCount,
    );

    setIsError(false);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [klingeltasterCount, panelsConfig, isCompleted, isHasAddonModule]);

  const completeClickHandler = useCallback(() => {
    getPanelsConfig(configId).then((response) => {
      addStateRecord();
      updateMontagePanelConfig(state);

      updateConfig<MontagePanelState>(configId, PanelId.MONTAGE, state, response.payload);
      if (!isCompleted) setIsCompleted(true);
      if (nextPanel) setActivePanelId(nextPanel.state.panelId);
    });
  }, [isCompleted, configId, state, nextPanel, mailBoxesCount]);

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <div className={styles.montageContainer}>
          <div className={styles.text}>Auswahl der Montageart</div>
          <RadioGroup
            name="montageType"
            value={montageType}
            onChange={montageTypeChangeHandler}
          >
            <div className={styles.radioGroup}>
              <InfoSection hintText="Betonieren Sie den Standfuß für einen sicheren Halt mit ein. Dies ist vor allem dann ideal, wenn das Fundament des Sockels noch nicht gegossen wurde">
                <Radio
                  title="Freistehend mit Standfuß zum Einbetonieren"
                  value={MontageType.EINBETONIEREN}
                />
              </InfoSection>
              <InfoSection hintText="Schrauben Sie den Standfuß mit unseren speziellen Betonankern auf ein vorhandenes Betonfundament an.">
                <Radio
                  title="Freistehend mit Standfuß zum Anschrauben"
                  value={MontageType.ANSCHRAUBEN}
                />
              </InfoSection>
              <InfoSection hintText="Befestigen Sie die modulare Briefkastenanlage direkt an der Fassade.">
                <Radio
                  title="Wandmontage Aufputz"
                  value={MontageType.WANDMONTAGE}
                />
              </InfoSection>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.section}>
        <div className={styles.mailBoxesContainer}>
          <div className={styles.text}>
            Anzahl der Briefkästen
          </div>
          <Slider
            value={mailBoxesCount}
            onChange={mailBoxesCountChangeHandler}
            step={1}
            max={15}
          />
        </div>
        <div className={styles.text}>
          Die Anordnung der Briefkästen kann im nächsten Schritt gewählt werden
        </div>
        <div className={styles.saveButton}>
          <Button
            label="Weiter"
            cn="buttonPanelWidth"
            onClick={completeClickHandler}
          />
        </div>
      </div>
    </div>
  );
});

export default MontagePanelForm;
