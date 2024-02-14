export type Options = 'BriefkastenModule'
| 'Montage'
| 'ZusatzModule'
| 'ZusatzErweiterung'
| 'InnenstationLANPOE'
| 'InnenstationDraht'
| 'RFID'
| 'Briefkasten'
| 'Deckel'
| 'Textleiste';

export type BriefkastenModuleOptionParams = {
  blindModules: number;
  briefcastenModules: number;
};

export type MontageOptionParams = {
  einbetonieren: number;
  anschrauben: number;
  aufputz: number;
};

export type ZusatzModuleOptionParams = {
  ohne: number;
  Klingelanlagene: number;
  Videogegensprechmodul: number;
  AudioGegensprechmodul: number;
};

export type ZusatzErweiterungOptionParams = {
  RFID: number;
  TouchDisplay: number;
  Klingeltaster: number;
  NamensschildmitGravur: number;
  EinsteckschildmitPapiereinleger: number;
  NamensschildmitBeleuchtung: number;
  Lichttaster: number;
};

export type InnenstationLANPOEOptionParams = {
  InnenstationHomeWeibLanPoe: number;
  InnenstationHomeSchwarzLanPoe: number;
  InnenstationUltraSchwarz: number;
  InnenstationProGrau: number;
  InnenstationProSchwarzRose: number;
};

export type InnenstationDrahtOptionParams = {
  InnenstationHomeWeibDraht: number;
  InnenstationHomeSchwarzDraht: number;
};

export type RFIDOptionParams = {
  regularCard: number;
  exclusiveCard: number;
};

export type BriefkastenOptionParams = {
  gravur: number;
  papper: number;
};

export type DeckelOptionParams = {
  deckel: number;
};

export type TextleisteOptionParams = {
  textleiste: number;
  led: number;
};

export type OptionsParams = BriefkastenModuleOptionParams
| ZusatzErweiterungOptionParams
| ZusatzModuleOptionParams
| InnenstationLANPOEOptionParams
| InnenstationDrahtOptionParams
| RFIDOptionParams
| BriefkastenOptionParams
| DeckelOptionParams
| MontageOptionParams
| TextleisteOptionParams;
