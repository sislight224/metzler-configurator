import styles from './ClipboardField.module.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import CopyIcon from 'components/common/Icons/CopyIcon';
import { FC } from 'react';

interface ClipboardFieldProps {
  value: string;
}

const ClipboardField: FC<ClipboardFieldProps> = (props) => {
  const { value } = props;

  return (
    <div className={styles.container}>
      <input
        type="text"
        readOnly
        value={value}
        className={classNames('plain-text', styles.input)}
      />
      <CopyToClipboard text={value}>
        <div className={styles.copyButton}>
          <CopyIcon
            width="18px"
            height="18px"
          />
        </div>
      </CopyToClipboard>
    </div>
  );
};

export default ClipboardField;
