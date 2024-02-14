import styles from './PdfButton.module.scss';
import IconButton from '../../../../../../components/common/IconButton/IconButton';
import PdfReport from '../../../PdfReport/PdfReport';
import QRCode from 'qrcode.react';
import { QR_CODE_ID } from '../../../PdfReport/constants';
import { useEditorStore } from '../../../../../../hooks/store/useEditorStore';
import { useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { observer } from 'mobx-react-lite';

const PdfButton = observer(() => {
  const { configUrl, previewMailsUrl } = useEditorStore();

  const linkClickHandler = useCallback(async () => {
    const blob = await pdf(<PdfReport screenshotData={previewMailsUrl} />).toBlob();
    saveAs(blob, 'Zusammenfassung');
  }, [previewMailsUrl]);

  return (
    <div>
      <div className={styles.qrCodeWrapper}>
        <QRCode
          id={QR_CODE_ID}
          value={configUrl}
          size={200}
          bgColor="#FFF"
          fgColor="#000"
          includeMargin
          level="H"
        />
      </div>

      <IconButton
        iconName="printer"
        tooltipText="PDF generieren"
        enableTooltip
        onClick={linkClickHandler}
      />
    </div>
  );
});

export default PdfButton;
