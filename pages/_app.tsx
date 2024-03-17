import type { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Chat } from "components/containers/chat";
import { Carousel } from "components/carousel";
import store from "store";
import { LanguageProvider } from "components/containers/languageProvider";
import { Alert } from "components/containers/alert";
import "../styles/globals.css";
import * as gtag from "../lib/gtag";

const isProduction = process.env.NODE_ENV === "production";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <NextNProgress
        color="#dc3545"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <LanguageProvider>
          <Alert>
            <Carousel>
              <Chat />
              <Component {...pageProps} />
            </Carousel>
          </Alert>
        </LanguageProvider>
      </Provider>
    </>
  );
}

export default MyApp;
