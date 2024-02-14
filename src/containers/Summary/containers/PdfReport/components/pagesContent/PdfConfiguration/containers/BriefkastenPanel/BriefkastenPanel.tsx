import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import { useBriefkastenPanelStore } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import styles from '../../styles/OptionStyles';

const BriefkastenPanel = observer(() => {
  const { state } = useBriefkastenPanelStore();

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.value}>{state.briefkasteType}</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Shriftart</Text>
          <Text style={styles.value}>{state.schriftart}</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>Farbe der Griffleiste</Text>
          <Text style={styles.value}>{state.griffleisteColor}</Text>
        </View>
        {state.namensschildList
          && <View style={styles.valuesRow}>
            {state.namensschildList.map((item) => (
              <Text
                key={item.id}
                style={styles.value}
              >
                {item.value}
              </Text>
            ))}
          </View>}
      </View>
    </ConfigurationPanel>
  );
});

export default BriefkastenPanel;
