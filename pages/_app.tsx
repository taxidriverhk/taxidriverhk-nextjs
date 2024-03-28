import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "shared/styles/globals.css";

import Alert from "react-bootstrap/Alert";

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
      <Alert variant="danger">
        This website is deployed into a new server which is still being
        configured, so you may find it unstable at times. Please use{" "}
        <a href="https://taxidriverhk.com">https://taxidriverhk.com</a> if you
        are encountering problems at here.
      </Alert>
      <Component {...pageProps} />
    </>
  );
}
