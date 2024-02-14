import { FC, memo } from 'react';
import { IconProps } from './IconProps';
import themeConfig from '../../../../styles/theme/config.module.scss';

export const CopyIcon: FC<IconProps> = memo((props) => {
  const { width = '24px', height = '24px', color = themeConfig.pine_green_900 } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 9H18C19.6569 9 21 10.3431 21 12V18C21 19.6569 19.6569 21 18 21H12C10.3431 21 9 19.6569 9 18V15M15 9H12C10.3431 9 9 10.3431 9 12V15M15 9V6C15 4.34315 13.6569 3 12 3H6C4.34315 3 3 4.34315 3 6V12C3 13.6569 4.34315 15 6 15H9"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default CopyIcon;
