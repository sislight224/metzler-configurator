import { useEffect, useState } from 'react';

const useHoverEvents = <T extends HTMLElement | null>(
  ref: T,
  onMouseEnter: (e?: MouseEvent) => void = () => undefined,
  onMouseLeave: (e?: MouseEvent) => void = () => undefined,
): boolean => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const enterHandler = (e?: MouseEvent) => {
    setIsHovered(true);
    onMouseEnter(e);
  };

  const leaveHandler = (e?: MouseEvent) => {
    setIsHovered(false);
    onMouseLeave(e);
  };

  useEffect(() => {
    if (ref) {
      ref.addEventListener('mouseenter', enterHandler);
      ref.addEventListener('mouseleave', leaveHandler);
      return () => {
        ref.removeEventListener('mouseenter', enterHandler);
        ref.removeEventListener('mouseleave', leaveHandler);
      };
    }
  }, [ref]);
  return isHovered;
};

export default useHoverEvents;
