import { FC, memo } from 'react';
import { IconProps } from './IconProps';

const SaveIcon: FC<IconProps> = memo((props) => {
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
        d="M8 4H4V20H20V8L16 4H14M8 4V8H14V4M8 4H14M12 12C11.3333 12 10 12.4 10 14C10 15.6 11.3333 16 12 16C12.6667 16 14 15.6 14 14C14 12.4 12.6667 12 12 12Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default SaveIcon;
