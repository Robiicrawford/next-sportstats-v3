import React, {useState, useEffect} from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import Link from 'next/link'

import { Box, Flex, Heading, Text  } from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'

import Section from '../../components/section';
import Triangle from '../../components/triangle';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRunning, faUserShield} from "@fortawesome/free-solid-svg-icons";


const IndexPage = () => {

  const {t} = useTranslation('public');


  return (
    <Layout>
      <NextSeo title={t('public:help.topics.about-sportstats')} />

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

