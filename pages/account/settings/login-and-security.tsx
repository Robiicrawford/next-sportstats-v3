import React, { useEffect, useState } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useForm, Controller } from 'react-hook-form';

import { 
  Box, Flex, Heading, Container, Button, Select, Text,
  Input, InputGroup, InputRightElement,
 } from '@chakra-ui/react';

import Layout from '../../../components/layout/Layout'
import Section from '../../../components/section';
import Triangle from '../../../components/triangle';
import Breadcrumb from '../../../components/breadcrumb';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';
import { useAuth, AuthCheck } from "../../../hooks/use-auth";

import { Country, State, City }  from 'country-state-city';

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols();


export default function Settings({locale}) {
  const { t } = useTranslation('public');
  const auth = useAuth();

  const { user } = useAuthenticator((context) => [context.user]);

  const [userData, setData] = useState(null)
  const [edit, setEdit] = useState(null)

  const [error, setError] = useState<any>(false);
  const [message, setMessage] = useState(false)

  const [show, setShow] = useState({1:false,2:false,3:false})

  const { register, setValue, handleSubmit, control, watch, reset } = useForm();

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

  useEffect(()=>{
    if(edit === 'password'){
      if(watch("NP") && !schema.validate(watch("NP").trim())){
        setError(schema.validate(watch("NP").trim(), { list: true } ))
        console.log(schema.validate(watch("NP").trim() , { list: true }))
      } else {
        setError(false)
      }
      if( watch("CNP").trim() !== watch("NP").trim() && schema.validate(watch("NP").trim()) ){
        setError(['match']);
      }
    }
  },[edit, watch("NP"), watch("CNP")])

  useEffect(()=>{
    setData(user?.attributes?user?.attributes:null)
  },[user])

  const handleEdit = (e) => {
    reset()
    setError(false)
    setMessage(false)
    setEdit(e)
  }

  const breadLink = [
    {title:t("account-settings"), to:'/account/settings/', active:false},
    {title:t('settings-page.login-info-title'), to:'/account/settings/login-and-security', active:true }
  ]

  const handleEmailUpdate = async (data) => {
    var body = {...data, SSUID: userData['custom:ssuid'] }
    try{
      var send_update = await fetch(
        `${process.env.NEXT_PUBLIC_MEMBER_URL}/updateEmail.php`
        ,{  
          method: 'POST',
          headers:{
            // @ts-ignore
            Authorization:`Bearer ${user?.signInUserSession.accessToken.jwtToken}`, 
           //     'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }
      )
      const response = await send_update.json();

      if(response.status === 'success'){
        return {status: 'success', message:'An Email has been sent to confirm your new email address'}
      } else {
        return {status: 'fail', message:response.data[0].detail}
      }
    } catch (err) {
      console.log(err)  
    }
  }

  const handlePasswordUpdate = async (data) => {
    
    console.log('here')
    if( watch("CNP").trim() === watch("NP").trim() && schema.validate(watch("NP").trim()) ){
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.changePassword(user, data.CP.trim(), data.NP.trim());
      console.log(result)
      if (result === 'SUCCESS') {
        return {status: 'success', message: t('settings-page.password-change-confirm') }
      } 

    } else {
      return {status: 'fail', message:'Something went wrong :('}
    }
    

  }


  const onSubmit = async (data) =>{
    try{
      var response ;
      if(edit ==='email'){
        response = await handleEmailUpdate(data)
      } else {
        response = await handlePasswordUpdate(data)
      }

      if(response.status === 'success'){
        var getNewData = await Auth.currentAuthenticatedUser({ bypassCache: true });
        setData(getNewData.attributes)
        setError(false)
        setMessage(response.message)
      } else {
        setError(response.message)
      }

    } catch (err) {
      console.log(err)  
    }
    
  }

  return (
    <Layout>
      <NextSeo
        title={t('settings-page.login-info-title')}
        noindex={true}
      />
        <Section.Container id="settings" Background={Background} >
          <AuthCheck>
            <Container maxW='1500' flexWrap='wrap' px={[1,3,5,6]} pb={[1,2,3,5]} py={2}>
              
              <Breadcrumb links={breadLink} />

              <Box w={'100%'} my={4}>
                <Flex flexWrap='wrap' justifyContent='space-between'>
                  <Heading as="h1" >{t('settings-page.login-info-title')}</Heading>
                </Flex>
              </Box>
              {!userData && '...loading...' }

              <Flex w='100%' flexWrap='wrap' mx={[0,2,3,4]}>

                <Box w={['100%',2/3]} >
                  <Flex flexWrap='wrap' className='card__base' style={{gap: '1rem'}} pl='4' mr={[0,2,4,5]} mb={3}>


                    {/*Member Email Form*/}
                    <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                      <Flex flexWrap='wrap' w='100%'>
                        <label style={{marginBottom:'0.3em'}} htmlFor='email'> {t('signup.email')} </label>
                        <div style={{flexGrow:'1'}} />
                        <p 
                          style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                          onClick={()=>handleEdit(edit === 'email' ?null:'email')}
                        >
                          <strong> {edit === 'email' ?'Cancel':'Edit'} </strong> 
                        </p>
                      </Flex>
                      {edit !== 'email'  &&  <p style={{marginLeft:'0.4em'}}>Update your login email </p> }
                      {error && edit === 'email' && <Text sx={{color:'#FE0C0B'}} my={1} > {error} </Text>}
                      {message &&   <p style={{width:'100%', borderBottom:'1px solid white'}}> <strong> {message} </strong> </p>}
                      {edit === 'email' &&
                         <Flex 
                            as='form' flexWrap='wrap'
                            onSubmit={handleSubmit(onSubmit)} 
                            w='100%'
                          >
                            <Box width={['100%', 6/8]} px={[0,2]}> 
                              <label htmlFor='email' >{t('signup.new-email')}</label>
                               <Input 
                                 id='email' name='EM' 
                                 type='email'  
                                 defaultValue={userData.email}
                                 {...register('EM',{required: true})}
                                />
                               
                             </Box>
                          
                           <Box width={'100%'}>
                             <Button type='submit' bg='green' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                          </Box>
                        </Flex>
                      }
                    </Flex>
                    
                    {/*Member password Edit Form*/}
                      <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                        <Flex flexWrap='wrap' w='100%'>
                          <label style={{marginBottom:'0.3em'}} htmlFor='password'> {t('signup.password')} </label>
                          <div style={{flexGrow:'1'}} />
                          <p 
                            style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                            onClick={()=>handleEdit(edit === 'password' ?false:'password')}
                          >
                            <strong> {edit === 'password' ?'Cancel':'Edit'} </strong> 
                          </p>
                        </Flex>
                        {edit !== 'password'  &&  <p style={{marginLeft:'0.4em'}}>Update your login password </p> }
                        {message && edit === 'password' &&   <p style={{width:'100%'}}> <strong> {message} </strong> </p>}
                        {edit === 'password' &&
                           <Flex 
                              as='form' flexWrap='wrap'
                              onSubmit={handleSubmit(onSubmit)} 
                              w='100%'
                            >
                            <Box width={['100%', 6/8]}  > 
                               
                               <Box w='100%' px={[0,2]}> 
                                <InputGroup size='md'>
                                  <Input
                                    pr='4.5rem'
                                    type={show[1] ? 'text' : 'password'}
                                    placeholder={t('public:signup.enter-password')} 
                                    {...register('CP',{required: true})}
                                   // onChange={changeO}
                                  />
                                  <InputRightElement width='4.5rem'>
                                    <Button 
                                      h='1.75rem' size='sm' 
                                      onClick={()=> setShow({...show, 1:show[1]?false:true}) } 
                                    >
                                      {show[1] ? t('public:signup.hide') : t('public:signup.show')}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                              </Box>
                              
                              <Link href={`/account/recover`} style={{margin:'0.3em 0'}}>{t('signup.forgot-password')} </Link>
                              
                              {error && <Text  my={2} sx={{color:'#FE0C0B'}} > {formatPasswordValidateError(error)} </Text>}

                              <Box w='100%' mt='4' px={[0,2]}> 
                                <label htmlFor='new-password' w='100%' >{t('signup.new-password')}</label>
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
                                <label htmlFor='new-password' w='100%' >{t('signup.confirm-password')}</label>
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

                             </Box>
                            {!error && 
                              <Box w='100%'>
                                <Button type='submit' bg='green' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                              </Box>
                            }

                          </Flex>
                        }
                      </Flex>


                  </Flex>
                </Box>

                <Flex w={['100%',1/3]} height='fit-content' >
                  <div  className="card_info"  >
                    <div className="card__header" style={{marginTop:'1em'}}>
                      <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{height: "40px", width: "40px", display: "block", fill: "rgb(255, 180, 0)"}}>
                        <path d="m5 20.5a.5.5 0 0 1 -.5.5h-.5v.5a.5.5 0 0 1 -1 0v-.5h-.5a.5.5 0 0 1 0-1h .5v-.5a.5.5 0 0 1 1 0v .5h.5a.5.5 0 0 1 .5.5zm1.5 1.5a.5.5 0 1 0 .5.5.5.5 0 0 0 -.5-.5zm16-20h-.5v-.5a.5.5 0 0 0 -1 0v .5h-.5a.5.5 0 0 0 0 1h .5v.5a.5.5 0 0 0 1 0v-.5h.5a.5.5 0 0 0 0-1zm-2.58 4.87a13.41 13.41 0 0 1 -6.76-3.2.37.37 0 0 0 -.63.26l.08 16.22a.38.38 0 0 0 .55.32 11.98 11.98 0 0 0 7.07-13.31.37.37 0 0 0 -.31-.3z"></path>
                        <path d="m14.39 8.32a1.93 1.93 0 0 0 -3.66 0l-2.42 4.85a3.09 3.09 0 0 0 -.4 1.61 2.36 2.36 0 0 0 2.23 2.23 3.95 3.95 0 0 0 2.42-1.06 3.95 3.95 0 0 0 2.42 1.06 2.36 2.36 0 0 0 2.23-2.23 3.09 3.09 0 0 0 -.4-1.61zm-2.72 4.38c0-.05.01-1.23.89-1.23s.88 1.18.88 1.23a3.25 3.25 0 0 1 -.88 1.83 3.25 3.25 0 0 1 -.89-1.83zm3.31 3.31a2.92 2.92 0 0 1 -1.71-.77 4.3 4.3 0 0 0 1.17-2.54 2.02 2.02 0 0 0 -1.8-2.22l-.08-.01a2.02 2.02 0 0 0 -1.89 2.15l.01.08a4.29 4.29 0 0 0 1.17 2.54 2.92 2.92 0 0 1 -1.71.77 1.36 1.36 0 0 1 -1.23-1.23 2.13 2.13 0 0 1 .29-1.16l2.42-4.85c.33-.65.55-.76.94-.76s.61.11.94.76l2.42 4.85a2.13 2.13 0 0 1 .29 1.16 1.36 1.36 0 0 1 -1.23 1.23zm7.01-10.35a.5.5 0 0 0 -.43-.4 13.03 13.03 0 0 1 -8.68-4.57.52.52 0 0 0 -.77 0 13.03 13.03 0 0 1 -8.68 4.57.5.5 0 0 0 -.43.4c-1.58 8.19 1.55 14.02 9.3 17.31a.5.5 0 0 0 .39 0c7.75-3.29 10.87-9.11 9.3-17.31zm-9.49 16.3c-7.1-3.09-9.91-8.25-8.57-15.76a13.98 13.98 0 0 0 8.57-4.43 13.98 13.98 0 0 0 8.57 4.43c1.33 7.51-1.48 12.67-8.57 15.76z" fill="#484848"></path>
                      </svg>
                    </div>
                    <div className="card__body">
                        <h4 className='card__title'>Let's make your account more secure</h4>
                        <p style={{color:'black', textAlign:'left'}}>
                          We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.
                        </p>
                    </div>
                  </div>
                </Flex>

              </Flex>

            </Container>
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
