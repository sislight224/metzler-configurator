import Head from 'next/head';

const AppHead = () => {
  return (
    <Head>
      <title>Metzler</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta
        content="true"
        name="HandheldFriendly"
      />
      <meta
        content="width"
        name="MobileOptimized"
      />
      <meta
        content="yes"
        name="apple-mobile-web-app-capable"
      />
    </Head>
  );
};

export default AppHead;
