import { memo, FC } from 'react';
import { IconProps } from './IconProps';

const ChevronDown: FC<IconProps> = memo((props) => {
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
        d="M17 10L12 15L7 10"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default ChevronDown;
