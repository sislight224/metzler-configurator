import React, { memo } from 'react';
import { IconProps } from './IconProps';

const CloseIcon: React.FC<IconProps> = memo((props) => {
  const { width = '24px', height = '24px', color = '#333333' } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L12 12M18 18L12 12M12 12L18 6M12 12L6 18"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  );
});

export default CloseIcon;
