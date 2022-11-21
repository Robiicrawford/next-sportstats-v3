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

  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      const user = await Auth.forgotPassword(data.email.trim());
      setSent(true)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  return (
    <Layout>
      <NextSeo
        title={t("public:password-recovery")}
        noindex={true}
      />
      <Section.Container id="settings" Background={Background} >
        <Center>
          <Flex flexWrap='wrap' sx={{ borderRadius:'7px'}} px='2' className='card__base' >
            <Box w='100%' py={3} sx={{borderBottom:'2px solid black'}}  >
              <Heading as="h1"  px={2} >{t("public:reset-password")}</Heading>
            </Box>
            <Box
                
                sx={{  mx: 'auto',}}
                py={[1,2,3]} px={[0,2]} mx={[1,3,5]}
                w='100%'
              >
              {!sent? 
                <Flex 
                  flexWrap='wrap'
                  as='form'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Box w='100%' pt={[2,3]} sx={{textAlign:'center'}} >
                    <Box  as="h2">{t('public:reset-details')}</Box>
                  </Box>
                  <Box w='100%' pb={1}>
                    {errors?.email && (<Box color='red'> Account Email is needed </Box> )}
                  </Box>
       
                    <Box w='100%'  py={2}>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            {...register('email', {required:true})}
                            placeholder={t("public:signup.email-enter")}
                        />
                    </Box>
                    <Box w='100%' mt={2}>
                      <Button colorScheme='teal' type='submit' >{t("common:continue")}</Button>
                    </Box>
               
                </Flex>
              :
                <Box w='100%' pb={2} py={5}  >
                  <Heading  as="h2" sx={{fontWeight:'400', textAlign:'center'}}>{t('public:reset-sent')}</Heading>
                </Box>
              }
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
