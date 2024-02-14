import { FC, memo } from 'react';
import { IconProps } from './IconProps';

const RedoIcon: FC<IconProps> = memo((props) => {
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
        d="M20 9V14H15M4 16C4.49744 11.5 7.36745 8 12 8C14.7292 8 17.9286 10.2681 19.2941 13.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default RedoIcon;
