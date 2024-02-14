import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import Snackbar from '../components/Snackbars/Snackbar';

export interface UseAppSnackbarProps {
  defaultErrorMessage?: string;
}

export interface UseAppSnackbarResult {
  enqueueErrorSnackbar: (errorMessage?: string) => void;
}

export const useAppSnackbar = (props: UseAppSnackbarProps): UseAppSnackbarResult => {
  const { defaultErrorMessage } = props;

  const { enqueueSnackbar } = useSnackbar();

  const enqueueErrorSnackbar = useCallback((errorMessage?: string) => {
    enqueueSnackbar(errorMessage || defaultErrorMessage, {
      variant: 'error',
      style: {
        // todo: для мобилки данный параметр не подоходит
        top: 50,
        left: 10,
      },
      anchorOrigin: { vertical: 'top', horizontal: 'left' },
      content: () => (
        <Snackbar
          theme="error"
          message={errorMessage}
        />
      ),
    });
  }, []);

  return {
    enqueueErrorSnackbar,
  };
};
