import styles from './Panel.module.scss';
import classnames from 'classnames';
import React, {
  FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import ChevronDown from '../../../../components/common/Icons/ChevronDown';
/**
 * @deprecated change to mui accordeon
 */

export type PanelMode = 'default' | 'preview' | 'completed' | 'notEditable' | 'skeleton';

export interface PanelProps {
  mode?: PanelMode;
  isOpen?: boolean;
  title?: string;
  collapseIsEnabled?: boolean;
  onCollapseClick?: (isOpen: boolean) => void;
  onOpen?: () => void;
  children?: ReactNode;
}

const OldPanel: FC<PanelProps> = (props) => {
  const {
    mode = 'default',
    isOpen = false,
    title,
    collapseIsEnabled = false,
    onCollapseClick = () => undefined,
    onOpen = () => undefined,
    children,
  } = props;

  const isPreview = useMemo(() => mode === 'preview', [mode]);
  const isCompleted = useMemo(() => mode === 'completed', [mode]);
  const isNotEditable = useMemo(() => mode === 'notEditable', [mode]);
  const isSkeleton = useMemo(() => mode === 'skeleton', [mode]);

  const [contentHeight, setContentHeight] = useState<number>(0);

  const canCollapse = useMemo(() => {
    return collapseIsEnabled || (!isPreview && isCompleted);
  }, [isPreview, isCompleted, collapseIsEnabled]);

  useEffect(() => {
    if (isOpen) onOpen();
  }, [isOpen]);

  const getContentHeight = useCallback(() => {
    if (isOpen || isCompleted || isPreview || isNotEditable) {
      return contentHeight;
    }

    return 0;
  }, [contentHeight, isOpen, isPreview, isCompleted, isNotEditable]);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current!.clientHeight);
  }, [children]);

  const onCollapseClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isPreview) {
      e.preventDefault();
      return;
    }

    if (!canCollapse) {
      e.preventDefault();
      return;
    }

    onCollapseClick(isOpen);
  }, [onCollapseClick, isOpen, isPreview, canCollapse]);

  const rootStyles = useMemo(() => {
    return classnames(
      styles.root,
      { [styles.completed]: (isCompleted || isPreview) && !isSkeleton },
      { [styles.blocked]: isNotEditable },
      { [styles.skeleton]: isSkeleton },
    );
  }, [isCompleted, isPreview, isNotEditable, isSkeleton]);

  return (
    <div className={rootStyles}>
      {!isSkeleton && <div
        className={classnames(styles.header, { [styles.headerPreview]: isPreview })}
        onClick={onCollapseClickHandler}
      >
        {title}
        {canCollapse && <div className={classnames(styles.collapseButton, { [styles.collapseButton_active]: isOpen })}>
          <ChevronDown />
        </div>}
      </div>}
      {!isSkeleton && <div
        className={classnames(
          styles.content,
          { [styles.content_preview]: isPreview },
          { [styles.completed]: (isCompleted || isPreview) && !isSkeleton },
          { [styles.blocked]: isNotEditable },
        )}
        style={{ height: getContentHeight() }}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>}
    </div>
  );
};

export default OldPanel;
