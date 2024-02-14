import Editor from '../src/containers/Editor/Editor';
import { ExtendedNextPage } from '../src/types/next';
import { getDefaultLayout } from '../src/helpers/getDefaultLayout';

const Home: ExtendedNextPage = () => {
  return (
    <Editor />
  );
};

Home.getLayout = getDefaultLayout;
Home.needRedirect = false;

export default Home;
