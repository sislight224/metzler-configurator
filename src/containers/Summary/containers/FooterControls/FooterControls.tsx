import styles from "./FooterControls.module.scss";
import ConfirmConfiguration from "../../components/ConfirmConfiguration/ConfirmConfiguration";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import usePanelsStore from "../../../../hooks/store/usePanelsStore";
import { useAppSnackbar } from "../../../../hooks/useAppSnackbar";
import ModelControls from "../ModelControls/ModelControls";
import { useUndoRedoStore } from "../../../../hooks/store/useUndoRedoStore";
import { useRouter } from "next/router";

const montage = {
  "Freistehend mit Standfuß zum Einbetonieren": {
    url: "Erweiterung-des-StandfuAYes-zum-Einbetonieren",
    id: 22,
  },
  "Freistehend mit Standfuß zum Anschrauben": {
    url: "StandfuAY-zum-Anschrauben",
    id: 21,
  },
};

const briefkasten = {
  "Einsteckschild mit Papiereinleger": {
    url: "Briefkasten-BK212-mit-austauschbarem-Namensschild",
    id: 2,
  },
  "Namensschild mit Gravur": {
    url: "Briefkasten-BK212-mit-graviertem-Namensschild",
    id: 3,
  },
};

const blindModule = {
  url: "Briefkasten-BK212-Blindmodul",
  id: 10,
};

const zusatzmodule = {
  "einsteckschild_mit_papiereinleger ": {
    Klingelanlage: {
      url: "Hauptmodul-BK212-Klingeltableau-mit-austauschbaren-Namensschildern",
      id: 4,
    },
    "Video Gegensprechmodul": {
      url: "Hauptmodul-BK212-Videomodul-mit-austauschbaren-Namensschildern",
      id: 6,
    },
    "Audio Gegensprechmodul": {
      url: "Hauptmodul-BK212-Audiomodul-mit-austauschbaren-Namensschildern",
      id: 8,
    },
  },
  namensschild_mit_gravur: {
    Klingelanlage: {
      url: "Hauptmodul-BK212-Klingeltableau-mit-gravierten-Namensschildern",
      id: 5,
      // from 48
    },
    "Video Gegensprechmodul": {
      url: "Hauptmodul-BK212-Videomodul-mit-gravierten-Namensschildern",
      id: 7,
      // from 33
    },
    "Audio Gegensprechmodul": {
      url: "Hauptmodul-BK212-Audiomodul-mit-gravierten-Namensschildern",
      id: 9,
      // from 18
    },
  },
};

const extraFields = {
  klingelanlage: {
    namensschild_mit_gravur: {
      Klingelanlage: 48,
      "Video Gegensprechmodul": 33,
      "Audio Gegensprechmodul": 18,
    },
  },
};

const klingertaster = {
  Gelb: {
    url: "Klingeltaster-A19mm-mit-gelber-LED-Beleuchtung",
    id: 17,
  },
  Rot: {
    url: "Klingeltaster-A19mm-mit-roter-LED-Beleuchtung",
    id: 14,
  },
  Weiß: {
    url: "Klingeltaster-A19mm-mit-weiAYer-LED-Beleuchtung",
    id: 13,
  },
  Blau: {
    url: "Klingeltaster-A19mm-mit-blauer-LED-Beleuchtung",
    id: 16,
  },
  Grün: {
    url: "Klingeltaster-A19mm-mit-grAner-LED-Beleuchtung",
    id: 15,
  },
};

const innenstation = {
  "LAN/PoE IP": {
    "Metzler VDM10 2.0 Innenstation Home, weiß": {
      url: "Metzler-VDM10-20-Innenstation-Home-weiAY",
      id: "30",
    },
    "Metzler VDM10 2.0 Innenstation Home, schwarz": {
      url: "Metzler-VDM10-20-Innenstation-Home-schwarz",
      id: "31",
    },
    "Metzler VDM10 2.0 Innenstation Ultra, schwarz": {
      url: "Metzler-VDM10-20-Innenstation-Ultra-schwarz",
      id: "32",
    },
    "Metzler VDM10 2.0 Innenstation Pro, grau": {
      url: "Metzler-VDM10-20-Innenstation-Pro-grau",
      id: "33",
    },
    "Metzler VDM10 2.0 Innenstation Pro, schwarz - rose": {
      url: "Metzler-VDM10-20-Innenstation-Pro-schwarz-rose",
      id: "34",
    },
  },
  "2-Draht IP": {
    "Metzler VDM10 2.0 Innenstation Home, weiß": {
      url: "Metzler-VDM10-20-Innenstation-Home-weiAY_1",
      id: "35",
    },
    "Metzler VDM10 2.0 Innenstation Home, schwarz": {
      url: "Metzler-VDM10-20-Innenstation-Home-schwarz_1",
      id: "36",
    },
  },
};

