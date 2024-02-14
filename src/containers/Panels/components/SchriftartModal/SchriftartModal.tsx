import { ChangeEvent, FC, useCallback, useState } from 'react';
import styles from './SchriftartModal.module.scss';
import Modal from '../../../../components/common/Modal/Modal';
import Input from '../../../../components/common/Input/Input';
import FontSelection from './FontSelection';
import { FontsFamilyList } from '../../../../data/FontsFamilyList';

export interface SciftartModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fontsList: FontsFamilyList[];
  onChangeFont: (fontName: string, fontNumber: number) => void;
  onChangeIsOpen: (value: boolean) => void;
  maxLengthText?: number;
}

const SchriftartModal: FC<SciftartModalProps> = (props) => {
  const {
    isOpen,
    title = '',
    onClose = () => undefined,
    fontsList,
    maxLengthText = 60,
    onChangeFont = () => undefined,
    onChangeIsOpen = () => undefined,
  } = props;

  const [text, setText] = useState<string>('');

  const changeTextHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (text.length <= maxLengthText) setText(event.target.value);
  }, [text, maxLengthText]);

  return (
    <Modal
      contentMaxWidth="580px"
      width="580px"
      onChangeIsOpen={onChangeIsOpen}
      isOpen={isOpen}
    >
      <Modal.Header
        withCloseIcon
        onClose={onClose}
        className={styles.title}
      >
        {title}
      </Modal.Header>
      <Modal.Content className={styles.content}>
        <div className={styles.input}>
          <Input
            maxLength={maxLengthText}
            placeholder="Das ist ein Beispieltext"
            value={text}
            onChange={changeTextHandler}
          />
        </div>
        <div className={styles.fontContent}>
          {fontsList.map((item) => (
            <FontSelection
              text={text || 'Das ist ein Beispieltext'}
              onChangeFont={onChangeFont}
              key={item.id}
              fontFamily={item.fontName}
              fontNumber={item.id}
            />
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SchriftartModal;
