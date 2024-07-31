export function calculateProducts(states) {
  // Configurator IDS
  const montage = {
    "Freistehend mit Standfuß zum Einbetonieren": 1,
    "Freistehend mit Standfuß zum Anschrauben": 2,
  };

  const briefkasten = {
    "Einsteckschild mit Papiereinleger": 5,
    "Namensschild mit Gravur": 6,
  };

  const blindModule = 3;

  const zusatzmodule = {
    "einsteckschild_mit_papiereinleger ": {
      Klingelanlage: 7,
      "Video Gegensprechmodul": 9,
      "Audio Gegensprechmodul": 11,
    },
    namensschild_mit_gravur: {
      Klingelanlage: 8,
      "Video Gegensprechmodul": 10,
      "Audio Gegensprechmodul": 12,
    },
  };

  const klingertaster = {
    Gelb: 17,
    Rot: 15,
    Weiß: 16,
    Blau: 19,
    Grün: 18,
  };

  const innenstation = {
    "LAN/PoE IP": {
      "Metzler VDM10 2.0 Innenstation Home, weiß": 24,
      "Metzler VDM10 2.0 Innenstation Home, schwarz": 25,
      "Metzler VDM10 2.0 Innenstation Ultra, schwarz": 26,
      "Metzler VDM10 2.0 Innenstation Pro, grau": 27,
      "Metzler VDM10 2.0 Innenstation Pro, schwarz - rose": 28,
    },
    "2-Draht IP": {
      "Metzler VDM10 2.0 Innenstation Home, weiß": 29,
      "Metzler VDM10 2.0 Innenstation Home, schwarz": 30,
    },
  };

  const lichttaster = 23;

  const namensschild = {
    "Einsteckschild mit Papiereinleger": 21,
    "Namensschild mit Gravur": 20,
  };

  const belechtung = {
    "Namensschild-LED-Beleuchtung": 22,
  };

  const zusatzmodulExtension = {
    "Klingeltaster & RFID": 13,
    "Klingeltaster & Touch Display": 14,
  };

  const rfid = {
    hanger: 32,
    card: 31,
  };

  const Text3D = {
    mitte: 38,
    links: 62,
    rechts: 61,
  };

  const modulePosition = {
    rechts: 60,
    links: 59,
  };

  const Text3DLed = 39;

  const deckel = {
    [`1`]: 33,
    [`2`]: 34,
    [`3`]: 35,
    [`4`]: 36,
    [`5`]: 37,
  };

  const fontIds = {
    "0": 42,
    "1": 43,
    "2": 44,
    "3": 45,
    "4": 46,
    "5": 47,
    "6": 48,
    "7": 49,
    "8": 50,
    "9": 51,
    "10": 52,
    "12": 53,
    "15": 54,
    "16": 55,
    "17": 56,
    "18": 57,
    "19": 58,
  };

  // Configurator IDS - END

  const montageProduct = montage[states.montage.montageType];
  const briefcaseAmount = states.montage["mailBoxesCount"];
  const rowAmount = states.zusatzmodule["mailBoxesRanksCount"];

  const zuzatsModuleType = states.zusatzmodule.zusatzmodulType.title;
  const zusatzModulePosition = states.zusatzmodule.zusatzmodulPosition;

  const zusatzmodulErweiterun =
    states.zusatzmodulErweiterun.zusatzmodulErweiterung.title;

  const blindModuleAmount =
    (briefcaseAmount + zuzatsModuleType !== "Ohne" ? 1 : 0) % rowAmount;

  const totalItems = briefcaseAmount + blindModuleAmount;
  const itemsPerRow = Math.ceil(totalItems / rowAmount);

  const briefkastenType = states.briefkasten.briefkasteType;

  const klingeltasterCount = states.klingelanlage.klingeltasterCount;
  const beleuchtungColor = states.klingelanlage.beleuchtungColor;

  const lichtTasterEnabled = states.klingelanlage.lichttasterEnabled;

  const namensschildBeleuchtungEnabled =
    states.klingelanlage.namensschildBeleuchtungEnabled;

  const klingelanlageType = states.klingelanlage.beschriftungNamensschild;

  const innenstationItems = states.innenstation.innestationsModulesCount.filter(
    (item: any) => item.value > 0
  );

  const rfidCard = states.rfid.RFIDCard;

  const textleiste = states.textleiste;

  let products = [];

  if (itemsPerRow > 1) {
    products.push({
      amount: 1,
      configuratorId: deckel[itemsPerRow],
    });
  }

  if (lichtTasterEnabled) {
    products.push({
      amount: 1,
      configuratorId: lichttaster,
    });
  }

  if (
    states.klingelanlage.beleuchtungDerKlingeltasterEnabled &&
    klingeltasterCount > 0
  ) {
    products.push({
      amount: klingeltasterCount,
      configuratorId: klingertaster[beleuchtungColor],
    });
  }

  if (namensschildBeleuchtungEnabled) {
    products.push({
      amount: klingeltasterCount,
      configuratorId: belechtung["Namensschild-LED-Beleuchtung"],
    });
  }

  if (zuzatsModuleType !== "Ohne") {
    products.push({
      amount: 1,
      configuratorId: zusatzmodule[klingelanlageType][zuzatsModuleType],
      extraFields: states.klingelanlage.namensschildList.map(
        (item, index) => item.value
      ),
    });

    if (klingelanlageType === "namensschild_mit_gravur") {
      const fontId = states.klingelanlage.schriftart.replace("Schriftart", "");
      if (fontId !== "" && !Number.isNaN(Number(fontId))) {
        products.push({
          amount: 1,
          configuratorId: fontIds[fontId],
        });
      }
    }

    if (zuzatsModuleType !== "Klingelanlage") {
      products.push({
        amount: 1,
        configuratorId: zusatzmodule[klingelanlageType]["Klingelanlage"],
        extraFields: states.klingelanlage.namensschildList.map(
          (item) => item.value
        ),
      });
    }
    if (
      zusatzmodulErweiterun === "Klingeltaster & RFID" ||
      zusatzmodulErweiterun === "Klingeltaster & Touch Display"
    ) {
      products.push({
        amount: 1,
        configuratorId: zusatzmodulExtension[zusatzmodulErweiterun],
      });
    }
  }

  if (zusatzModulePosition && zuzatsModuleType !== "Ohne") {
    products.push({
      amount: 1,
      configuratorId: modulePosition[zusatzModulePosition],
    });
  }

  if (montageProduct) {
    products.push({
      amount: 1,
      configuratorId: montageProduct,
    });
  }

  if (briefcaseAmount > 0) {
    products.push({
      amount: briefcaseAmount,
      configuratorId: briefkasten[briefkastenType],
      extraFields:
        briefkastenType === "Namensschild mit Gravur"
          ? states.briefkasten.namensschildList.map((item) => item.value)
          : [],
    });
    products.push({
      amount:
        zuzatsModuleType !== "Ohne" ? briefcaseAmount * 2 : briefcaseAmount,
      configuratorId: namensschild[briefkastenType],
      extraFields: states.briefkasten.namensschildList.map(
        (item, index) => item.value
      ),
    });
  }

  if (blindModuleAmount > 0) {
    products.push({
      amount: blindModuleAmount,
      configuratorId: blindModule,
    });
  }

  for (const item of innenstationItems) {
    products.push({
      amount: item.value,
      configuratorId: innenstation[item.connectionType][item.moduleName],
    });
  }

  if (rfidCard.schlusselanhanger.countModule > 0) {
    products.push({
      configuratorId: rfid.hanger,
      amount: rfidCard.schlusselanhanger.countModule,
    });
  }

  if (
    rfidCard.regular.countModule + (rfidCard.exclusive?.countModule ?? 0) >
    0
  ) {
    products.push({
      configuratorId: rfid.card,
      amount:
        rfidCard.regular.countModule + (rfidCard.exclusive?.countModule ?? 0),
    });
  }

  if (textleiste.isEnabled) {
    products.push({
      configuratorId: Text3D["mitte"],
      amount: 1,
      extraFields: textleiste.beschriftung ? [textleiste.beschriftung] : [],
    });
    if (textleiste.textausrichtung !== "mitte") {
      products.push({
        configuratorId: Text3D[textleiste.textausrichtung],
        amount: 1,
      });
    }
  }

  if (textleiste.hintergrundbeleuchtungIsEnabled) {
    products.push({
      configuratorId: Text3DLed,
      amount: 1,
    });
  }

  return products;
}
