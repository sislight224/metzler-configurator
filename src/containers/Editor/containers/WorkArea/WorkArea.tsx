import styles from './WorkArea.module.scss';
import ConfirmConfiguration from './components/ConfirmConfiguration/ConfirmConfiguration';
import PanelSection from '../../../Panels/components/PanelSection/PanelSection';
import Windows from '../../../Panels/components/Windows/Windows';
import { observer } from 'mobx-react-lite';
import usePanelsStore from '../../../../hooks/store/usePanelsStore';
import { FC } from 'react';

const WorkArea: FC = observer(() => {
  const { isEditConfig } = usePanelsStore();

  return (
    <div className={styles.root}>
      <div className={styles.panels}>
        <PanelSection>
          <PanelSection.MontagePanel isEditable={isEditConfig} />
          <PanelSection.ZusatzmodulPanel isEditable={isEditConfig} />
          <PanelSection.ZusatzmodulErweiterunPanel isEditable={isEditConfig} />
          <PanelSection.KlingeltableuPanel isEditable={isEditConfig} />
          <PanelSection.LichttasterPanel isEditable={isEditConfig} />
          <PanelSection.InnenstationPanel isEditable={isEditConfig} />
          <PanelSection.RFIDPanel isEditable={isEditConfig} />
          <PanelSection.BriefkastenPanel isEditable={isEditConfig} />
          <PanelSection.TextleistePanel isEditable={isEditConfig} />
        </PanelSection>
      </div>
      <ConfirmConfiguration />
      <Windows />
    </div>
  );
});

export default WorkArea;
