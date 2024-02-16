import { FC, useCallback, useEffect, useMemo } from "react";
import Button from "components/common/Button/Button";
import classNames from "./ConfirmConfiguration.module.scss";
import classnames from "classnames";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import usePanelsStore, {
  useInnestationPanelStore,
  useKlingeltableuPanelStore,
  useLichttasterPanelState,
  useMontagePanelStore,
  useRFIDPanelStore,
  useTextleistePanelStore,
  useZusatzmodulErweiterunPanelStore,
  useZusatzmodulPanelStore,
} from "hooks/store/usePanelsStore";
import { useEditorStore } from "../../../../../../hooks/store/useEditorStore";
import { WindowId } from "../../../../../../enums/WindowId";
import { useCalculatorStore } from "../../../../../../hooks/store/useCalculatorStore";
import MontageType from "../../../../../../enums/data/MontageType";
import BeschriftungNamensschild from "../../../../../../enums/data/BeschriftungNamensschild";
import { PriceTagType } from "../../../../../../data/InnenstationModulesList";
import { RFIDCardsEnum } from "../../../../../../stores/panels/RFIDPanelState";
import placementRules from "../../../../../../../public/configurator/json/placement_rules.json";

export const ConfirmConfiguration: FC = observer(() => {
  const { canSaveConfiguration, configId, isEditConfig, setActiveWindowId } =
    usePanelsStore();
  const { isInitialize, setPreview, isLoadingPreview } = useEditorStore();
  const router = useRouter();

  const { priceConfiguration } = useCalculatorStore();

  // todo: need refactoring

  const {
    state: { montageType, mailBoxesCount },
  } = useMontagePanelStore();

  const {
    state: { mailBoxesRanksCount, zusatzmodulType },
  } = useZusatzmodulPanelStore();

  const {
    isCompleted: klingIsCompleted,
    isActive: klingIsActive,
    state: {
      klingeltasterCount,
      beschriftungNamensschild,
      namensschildBeleuchtungEnabled,
      lichttasterEnabled,
    },
  } = useKlingeltableuPanelStore();

  const {
    state: { zusatzmodulErweiterung },
  } = useZusatzmodulErweiterunPanelStore();

  const {
    state: { hintergrundbeleuchtungIsEnabled, beschriftungOberhalbIsEnabled },
  } = useTextleistePanelStore();

  const {
    state: { innestationsModulesCount },
  } = useInnestationPanelStore();

  const {
    state: { RFIDCard },
  } = useRFIDPanelStore();

  const { countPriceOptions } = useCalculatorStore();

  const {
    state: { isLight },
  } = useLichttasterPanelState();

  const getHoleModules = useCallback(() => {
    const addonModule =
      zusatzmodulType.value !== "ohne" &&
      zusatzmodulType.value !== "klingetableu"
        ? "addon_module"
        : "no_addon_module";
    const allRows = placementRules[addonModule];
    const rows =
      allRows[
        `${mailBoxesRanksCount}-${mailBoxesCount}` as keyof typeof allRows
      ];
    return [rows.row_1, rows.row_2, rows.row_3]
      .flat(1)
      .filter((item) => item === "P").length;
  }, [zusatzmodulType, mailBoxesRanksCount, mailBoxesCount]);

  const getInnenstationCount = useCallback(
    (code: PriceTagType) => {
      return (
        innestationsModulesCount.find((value) => value.priceTag === code)
          ?.value ?? 0
      );
    },
    [innestationsModulesCount]
  );

  useEffect(() => {
    countPriceOptions("Montage", {
      einbetonieren: montageType === MontageType.EINBETONIEREN ? 1 : 0,
      aufputz: montageType === MontageType.WANDMONTAGE ? 1 : 0,
      anschrauben: montageType === MontageType.ANSCHRAUBEN ? 1 : 0,
    });

    countPriceOptions("BriefkastenModule", {
      blindModules: getHoleModules(),
      briefcastenModules: mailBoxesCount,
    });
  }, [mailBoxesCount, montageType, zusatzmodulType, mailBoxesRanksCount]);

  useEffect(() => {
    countPriceOptions("ZusatzErweiterung", {
      ohne: 0,
      Klingelanlagene: zusatzmodulType.value === "klingetableu" ? 1 : 0,
      Videogegensprechmodul:
        zusatzmodulType.value === "videoGegensprechmodul" ? 1 : 0,
      AudioGegensprechmodul:
        zusatzmodulType.value === "audioGegensprechmodul" ? 1 : 0,
    });
  }, [zusatzmodulType]);

  useEffect(() => {
    const isKlingOnZusatPanel = zusatzmodulType.value !== "ohne";

    const isTouchDisplay =
      zusatzmodulErweiterung.value === "touch_display" ||
      zusatzmodulErweiterung.value === "klingetaster_touchDisplay";

    const isKlingeltaster =
      zusatzmodulErweiterung.value === "klingetaster_rfid" ||
      zusatzmodulErweiterung.value === "klingetaster_touchDisplay" ||
      zusatzmodulErweiterung.value === "klingetaster";

    const klingCount =
      (klingIsCompleted && klingIsActive) || klingIsCompleted || klingIsActive
        ? klingeltasterCount
        : 0;

    countPriceOptions("ZusatzModule", {
      RFID: zusatzmodulErweiterung.value === "klingetaster_rfid" ? 1 : 0,
      TouchDisplay: isTouchDisplay ? 1 : 0,
      Klingeltaster:
        isKlingeltaster && isKlingOnZusatPanel ? klingeltasterCount : 0,
      NamensschildmitGravur:
        beschriftungNamensschild ===
        BeschriftungNamensschild.NAMENSSCHILD_MIT_GRAVUR
          ? klingCount
          : 0,
      EinsteckschildmitPapiereinleger:
        beschriftungNamensschild ===
        BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER
          ? klingCount
          : 0,
      NamensschildmitBeleuchtung: namensschildBeleuchtungEnabled
        ? klingCount
        : 0,
      Lichttaster: lichttasterEnabled || isLight ? 1 : 0,
    });
  }, [
    lichttasterEnabled,
    isLight,
    zusatzmodulType,
    namensschildBeleuchtungEnabled,
    klingeltasterCount,
    beschriftungNamensschild,
    zusatzmodulErweiterung,
    klingIsActive,
    klingIsCompleted,
  ]);

  useEffect(() => {
    countPriceOptions("InnenstationLANPOE", {
      InnenstationHomeWeibLanPoe: getInnenstationCount(
        "InnenstationHomeWeibLanPoe"
      ),
      InnenstationHomeSchwarzLanPoe: getInnenstationCount(
        "InnenstationHomeSchwarzLanPoe"
      ),
      InnenstationUltraSchwarz: getInnenstationCount(
        "InnenstationUltraSchwarz"
      ),
      InnenstationProGrau: getInnenstationCount("InnenstationProGrau"),
      InnenstationProSchwarzRose: getInnenstationCount(
        "InnenstationProSchwarzRose"
      ),
    });

    countPriceOptions("InnenstationDraht", {
      InnenstationHomeWeibDraht: getInnenstationCount(
        "InnenstationHomeWeibDraht"
      ),
      InnenstationHomeSchwarzDraht: getInnenstationCount(
        "InnenstationHomeSchwarzDraht"
      ),
    });
  }, [getInnenstationCount]);

  useEffect(() => {
    countPriceOptions("RFID", {
      regularCard: RFIDCard[RFIDCardsEnum.REGULAR]?.countModule ?? 0,
      exclusiveCard:
        RFIDCard[RFIDCardsEnum.SCHLUSSELANHANGER]?.countModule ?? 0,
    });

    countPriceOptions("Deckel", {
      deckel: 1,
    });

    countPriceOptions("Textleiste", {
      textleiste: beschriftungOberhalbIsEnabled ? 1 : 0,
      led: hintergrundbeleuchtungIsEnabled ? 1 : 0,
    });
  }, [
    beschriftungOberhalbIsEnabled,
    hintergrundbeleuchtungIsEnabled,
    RFIDCard[RFIDCardsEnum.REGULAR],
    RFIDCard[RFIDCardsEnum.SCHLUSSELANHANGER],
  ]);

  const saveClickHandler = useCallback(() => {
    if (!canSaveConfiguration) return;
    router.replace({
      pathname: "/summary",
      query: { uuid: configId, ...router.query },
    });
    setPreview();
  }, [canSaveConfiguration, configId]);

  const disabledButtonConfiguration = useMemo(() => {
    return !canSaveConfiguration || isLoadingPreview;
  }, [canSaveConfiguration, isLoadingPreview]);

  const editClickHandler = useCallback(() => {
    setActiveWindowId(WindowId.EDITABLE_MODAL);
  }, []);

  return (
    <div
      className={classnames(classNames.root, {
        [classNames.skeleton]: !isInitialize,
      })}
    >
      {isInitialize && (
        <>
          <div className={classNames.info}>
            <div className={classNames.label}>Gesamt</div>
            <div className={classNames.value}>
              <span className={classNames.price}>
                {priceConfiguration.toFixed(2)} €
              </span>
              <span className={classNames.vat}>Inkl. 19% MwSt.</span>
            </div>
          </div>
          <div className={classNames.buttonWrap}>
            {isEditConfig && (
              <Button
                label="Bestätigen"
                width="140px"
                onClick={saveClickHandler}
                disabled={disabledButtonConfiguration}
              />
            )}
            {!isEditConfig && (
              <Button label="Edit" width="70px" onClick={editClickHandler} />
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default ConfirmConfiguration;
