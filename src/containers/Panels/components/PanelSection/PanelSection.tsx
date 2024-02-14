import { FC, ReactNode } from 'react';
import MontagePanel from 'containers/Panels/containers/MontagePanel/MontagePanel';
import ZusatzmodulPanel from '../../../Panels/containers/ZusatzmodulPanel/ZusatzmodulPanel';
import ZusatzmodulErweiterunPanel from '../../../Panels/containers/ZusatzmodulErweiterunPanel/ZusatzmodulErweiterunPanel';
import KlingeltableuPanel from '../../../Panels/containers/KlingeltableuPanel/KlingeltableuPanel';
import BriefkastenPanel from '../../../Panels/containers/BriefkastenPanel/BriefkastenPanel';
import TextleistePanel from '../../../Panels/containers/TextleistePanel/TextleistePanel';
import InnenstationPanel from '../../../Panels/containers/InnenstationPanel/InnenstationPanel';
import RFIDPanel from '../../../Panels/containers/RFIDPanel/RFIDPanel';
import LichttasterPanel from '../../../Panels/containers/LichttasterPanel/LichttasterPanel';

export type PanelSectionType = {
  MontagePanel: typeof MontagePanel;
  ZusatzmodulPanel: typeof ZusatzmodulPanel;
  ZusatzmodulErweiterunPanel: typeof ZusatzmodulErweiterunPanel;
  KlingeltableuPanel: typeof KlingeltableuPanel;
  LichttasterPanel: typeof LichttasterPanel;
  InnenstationPanel: typeof InnenstationPanel;
  RFIDPanel: typeof RFIDPanel;
  BriefkastenPanel: typeof BriefkastenPanel;
  TextleistePanel: typeof TextleistePanel;
};

export interface PanelSectionProps {
  children: ReactNode;
}

const PanelSection: FC<PanelSectionProps> & PanelSectionType = (props) => {
  const { children } = props;
  return (
    <>
      {children}
    </>
  );
};

PanelSection.MontagePanel = MontagePanel;
PanelSection.ZusatzmodulPanel = ZusatzmodulPanel;
PanelSection.ZusatzmodulErweiterunPanel = ZusatzmodulErweiterunPanel;
PanelSection.KlingeltableuPanel = KlingeltableuPanel;
PanelSection.LichttasterPanel = LichttasterPanel;
PanelSection.InnenstationPanel = InnenstationPanel;
PanelSection.RFIDPanel = RFIDPanel;
PanelSection.BriefkastenPanel = BriefkastenPanel;
PanelSection.TextleistePanel = TextleistePanel;

export default PanelSection;
