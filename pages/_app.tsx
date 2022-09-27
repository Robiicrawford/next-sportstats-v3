import  React, {useEffect} from "react"
import Head from "next/head";
import Script from "next/script";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

function Application({ Component, pageProps }) {

  useEffect(()=>{
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
  },[])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  )
}

export default Application
