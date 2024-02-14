import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import styles from '../../styles/OptionStyles';
import usePanelsStore, { useLichttasterPanelState } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import PanelId from '../../../../../../../../../enums/PanelId';

const LichttasterPanel = observer(() => {
  const { panelIsVisible } = usePanelsStore();
  const { state } = useLichttasterPanelState();

  if (!panelIsVisible(PanelId.LICHTTASTER)) return null;

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.value}>
            {state.isLight ? 'Mit Lichttaster' : 'Ohne Lichttaster' }
          </Text>
        </View>
      </View>
    </ConfigurationPanel>
  );
});

export default LichttasterPanel;
