import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { forwardRef, useEffect } from 'react';
import Icon from '../Icons/Icon';
import styles from './IconButton.module.scss';
import ChevronDown from '../Icons/ChevronDown';
import { useMediaQuery } from '@mui/material';

const Tooltip = dynamic(() => import('../Tooltip/Tooltip'), { ssr: false });

const iconColor = '#005253';
const activeIconColor = '#ffffff';
const disabledIconColor = '#888888';

export interface ButtonProps {
  iconName: string;
  active?: boolean;
  loading?: boolean;
  tooltipText?: string;
  enableTooltip?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChevronClick?: (iconName: string) => void;
  disabled?: boolean;
  isActiveSkeleton?: boolean;
}

const Button = forwardRef<HTMLDivElement, ButtonProps>((props, ref) => {
  const {
    iconName,
    active = false,
    loading = false,
    tooltipText = null,
    enableTooltip = false,
    onClick = () => undefined,
    isActiveSkeleton = false,
    onChevronClick,
    disabled,
  } = props;

  const isMobile = useMediaQuery('(max-width: 767px)');

  const [isIconHovered, setIsIconHovered] = React.useState<boolean>(false);
  const [isPressed, setIsPressed] = React.useState<boolean>(false);

  useEffect(() => {
    if (!disabled) {
      setIsIconHovered(false);
    }
  }, [disabled]);

  const clickHandler = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!loading && !isActiveSkeleton) onClick(e);
    },
    [loading, onClick, isActiveSkeleton],
  );

  const hoverOnHandler = () => {
    if (!isActiveSkeleton) {
      setIsIconHovered(true);
      setIsPressed(false);
    }
  };

  const hoverOffHandler = () => {
    if (!isActiveSkeleton) {
      setIsIconHovered(false);
      setIsPressed(false);
    }
  };

  const pressDownHandler = () => setIsPressed(true);
  const pressUpHandler = () => setIsPressed(false);

  const getActualIconColor = () => {
    if (disabled) {
      return disabledIconColor;
    }

    return (isPressed || isIconHovered || active) ? activeIconColor : iconColor;
  };

  const renderButton = () => (
    <button
      type="button"
      className={clsx(
        styles.root,
        {
          [styles.root_disabled]: disabled,
          [styles.root_active]: active,
          [styles.skeleton]: isActiveSkeleton,
        },
      )}
      onClick={clickHandler}
      onMouseEnter={hoverOnHandler}
      onMouseLeave={hoverOffHandler}
      onMouseDown={pressDownHandler}
      onMouseUp={pressUpHandler}
      disabled={disabled}
    >
      {!isActiveSkeleton && <Icon
        name={iconName}
        width="24px"
        height="24px"
        color={getActualIconColor()}
      />}
    </button>
  );

  const renderButtonBox = () => {
    if (isActiveSkeleton && isMobile) return <div />;

    if (onChevronClick) {
      return (
        <div className={styles.buttonBox}>
          {
          renderButton()
        }
          <button
            type="button"
            className={styles.chevronBtn}
            onClick={() => onChevronClick(iconName)}
          >
            <ChevronDown />
          </button>
        </div>
      );
    }

    return renderButton();
  };

  if (enableTooltip && !isActiveSkeleton) {
    return (
      <div ref={ref}>
        <Tooltip
          content={() => <span className={styles.tooltip}>{tooltipText}</span>}
          placement="top"
          trigger="hover"
          backgroundColor="#005253"
          disable={disabled}
        >
          {renderButtonBox()}
        </Tooltip>
      </div>
    );
  }

  return (
    <div ref={ref}>
      {renderButtonBox()}
    </div>
  );
});

export default Button;
