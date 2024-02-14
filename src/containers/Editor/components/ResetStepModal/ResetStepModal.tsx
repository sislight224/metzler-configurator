import styles from './ResetStepModal.module.scss';
import Modal from '../../../../components/common/Modal/index';
import Content from '../../../../components/common/Modal/Content';
import Button from '../../../../components/common/Button/Button';
import { FC, memo, useCallback } from 'react';
import cn from 'classnames';

export interface ResetConfigurationModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancelClick?: () => void;
  onResetStepClick?: () => void;
}

const ResetStepModal: FC<ResetConfigurationModalProps> = memo((props) => {
  const {
    isOpen = false,
    onClose = () => undefined,
    onCancelClick = () => undefined,
    onResetStepClick = () => undefined,
  } = props;

  const cancelClickHandler = useCallback(() => {
    onCancelClick();
    onClose();
  }, [onCancelClick, onClose]);

  const resetStepClickHandler = useCallback(() => {
    onResetStepClick();
  }, [onCancelClick]);

  return (
    <Modal
      width="450px"
      isOpen={isOpen}
      onChangeIsOpen={onClose}
    >
      <Content>
        <div className={styles.root}>
          <div className={cn('primary-title', styles.title)}>
            Sind Sie sicher, dass Sie diesen Schritt bearbeiten wollen? Alle nachfolgenden Schritte werden zurückgesetzt
          </div>
          <div className={styles.controls}>
            <Button
              label="Abbrechen"
              onClick={cancelClickHandler}
            />
            <Button
              label="Bearbeiten"
              colorScheme="white-outlined"
              onClick={resetStepClickHandler}
            />
          </div>
        </div>
      </Content>
    </Modal>
  );
});

export default ResetStepModal;
