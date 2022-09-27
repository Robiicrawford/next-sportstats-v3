import  React from "react"
import Head from "next/head";
import Script from "next/script";

import { ChakraProvider, extendTheme  } from '@chakra-ui/react'

import '../styles/globals.css'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors });

function Application({ Component, pageProps }) {


  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default Application
