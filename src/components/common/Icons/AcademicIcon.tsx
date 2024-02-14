import React, { memo } from 'react';
import { IconProps } from './IconProps';

const AcademicIcon: React.FC<IconProps> = memo((props) => {
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
        d="M21 9L12 4L3 9L6 10.6667M21 9L18 10.6667M21 9V16M6 10.6667L12 14L18 10.6667M6 10.6667V17L12 20L18 17V10.6667"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default AcademicIcon;
