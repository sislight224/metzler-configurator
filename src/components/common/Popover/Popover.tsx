import {
  FC,
  MutableRefObject,
  ReactElement, ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
import { useClickAway } from 'react-use';
import moduleStyles from './Popover.module.scss';
import { CSSTransition } from 'react-transition-group';
import { Placement, PositioningStrategy } from '@popperjs/core';
import useHoverEvents from '../../../hooks/useHoverEvents';
import useVirtualElement from './useVirtualElement';
import PopoverContent from './PopoverContent';

export type VerticalAnchorType = 'top' | 'center' | 'bottom';

export type HorizontalAnchorType = 'left' | 'center' | 'right';

export interface ToolTipStyles {
  background?: string;
  boxShadow?: string;
  borderRadius?: string;
}

interface PopoverProps {
  trigger?: 'hover' | 'click';
  mode?: 'controlled' | 'uncontrolled';
  closeOnClickOutside?: boolean;
  isOpen?: boolean;
  disable?: boolean;
  maxWidth?: string;
  contentWidth?: string;
  contentPadding?: string | number;
  transitionDelay?: number;
  arrowColor?: string;
  toolTipStyles?: ToolTipStyles;
  strategy?: PositioningStrategy;
  placement: Placement;
  triggerComponent?: (isOpen: boolean) => ReactElement;
  triggerElementRef?: MutableRefObject<HTMLElement | null>;
  onPopoverOpen?: (isOpen: boolean) => void;
  verticalAnchor?: VerticalAnchorType;
  horizontalAnchor?: HorizontalAnchorType;
  closeOnScroll?: boolean;
  children: ReactNode;
}

const Popover: FC<PopoverProps> = (props) => {
  const {
    trigger,
    mode = 'uncontrolled',
    closeOnClickOutside = true,
    isOpen = false,
    disable = false,
    strategy = 'absolute',
    placement = 'top',
    triggerComponent,
    triggerElementRef,
    contentWidth,
    transitionDelay = 400,
    toolTipStyles = {
      background: '#ffffff',
      boxShadow: '-5px 7px 28px rgba(15, 21, 38, 0.2)',
      borderRadius: 16,
    },
    arrowColor = '#ffffff',
    maxWidth,
    contentPadding = 8,
    onPopoverOpen = () => undefined,
    verticalAnchor = 'center',
    horizontalAnchor = 'center',
    closeOnScroll = false,
    children,
  } = props;
  const referenceElement = useRef(null);
  const contentElement = useRef(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const closer = useRef(null);
  const [inTransition, setInTransition] = useState<boolean>(false);
  const [visible, setVisibility] = useState<boolean>(false);
  const reference = mode === 'controlled' ? triggerElementRef || referenceElement : referenceElement;

  const virtualElement = useVirtualElement(reference, placement, verticalAnchor, horizontalAnchor);

  const { styles, attributes } = usePopper(virtualElement, popperElement, {
    strategy,
    placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
          padding: 18,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [-2, 8],
        },
      },
    ],
  });
  const isHover = useHoverEvents(referenceElement.current);
  const contentIsHover = useHoverEvents(contentElement.current);

  useEffect(() => {
    if (!disable) {
      setVisibility(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (trigger === 'hover' && isHover) {
      setVisibility(true);
    }
    if (trigger === 'hover' && !isHover && !contentIsHover) {
      setVisibility(false);
    }
  }, [isHover, contentIsHover, trigger]);

  useEffect(() => {
    if (!visible || !closeOnScroll) return;
    const handler = () => {
      setVisibility(false);
    };
    window.addEventListener('wheel', handler);
    return () => window.removeEventListener('wheel', handler);
  }, [visible]);

  useClickAway(closer, () => {
    if (closeOnClickOutside) {
      setVisibility(false);
    }
  });
  const nodeRef = useRef(null); // todo: проблема с findNode из-за компонента CCSTransition

  // if (isServer) return <div />;
  // todo: надо понять, как отключить этот компонент в ssr,
  //  чтобы не было ошибок, проблема в том что tooltip оборачивает элемент в себя

  return (
    <>
      {mode === 'uncontrolled' && (
        <div
          className={moduleStyles.popover}
          ref={referenceElement}
          onClick={() => {
            if (!inTransition && !disable) {
              setVisibility(!visible);
            }
          }}
          style={{
            display: 'inline-block',
          }}
        >
          {triggerComponent && triggerComponent(visible)}
        </div>
      )}
      <PopoverContent ref={contentElement}>
        <CSSTransition
          nodeRef={nodeRef}
          in={visible}
          timeout={transitionDelay}
          appear
          unmountOnExit
          classNames={{
            enter: moduleStyles.root_enter,
            enterActive: moduleStyles.root_enterActive,
            enterDone: moduleStyles.root_enterDone,
            exit: moduleStyles.root_exit,
            exitActive: moduleStyles.root_exitActive,
            exitDone: moduleStyles.root_exitDone,
          }}
          onEntering={() => {
            setInTransition(true);
          }}
          onEntered={() => {
            setInTransition(false);
            onPopoverOpen(visible);
          }}
          onExit={() => {
            setInTransition(true);
          }}
          onExited={() => {
            setInTransition(false);
            onPopoverOpen(visible);
          }}
        >
          <div ref={nodeRef}>
            <div
              className={moduleStyles.popover}
              ref={setPopperElement}
              style={{
                ...styles.popper,
                ...toolTipStyles,
                ...{ zIndex: 999 },
              }}
              {...attributes.popper}
            >
              <div
                style={{
                  padding: contentPadding,
                  maxWidth,
                  width: contentWidth,
                  position: 'relative',
                  zIndex: 1,
                }}
                ref={closer}
              >
                {children}
              </div>
              <div
                data-popper-arrow
                className={moduleStyles.arrow}
                ref={setArrowElement}
                style={{
                  ...styles.arrow,
                  width: 16,
                  height: 8,
                  background: arrowColor,
                }}
              />
            </div>
          </div>
        </CSSTransition>
      </PopoverContent>
    </>
  );
};

export default Popover;
