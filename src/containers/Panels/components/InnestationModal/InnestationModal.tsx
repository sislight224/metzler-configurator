import { FC, useCallback, useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal/Modal';
import styles from './InnestationModal.module.scss';
import classnames from 'classnames';

// todo: затычка, потому что нет текста, который будет приходить
export interface InnestationModalProps {
  onChangeIsOpen: (value: boolean) => void;
  isOpen: boolean;
  title: string;
  description: string[];
  width?: string;
  activeInnenstationViewModuleIndex: number;
  innenstationViewModules: string[];
}

const InnestationModal: FC<InnestationModalProps> = (props) => {
  const {
    onChangeIsOpen = () => undefined,
    activeInnenstationViewModuleIndex,
    innenstationViewModules,
    isOpen = true,
    width = '580px',
    description,
    title,
  } = props;

  const [currentView, setCurrentView] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) setCurrentView(0);
  }, [isOpen]);

  const changeCurrentImageHandler = useCallback((index: number) => {
    setCurrentView(index);
  }, [activeInnenstationViewModuleIndex]);

  return (
    <Modal
      onChangeIsOpen={onChangeIsOpen}
      isOpen={isOpen}
      width={width}
      closeOnOverlayClick
    >
      <Modal.Header
        withCloseIcon
        onClose={() => onChangeIsOpen(false)}
        className={styles.title}
      >
        <div className={styles.title}>{title}</div>
      </Modal.Header>
      <Modal.Content>
        <div>
          <div className={styles.preview}>
            <div className={styles.preview_left}>
              {innenstationViewModules?.map((module, index) => (
                <img
                  onClick={() => changeCurrentImageHandler(index)}
                  key={module}
                  src={module}
                  alt={module}
                  className={classnames(
                    styles.preview_leftPicture,
                    { [styles.preview_leftPictureActive]: index === currentView },
                  )}
                />
              ))}
            </div>
            <div className={styles.preview_right}>
              <img
                src={innenstationViewModules[currentView]}
              />
            </div>
          </div>
          <div className={styles.text}>
            {description.map((item) => <p key={item}>{item}</p>)}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default InnestationModal;
