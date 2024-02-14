import { FC, memo } from 'react';
import { IconProps } from './IconProps';

const BackArrowIcon: FC<IconProps> = memo((props) => {
  const { width = '16px', height = '14px', color = '#005253' } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 7L7 1M1 7L7 13M1 7H15"
      />
    </svg>
  );
});

export default BackArrowIcon;
