import { FC, ReactNode } from 'react';
import classNames from './Transition.module.scss';
import { CSSTransition } from 'react-transition-group';

export interface PageTransitionProps {
  onExited?: () => void;
  onEntered?: () => void;
  enable?: boolean;
  timeout?: number;
  appear?: boolean;
  unmountOnExit?: boolean;
  children: ReactNode;
}

const Transition: FC<PageTransitionProps> = (props) => {
  const {
    onEntered = () => undefined,
    onExited = () => undefined,
    enable = true,
    timeout = 300,
    appear = true,
    unmountOnExit = false,
    children,
  } = props;

  return (
    <CSSTransition
      in={enable}
      timeout={timeout}
      onExited={onExited}
      onEntered={onEntered}
      unmountOnExit={unmountOnExit}
      appear={appear}
      classNames={{
        enter: classNames.root_enter,
        enterActive: classNames.root_enterActive,
        enterDone: classNames.root_enterDone,
        exit: classNames.root_exit,
        exitActive: classNames.root_exitActive,
        exitDone: classNames.root_exitDone,
      }}
    >
      <>
        {children}
      </>
    </CSSTransition>
  );
};

export default Transition;
