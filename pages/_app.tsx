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
      <Alert variant="warning">
        We are in the process of migrating the server. Please use the server at{" "}
        <a href="https://beta.taxidriverhk.com">
          https://beta.taxidriverhk.com
        </a>{" "}
        to try it out.
      </Alert>
      <Component {...pageProps} />
    </>
  );
}
