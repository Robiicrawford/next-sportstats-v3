import React, { useState, useEffect } from "react"

import { useRouter } from "next/router";
import { NextSeo } from 'next-seo';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';

import { useForm } from "react-hook-form"

import { 
  Box, Flex, Image, Center, Heading, Button, Text,
  Input, InputGroup, InputRightElement,
 } from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import Section from '../../components/section';
import Triangle from '../../components/triangle';

const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols();


export default function ConfirmEmail() {
  const {t} = useTranslation("public");
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const { user } = useAuthenticator((context) => [context.user]);

  const [show, setShow] = useState({2:false,3:false})
  const [code, setCode] = useState(null)
  const [sent, setSent] = useState(false)
  const [error, setError] =useState(null)

  const onSubmit = async (data) =>{
    setSent(true)
    try{
      const user_setpass = await Auth.forgotPasswordSubmit(data.email.trim(), code, data.NP.trim());
      if(user_setpass){
        router.push('/account/settings')
      }
    } catch (err) {
      setSent(false)
      setError([err.message])
      console.log(err)  
    }
    
  }

  React.useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('token')) { setCode(urlParams.get('token')); }
    if (user) { 
      console.log(user)
      setValue('email', user.attributes.email) 
    }
  }, [])

  useEffect(()=>{
    if(watch("NP")){
      if(watch("NP") && !schema.validate(watch("NP").trim())){
        setError(schema.validate(watch("NP").trim(), { list: true } ))
      } else {
        setError(false)
      }
      if( watch("CNP").trim().length > 0 && watch("CNP").trim() !== watch("NP").trim() && schema.validate(watch("NP").trim()) ){
        setError(['match']);
      }
    }
  },[watch("NP"), watch("CNP")])


const formatPasswordValidateError = (errors) => {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] === 'min') {
        return t('signup.error.min') ;
      } else if (errors[i] === 'lowercase') {
        return t('signup.error.lowercase');
      } else if (errors[i] === 'uppercase') {
        return t('signup.error.uppercase');
      } else if (errors[i] === 'digits') {
        return t('signup.error.digits');
      } else if (errors[i] === 'symbols') {
        return t('signup.error.symbols');
      } else if (errors[i] === 'match') {
        return t('signup.error.match');
      } else if (errors[i] === 'Invalid code provided, please request a code again.'){
        return t('signup.error.Invalid code provided, please request a code again.');
      } else if(errors[i] === 'Email Exists'){
        return 'Email Exists'
      }
    }
  };


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

            {!sent && (
              <>
                <Flex 
                  as='form' flexWrap='wrap'
                  onSubmit={handleSubmit(onSubmit)} 
                    w='100%'
                >
                  {!watch('email') && (
                      <Box w='100%' mt='4' px={[0,2]}> 
                          <label htmlFor='email' >{t('signup.email')}</label>
                              <Box w='100%' px={2} py={2}>
                                <Input
                                  id='email' name='email'
                                  type='email'
                                  {...register('email',{required: true})}
                                  placeholder={t('enter-email')}
                                />
                              </Box>
                      </Box>   
                    )}

                  {error && <Text sx={{color:'#FE0C0B'}} my={1} > {formatPasswordValidateError(error)} </Text>}
                       <Box w='100%' mt='4' px={[0,2]}> 
                                <label htmlFor='new-password' >{t('signup.new-password')}</label>
                                <InputGroup size='md'>
                                  <Input
                                    pr='4.5rem' id='new-password'
                                    type={show[2] ? 'text' : 'password'}
                                    placeholder={t('public:signup.new-password')} 
                                    {...register('NP',{required: true})}
                                   // onChange={changeO}
                                  />
                                  <InputRightElement width='4.5rem'>
                                    <Button 
                                      h='1.75rem' size='sm' 
                                      onClick={()=> setShow({...show, 2:show[2]?false:true}) } 
                                    >
                                      {show[2] ? t('public:signup.hide') : t('public:signup.show')}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                              </Box>

                              <Box w='100%' mt='2' px={[0,2]}> 
                                <label htmlFor='new-password' >{t('signup.confirm-password')}</label>
                                <InputGroup size='md'>
                                  <Input
                                    pr='4.5rem' id='confirm-password'
                                    type={show[3] ? 'text' : 'password'}
                                    placeholder={t('public:signup.confirm-password')} 
                                    {...register('CNP',{required: true})}
                                   // onChange={changeO}
                                  />
                                  <InputRightElement width='4.5rem'>
                                    <Button 
                                      h='1.75rem' size='sm' 
                                      onClick={()=> setShow({...show, 3:show[3]?false:true}) } 
                                    >
                                      {show[3] ? t('public:signup.hide') : t('public:signup.show')}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                              </Box>

                       {!error && 
                        <Box w='100%' px={2} mt={2}>
                          <Button type='submit' bg='green' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('reset')}</Button>
                        </Box>
                      }
                  </Flex>
                </>
              )}
            
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
