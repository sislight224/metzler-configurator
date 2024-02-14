import React, { FC, memo, ReactNode, useCallback, useMemo } from 'react';
import styles from './Panel.module.scss';
import classnames from 'classnames';
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary } from '@material-ui/core';
import ChevronDown from '../../../../components/common/Icons/ChevronDown';
import { CSSTransition } from 'react-transition-group';

export type PanelMode = 'default' | 'preview' | 'completed' | 'notEditable' | 'skeleton';

export interface PanelProps {
  mode?: PanelMode;
  title: string;
  header: ReactNode;
  onPanelClick: () => void;
  collapseIsEnabled?: boolean;
}

export type PanelType = AccordionProps & PanelProps;

const Panel: FC<PanelType> = memo((props) => {
  const {
    children,
    expanded,
    mode,
    title = '',
    header,
    collapseIsEnabled = false,
    onPanelClick = () => undefined,
  } = props;

  const isPreview = mode === 'preview';
  const isCompleted = mode === 'completed';
  const isNotEditable = mode === 'notEditable';
  const isSkeleton = mode === 'skeleton';

  const isShowContentHeader = ((isCompleted || isPreview) && !expanded) || isNotEditable;

  const panelClickHandler = useCallback(() => {
    if (isCompleted) onPanelClick();
  }, [onPanelClick]);

  const headerRootStyles = useMemo(() => {
    return classnames(
      styles.header,
      { [styles.header_completed]: isCompleted },
      { [styles.header_preview]: isPreview },
      { [styles.header_blocked]: isNotEditable },
      { [styles.skeleton]: isSkeleton },
    );
  }, [isCompleted, isPreview, isNotEditable, isSkeleton]);

  const contentStyles = useMemo(() => {
    return classnames(
      styles.content,
      { [styles.completed]: (isCompleted || isPreview) && !isSkeleton },
      { [styles.blocked]: isNotEditable },
    );
  }, [isCompleted, isPreview, isNotEditable, isSkeleton]);

  const collapseStyles = useMemo(() => {
    return classnames(
      styles.collapseButton,
      { [styles.collapseButton_active]: expanded },
    );
  }, [expanded]);

  return (
    <Accordion
      title={title}
      classes={{ root: styles.root, expanded: styles.root_expanded }}
      expanded={expanded}
    >
      <AccordionSummary
        onClick={() => panelClickHandler()}
        style={{ padding: 0, width: '100%' }}
        classes={{
          root: headerRootStyles,
          content: styles.header_content,
          expanded: styles.header_expanded,
        }}
      >
        {!isSkeleton && <div className={styles.header_contentBlock}>
          <div className={styles.header_title}>
            <p>{title}</p>
            {collapseIsEnabled && <div className={collapseStyles}>
              <ChevronDown />
            </div>}
          </div>
          <div style={{ marginTop: isShowContentHeader ? 16 : 0 }}>
            {isShowContentHeader && header}
          </div>
        </div>}
      </AccordionSummary>
      <CSSTransition
        timeout={1500}
        in={expanded}
        classNames={{
          enter: styles.root_enter,
          enterActive: styles.root_enterActive,
          enterDone: styles.root_enterDone,
          exit: styles.root_exit,
          exitActive: styles.root_exitActive,
          exitDone: styles.root_exitDone,
        }}
      >
        <AccordionDetails classes={{ root: contentStyles }}>
          <div className={styles.content_block}>
            {!isSkeleton && children}
          </div>
        </AccordionDetails>
      </CSSTransition>
    </Accordion>
  );
});
export default Panel;
