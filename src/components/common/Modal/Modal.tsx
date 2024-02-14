import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Content from './Content';
import Transition from '../Transition/Transition';
import ReactModal from 'react-modal';
import classNames from './Modal.module.scss';

if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('__next') || document.getElementById('root');
  ReactModal.setAppElement(rootElement || document.body);
}

type ModalComponentsType = {
  Header: typeof Header;
  Content: typeof Content;
};

export interface ModalProps {
  isOpen?: boolean;
  closeOnOverlayClick?: boolean;
  showOverlay?: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  disableAutoHeight?: boolean;
  children: ReactNode;
  contentMaxWidth?: string | number;
  width?: string | number;
}

const Modal: FC<ModalProps> & ModalComponentsType = (props) => {
  const {
    isOpen = false,
    onChangeIsOpen = () => undefined,
    disableAutoHeight = false,
    closeOnOverlayClick = true,
    children,
    contentMaxWidth = '100%',
    width = '100%',
  } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) setIsVisible(isOpen);
    if (isOpen) {
      if (isMounted) setIsVisible(true);
      setIsMounted(true);
    }
  }, [isOpen, isMounted]);

  const transitionTimeout = useMemo(() => {
    return isOpen ? 0 : 300;
  }, [isOpen]);

  const rootStyles = useMemo(() => {
    return {
      content: {
        maxWidth: contentMaxWidth,
        width,
        height: disableAutoHeight ? '100%' : 'auto',
      },
    };
  }, [disableAutoHeight]);

  return (
    <Transition
      enable={isVisible}
      timeout={transitionTimeout}
      onExited={() => setIsMounted(false)}
    >
      <ReactModal
        isOpen={isMounted}
        onAfterOpen={() => setIsVisible(true)}
        onAfterClose={() => setIsMounted(false)}
        onRequestClose={() => onChangeIsOpen(false)}
        className={classNames.root}
        style={rootStyles}
        shouldFocusAfterRender
        shouldCloseOnOverlayClick={closeOnOverlayClick}
        overlayClassName={{
          base: classNames.overlay,
          afterOpen: classNames.overlay_afterOpen,
          beforeClose: classNames.overlay_beforeClose,
        }}
      >
        <div className={classNames.content_wrapper}>
          <div className={classNames.container}>
            {children}
          </div>
        </div>
      </ReactModal>
    </Transition>
  );
};

Modal.Header = Header;
Modal.Content = Content;

export default Modal;
