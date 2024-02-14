import styles from './CopyLinkModal.module.scss';
import Modal from '../../../../components/common/Modal/index';
import Content from '../../../../components/common/Modal/Content';
import Button from '../../../../components/common/Button/Button';
import { FC, memo, useCallback } from 'react';
import cn from 'classnames';
import CopyIcon from '../../../../components/common/Icons/CopyIcon';
import { IconButton } from '@mui/material';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

export interface ResetConfigurationModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancelClick?: () => void;
  onCopyLink?: (link: string) => void;
}

const CopyLinkModal: FC<ResetConfigurationModalProps> = memo((props) => {
  const { configUrl } = useEditorStore();

  const {
    isOpen = false,
    onClose = () => undefined,
    onCancelClick = () => undefined,
    onCopyLink = () => undefined,
  } = props;

  const cancelClickHandler = useCallback(() => {
    onCancelClick();
    onClose();
  }, [onCancelClick, onClose]);

  const copyHandler = useCallback(() => {
    onCopyLink(configUrl);
  }, [onCopyLink, configUrl]);

  return (
    <Modal
      width="450px"
      isOpen={isOpen}
      onChangeIsOpen={onClose}
    >
      <Content>
        <div className={styles.root}>

          <div className={cn('primary-title', styles.title)}>
            Speichern Sie den Link, um später wieder zurückzukehren und fortzufahren
          </div>

          <div className={styles.container}>
            <div className={styles.linkBox}>
              <input
                readOnly
                value={configUrl}
                className={styles.link}
              />
              <IconButton
                onClick={copyHandler}
              >
                <CopyIcon />
              </IconButton>
            </div>

            <div className={styles.configuration}>
              Die Konfiguration wird für 2 Monate gespeichert
            </div>
          </div>

          <div className={styles.controls}>
            <Button
              label="Zurück"
              colorScheme="white-pine"
              onClick={cancelClickHandler}
            />
            <Button
              label="Link kopieren"
              onClick={copyHandler}
            />
          </div>
        </div>
      </Content>
    </Modal>
  );
});

export default CopyLinkModal;
