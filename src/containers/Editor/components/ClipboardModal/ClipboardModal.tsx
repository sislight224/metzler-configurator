import { FC, useCallback } from 'react';
import styles from './ClipboardModal.module.scss';
import Modal from '../../../../components/common/Modal/index';
import ClipboardField from '../../../../components/common/ClipboardField/ClipboardField';
import Button from '../../../../components/common/Button/Button';
import cn from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export interface ClipboardModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCancelClick?: () => void;
  onCopyClick?: () => void;
}

const link: string = 'https://edelstahl-tuerklingel.de/configurator/amskdmo21n';

const ClipboardModal: FC<ClipboardModalProps> = (props) => {
  const {
    isOpen = false,
    onClose = () => undefined,
    onCancelClick = () => undefined,
    onCopyClick = () => undefined,
  } = props;

  const handleCancelClickHandler = useCallback(() => {
    onCancelClick();
    onClose();
  }, [onCancelClick, onClose]);

  const handleCopyClickHandler = useCallback(() => {
    onCopyClick();
    onClose();
  }, [onCancelClick, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onClose}
    >
      <div className={styles.root}>
        <div className={cn('primary-title', styles.title)}>
          Speichern Sie den Link, um später wieder zurückzukehren und fortzufahren
        </div>
        <ClipboardField value={link} />
        <div className={styles.controls}>
          <Button
            label="Abbrechen"
            colorScheme="white-outlined"
            onClick={handleCancelClickHandler}
          />
          <CopyToClipboard text={link}>
            <Button
              label="Link kopieren"
              onClick={handleCopyClickHandler}
            />
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  );
};

export default ClipboardModal;
