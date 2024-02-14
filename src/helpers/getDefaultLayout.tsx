import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const Layout = dynamic(() => import('../containers/Layout/Layout'), { ssr: false });

export const getDefaultLayout = (page: ReactElement): ReactElement => {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
