import { cloneElement, FC, ReactElement, ReactNode, useRef } from 'react';
import PopoverComponent from '../Popover/Popover';
import { HorizontalAnchorType, VerticalAnchorType } from 'components/common/Popover/Popover';
import { Placement } from '@popperjs/core';

export interface TooltipProps {
  content: () => JSX.Element | ReactNode;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  horizontalAnchor?: HorizontalAnchorType;
  verticalAnchor?: VerticalAnchorType;
  disable?: boolean;
  maxWidth?: string;
  onOpenHandler?: (isOpen: boolean) => void;
  children: ReactElement;
  closeOnScroll?: boolean;
  backgroundColor?: string;
  style?: Record<string, string>;
}

export const Tooltip: FC<TooltipProps> = (props) => {
  const {
    trigger = 'hover',
    placement = 'top',
    disable = false,
    horizontalAnchor = 'center',
    verticalAnchor = 'top',
    closeOnScroll = false,
    onOpenHandler = () => undefined,
    maxWidth,
    content,
    backgroundColor = '#374151',
    children,
    style,
  } = props;
  const triggerRef = useRef();
  const triggerEl = cloneElement(children, {
    ...children.props,
    ref: triggerRef,
  });
  return (
    <PopoverComponent
      trigger={trigger}
      placement={placement}
      triggerComponent={() => triggerEl}
      disable={disable}
      maxWidth={maxWidth}
      arrowColor={backgroundColor}
      contentPadding="8px 16px 8px 16px"
      closeOnScroll={closeOnScroll}
      toolTipStyles={{
        background: backgroundColor,
        boxShadow: '0px 0px 11px rgba(15, 21, 38, 0.05), -2px 2px 4px rgba(15, 21, 38, 0.2)',
        borderRadius: '8px',
        ...style,
      }}
      horizontalAnchor={horizontalAnchor}
      verticalAnchor={verticalAnchor}
      onPopoverOpen={onOpenHandler}
      triggerElementRef={triggerRef.current}
    >
      {typeof content === 'function' ? content() : content}
    </PopoverComponent>
  );
};

export default Tooltip;
