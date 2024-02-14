import { FC } from 'react';
import styles from './Preloader.module.scss';
import Logo from '../../../../assets/logo/logo.png';
import Mails from '../../../../assets/logo/mails.png';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { useEditorStore } from '../../../../hooks/store/useEditorStore';

const Preloader: FC = observer(() => {
  const { isInitialize, isLoading } = useEditorStore();

  if (isLoading) return null;

  return (
    <div className={classnames(
      styles.root,
      { [styles.root_opacity]: isInitialize },
    )}
    >
      <div className={styles.stick} />
      <div className={styles.logo}>
        <div className={styles.logo_metzler}>
          <img
            className={styles.logo_img_metzler}
            src={Logo.src}
            alt="logo"
          />
        </div>
        <div className={styles.logo_mails}>
          <img
            className={styles.logo_img_mails}
            src={Mails.src}
            alt="mail"
          />
        </div>
      </div>
    </div>
  );
});

export default Preloader;