const lichttaster = {
  url: "Lichttaster",
  id: 29,
};

const namensschild = {
  "Einsteckschild mit Papiereinleger": {
    url: "Namensschild-mit-Papiereinleger",
    id: 19,
  },
  "Namensschild mit Gravur": {
    url: "Edelstahl-Namensschild-mit-individueller-Gravur",
    id: 18,
    extraFieldId: 62,
  },
};

const zusatzmodulExtension = {
  "Klingeltaster & RFID": {
    url: "RFID",
    id: 28,
  },
  "Klingeltaster & Touch Display": {
    url: "VDM10-IPS-Touch-Display-Module",
    id: 12,
  },
};

const rfid = {
  hanger: {
    url: "Metzler-VDM10-SchlAsselanhAnger-RFID-Leder",
    id: 38,
  },
  card: {
    url: "Metzler-VDM10-RFID-Karte-Anthrazit",
    id: 37,
  },
};

const Text3D = {
  mitte: {
    url: "3D-Textleiste",
    id: "39",
  },
  links: {
    url: "3D-Textleiste-Links-Ja",
    id: "44",
  },
  rechts: {
    url: "3D-Textleiste-Rechts-Ja",
    id: "46",
  },
};

const modulePosition = {
  rechts: {
    url: "Modulposition-rechts",
    id: "48",
  },
  links: {
    url: "Modulposition-links",
    id: "47",
  },
};

const Text3DLed = {
  url: "Led-Hintergrundbeleuchtung",
  id: "40",
};

const TEXT_3D_EXTRAFIELD = "eigenschaftwert[16]";

const deckel = {
  [`1`]: {
    url: "Deckel-fAr-1-Briefkasten",
    id: 23,
  },
  [`2`]: {
    url: "Deckel-fAr-2-Briefkasten",
    id: 24,
  },
  [`3`]: {
    url: "Deckel-fAr-3-Briefkasten",
    id: 25,
  },
  [`4`]: {
    url: "Deckel-fAr-4-Briefkasten",
    id: 26,
  },
  [`5`]: {
    url: "Deckel-fAr-5-Birefkasten",
    id: 27,
  },
};

const fontIds = {
  "0": "50",
  "1": "51",
  "2": "52",
  "3": "53",
  "4": "54",
  "5": "55",
  "6": "56",
  "7": "57",
  "8": "58",
  "9": "59",
  "10": "60",
  "12": "61",
  "15": "62",
  "16": "63",
  "17": "64",
  "18": "65",
};

