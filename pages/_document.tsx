import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html dir="rtl">
      <Head>
        <link href="/style/globals.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
