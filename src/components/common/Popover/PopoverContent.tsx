import { forwardRef, ReactNode } from 'react';

export interface PopoverContentProps {
  children: ReactNode;
}

// todo: из-за React Portal popover появляется за блоками

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});

export default PopoverContent;
