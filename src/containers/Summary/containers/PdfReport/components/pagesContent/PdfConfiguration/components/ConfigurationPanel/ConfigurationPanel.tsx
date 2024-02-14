import { FC, ReactNode } from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './ConfigurationPanelStyles';

export interface PanelProps {
  title?: string;
  children?: ReactNode;
}

const ConfigurationPanel: FC<PanelProps> = (props) => {
  const { title, children } = props;

  return (
    <View
      wrap={false}
      style={styles.panel}
    >
      <Text style={styles.title}>{title}</Text>
      { children }
    </View>
  );
};

export default ConfigurationPanel;
