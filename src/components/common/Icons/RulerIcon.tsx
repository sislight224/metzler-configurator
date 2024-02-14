import { IconProps } from './IconProps';
import { FC, memo } from 'react';

const RulerIcon: FC<IconProps> = memo((props) => {
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
        d="M6 12L4.41421 13.5858C3.63317 14.3668 3.63316 15.6332 4.41421 16.4142L7.58579 19.5858C8.36683 20.3668 9.63317 20.3668 10.4142 19.5858L19.5858 10.4142C20.3668 9.63317 20.3668 8.36684 19.5858 7.58579L16.4142 4.41421C15.6332 3.63317 14.3668 3.63316 13.5858 4.41421L12 6M6 12L8 14M6 12L9 9M12 6L14 8M12 6L9 9M9 9L12 12"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default RulerIcon;
