import MontageType from '../enums/data/MontageType';
import { ZusatzmodulType } from '../data/Zusatzmoduls';
import ZusatzmodulPosition from '../enums/data/ZusatzmodulPosition';
import { RFIDModule } from '../stores/panels/RFIDPanelState';
import { ZusatzmodulErweiterunType } from '../data/ZusatzmodulErweiterun';
import BriefkastenType from '../enums/data/BriefkastenType';
import Textausrichtung from '../enums/data/Textausrichtung';
import BeschriftungNamensschild from '../enums/data/BeschriftungNamensschild';
import InnenstationType from '../enums/data/InnenstationType';
import { InnenstationModulesListType } from '../data/InnenstationModulesList';
import { Namensschild } from '../stores/panels/KlingetableuPanelState';
import PanelId from '../enums/PanelId';

export type MontageConfigType = {
  montageType: MontageType;
  mailBoxes: number;
};

type ZusatzmoduleConfigType = {
  zusatzmodulType: ZusatzmodulType;
  zusatzmodulPosition: ZusatzmodulPosition;
  mailBoxesRanksCount: number;
};

type ZusatzmodulErweiterun = {
  zusatzmodulErweiterunType: ZusatzmodulErweiterunType;
};

type KlingetableuConfigType = {
  klingeltasterCount: number;
  color: string | null;
  schriftart: string;
  beschriftungNamensschild: BeschriftungNamensschild;
  namensschildList?: Namensschild[];
  beleuchtungDerKlingeltasterEnabled: boolean;
};

type InnenstationConfigType = {
  modules: InnenstationModulesListType[];
  innenstationType: InnenstationType;
};

type BriefkastenConfigType = {
  schriftart: string;
  griffleisteColor: string;
  briefkasteType: BriefkastenType;
  namensschildList?: Namensschild[];
};

type RFIDConfigType = {
  regularCard: RFIDModule | null;
  exclusiveCard: RFIDModule | null;
  schlusselanhangerCard: RFIDModule | null;
};

type LichttasterConfigType = {
  isLight: boolean;
};

type TextleisteConfigType = {
  hintergrundbeleuchtungIsEnabled: boolean;
  beschriftungOberhalbIsEnabled: boolean;
  textausrichtung: Textausrichtung;
  beschriftung: string;
};

export type ConfigType = {
  [PanelId.MONTAGE]?: MontageConfigType;
  [PanelId.ZUSATZMODUL]?: ZusatzmoduleConfigType;
  [PanelId.ZUSATZMODUL_ERWEITERUN]?: ZusatzmodulErweiterun;
  [PanelId.KLINGETABLEU]?: KlingetableuConfigType;
  [PanelId.INNENSTATION]?: InnenstationConfigType;
  [PanelId.BRIEFKASTEN]?: BriefkastenConfigType;
  [PanelId.RFID]?: RFIDConfigType;
  [PanelId.LICHTTASTER]?: LichttasterConfigType;
  [PanelId.TEXTLEISTE]?: TextleisteConfigType;
};
