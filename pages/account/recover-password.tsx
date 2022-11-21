import React, { useState, useEffect } from "react"

import { NextSeo } from 'next-seo';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';

import { useForm } from "react-hook-form"

import { 
  Box, Flex, Image, Center, Heading, Button, Text,
  Input
 } from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import Section from '../../components/section';
import Triangle from '../../components/triangle';


export default function ConfirmEmail() {
  const {t} = useTranslation("public");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const { user } = useAuthenticator((context) => [context.user]);


  return (
    <Layout>
      <NextSeo
        title={t("public:password-reset")}
        noindex={true}
      />
      <Section.Container id="settings" Background={Background} >
        <Center>
          <Flex flexWrap='wrap' sx={{ borderRadius:'7px'}} px='2' className='card__base' >
            <Box w='100%' py={3} sx={{borderBottom:'2px solid black'}}  >
              <Heading as="h1"  px={2} >{t("public:reset-password")}</Heading>
            </Box>

            
          </Flex>
        </Center>
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
