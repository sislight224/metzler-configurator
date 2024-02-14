import { FC } from 'react';
import styles from './RFIDModule.module.scss';
import InputNumber from '../../../../../../components/common/InputNumber/InputNumber';
import ButtonText from '../../../../../../components/common/ButtonText/ButtonText';
import { RFIDCardsEnum } from '../../../../../../stores/panels/RFIDPanelState';

export interface RFIDModuleProps {
  modulePrice: string;
  cardPreview: string;
  moduleName: string;
  title: string;
  onDetailsClick?: () => void;
  onChangeModulesCount?: (cardName: RFIDCardsEnum, value: number, cardPrice: string) => void;
  moduleCount: number;
}

const RFIDModule: FC<RFIDModuleProps> = (props) => {
  const {
    modulePrice,
    cardPreview,
    onDetailsClick = () => undefined,
    moduleName,
    title,
    moduleCount,
    onChangeModulesCount = () => undefined,
  } = props;

  const renderPrice = (cl: string) => (
    <div className={cl}>
      {modulePrice}
      {' '}
      €
      {moduleName === RFIDCardsEnum.EXCLUSIVE && (
        <span> - inklusiv</span>
      )}
    </div>
  );

  const renderInputNumber = (cl: string) => (
    <div className={cl}>
      <InputNumber
        disabled={moduleName === RFIDCardsEnum.EXCLUSIVE}
        max={Infinity}
        value={moduleCount}
        min={0}
        onChange={(value) => onChangeModulesCount(moduleName as RFIDCardsEnum, value, modulePrice)}
        step={1}
      />
    </div>
  );

  return (
    <div className={styles.root}>
      <div className={styles.module}>
        <div className={styles.card}>
          <img
            className={styles.card_picture}
            src={cardPreview}
            alt="Bildschirmfoto"
          />
        </div>
        <div className={styles.module_description}>
          <div className={styles.text}>{title}</div>
          <ButtonText
            onClick={onDetailsClick}
            disabled
            label="Mehr Details"
          />
          {renderPrice(styles.price)}
          <div className={styles.altLayoutRow}>
            {renderPrice(styles.price_alt)}
            {renderInputNumber(styles.input_number_alt)}
          </div>
        </div>
      </div>
      {renderInputNumber(styles.input_number)}
    </div>
  );
};

export default RFIDModule;
