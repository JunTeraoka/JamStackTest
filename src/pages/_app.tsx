import "faust.config";
import { HeadlessProvider } from "@faustjs/next";
import "normalize.css/normalize.css";
import React from "react";
import "scss/main.scss";
import { client } from "client";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const path = router.pathname;
    if ((router.pathname = "/")) router.push("/posts");
  }, []);
  return (
    <>
      <HeadlessProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </HeadlessProvider>
    </>
  );
}
