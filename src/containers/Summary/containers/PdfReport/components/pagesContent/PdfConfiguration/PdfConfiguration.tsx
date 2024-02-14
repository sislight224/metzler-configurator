import { observer } from 'mobx-react-lite';
import { View, Text } from '@react-pdf/renderer';
import styles from './PdfConfigurationStyles';
import BriefkastenPanel from './containers/BriefkastenPanel/BriefkastenPanel';
import InnenstationPanel from './containers/InnenstationPanel/InnenstationPanel';
import KlingeltableuPanel from './containers/KlingeltableuPanel/KlingeltableuPanel';
import LichttasterPanel from './containers/LichttasterPanel/LichttasterPanel';
import MontagePanel from './containers/MontagePanel/MontagePanel';
import RFIDPanel from './containers/RFIDPanel/RFIDPanel';
import TextleistePanel from './containers/TextleistePanel/TextleistePanel';
import ZusatzmodulErweiterunPanel from './containers/ZusatzmodulErweiterunPanel/ZusatzmodulErweiterunPanel';
import ZusatzmodulPanel from './containers/ZusatzmodulPanel/ZusatzmodulPanel';

const PdfConfiguration = observer(() => {
  return (
    <View>
      <Text style={styles.mainTitle}>
        Zusammenfassung
      </Text>

      <View style={styles.palels}>
        <MontagePanel />
        <ZusatzmodulPanel />
        <ZusatzmodulErweiterunPanel />
        <KlingeltableuPanel />
        <LichttasterPanel />
        <InnenstationPanel />
        <RFIDPanel />
        <BriefkastenPanel />
        <TextleistePanel />
      </View>
    </View>
  );
});

export default PdfConfiguration;
