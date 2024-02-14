import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import { useMontagePanelStore } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import styles from '../../styles/OptionStyles';

const MontagePanel = observer(() => {
  const { state } = useMontagePanelStore();

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.label}>Montageart</Text>
          <Text style={styles.value}>{state.montageType}</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Briefkästen</Text>
          <Text style={styles.value}>{state.mailBoxesCount}</Text>
        </View>
      </View>
    </ConfigurationPanel>
  );
});

export default MontagePanel;
