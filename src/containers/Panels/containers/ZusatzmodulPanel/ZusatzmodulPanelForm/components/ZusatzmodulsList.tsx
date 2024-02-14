import zusatzmoduls, { ZusatzmodulType } from 'data/Zusatzmoduls';
import Card from 'components/Card/Card';
import styles from './ZusatzmodulsList.module.scss';
import { observer } from 'mobx-react-lite';
import usePanelsStore, { useMontagePanelStore, useZusatzmodulPanelStore } from 'hooks/store/usePanelsStore';
import InfoSection from '../../../../components/InfoSection/InfoSection';
import { useCallback } from 'react';
import { useUndoRedoStore } from '../../../../../../hooks/store/useUndoRedoStore';

const ZusatzmodulsList = observer(() => {
  const { state: zusatState, isCompleted } = useZusatzmodulPanelStore();
  const { state: montageState } = useMontagePanelStore();
  const { zusatzmodulType, setZusatzmodulType, compareConfig, setIsShowResetModal } = zusatState;
  const { mailBoxesCount } = montageState;
  const { panelsConfig } = usePanelsStore();

  const {
    addStateRecord,
  } = useUndoRedoStore();

  const disabledCard = useCallback((name: string) => {
    if (mailBoxesCount === 15) return name !== 'ohne';
    return false;
  }, [mailBoxesCount]);

  const zusatzmodulTypeHandler = useCallback((item: ZusatzmodulType) => {
    addStateRecord();
    setZusatzmodulType(item);

    const isEqual = compareConfig(panelsConfig);
    if (!isEqual && isCompleted) {
      setIsShowResetModal(true);
    }
  }, [panelsConfig, isCompleted]);

  return (
    <div className={styles.root}>
      {zusatzmoduls.map((item) => (
        <Card
          disabled={disabledCard(item.value)}
          isActive={zusatzmodulType.value === item.value}
          onClick={() => zusatzmodulTypeHandler(item)}
          key={item.value}
        >
          <InfoSection hintText={item.description || ''}>
            <div className={styles.module}>
              <picture>
                <source
                  srcSet={item.preview?.mobile || ''}
                  media="(max-width:375px)"
                />
                <source
                  srcSet={item.preview?.desktop || ''}
                  media="(max-width:1023px)"
                />
                <source
                  srcSet={item.preview?.mobile || ''}
                  media="(max-width:1439px)"
                />
                <img
                  className={styles.preview}
                  src={item.preview?.desktop || ''}
                />
              </picture>
              <div className={styles.label}>{item.title}</div>
            </div>
          </InfoSection>
        </Card>
      ))}
    </div>
  );
});

export default ZusatzmodulsList;
