import Summary from '../src/containers/Summary/Summary';
import SummaryProvider from '../src/containers/Summary/provider/SummaryProvider';
import { ExtendedNextPage } from '../src/types/next';
import { getDefaultLayout } from '../src/helpers/getDefaultLayout';

const SummaryPage: ExtendedNextPage = () => {
  return (
    <SummaryProvider>
      <Summary />
    </SummaryProvider>
  );
};

SummaryPage.needRedirect = true;
SummaryPage.getLayout = getDefaultLayout;

export default SummaryPage;
