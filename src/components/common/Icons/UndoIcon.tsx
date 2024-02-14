import { IconProps } from './IconProps';
import { FC, memo } from 'react';

const UndoIcon: FC<IconProps> = memo((props) => {
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
        d="M4 9V14H9M20 16C19.5026 11.5 16.6326 8 12 8C9.27084 8 6.07142 10.2681 4.70591 13.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default UndoIcon;
