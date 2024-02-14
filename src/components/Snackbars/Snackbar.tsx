import React, { forwardRef, ReactNode } from 'react';
import Icon from '../common/Icons/Icon';
import styles from './Snackbar.module.scss';
import classnames from 'classnames';
import { SnackbarContent, useSnackbar } from 'notistack';

export type ThemeType = 'success' | 'error';

export interface SnackbarProps {
  message?: string | ReactNode;
  theme: ThemeType;
}

const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  const { theme, message } = props;

  const { closeSnackbar } = useSnackbar();

  return (
    <SnackbarContent
      ref={ref}
      className={classnames(
        styles.root,
        styles[theme],
      )}
    >
      <div className={styles.root_name}>Fehler</div>
      <div className={styles.root_errorMessage}>
        {message}
      </div>
      <div
        onClick={() => closeSnackbar()}
        className={styles.root_closeIcon}
      >
        <Icon
          name="close"
          color="#FFFFFF"
        />
      </div>
    </SnackbarContent>
  );
});

export default Snackbar;
