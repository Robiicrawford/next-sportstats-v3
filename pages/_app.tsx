import  React from "react"
import Script from "next/script";

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


function Application({ Component, session, pageProps }) {


  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <ApolloProvider client={client} >
          <DefaultSeo
            
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
          <Component {...pageProps} />
        </ApolloProvider>
      </ProvideAuth>
    </ChakraProvider>
  )
}

export default appWithTranslation(Application)
