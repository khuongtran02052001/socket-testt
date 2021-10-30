import Document, { Html, Head, Main, NextScript } from 'next/document';

import { AppConfig } from '../AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head title="DEV">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Rampart+One&display=swap" rel="stylesheet" />
          <body className='bg-fixed bg-gradient-to-r from-black to-pink-900 '>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html >
    );
  }
}

export default MyDocument;
