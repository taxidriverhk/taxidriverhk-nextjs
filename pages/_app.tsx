import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "shared/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hong Kong Taxi Driver Workshop</title>
      </Head>
      <NextNProgress
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
