import { ConfigType } from '../types/configType';
import { RFIDCardsEnum } from '../stores/panels/RFIDPanelState';
import Textausrichtung from '../enums/data/Textausrichtung';
import zusatzmoduls from '../data/Zusatzmoduls';
import ZusatzmodulPosition from '../enums/data/ZusatzmodulPosition';
import zusatzmodulErweiterun from '../data/ZusatzmodulErweiterun';
import InnenstationType from '../enums/data/InnenstationType';
import { innenstationModulesList } from '../data/InnenstationModulesList';
import BeschriftungNamensschild from '../enums/data/BeschriftungNamensschild';
import Colors from '../enums/data/Colors';
import MontageType from '../enums/data/MontageType';
import BriefkastenType from '../enums/data/BriefkastenType';
import PanelId from '../enums/PanelId';

const [zusatzmodulsInitial] = zusatzmoduls;
const [zusatzmodulErweiterunInitial] = zusatzmodulErweiterun;

export const appConfig: ConfigType = {
  [PanelId.RFID]: {
    regularCard: {
      moduleName: RFIDCardsEnum.REGULAR,
      countModule: 0,
      modulePrice: '9,99',
    },
    exclusiveCard: {
      moduleName: RFIDCardsEnum.EXCLUSIVE,
      countModule: 0,
      modulePrice: '0',
    },
    schlusselanhangerCard: {
      moduleName: RFIDCardsEnum.SCHLUSSELANHANGER,
      countModule: 0,
      modulePrice: '19,99',
    },
  },
  [PanelId.TEXTLEISTE]: {
    beschriftungOberhalbIsEnabled: false,
    beschriftung: '',
    textausrichtung: Textausrichtung.MITTE,
    hintergrundbeleuchtungIsEnabled: false,
  },
  [PanelId.ZUSATZMODUL]: {
    zusatzmodulType: zusatzmodulsInitial,
    zusatzmodulPosition: ZusatzmodulPosition.LINKS,
    mailBoxesRanksCount: 1,
  },
  [PanelId.ZUSATZMODUL_ERWEITERUN]: {
    zusatzmodulErweiterunType: zusatzmodulErweiterunInitial,
  },
  [PanelId.LICHTTASTER]: {
    isLight: false,
  },
  [PanelId.INNENSTATION]: {
    innenstationType: InnenstationType.LAN_POE,
    modules: innenstationModulesList,
  },
  [PanelId.KLINGETABLEU]: {
    beleuchtungDerKlingeltasterEnabled: false,
    beschriftungNamensschild: BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER,
    klingeltasterCount: 1,
    color: Colors.WHITE,
    schriftart: 'Schriftart7',
  },
  [PanelId.MONTAGE]: {
    montageType: MontageType.EINBETONIEREN,
    mailBoxes: 1,
  },
  [PanelId.BRIEFKASTEN]: {
    schriftart: 'Schriftart7',
    griffleisteColor: Colors.STAINLESS_STEEL,
    briefkasteType: BriefkastenType.PAPIEREINLEGER,
  },
};
