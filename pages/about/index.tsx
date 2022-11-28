import React, {useState, useEffect} from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import Link from 'next/link'

import { Box, Flex, Heading, Text  } from '@chakra-ui/react';

import { BuilderComponent, builder } from '@builder.io/react'

import Layout from '../../components/layout/Layout'

import Section from '../../components/section';
import Triangle from '../../components/triangle';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRunning, faUserShield} from "@fortawesome/free-solid-svg-icons";

builder.init('400888070f69401c9656d5988c0c74cc')

const IndexPage = () => {

  const {t} = useTranslation('public');

   const [builderContentJson, setBuilderContentJson] = useState(null)

   useEffect(() => { 
      builder.get('about-us', { url: location.pathname, entry: 'adbf8224d713492f87004b50a2a8420f' })
        .promise().then(setBuilderContentJson)
    }, [])

  return (
    <Layout>
      <NextSeo title={t('public:help.topics.about-sportstats')} />
      <BuilderComponent model="about-us" content={builderContentJson} />
      
      <Section.Container id="about-us" Background={Background} >
  

      </Section.Container>
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


const Background = () => (
  <>
    <Triangle
      color="#f0e6f6"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      position="top-left"
    />

    <Triangle
      color="#0CAA56"
      height={['50vh', '35vh']}
      width={['70vw', '40vw']}
      position="bottom-left"
    />

    <Triangle
      color="#f0e6f6"
      height={['70vh', '35vh']}
      width={['100vw', '100vw']}
      position="bottom-right"
    />
  </>
);
