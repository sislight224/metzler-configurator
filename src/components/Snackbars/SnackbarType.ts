import { ReactNode } from 'react';

export interface SnackbarProps {
  statusCode?: number;
  message?: string | ReactNode;
  id?: string;
}
