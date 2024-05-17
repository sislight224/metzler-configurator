import styles from "./PdfButton.module.scss";
import IconButton from "../../../../../../components/common/IconButton/IconButton";
import PdfReport from "../../../PdfReport/PdfReport";
import QRCode from "qrcode.react";
import { QR_CODE_ID } from "../../../PdfReport/constants";
import { useEditorStore } from "../../../../../../hooks/store/useEditorStore";
import { useCallback, useContext } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { observer } from "mobx-react-lite";
import { ProductsContext } from "context/ProductsContext";

const PdfButton = observer(() => {
  const { configUrl, previewMailsUrl } = useEditorStore();
  const { products } = useContext(ProductsContext);

  const linkClickHandler = useCallback(async () => {
    try {
      const blob = await pdf(
        <PdfReport products={products} screenshotData={previewMailsUrl} />
      ).toBlob();
      saveAs(blob, "Zusammenfassung");
    } catch (err) {
      console.log(err);
    }
  }, [previewMailsUrl, products]);

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
