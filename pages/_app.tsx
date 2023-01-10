import  React from "react"
import Script from "next/script";
import type { AppProps } from "next/app";

import {client} from "../apollo/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from 'next-i18next';

import { ProvideAuth } from "../hooks/use-auth";
import { Authenticator } from '@aws-amplify/ui-react';
import {Amplify } from 'aws-amplify';

import aws_exports from '../aws-exports'

import { ChakraProvider, extendTheme  } from '@chakra-ui/react'
import { theme } from '../theme'

import { DefaultSeo } from 'next-seo';

import '../styles/globals.css'

import 'styled-components';



Amplify.configure({...aws_exports, ssr: true});


function Application({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
      <Authenticator.Provider>
        <ApolloProvider client={client} >
          <DefaultSeo
            title = 'This is my title'
            titleTemplate = '%s | Sportstats'
            description= 'Claim and share your race results, receive live race notifications and more!'
            openGraph={{
              type: 'website',
              locale: 'en_CA',
              url: 'https://www.sportstats.today/',
              site_name: 'Sportstats',
              title: 'Sportstats Professional Finish Line Timing & Results',
              description: 'Claim and share your race results, receive live race notifications and more!',
              images: [
                {
                  url: 'https://sportstats.today/android-chrome-512x512.png',
                  width: 800,
                  height: 600,
                  alt: 'Og Image Alt',
                  type: 'image/jpeg',
                },
                {
                  url: 'https://sportstats.today/android-chrome-512x512.png',
                  width: 900,
                  height: 800,
                  alt: 'Og Image Alt Second',
                  type: 'image/jpeg',
                }
              ],
            }}
            twitter={{
              handle: '@sportstats',
              site: '@site',
              cardType: 'summary_large_image',
            }}
          />
          <Script 
            id="Adsense-id"
            data-ad-client="ca-pub-631430869012429"
            strategy="afterInteractive"
            onError={ (e) => { console.error('Script failed to load', e) }}
            data-adtest="on"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6314308690124297" 
          />
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `}
          </Script>
          
          <Component {...pageProps} />
        </ApolloProvider>
      </Authenticator.Provider>
      </ProvideAuth>
    </ChakraProvider>
  )
}

export default appWithTranslation(Application)
