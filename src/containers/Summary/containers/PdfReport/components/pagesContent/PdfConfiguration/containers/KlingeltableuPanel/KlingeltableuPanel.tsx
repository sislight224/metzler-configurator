import { useMemo } from 'react';
import { View, Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import styles from '../../styles/OptionStyles';
import usePanelsStore, { useKlingeltableuPanelStore } from 'hooks/store/usePanelsStore';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import PanelId from '../../../../../../../../../enums/PanelId';
import BeschriftungNamensschild from 'enums/data/BeschriftungNamensschild';

const KlingeltableuPanel = observer(() => {
  const { panelIsVisible } = usePanelsStore();
  const { state } = useKlingeltableuPanelStore();

  const beschriftungNamensschildTitle = useMemo(() => {
    return state.beschriftungNamensschild === BeschriftungNamensschild.EINSTECKSCHILD_MIT_PAPIEREINLEGER
      ? 'Einsteckschild mit Papiereinleger'
      : 'Namensschild mit Gravur';
  }, [state.beschriftungNamensschild]);

  if (!panelIsVisible(PanelId.KLINGETABLEU)) return null;

  return (
    <ConfigurationPanel title={state.panelTitle}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.label}>
            Klingeln
          </Text>
          <Text style={styles.value}>
            {state.klingeltasterCount}
          </Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>
            Klingeltaster Beleuchtung
          </Text>
          <Text style={styles.value}>
            {state.beleuchtungColor}
          </Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.value}>
            {beschriftungNamensschildTitle}
          </Text>
        </View>
        {
          state.namensschildBeleuchtungEnabled
          && <View style={styles.option}>
            <Text style={styles.value}>
              Namensschild Beleuchtung
            </Text>
          </View>
        }
        {
          state.lichttasterEnabled
          && <View style={styles.option}>
            <Text style={styles.value}>
              Lichttaster
            </Text>
          </View>
        }
        <View style={styles.option}>
          <Text style={styles.label}>
            Schriftart
          </Text>
          <Text style={styles.value}>
            {state.schriftart}
          </Text>
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

export default KlingeltableuPanel;
