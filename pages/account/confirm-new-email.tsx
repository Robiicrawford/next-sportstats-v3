import React, { useState, useEffect } from "react"

import { NextSeo } from 'next-seo';

import { useRouter } from "next/router";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';

import { 
  Box, Flex, Image, Center, Heading, Container, Button, Text, Label, Select, 
  Input, InputGroup, InputRightElement, FormErrorMessage
 } from '@chakra-ui/react';


import Layout from '../../components/layout/Layout'
import Section from '../../components/section';
import Triangle from '../../components/triangle';

const NewCode = () => {
  const {t} = useTranslation("public");
  
  const [email, setEmail] = useState(false);
  const [sent, setSent] = useState(true);

  const onSubmit = async () => {
    const user = await Auth.resendSignUp(email)
    setSent(false)
  }

  const changeEmail = (e) => setEmail(e.target.value)

  return(
    <Flex mb={3} flexWrap='wrap' px={2} py={2} mx={4} pb={4}>
      {!sent ?
        <>
          <Box w='100%' py={3}  sx={{textAlign:'center'}}>
            <Heading as="h2" px={2} >{t("signup.error.no-code")}</Heading>
          </Box>
          <Box w='100%' >
            <Input id='email' name='email' type='email' placeholder={t('signup.email')} onChange={changeEmail} />
          </Box>
          <Box w='100%' mt={2} >
            <Button primary style={{width:'100%'}} onClick={onSubmit}>{t('signup.send-confirm-email')}</Button>
          </Box>
        </>
      :
        <Heading as="h2"  px={2} > 
          Invalid Token <br/>
          {t("signup.new-code-sent")}
        </Heading>
      }
    </Flex>
  )
}

export default function ConfirmEmail() {
  const {t} = useTranslation("public");
  const router = useRouter()

  const { user } = useAuthenticator((context) => [context.user]);

  const [show, setShow] = React.useState(false)

  const [error, setError] = useState(false);
  const [code, setCode] = useState(false);
  const [email, setEmail ] = useState(false);
  const [pass, setPass] = useState(false)

  const onSubmit = async () => {

    const user = await Auth.verifyCurrentUserAttributeSubmit('email', code)
    if (user === 'SUCCESS') {
      router.push(`/account/settings`)
    } else {
      console.log(user)
    }
  }

  const onSubmitLogin = async () => {
    const login = await Auth.confirmSignUp(email, pass)
    setEmail(login.user.username)
    if (login.code) {
      setError(login.code)
    } else {
      onSubmit()
    }
  }

  const handleChangeEmail = (e) => setEmail( e.target.value);
  const handleChangePass = (e) => setPass( e.target.value);
  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('token')) { setCode(urlParams.get('token')); }
    if (user) { setEmail(user.attributes.email) }
    if (email && code) { onSubmit() }
  },[code, email])

  return (
    <Layout>
      <NextSeo
        title={t("common:confirm-email")}
        noindex={true}
      />
      <Section.Container id="settings" Background={Background} >
        <Center>
          <Flex flexWrap='wrap' sx={{ borderRadius:'7px'}} px='2' className='card__base' >
            <Box w='100%' py={3} sx={{borderBottom:'2px solid black'}}  >
              <Heading as="h1"  px={2} >{t("common:confirm-email")}</Heading>
            </Box>
            { code && email && <div> ...Validing your email address... </div>}
            { code && !email && 
              <Box  sx={{ mx: 'auto'}} w='100%' py={3} px={2} mx={5}>
                <Flex mx={-2} mb={3} flexWrap='wrap' px={2} py={2}>
                  <Box w='100%' >
                    <Input id='email' name='email' type='email' placeholder={t('signup.email')} onChange={handleChangeEmail} />
                  </Box>
                  <Flex flexWrap='wrap' w='100%' my={3}>
                    
                    <InputGroup size='md'>
                            <Input
                              pr='4.5rem'
                              type={show ? 'text' : 'password'}
                              placeholder={t('public:signup.enter-password')} 
                        //      {...register('current-password',{required: true})}
                              onChange={handleChangePass}
                            />
                            <InputRightElement width='4.5rem'>
                              <Button h='1.75rem' size='sm' onClick={()=>setOpen(show?false:true)}>
                                {show ? t('public:signup.hide') : t('public:signup.show')}
                              </Button>
                            </InputRightElement>
                    </InputGroup>

                    {error && <FormErrorMessage > {t('member:'+error)}  </FormErrorMessage>  }

                  </Flex>

                  <Box w='100%' mt={2}>
                    <Button primary style={{width:'100%'}} onClick={onSubmitLogin}>{t('signup.confirm-email')}</Button>
                  </Box>

                </Flex>
              </Box>
            }
            { !code && email &&
              <NewCode/>
            }
            
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
