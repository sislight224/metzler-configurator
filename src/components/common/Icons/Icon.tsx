import { createElement, FC, memo } from 'react';
import { IconProps as DefaultIconProps } from './IconProps';
import iconsDict from './iconsDict';

export interface IconProps extends DefaultIconProps {
  name: string;
}

const Icon: FC<IconProps> = memo((props) => {
  const { width, height, color, name } = props;
  const iconComponentName = Object.keys(iconsDict).find((icon) => icon === `${name[0].toUpperCase()}${name.slice(1)}Icon`)
    || 'DummyIcon';

  return createElement(iconsDict[iconComponentName], { width, height, color });
});

export default Icon;
