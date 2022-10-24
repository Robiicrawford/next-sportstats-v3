import React, { useEffect } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Box, Flex, Image, Center, Heading, Container, Button, Text } from '@chakra-ui/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faIdCard, faShieldAlt, faBell, faEye, faSlidersH, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import Layout from '../../../components/layout/Layout'
import Section from '../../../components/section';
import Triangle from '../../../components/triangle';

import { useAuth, AuthCheck } from "../../../hooks/use-auth";

export default function Settings({locale}) {
  const { t } = useTranslation('public');
  const router = useRouter()
  const auth = useAuth();


  const routes = [
    {icon:faIdCard, link:'settings/personal-info',title:'personal-info-title', desc:'personal-info-desc'},
    {icon:faShieldAlt, link:'settings/login-and-security',title:'login-info-title', desc:'login-info-desc'},
    {icon:faBell, link:'settings/notifications',title:'notifications-title', desc:'notifications-desc'},
    {icon:faEye, link:'settings/privacy-and-sharing',title:'privacy-title', desc:'privacy-desc'},
    {icon:faSlidersH, link:'settings/preferences',title:'global-title', desc:'global-desc'},
    {icon:faQuestionCircle, link:'/help',title:'help-title', desc:'help-desc'}
  ]

 

  return (
    <Layout>
      <NextSeo
        title={t('settings-page.personal-info-title')}
        noindex={true}
      />
        <Section.Container id="settings" Background={Background} >
          <AuthCheck>
            here
          </AuthCheck>
        </Section.Container>
 
    </Layout>
  )
}


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
