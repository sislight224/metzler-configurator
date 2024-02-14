import styles from './WorkArea.module.scss';
import PanelSection from '../../../Panels/components/PanelSection/PanelSection';

const WorkArea = () => {
  return (
    <div className={styles.root}>
      <div className={styles.panels}>
        <PanelSection>
          <PanelSection.MontagePanel isPreview />
          <PanelSection.ZusatzmodulPanel isPreview />
          <PanelSection.ZusatzmodulErweiterunPanel isPreview />
          <PanelSection.KlingeltableuPanel isPreview />
          <PanelSection.LichttasterPanel isPreview />
          <PanelSection.InnenstationPanel isPreview />
          <PanelSection.RFIDPanel isPreview />
          <PanelSection.BriefkastenPanel isPreview />
          <PanelSection.TextleistePanel isPreview />
        </PanelSection>
      </div>
    </div>
  );
};

export default WorkArea;
