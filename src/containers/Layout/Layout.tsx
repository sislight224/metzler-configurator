import styles from './Layout.module.scss';
import React, { FC, ReactNode, useCallback } from 'react';
import Logo from '../../components/Logo/Logo';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useEditorStore } from '../../hooks/store/useEditorStore';

export interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = observer(({ children }) => {
  const router = useRouter();
  const { isInitialize } = useEditorStore();

  const logotypeClickHandler = useCallback(() => {
    router.push('/');
  }, []);

  return (
    <div className={styles.root}>
      {isInitialize && <Logo
        onClick={logotypeClickHandler}
      />}
      {children}
    </div>
  );
});

export default Layout;
