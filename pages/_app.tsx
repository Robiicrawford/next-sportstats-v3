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

import { DefaultSeo } from 'next-seo';

import '../styles/globals.css'

import 'styled-components';



Amplify.configure({...aws_exports, ssr: true});
const colors = {
  
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
 
    background: '#FFFFFF',
    surface: '#242526',
    wash: '#18191a',
    muted: '#f0e6f6',
    gray: '#e4e6eb',
    text: '#e4e6eb',

    slate: '#2f4f4ff7',

    primary: '#000',
    ss_green: '#0CAA56',
    secondary: '#0CAA56',
    highlight: '#0CAA56',

}

const queries = {
    xs: '@media screen and (max-width: 40em)',
    sm: '@media screen and (min-width: 40em) and (max-width: 52em)',
    'sm+': '@media screen and (min-width: 40em)',
    md: '@media screen and (min-width: 52em) and (max-width: 64em)',
    'md+': '@media screen and (min-width: 52em)',
    lg: '@media screen and (min-width: 64em)',
  }

const theme = extendTheme({ colors, queries });

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
            strategy="afterInteractive"
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
          
          <Script 
            strategy="afterInteractive"
            nonce="t28yKjqj"
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0&appId=1160368297753028&autoLogAppEvents=1" 
          />
          <div id="fb-root"></div>
          <Component {...pageProps} />
        </ApolloProvider>
      </Authenticator.Provider>
      </ProvideAuth>
    </ChakraProvider>
  )
}

export default appWithTranslation(Application)
