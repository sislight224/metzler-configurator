import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import styles from '../../styles/OptionStyles';
import usePanelsStore, { useInnestationPanelStore } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import PanelId from '../../../../../../../../../enums/PanelId';

const InnestationPanel = observer(() => {
  const { panelIsVisible } = usePanelsStore();
  const { state } = useInnestationPanelStore();

  if (!panelIsVisible(PanelId.INNENSTATION)) return null;

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.value}>{state.innenstationType}</Text>
        </View>
        {state.innestationsModulesCount.map((item) => {
          if (item.value > 0) {
            return (
              <View
                key={item.value}
                style={styles.option}
              >
                <Text style={styles.label}>{item.moduleName}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            );
          }
          return null;
        })}
      </View>
    </ConfigurationPanel>
  );
});

export default InnestationPanel;
