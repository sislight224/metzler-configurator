import styles from './ErrorPages.module.scss';
import LogoIcon from '../../components/common/Icons/LogoIcon';
import Button from '../../components/common/Button/Button';
import { useRouter } from 'next/router';
import { ErrorStatuses } from './types';

interface IErrorReturn {
  errorHeading: string;
  errorText: string;
}

const getText = (errorStatus?: ErrorStatuses): IErrorReturn => {
  switch (errorStatus) {
    case '404': {
      return {
        errorHeading: 'Error 404',
        errorText: 'Diese Seite konnte nicht gefunden werden.',
      };
    }
    case '500': {
      return {
        errorHeading: 'Error 500',
        errorText: 'Entschuldigung, momentan ist es ein Fehler aufgetreten.',
      };
    }
    default: return {
      errorHeading: 'Unknown Error',
      errorText: '',
    };
  }
};

interface IProps {
  errorStatus?: ErrorStatuses;
}

const ErrorPage = ({ errorStatus }: IProps) => {
  const router = useRouter();

  const { errorHeading, errorText } = getText(errorStatus);

  const backHandler = () => {
    router.replace('/');
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logoBox}>
          <div className={styles.whiteStripe} />
          <div className={styles.logo}>
            <LogoIcon
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <p className={styles.errorHeading}>
          { errorHeading }
        </p>
        {
          errorText
            ? <p className={styles.errorText}>
              { errorText }
            </p>
            : null
        }
        <Button
          label="Zur Startseite"
          width="200px"
          onClick={backHandler}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
