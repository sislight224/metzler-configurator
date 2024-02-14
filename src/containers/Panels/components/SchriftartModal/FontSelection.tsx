import { FC } from 'react';
import Button from '../../../../components/common/Button/Button';
import styles from './SchriftartModal.module.scss';

export interface FontSelectionProps {
  fontNumber: number;
  fontFamily: string;
  onChangeFont: (fontName: string, fontNumber: number) => void;
  text: string;
}

const FontSelection: FC<FontSelectionProps> = (props) => {
  const {
    fontNumber,
    fontFamily,
    onChangeFont = () => undefined,
    text,
  } = props;

  return (
    <div className={styles.styleSelection}>
      <div className={styles.styleSelection_description}>
        <div className={styles.styleSelection_counter}>
          Schriftart &nbsp;
          {fontNumber}
        </div>
        <div
          style={{ fontFamily }}
          className={styles.styleSelection_fontFamily}
        >
          {text}
        </div>
      </div>
      <Button
        onClick={() => onChangeFont(`Schriftart${fontNumber}`, fontNumber)}
        label="Auswählen"
      />
    </div>
  );
};

export default FontSelection;
