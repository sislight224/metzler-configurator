import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import { useZusatzmodulPanelStore } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import styles from '../../styles/OptionStyles';

const ZusatzmodulPanel = observer(() => {
  const { state } = useZusatzmodulPanelStore();

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.label}>Zusatzmodul</Text>
          <Text style={styles.value}>{state.zusatzmodulType.title}</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Position</Text>
          <Text style={styles.value}>{state.zusatzmodulPosition}</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Anzahl der Reihen</Text>
          <Text style={styles.value}>{state.mailBoxesRanksCount}</Text>
        </View>
      </View>
    </ConfigurationPanel>
  );
});

export default ZusatzmodulPanel;
