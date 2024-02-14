import { Page, View, Document, Text } from '@react-pdf/renderer';
import styles from './PdfReportStyles';
import PdfHeader from './components/common/PdfHeader/PdfHeader';
import PdfFooter from './components/common/PdfFooter/PdfFooter';
import PdfMainPage from './components/pagesContent/PdfMainPage/PdfMainPage';
import PdfConfiguration from './components/pagesContent/PdfConfiguration/PdfConfiguration';
import PdfTable from './components/pagesContent/PdfTable/PdfTable';
import { FC } from 'react';

export interface PdfReportProps {
  screenshotData: string;
}

const PdfReport: FC<PdfReportProps> = (props) => {
  const { screenshotData } = props;

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <PdfHeader />
        <View style={styles.content}>
          <PdfMainPage screenshotData={screenshotData} />
          <PdfConfiguration />
          <PdfTable />
        </View>
        <PdfFooter />
        <Text
          fixed
          style={styles.pagination}
          render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)}
        />
      </Page>
    </Document>
  );
};

export default PdfReport;
