import { Head, Html, Main, NextScript } from "next/document";
import React, { ReactElement } from "react";

export default function Document(): ReactElement {
  return (
    <Html>
      <Head>
        <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <script src="/configurator/v3d.js" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
