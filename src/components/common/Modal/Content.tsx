import { FC, ReactNode } from 'react';
import classNames from './Modal.module.scss';
import cn from 'classnames';

export interface ContentProps {
  className?: string;
  children: ReactNode;
}

const Content: FC<ContentProps> = ({ className, children }) => {
  return (
    <div className={cn(className, classNames.content)}>
      {children}
    </div>
  );
};

export default Content;
