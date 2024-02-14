import { forwardRef, LegacyRef } from 'react';
import classnames from 'classnames';
import styles from './Color.module.scss';

export interface ColorProps {
  onClick?: () => void;
  color: string;
  isActive: boolean;
}

const Color = (props: ColorProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const {
    onClick = () => undefined,
    isActive = false,
    color,
  } = props;

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classnames(
        styles.root,
        { [styles.root_active]: isActive },
      )}
    >
      <div
        style={{ background: color }}
        className={styles.root_inner}
      />
    </div>
  );
};

export default forwardRef(Color);
