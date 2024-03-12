import styles from "./BackToShopModal.module.scss";
import Modal from "../../../../components/common/Modal/index";
import Content from "../../../../components/common/Modal/Content";
import Button from "../../../../components/common/Button/Button";
import { FC, memo, useCallback } from "react";
import cn from "classnames";

export interface ResetConfigurationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCancelClick?: () => void;
  onResetToDefaultClick?: () => void;
}

const BackToShopModal: FC<ResetConfigurationModalProps> = memo((props) => {
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

  return (
    <Modal width={550} isOpen={isOpen} onChangeIsOpen={onClose}>
      <Content>
        <div className={styles.root}>
          <div className={cn("primary-title", styles.title)}>
            Ihre Konfiguration wird beim verlassen des Konfigurators nicht
            gespeichert. Wollen Sie zum Shop zurück?
          </div>
          <div className={styles.controls}>
            <Button label="Abbrechen" onClick={cancelClickHandler} />
            <Button
              label="Zum Shop"
              colorScheme="white-outlined"
              onClick={() => {
                window.location.href = `${window.location.origin}`;
              }}
            />
          </div>
        </div>
      </Content>
    </Modal>
  );
});

export default BackToShopModal;
