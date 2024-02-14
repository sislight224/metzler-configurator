import styles from './NamensschildList.module.scss';
import { observer } from 'mobx-react-lite';
import usePanelsStore, { useKlingeltableuPanelStore } from 'hooks/store/usePanelsStore';
import Input from 'components/common/Input/Input';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { Namensschild } from 'stores/panels/KlingetableuPanelState';
import Icon from '../../../../../../../components/common/Icons/Icon';
import { useUndoRedoStore } from '../../../../../../../hooks/store/useUndoRedoStore';

const NamensschildList = observer(() => {
  const { state, isCompleted } = useKlingeltableuPanelStore();
  const { panelsConfig } = usePanelsStore();
  const {
    klingeltasterCount,
    namensschildList,
    initNamensschildList,
    setNamensschildList,
    isError,
    compareConfig,
    setIsShowResetModal,
  } = state;

  const { addStateRecord } = useUndoRedoStore();

  useEffect(() => initNamensschildList(), [klingeltasterCount]);

  const namensschildChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>, item: Namensschild) => {
    setNamensschildList({
      id: item.id,
      value: e.target.value,
    });
  }, [setNamensschildList]);

  const changeStateHandler = useCallback(() => {
    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) setIsShowResetModal(true);
  }, [panelsConfig, isCompleted]);

  const isErrorState = useCallback((value: string) => {
    return value.length === 0 && isError;
  }, [isError]);

  const focusChangeHandler = useCallback(() => {
    addStateRecord();
  }, [namensschildList]);

  if (klingeltasterCount > 12) return null;

  return (
    <div className={styles.root}>
      {namensschildList.map((item) => {
        const placeholder = `Beschriftung des ${item.id}. Klingel`;
        const error = isErrorState(item.value);

        return (
          <div
            className={styles.row}
            key={item.id}
          >
            <div className={styles.label}>
              {item.id}
              {'. '}
              Klingel
            </div>
            <Input
              suffixIcon={error && <Icon
                name="warning"
                width={24}
                height={24}
              />}
              hint={error ? 'Bitte füllen Sie alle Felder aus' : ''}
              value={item.value}
              showHint={error}
              theme={error ? 'error' : 'default'}
              onChange={(e) => namensschildChangeHandler(e, item)}
              placeholder={placeholder}
              onFocus={() => !error && focusChangeHandler()}
              onBlur={() => !error && changeStateHandler()}
              maxLength={20}
            />
          </div>
        );
      })}
    </div>
  );
});

export default NamensschildList;
