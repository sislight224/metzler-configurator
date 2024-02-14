import { FC } from 'react';
import styles from './EditableModal.module.scss';
import Modal from '../../../../components/common/Modal/index';
import Button from '../../../../components/common/Button/Button';
import Content from '../../../../components/common/Modal/Content';

export interface ClipboardModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCancelClick?: () => void;
  onEditClick?: () => void;
}

const EditableModal: FC<ClipboardModalProps> = (props) => {
  const {
    isOpen = false,
    onClose = () => undefined,
    onCancelClick = () => undefined,
    onEditClick = () => undefined,
  } = props;

  return (
    <Modal
      width={480}
      isOpen={isOpen}
      onChangeIsOpen={onClose}
    >
      <Content>
        <div className={styles.root}>
          <div className={styles.title}>Wollen Sie die Konfiguration bearbeiten?</div>
          <div className={styles.description}>
            Bitte beachten Sie, dass eine neue Bestellung angelegt und eine neue Rechnung ausgestellt wird.
            Wenn es noch andere Bestellungen gibt, sollten Sie diese selbst über den Support stornieren
          </div>
          <div className={styles.controls}>
            <Button
              onClick={onCancelClick}
              colorScheme="white-outlined"
              label="Schließen"
            />
            <Button
              onClick={onEditClick}
              label="Bearbeiten"
            />
          </div>
        </div>
      </Content>
    </Modal>
  );
};

export default EditableModal;
