import { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import RadioGroup from '../../../../../components/common/RadioGroup/RadioGroup';
import Radio from '../../../../../components/common/Radio/Radio';
import styles from './InnenstationPanel.module.scss';
import Button from '../../../../../components/common/Button/Button';
import usePanelsStore, {
  useInnestationPanelStore, useKlingeltableuPanelStore,
  useZusatzmodulErweiterunPanelStore,
} from '../../../../../hooks/store/usePanelsStore';
import InnenstationType from '../../../../../enums/data/InnenstationType';
import InnestationModule from './components/InnestationModule';
import classnames from 'classnames';
import PanelId from '../../../../../enums/PanelId';
import { useAppSnackbar } from '../../../../../hooks/useAppSnackbar';
import InnenstationPanelState from '../../../../../stores/panels/InnenstationPanelState';
import { useUndoRedoStore } from '../../../../../hooks/store/useUndoRedoStore';

const InnenstationPanelForm: FC = observer(() => {
  const {
    state: innestationState,
    isCompleted,
    setIsCompleted,
  } = useInnestationPanelStore();

  const { enqueueErrorSnackbar } = useAppSnackbar({
    defaultErrorMessage: '',
  });

  const { state: zusatzmodulErweiterunState } = useZusatzmodulErweiterunPanelStore();

  const {
    setActivePanelId,
    activePanelId,
    nextStep,
    listPanels,
    getPanelsConfig,
    configId,
    setNextPanel,
    updateConfig,
    stepIndex,
    updateInnenstationPanelConfig,
    panelsConfig,
  } = usePanelsStore();

  const { state: klingeltableuState } = useKlingeltableuPanelStore();

  const {
    innenstationType,
    setInnenstationType,
    minimumCountModules,
    setMinimumCountModules,
    currentCountModules,
    setErrorStatus,
    compareConfig,
    setIsShowResetModal,
    isError,
  } = innestationState;

  const {
    addStateRecord,
  } = useUndoRedoStore();

  const { klingeltasterCount } = klingeltableuState;

  const {
    zusatzmodulErweiterung,
  } = zusatzmodulErweiterunState;

  useEffect(() => {
    if (zusatzmodulErweiterung.value === 'touch_display') setMinimumCountModules(1);
    else setMinimumCountModules(klingeltasterCount);
  }, [zusatzmodulErweiterung, klingeltasterCount]);

  useEffect(() => {
    if (activePanelId === PanelId.INNENSTATION) nextStep();
  }, [activePanelId]);

  const completeClickHandler = useCallback(() => {
    if (currentCountModules < minimumCountModules) {
      setErrorStatus(true);
      enqueueErrorSnackbar(`Bitte wählen Sie mindestens ${minimumCountModules} Innenstationen aus`);
      return;
    }

    getPanelsConfig(configId)
      .then((response) => {
        addStateRecord();
        updateInnenstationPanelConfig(innestationState);
        updateConfig<InnenstationPanelState>(configId, PanelId.INNENSTATION, innestationState, response.payload);
        if (!isCompleted) {
          setIsCompleted(true);
          setErrorStatus(false);
        }
        setNextPanel();
        const currentPanel = listPanels && listPanels[stepIndex];
        setActivePanelId(currentPanel || null);
      });
  }, [
    isCompleted,
    currentCountModules,
    minimumCountModules,
    listPanels,
    configId,
    innestationState,
    stepIndex]);

  useEffect(() => {
    if (currentCountModules > minimumCountModules - 1) setErrorStatus(false);
  }, [currentCountModules, minimumCountModules]);

  const innenstationTypeChangeHandler = useCallback((_: ChangeEvent<HTMLInputElement>, type: string) => {
    addStateRecord();
    setInnenstationType(type as InnenstationType);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [setInnenstationType, panelsConfig, isCompleted]);

  return (
    <div className={styles.root}>
      <div className={styles.heading}>Anschlussart</div>
      <RadioGroup
        name="InnenstationType"
        value={innenstationType}
        onChange={innenstationTypeChangeHandler}
      >
        <Radio
          title="2-Draht IP"
          value={InnenstationType.DRAHT}
        />
        <Radio
          title="LAN/PoE IP"
          value={InnenstationType.LAN_POE}
        />
      </RadioGroup>
      <div className={styles.module_description_block}>
        <div className={styles.module_description_block_text}>
          {`Wählen Sie mindestens ${minimumCountModules}`}
        </div>
        <div className={classnames(
          styles.module_description_block_text,
          { [styles.module_description_block_error]: isError },
        )}
        >
          Ausgewählt &nbsp;
          <span className={classnames(
            styles.module_description_block_index,
            { [styles.module_description_block_error]: isError },
          )}
          >
            {currentCountModules}
          </span>
        </div>
      </div>
      <InnestationModule />
      {isError && (
      <div className={styles.error}>
        {`Bitte wählen Sie mindestens ${minimumCountModules} Innenstationen aus`}
      </div>)}
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

export default InnenstationPanelForm;
