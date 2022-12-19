import React, {useState, useEffect} from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import Layout from '../../components/layout/Layout'
import Hero from '../../components/about/Hero';
import MainFeature from '../../components/about/MainFeature';
import Features from '../../components/about/Features';


import ClientBanner from '../../components/about/ClientBanner';


const IndexPage = () => {

  const {t} = useTranslation('public');


  return (
    <Layout header_color='none'>
      <NextSeo title={t('public:help.topics.about-sportstats')} />
      <Hero />
      <MainFeature />
      <Features />

      <ClientBanner />
    </Layout>
  )
}

export default IndexPage


export async function getStaticProps({locale}) {
    return {
      props: {
        isPassedToWithAuthenticator: true,
        ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      },
   };
}

