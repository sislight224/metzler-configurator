import { FC, useCallback } from 'react';
import { innenstationModulesList } from '../../../../../../data/InnenstationModulesList';
import { observer } from 'mobx-react-lite';
import styles from './InnestationModule.module.scss';
import InputNumber from '../../../../../../components/common/InputNumber/InputNumber';
import ButtonText from '../../../../../../components/common/ButtonText/ButtonText';
import usePanelsStore, { useInnestationPanelStore } from '../../../../../../hooks/store/usePanelsStore';
import { WindowId } from '../../../../../../enums/WindowId';
import { useUndoRedoStore } from '../../../../../../hooks/store/useUndoRedoStore';

const InnestationModule: FC = observer(() => {
  const { state: innestationState, isCompleted } = useInnestationPanelStore();

  const {
    currentCountModules,
    setInnestationsModulesCount,
    innestationsModulesCount,
    countCommonCountModules,
    compareConfig,
    innenstationType,
    setActiveInnenstationViewModuleIndex,
    setIsShowResetModal,
  } = innestationState;

  const { setActiveWindowId, panelsConfig } = usePanelsStore();

  const { addStateRecord } = useUndoRedoStore();

  const changeInnenstationModulesCountHandler = useCallback((value: number, index: number) => {
    addStateRecord();
    setInnestationsModulesCount(value, index + 1);
    countCommonCountModules();

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [currentCountModules, isCompleted, panelsConfig]);

  const moreDetailsHandler = useCallback((index: number) => {
    setActiveInnenstationViewModuleIndex(index);
    setActiveWindowId(WindowId.INNESTATION_VIEW);
  }, []);

  const renderPrice = (price: string, cl: string) => (
    <div className={cl}>
      {price}
      {' '}
      €
    </div>
  );

  const renderInputNumber = (index: number, cl: string) => (
    <div className={cl}>
      <InputNumber
        max={Infinity}
        value={innestationsModulesCount[index]?.value || 0}
        min={0}
        onChange={(value) => changeInnenstationModulesCountHandler(value, index)}
        step={1}
      />
    </div>
  );

  return (
    <>
      {innenstationModulesList.map((item, index) => {
        if (item.connectionType !== innenstationType) return null;
        return (
          <div
            className={styles.root}
            key={item.moduleName}
          >
            <div className={styles.module}>
              <div className={styles.card}>
                <img
                  className={styles.card_picture}
                  src={item.mainPreview}
                  alt="Bildschirmfoto"
                />
              </div>
              <div className={styles.module_description}>
                <div className={styles.text}>{item.moduleName}</div>
                <ButtonText
                  onClick={() => moreDetailsHandler(index)}
                  label="Mehr Details"
                />
                {renderPrice(item.price, styles.price)}
                <div className={styles.altLayoutRow}>
                  {renderPrice(item.price, styles.price_alt)}
                  {renderInputNumber(index, styles.input_number_alt)}
                </div>
              </div>
            </div>
            {renderInputNumber(index, styles.input_number)}
          </div>
        );
      })}
    </>
  );
});

export default InnestationModule;
