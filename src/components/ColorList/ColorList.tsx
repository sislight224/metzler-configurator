import styles from './ColorList.module.scss';
import { ColorListType } from 'data/BeleuchtungColorList';
import Color from '../common/Color/Color';
import { FC } from 'react';
import Colors from '../../enums/data/Colors';
import dynamic from 'next/dynamic';

const Tooltip = dynamic(() => import('../common/Tooltip/Tooltip'), { ssr: false });

export interface ColorListProps {
  onSetColor?: (value: Colors) => void;
  colorList: ColorListType[];
  activeColor: Colors;
}

const ColorList: FC<ColorListProps> = (props) => {
  const { onSetColor = () => undefined, colorList, activeColor } = props;

  return (
    <div className={styles.root}>
      {colorList.map((item) => {
        if (item.tip) {
          return (
            <Tooltip
              key={item.value}
              content={() => (
                <div className={styles.tooltip}>{item.tip}</div>
              )}
              trigger="hover"
              backgroundColor="#005253"
            >
              <Color
                color={item.color}
                isActive={activeColor === item.value}
                onClick={() => onSetColor(item.value)}
              />
            </Tooltip>
          );
        }

        return (
          <Color
            key={item.value}
            color={item.color}
            isActive={activeColor === item.value}
            onClick={() => onSetColor(item.value)}
          />
        );
      })}
    </div>
  );
};

export default ColorList;
