import styles from './NamensschildList.module.scss';
import { observer } from 'mobx-react-lite';
import usePanelsStore, {
  useBriefkastenPanelStore,
  useKlingeltableuPanelStore,
  useMontagePanelStore,
} from 'hooks/store/usePanelsStore';
import Input from 'components/common/Input/Input';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { Namensschild } from 'stores/panels/KlingetableuPanelState';
import Icon from '../../../../../../../components/common/Icons/Icon';
import { useUndoRedoStore } from '../../../../../../../hooks/store/useUndoRedoStore';

const NamensschildList = observer(() => {
  const { state: briefkastenState, isCompleted } = useBriefkastenPanelStore();

  const { panelsConfig } = usePanelsStore();

  const { state: montageState } = useMontagePanelStore();
  const { state: klingeltableuState } = useKlingeltableuPanelStore();

  const { namensschildList: klingNamensschildList } = klingeltableuState;

  const {
    namensschildList,
    initNamensschildList,
    setNamensschildList,
    isError,
    setCurrentBriefcasten,
    compareConfig,
    setIsShowResetModal,
  } = briefkastenState;

  const {
    addStateRecord,
  } = useUndoRedoStore();

  const { mailBoxesCount } = montageState;

  const isErrorState = useCallback((value: string) => {
    return value.length === 0 && isError;
  }, [isError]);

  useEffect(() => {
    const klingNames = [...klingNamensschildList];
    initNamensschildList(mailBoxesCount, klingNames);
  }, [mailBoxesCount, klingNamensschildList]);

  const namensschildChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>, item: Namensschild) => {
    setCurrentBriefcasten(item.id);
    setNamensschildList({
      id: item.id,
      value: e.target.value,
    });
  }, [setNamensschildList]);

  const changeStateHandler = useCallback(() => {
    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  const focusChangeHandler = useCallback(() => {
    addStateRecord();
  }, [namensschildList]);

  return (
    <div className={styles.root}>
      {namensschildList.map((item) => {
        const placeholder = `Beschriftung des ${item.id}. Briefkastens`;
        const error = isErrorState(item.value);

        return (
          <div
            className={styles.row}
            key={item.id}
          >
            <div className={styles.label}>
              {item.id}
              {'. '}
              Briefkasten
            </div>
            <Input
              value={item.value}
              onChange={(e) => namensschildChangeHandler(e, item)}
              placeholder={placeholder}
              suffixIcon={error && <Icon
                height={24}
                width={24}
                name="warning"
              />}
              hint={error ? 'Bitte füllen Sie alle Felder aus' : ''}
              showHint={error}
              theme={error ? 'error' : 'default'}
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
