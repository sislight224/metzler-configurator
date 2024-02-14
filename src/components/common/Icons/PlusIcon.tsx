import React, { FC, memo } from 'react';
import { IconProps } from './IconProps';

const PlusIcon: FC<IconProps> = memo((props) => {
  const { width = '24px', height = '24px', color = '#005253' } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H12M19 12H12M12 12V5M12 12V19"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default PlusIcon;
