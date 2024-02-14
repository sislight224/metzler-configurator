import styles from './Summary.module.scss';
import Preview from './containers/Preview/Preview';
import WorkArea from './containers/WorkArea/WorkArea';
import Windows from '../Panels/components/Windows/Windows';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';

const FooterControls = dynamic(() => import('./containers/FooterControls/FooterControls'), { ssr: false });

const Summary = observer(() => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <Preview />
        <WorkArea />
        <Windows />
      </div>
      <FooterControls />
    </div>
  );
});

export default Summary;
