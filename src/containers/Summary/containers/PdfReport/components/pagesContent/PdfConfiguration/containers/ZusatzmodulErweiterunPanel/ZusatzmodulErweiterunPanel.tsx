import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import styles from '../../styles/OptionStyles';
import usePanelsStore, { useZusatzmodulErweiterunPanelStore } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import PanelId from '../../../../../../../../../enums/PanelId';

const ZusatzmodulErweiterunPanel = observer(() => {
  const { panelIsVisible } = usePanelsStore();
  const { state } = useZusatzmodulErweiterunPanelStore();

  if (!panelIsVisible(PanelId.ZUSATZMODUL_ERWEITERUN)) return null;

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.label}>Zusatzmodul</Text>
          <Text style={styles.value}>{state.zusatzmodulErweiterung.title}</Text>
        </View>
      </View>
    </ConfigurationPanel>
  );
});

export default ZusatzmodulErweiterunPanel;
