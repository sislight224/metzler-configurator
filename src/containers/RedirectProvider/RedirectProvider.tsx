import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect } from 'react';
import usePanelsStore from '../../hooks/store/usePanelsStore';
import { useRouter } from 'next/router';
import { OrderStatus } from '../../enums/data/OrderStatus';
import { RedirectUser } from './rules/redirectUser';

export interface RedirectProviderProps {
  children: ReactNode;
  needRedirect: boolean;
}

export const RedirectProvider: FC<RedirectProviderProps> = observer((props) => {
  const { children, needRedirect } = props;
  const { getPanelsConfig, createConfig } = usePanelsStore();
  const { canSaveConfiguration } = usePanelsStore();
  const router = useRouter();

  useEffect(() => {
    const configId = (router.query.uuid) as string;
    const redirectUser = new RedirectUser();
    if (needRedirect && router.isReady) {
      if (configId) {
        getPanelsConfig(configId)
          .then((response) => {
            redirectUser.isCreatedNonFinished(response.status as OrderStatus, !!response.payload.textleiste);
            redirectUser.isOrdered(response.status as OrderStatus);
            if (redirectUser.isRedirect) router.push({ pathname: '/', query: { uuid: configId } });
            if (!canSaveConfiguration) router.push({ pathname: '/', query: { uuid: router.query.uuid } });
          });
      } else if (!configId) {
        createConfig({})
          .then(() => {
            router.replace({ pathname: '/' });
          });
      }
    }
  }, [router.query, router.isReady, needRedirect]);

  return (
    <>{ children }</>
  );
});

export default RedirectProvider;
