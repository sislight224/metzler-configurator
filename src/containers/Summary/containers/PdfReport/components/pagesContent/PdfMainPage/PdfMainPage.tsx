import { observer } from 'mobx-react-lite';
import { Text, View, Image, Link } from '@react-pdf/renderer';
import styles from './PdfMainPageStyles';
import { useEditorStore } from '../../../../../../../hooks/store/useEditorStore';
import { QR_CODE_ID } from '../../../constants';
import { FC } from 'react';

export interface PdfMainPageProps {
  screenshotData: string;
}

const PdfMainPage: FC<PdfMainPageProps> = observer((props) => {
  const { screenshotData } = props;
  const { configUrl } = useEditorStore();
  const element = document.getElementById(QR_CODE_ID) as HTMLCanvasElement;
  const dataUrl = element.toDataURL();

  return (
    <View style={styles.mainPage}>
      <View style={styles.mainPageHeader}>
        <View style={styles.qrCode}>
          <View style={styles.qrCodeImageWrapper}>
            <Image
              src={dataUrl}
              style={styles.qrCodeImage}
            />
          </View>
          <View style={styles.qrCodeInfo}>
            <Text>{`Datum: ${new Date().toLocaleDateString('en-GB')}`}</Text>
            <View style={styles.qrCodeLink}>
              <Text>Link:</Text>
              <Link
                src={configUrl}
                style={styles.qrCodeLinkValue}
              >
                Jetzt öffnen
              </Link>
            </View>
          </View>
        </View>
        {/* <View style={styles.product-price}>
          <Text>Gesamt</Text>
          <Text style={styles.priceValue}>1429,99 €</Text>
          <Text>Inkl. 19% MwSt.</Text>
        </View> */}
      </View>
      <View style={styles.mailboxesWrap}>
        <Image
          src={screenshotData}
          style={styles.mailboxesImage}
        />
      </View>
    </View>
  );
});

export default PdfMainPage;
