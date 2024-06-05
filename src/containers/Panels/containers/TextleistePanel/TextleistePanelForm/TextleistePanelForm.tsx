import { observer } from "mobx-react-lite";
import styles from "./TextleistePanelForm.module.scss";
import Switch from "components/common/Switch/Switch";
import usePanelsStore, {
  useTextleistePanelStore,
} from "hooks/store/usePanelsStore";
import { ChangeEvent, useCallback } from "react";
import Input from "components/common/Input/Input";
import RadioGroup from "components/common/RadioGroup/RadioGroup";
import Textausrichtung from "enums/data/Textausrichtung";
import Radio from "components/common/Radio/Radio";
import Button from "components/common/Button/Button";
import InfoSection from "../../../components/InfoSection/InfoSection";
import PanelId from "../../../../../enums/PanelId";
import TextleistePanelState from "../../../../../stores/panels/TextleistePanelState";
import { useUndoRedoStore } from "../../../../../hooks/store/useUndoRedoStore";
import { useAppSnackbar } from "../../../../../hooks/useAppSnackbar";
import Icon from "../../../../../components/common/Icons/Icon";

const TextleistePanelForm = observer(() => {
  const { setActivePanelId, updateConfig, configId, getPanelsConfig } =
    usePanelsStore();
  const { state, isCompleted, setIsCompleted } = useTextleistePanelStore();

  const {
    beschriftungOberhalbIsEnabled,
    beschriftung,
    textausrichtung,
    hintergrundbeleuchtungIsEnabled,
    isError,
    setBeschriftungOberhalbIsEnabled,
    setBeschriftung,
    setBeschriftungDefaultValue,
    setTextausrichtung,
    setIsError,
    setIsEnabled,
    setHintergrundbeleuchtungIsEnabled,
  } = state;

  const { addStateRecord } = useUndoRedoStore();

  const { enqueueErrorSnackbar } = useAppSnackbar({ defaultErrorMessage: "" });

  const beschriftungOberhalbChangeHandler = useCallback(
    (e) => {
      setIsEnabled(e.target.checked);
      addStateRecord();
      setBeschriftungOberhalbIsEnabled(!beschriftungOberhalbIsEnabled);
    },
    [beschriftungOberhalbIsEnabled, setBeschriftungOberhalbIsEnabled]
  );

  const beschriftungChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setBeschriftung(text);
    },
    [beschriftung, setBeschriftung]
  );

  const blurInputHandler = useCallback(() => {
    addStateRecord();
    if (!beschriftung.length) setBeschriftungDefaultValue("Metzler");
  }, [beschriftung]);

  const textausrichtungChangeHandler = useCallback(
    (_: ChangeEvent<HTMLInputElement>, value: string) => {
      addStateRecord();
      setTextausrichtung(value as Textausrichtung);
    },
    [textausrichtung, setTextausrichtung]
  );

  const hintergrundbeleuchtungChangeHandler = useCallback(() => {
    addStateRecord();
    setHintergrundbeleuchtungIsEnabled(!hintergrundbeleuchtungIsEnabled);
  }, [hintergrundbeleuchtungIsEnabled, setHintergrundbeleuchtungIsEnabled]);

  const completeClickHandler = useCallback(() => {
    console.log("hi");
    if (beschriftung.length === 0 && beschriftungOberhalbIsEnabled) {
      setIsError(true);
      enqueueErrorSnackbar("Bitte füllen Sie dieses Felder aus");
      return;
    }
    setIsError(false);
    addStateRecord();
    getPanelsConfig(configId).then((response) => {
      updateConfig<TextleistePanelState>(
        configId,
        PanelId.TEXTLEISTE,
        state,
        response.payload
      );
    });
    setActivePanelId(null);

    if (!isCompleted) setIsCompleted(true);
  }, [
    isCompleted,
    state,
    configId,
    beschriftung,
    beschriftungOberhalbIsEnabled,
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.switcher}>
        <InfoSection
          hintText="Eindrucksvolle 3D Beschriftungsleiste aus Edelstahl überhalb der Briefkastenanlage.
        Ideal für Gebäude- oder Straßennamen. Optional LED hinterleuchtet."
        >
          <Switch
            id="Beschriftung oberhalb"
            onChange={beschriftungOberhalbChangeHandler}
            checked={beschriftungOberhalbIsEnabled}
            label="Beschriftung oberhalb"
          />
        </InfoSection>
      </div>
      {beschriftungOberhalbIsEnabled && (
        <>
          <Input
            onFocus={() => setIsError(false)}
            suffixIcon={
              isError && <Icon name="warning" width={24} height={24} />
            }
            placeholder="Zum Beispiel: Gebäude- oder Straßennamen"
            value={beschriftung}
            hint="Bitte füllen Sie alle Felder aus"
            showHint={isError}
            theme={isError ? "error" : "default"}
            onChange={beschriftungChangeHandler}
            onBlur={blurInputHandler}
          />
          <div className={styles.section}>
            <div className={styles.text}>Теxtausrichtung</div>
            <RadioGroup
              name="Теxtausrichtung"
              value={textausrichtung}
              onChange={textausrichtungChangeHandler}
            >
              <Radio title="Mitte" value={Textausrichtung.MITTE} />
              <Radio title="Links" value={Textausrichtung.LINKS} />
              <Radio title="Rechts" value={Textausrichtung.RECHTS} />
            </RadioGroup>
          </div>
          <Switch
            id="LED Hintergrundbeleuchtung"
            onChange={hintergrundbeleuchtungChangeHandler}
            checked={hintergrundbeleuchtungIsEnabled}
            label="LED Hintergrundbeleuchtung"
          />
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

export default TextleistePanelForm;
