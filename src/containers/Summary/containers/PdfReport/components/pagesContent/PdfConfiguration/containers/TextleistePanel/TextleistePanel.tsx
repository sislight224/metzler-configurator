import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import { useTextleistePanelStore } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import styles from '../../styles/OptionStyles';

const TextleistePanel = observer(() => {
  const { state } = useTextleistePanelStore();

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.value}>
            {!state.beschriftungOberhalbIsEnabled ? 'Ohne' : 'Beschriftung oberhalb'}
          </Text>
        </View>
        {state.beschriftungOberhalbIsEnabled && (
          <>
            <View style={styles.option}>
              <Text style={styles.label}>Теxtausrichtung</Text>
              <Text style={styles.value}>{state.textausrichtung}</Text>
            </View>
            <View style={styles.option}>
              <Text style={styles.value}>
                {state.hintergrundbeleuchtungIsEnabled && 'LED Hintergrundbeleuchtung'}
              </Text>
            </View>
            <View style={styles.option}>
              <Text style={styles.value}>{state.beschriftung}</Text>
            </View>
          </>
        )}
      </View>
    </ConfigurationPanel>
  );
});

export default TextleistePanel;
