import { FC, memo } from 'react';
import { IconProps } from './IconProps';

const ReloadIcon: FC<IconProps> = memo((props) => {
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
        d="M5 13.5C5 17.6421 8.35786 21 12.5 21C16.6421 21 20 17.6421 20 13.5C20 9.35786 16.6421 6 12.5 6H4M4 6L7 3M4 6L7 9"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default ReloadIcon;
