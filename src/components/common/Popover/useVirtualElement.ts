import { MutableRefObject, useMemo } from 'react';
import { Placement, VirtualElement } from '@popperjs/core';
import { HorizontalAnchorType, VerticalAnchorType } from 'components/common/Popover/Popover';
import { useWindowSize } from 'react-use';

const computeHorizontalAnchorOffset = (
  ref: HTMLElement | null,
  placement: Placement,
  anchor: HorizontalAnchorType,
): number => {
  let x = ref?.getBoundingClientRect().x || 0;
  const width = ref?.clientWidth || 0;
  switch (anchor) {
    case 'center':
      x += width / 2;
      break;
    case 'right':
      x += width;
      break;
    default:
      break;
  }
  switch (placement) {
    case 'top-start':
    case 'bottom-start':
      x -= 24;
      break;
    case 'top-end':
    case 'bottom-end':
      x += 24;
      break;
    default:
      break;
  }
  return x;
};

const computeVerticalAnchorOffset = (
  ref: HTMLElement | null,
  placement: Placement,
  anchor: VerticalAnchorType,
): number => {
  let y = ref?.getBoundingClientRect().y || 0;
  const height = ref?.clientHeight || 0;
  switch (anchor) {
    case 'center':
      y += height / 2;
      break;
    case 'bottom':
      y += height;
      break;
    default:
      break;
  }
  switch (placement) {
    case 'left-end':
    case 'right-end':
      y += 24;
      break;
    case 'left-start':
    case 'right-start':
      y -= 24;
      break;
    default:
      break;
  }
  return y;
};

export const useVirtualElement = (
  ref: MutableRefObject<HTMLElement | null>,
  placement: Placement,
  verticalAnchor: VerticalAnchorType,
  horizontalAnchor: HorizontalAnchorType,
): VirtualElement => {
  const x = computeHorizontalAnchorOffset(ref.current, placement, horizontalAnchor);
  const y = computeVerticalAnchorOffset(ref.current, placement, verticalAnchor);
  const { width, height } = useWindowSize();
  return useMemo(
    () => ({
      getBoundingClientRect: (): DOMRect => {
        return {
          toJSON: () => undefined,
          x: 0,
          y: 0,
          top: y,
          left: x,
          bottom: y,
          right: x,
          width: 0,
          height: 0,
        };
      },
    }),
    [ref.current, verticalAnchor, horizontalAnchor, width, height, placement, x, y],
  );
};

export default useVirtualElement;
