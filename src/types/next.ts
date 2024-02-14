import { NextPage } from 'next';
import { ReactElement } from 'react';
import { AppProps } from 'next/app';

export type ExtendedNextPage = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
  needRedirect: boolean;
};

export type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage;
  redirectRoute?: { pathName: string; asPath: string; query?: { [key: string]: string | number } };
};