const FooterControls = observer(() => {
  const {
    orderPanelsConfig,
    configId,
    setIsOrderConfig,
    getState,
    activePanelId,
    getAllStates,
  } = usePanelsStore();

  const { enqueueErrorSnackbar } = useAppSnackbar({
    defaultErrorMessage: "",
  });

  const router = useRouter();

  const { cleanUndoRedo } = useUndoRedoStore();

  const confirmConfigurationHandler = useCallback(() => {
    /* orderPanelsConfig(configId)
     *   .then(() => {
     *     setIsOrderConfig(true);
     *     cleanUndoRedo();
     *     alert("Order placed");
     *   })
     *   .catch((error) => {
     *     enqueueErrorSnackbar(error.message);
     *   }); */
  }, [configId]);

  return (
    <div className={styles.root}>
      <div className={styles.modelControls}>
        <ModelControls />
      </div>
      <ConfirmConfiguration
        onConfirm={async () => {
          const states = getAllStates();
          console.log(states);
          const montageProduct = montage[states.montage.montageType];
          const briefcaseAmount = states.montage["mailBoxesCount"];
          const rowAmount = states.zusatzmodule["mailBoxesRanksCount"];

          const zuzatsModuleType = states.zusatzmodule.zusatzmodulType.title;
          const zusatzModulePosition = states.zusatzmodule.zusatzmodulPosition;

          const zusatzmodulErweiterun =
            states.zusatzmodulErweiterun.zusatzmodulErweiterung.title;

          const blindModuleAmount =
            briefcaseAmount % (rowAmount + zuzatsModuleType !== "Ohne" ? 1 : 0);

          const totalItems = briefcaseAmount + blindModuleAmount;
          const itemsPerRow = Math.ceil(totalItems / rowAmount);
          const deckelAmount = Math.ceil(totalItems / itemsPerRow);

          const briefkastenType = states.briefkasten.briefkasteType;

          const klingeltasterCount = states.klingelanlage.klingeltasterCount;
          const beleuchtungColor = states.klingelanlage.beleuchtungColor;

          const lichtTasterEnabled = states.klingelanlage.lichttasterEnabled;

          const namensschildBeleuchtungEnabled =
            states.klingelanlage.namensschildBeleuchtungEnabled;

          const klingelanlageType =
            states.klingelanlage.beschriftungNamensschild;

          const innenstationItems =
            states.innenstation.innestationsModulesCount.filter(
              (item: any) => item.value > 0
            );

          const rfidCard = states.rfid.RFIDCard;

          const textleiste = states.textleiste;

          let products = [];

          if (deckelAmount > 1) {
            products.push({
              url: deckel[itemsPerRow].url,
              amount: deckelAmount,
              id: deckel[itemsPerRow].id,
            });
          }

          if (lichtTasterEnabled) {
            products.push({
              url: lichttaster.url,
              amount: 1,
              id: lichttaster.id,
            });
          }

          if (klingeltasterCount > 0) {
            products.push({
              url: klingertaster[beleuchtungColor].url,
              amount: klingeltasterCount,
              id: klingertaster[beleuchtungColor].id,
            });
          }

          if (namensschildBeleuchtungEnabled) {
            products.push({
              url: "Namensschild-LED-Beleuchtung",
              amount: klingeltasterCount,
              id: 20,
            });
          }

          if (zuzatsModuleType !== "Ohne") {
            const extraFieldIndex =
              extraFields?.klingelanlage?.[klingelanlageType][
                zuzatsModuleType
              ] ?? 0;
            products.push({
              url: zusatzmodule[klingelanlageType][zuzatsModuleType].url,
              amount: 1,
              id: zusatzmodule[klingelanlageType][zuzatsModuleType].id,
              extraFields: states.klingelanlage.namensschildList.map(
                (item, index) => [
                  `eigenschaftwert[${extraFieldIndex + index}]`,
                  item.value,
                ]
              ),
            });
            if (klingelanlageType === "namensschild_mit_gravur") {
              const fontId = states.klingelanlage.schriftart.replace(
                "Schriftart",
                ""
              );
              if (fontId !== "" && !Number.isNaN(Number(fontId))) {
                products.push({
                  url: `Schriftart-${fontId}`,
                  amount: 1,
                  id: fontIds[fontId],
                });
              }
            }
            if (zuzatsModuleType !== "Klingelanlage") {
              const extraFieldIndex =
                extraFields.klingelanlage.namensschild_mit_gravur[
                  "Klingelanlage"
                ];
              products.push({
                url: zusatzmodule[klingelanlageType]["Klingelanlage"].url,
                amount: 1,
                id: zusatzmodule[klingelanlageType]["Klingelanlage"].id,
                extraFields: states.klingelanlage.namensschildList.map(
                  (item, index) => [
                    `eigenschaftwert[${extraFieldIndex + index}]`,
                    item.value,
                  ]
                ),
              });
            }
            if (
              zusatzmodulErweiterun === "Klingeltaster & RFID" ||
              zusatzmodulErweiterun === "Klingeltaster & Touch Display"
            ) {
              products.push({
                url: zusatzmodulExtension[zusatzmodulErweiterun].url,
                amount: 1,
                id: zusatzmodulExtension[zusatzmodulErweiterun].id,
              });
            }
          }

          if (zusatzModulePosition) {
            products.push({
              url: modulePosition[zusatzModulePosition].url,
              amount: 1,
              id: modulePosition[zusatzModulePosition].id,
            });
          }

          if (montageProduct) {
            products.push({
              url: montageProduct.url,
              amount: 1,
              id: montageProduct.id,
            });
          }

          if (briefcaseAmount > 0) {
            products.push({
              url: briefkasten[briefkastenType].url,
              amount: briefcaseAmount,
              id: briefkasten[briefkastenType].id,
              extraFields:
                briefkastenType === "Namensschild mit Gravur"
                  ? states.briefkasten.namensschildList.map((item) => [
                      `eigenschaftwert[${item.id}]`,
                      item.value,
                    ])
                  : [],
            });
            products.push({
              url: namensschild[briefkastenType].url,
              amount:
                zuzatsModuleType !== "Ohne"
                  ? briefcaseAmount * 2
                  : briefcaseAmount,
              id: namensschild[briefkastenType].id,
              extraFields: states.briefkasten.namensschildList.map(
                (item, index) => [
                  `eigenschaftwert[${
                    namensschild[briefkastenType].extraFieldId + index
                  }]`,
                  item.value,
                ]
              ),
            });
          }

          if (blindModuleAmount > 0) {
            products.push({
              url: blindModule.url,
              amount: blindModuleAmount,
              id: blindModule.id,
            });
          }

          for (const item of innenstationItems) {
            products.push({
              url: innenstation[item.connectionType][item.moduleName].url,
              amount: item.value,
              id: innenstation[item.connectionType][item.moduleName].id,
            });
          }

          if (rfidCard.schlusselanhanger.countModule > 0) {
            products.push({
              url: rfid.hanger.url,
              id: rfid.hanger.id,
              amount: rfidCard.schlusselanhanger.countModule,
            });
          }

          if (
            rfidCard.regular.countModule +
              (rfidCard.exclusive?.countModule ?? 0) >
            0
          ) {
            products.push({
              url: rfid.card.url,
              id: rfid.card.id,
              amount:
                rfidCard.regular.countModule +
                (rfidCard.exclusive?.countModule ?? 0),
            });
          }

          if (textleiste.isCompleted) {
            products.push({
              url: Text3D["mitte"].url,
              id: Text3D["mitte"].id,
              amount: 1,
              extraFields: textleiste.beschriftung
                ? [[TEXT_3D_EXTRAFIELD, textleiste.beschriftung]]
                : [],
            });
            if (textleiste.textausrichtung !== "mitte") {
              products.push({
                url: Text3D[textleiste.textausrichtung].url,
                id: Text3D[textleiste.textausrichtung].id,
                amount: 1,
              });
            }
          }

          if (textleiste.hintergrundbeleuchtungIsEnabled) {
            products.push({
              url: Text3DLed.url,
              id: Text3DLed.id,
              amount: 1,
            });
          }

          console.log(products);

          function getFormData(
            id: number,
            amount: number = 1,
            extraFields: [string, string][] = []
          ) {
            const formData = new FormData();
            formData.append("jtl_token", String(router.query["jtl-token"]));
            formData.append("wlPos", "0");
            formData.append("inWarenkorb", "1");
            formData.append("a", id.toString());
            formData.append("wke", "1");
            formData.append("show", "1");
            formData.append("kKundengruppe", "1");
            formData.append("kSprache", "1");
            formData.append("anzahl", amount.toString());
            formData.append("inWarenkorb", "In den Warenkorb");
            for (const [field, value] of extraFields) {
              formData.append(field, value);
            }
            return formData;
          }

          const fetches = products.map((product) => {
            const formData = getFormData(
              product.id,
              product.amount,
              product.extraFields ?? []
            );
            console.log(Object.fromEntries(formData.entries()));
            return fetch(`http://wm-dev.de/${product.url}`, {
              method: "POST",
              body: formData,
            }).then((res) => res.ok);
          });

          const result = await Promise.all(fetches);

          window.location.href = `http://wm-dev.de/Warenkorb`;
          console.log(result);
        }}
      />
    </div>
  );
});

export default FooterControls;
