import React, { FC, memo } from 'react';
import { IconProps } from './IconProps';

const LibraryIcon: FC<IconProps> = memo((props) => {
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
        d="M4 8.3125V20M4 8.3125H20M4 8.3125H3L12 3L21 8.3125H20M4 20H20M4 20H3M20 20V8.3125M20 20H21M8 12.5625V15.75M12 15.75V12.5625M16 12.5625V15.75"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default LibraryIcon;
