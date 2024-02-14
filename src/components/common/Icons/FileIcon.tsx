import React, { FC, memo } from 'react';
import { IconProps } from './IconProps';

const FileIcon: FC<IconProps> = memo((props) => {
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
        d="M20 9.33333V18C20 19.1046 19.1046 20 18 20L6 20C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M20 9.33333V9.33333C20 8.76794 19.7582 8.22953 19.3356 7.8539L15.5683 4.50518C15.2022 4.17976 14.7294 4 14.2396 4H14M20 9.33333H16C14.8954 9.33333 14 8.4379 14 7.33333V4"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default FileIcon;
