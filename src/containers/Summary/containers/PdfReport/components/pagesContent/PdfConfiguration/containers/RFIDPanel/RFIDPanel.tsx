import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import styles from '../../styles/OptionStyles';
import usePanelsStore, { useRFIDPanelStore } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import PanelId from '../../../../../../../../../enums/PanelId';
import { RFIDCardsEnum } from '../../../../../../../../../stores/panels/RFIDPanelState';

const RFIDPanel = observer(() => {
  const { panelIsVisible } = usePanelsStore();
  const { state } = useRFIDPanelStore();

  if (!panelIsVisible(PanelId.RFID)) return null;

  const { getDataCard } = state;
  const exclusiveCount = getDataCard(RFIDCardsEnum.EXCLUSIVE)?.countModule || 0;
  const regularCount = getDataCard(RFIDCardsEnum.REGULAR)?.countModule || 0;
  const total = exclusiveCount + regularCount;

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        {total > 0 && (
          <View style={styles.option}>
            <Text style={styles.label}>RFID Karte</Text>
            <Text style={styles.value}>{total}</Text>
          </View>
        )}
        {getDataCard(RFIDCardsEnum.SCHLUSSELANHANGER)!.countModule > 0 && (
          <View style={styles.option}>
            <Text style={styles.label}>RFID Schlüsselanhänger</Text>
            <Text style={styles.value}>
              {getDataCard(RFIDCardsEnum.SCHLUSSELANHANGER)?.countModule}
            </Text>
          </View>
        )}
      </View>
    </ConfigurationPanel>
  );
});

export default RFIDPanel;
