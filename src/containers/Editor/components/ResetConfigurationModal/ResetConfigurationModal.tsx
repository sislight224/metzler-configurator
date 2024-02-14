import styles from './ResetConfigurationModal.module.scss';
import Modal from '../../../../components/common/Modal/index';
import Content from '../../../../components/common/Modal/Content';
import Button from '../../../../components/common/Button/Button';
import { FC, memo, useCallback } from 'react';
import cn from 'classnames';

export interface ResetConfigurationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCancelClick?: () => void;
  onResetToDefaultClick?: () => void;
}

const ResetConfigurationModal: FC<ResetConfigurationModalProps> = memo((props) => {
  const {
    isOpen = false,
    onClose = () => undefined,
    onCancelClick = () => undefined,
    onResetToDefaultClick = () => undefined,
  } = props;

  const cancelClickHandler = useCallback(() => {
    onCancelClick();
    onClose();
  }, [onCancelClick, onClose]);

  const resetToDefaultClickHandler = useCallback(() => {
    onResetToDefaultClick();
    onClose();
  }, [onCancelClick, onClose]);

  return (
    <Modal
      width={550}
      isOpen={isOpen}
      onChangeIsOpen={onClose}
    >
      <Content>
        <div className={styles.root}>
          <div className={cn('primary-title', styles.title)}>
            Sind Sie sicher, dass Sie es verlieren wollen? Werden nach dem Zurücksetzen alle Fortschritte gelöscht?
          </div>
          <div className={styles.controls}>
            <Button
              label="Abbrechen"
              onClick={cancelClickHandler}
            />
            <Button
              label="Zurücksetzen"
              colorScheme="white-outlined"
              onClick={resetToDefaultClickHandler}
            />
          </div>
        </div>
      </Content>
    </Modal>
  );
});

export default ResetConfigurationModal;
