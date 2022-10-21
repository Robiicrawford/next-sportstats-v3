import  React from "react"
import Script from "next/script";
import type { AppProps } from "next/app";

import {client} from "../apollo/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from 'next-i18next';

import { ProvideAuth } from "../hooks/use-auth";

import { ChakraProvider, extendTheme  } from '@chakra-ui/react'

import { DefaultSeo } from 'next-seo';

import '../styles/globals.css'

const colors = {
  'ss_green':'#0caa56',
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors });


function Application({ Component, pageProps }: AppProps) {


  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
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
              description: 'Claim and share your race results, receive live race notifications and more!'
            }}
            twitter={{
              handle: '@sportstats',
              site: '@site',
              cardType: 'summary_large_image',
            }}
          />
          <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6314308690124297" />
           <Script id="google-analytics" strategy="afterInteractive">
            {`
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

              ga('create', 'G-PRXLRELM2K', 'auto');
              ga('send', 'pageview');
            `}
          </Script>
          
          <Component {...pageProps} />
        </ApolloProvider>
      </ProvideAuth>
    </ChakraProvider>
  )
}

export default appWithTranslation(Application)
