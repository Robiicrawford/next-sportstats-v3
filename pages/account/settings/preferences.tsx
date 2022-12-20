import React, { useEffect, useState } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useForm, Controller } from 'react-hook-form';

import { Box, Flex, Heading, Container, Button, Input, Select, Text } from '@chakra-ui/react';

import Layout from '../../../components/layout/Layout'
import LayoutAccount from '../../../components/account/Layout'

import Breadcrumb from '../../../components/breadcrumb';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';
import { AuthCheck } from "../../../hooks/use-auth";

import { Country, State, City }  from 'country-state-city';

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));



const regionName = {
  GLOBAL: "Sportstats World",
  CAN_EAST: "Canada (East)",
  CAN_WEST: "Canada (West)",
  USA: "USA",
  ASIA: "Asia",
  SOUTH_AMERICA: "South America",
  EUROPE: "Europe",
}

const languageName = {
  en_CA: "English (Canada)",
  en_US: "English (USA)",
  fr_CA: "Français",
  th: "ไทย",
  es: "Español",
}

const preferredUnit = {
  0: "metric",
  1: "imperial",
}

export default function Settings({locale}) {
  const { t } = useTranslation('public');

  const { user } = useAuthenticator((context) => [context.user]);

  const [userData, setData] = useState(null)
  const [edit, setEdit] = useState(null)

  const { register, setValue, handleSubmit, control, watch, reset } = useForm();

  const onSubmit = async (data) =>{
    var body = {...data, SSUID: userData['custom:ssuid'] }
    try{
      var send_update = await fetch(
        `${process.env.NEXT_PUBLIC_MEMBER_URL}/updateMember.php`
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

      var getNewData = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setData(getNewData.attributes)
      setEdit(null)
      reset()

    } catch (err) {
      console.log(err)  
    }
  }

  useEffect(()=>{
    setData(user?.attributes?user?.attributes:null)
  },[user])


  const breadLink = [
    {title:t("account-settings"), to:'/account/settings/', active:false},
    {title:t('settings-page.login-info-title'), to:'/account/settings/preferences', active:true }
  ]



  return (
    <Layout>
      <NextSeo
        title={t('settings-page.login-info-title')}
        noindex={true}
      />
        <LayoutAccount>
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
                    {/*Member lang Edit Form*/}
                      <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                        <Flex flexWrap='wrap' w='100%'>
                          <h4 style={{marginBottom:'0.3em'}} > {t('Preferred language')} </h4>
                          <div style={{flexGrow:'1'}} />
                          <p 
                            style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                            onClick={()=>setEdit(edit === 'language' ?false:'language')}
                          >
                            <strong> {edit === 'language' ?'Cancel':'Edit'} </strong> 
                          </p>
                        </Flex>
                        {edit !== 'language'  &&  <p style={{marginLeft:'0.4em'}}>{languageName[userData?.locale]} </p> }
                        {edit === 'language' &&
                           <Flex
                              as='form' flexWrap='wrap'
                              onSubmit={handleSubmit(onSubmit)} 
                              w='100%'
                            >
                            <Box w={['100%', '50%']} px={[0,2]}>
                              <Select
                                id='language'
                                name='language'
                                bg='white' color='black'
                                {...register('LO')}
                                defaultValue={userData.locale}
                              >
                                {Object.keys(languageName).map((c,k)=> (
                                  <option value={c} key={c}> {languageName[c]} </option>  
                                ))}
                              </Select>
                            </Box>
                            
                            <Box w='100%'>
                               <Button bg='green' type='submit' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                            </Box>
                          </Flex>
                        }
                      </Flex>

                      {/*Member Unit Edit Form*/}
                      <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                        <Flex flexWrap='wrap' w='100%'>
                          <h4 style={{marginBottom:'0.3em'}} > {t('settings-page.preferred-distance-unit')} </h4>
                          <div style={{flexGrow:'1'}} />
                          <p 
                            style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                            onClick={()=>setEdit(edit === 'distance' ?false:'distance')}
                          >
                            <strong> {edit === 'distance' ?'Cancel':'Edit'} </strong> 
                          </p>
                        </Flex>
                        {edit !== 'distance'  &&  <p style={{marginLeft:'0.4em'}}>{userData?.['custom:preferredUnit']?t(`settings-page.${preferredUnit[userData?.['custom:preferredUnit']]}`):t('settings-page.metric')} </p> }
                        {edit === 'distance' &&
                           <Flex
                              as='form' flexWrap='wrap'
                              onSubmit={handleSubmit(onSubmit)} 
                              w='100%'
                            >
                            <Box width={['100%', '50%']} px={[0,2]}>
                              <Select
                                id='distance'
                                name='distance'
                                bg='white' color='black'
                                {...register('PU')}
                                defaultValue={userData?.['custom:preferredUnit']}
                              >
                                <option value='0'> {t('settings-page.metric')} </option>
                                <option value='1'> {t('settings-page.imperial')} </option>
                              </Select>
                            </Box>
                            
                             <Box w='100%'>
                               <Button bg='green' type='submit' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                            </Box>
                          </Flex>
                        }
                      </Flex>
                      

                      <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                        <Flex flexWrap='wrap' w='100%'>
                          <h4 style={{marginBottom:'0.3em'}}> {t('Region')} </h4>
                          <div style={{flexGrow:'1'}} />
                          <p 
                            style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                            onClick={()=>setEdit(edit === 'region' ?false:'region')}
                          >
                            <strong> {edit === 'region' ?'Cancel':'Edit'} </strong> 
                          </p>
                        </Flex>
                        {edit !== 'region'  &&  <p style={{marginLeft:'0.4em'}}>{userData?.['custom:region'] ?  regionName[userData?.['custom:region']] : 'Sportstats World'} </p> }
                        {edit === 'region' &&
                           <Flex
                              as='form' flexWrap='wrap'
                              onSubmit={handleSubmit(onSubmit)} 
                              w='100%'
                            >
                            <p style={{width:'100%', textAlign:'left',marginLeft:'0.4em'}}> This helps us show events closer to the region you want to know about </p>
                            <Box width={['100%', '50%']} px={[0,2]}>
                              <Select
                                id='region'
                                name='region'
                                bg='white' color='black'
                                {...register('PR')}
                                defaultValue={userData?.['custom:region']}
                              >
                                {Object.keys(regionName).map((c,k)=> (
                                  <option value={c} key={c}> {regionName[c]} </option>  
                                ))}
                              </Select>
                            </Box>
                            
                            <Box w='100%'>
                               <Button bg='green' type='submit' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                            </Box>
                          </Flex>
                        }
                      </Flex>
             


                  </Flex>
                </Box>

                <Flex w={['100%',1/3]} height='fit-content'>
                  <div  className="card_info" >
                    <div className="card__header" style={{marginTop:'1em'}}>
                      <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{height: "40px", width:"40px", display:"block", fill:"rgb(255, 180, 0)"}}>
                        <path d="m21.31 5.91a1.31 1.31 0 1 1 -1.31-1.31 1.31 1.31 0 0 1 1.31 1.31zm-8.31 9.69a1.31 1.31 0 1 0 1.31 1.31 1.31 1.31 0 0 0 -1.31-1.31zm-7-11a1.31 1.31 0 1 0 1.31 1.31 1.31 1.31 0 0 0 -1.31-1.31z"></path>
                        <path d="m22 6.5a2.5 2.5 0 0 1 -2 2.45v13.55a.5.5 0 0 1 -1 0v-13.55a2.5 2.5 0 0 1 0-4.9v-2.55a.5.5 0 0 1 1 0v2.56a2.44 2.44 0 0 1 .33.09.5.5 0 0 1 -.33.94h-.01a1.45 1.45 0 0 0 -.99.01 1.49 1.49 0 0 0 0 2.82 1.4 1.4 0 0 0 1 0 1.5 1.5 0 0 0 1-1.41 1.48 1.48 0 0 0 -.09-.52.5.5 0 0 1 .94-.35 2.5 2.5 0 0 1 .16.87zm-7.8 9.83a.5.5 0 0 0 -.29.64 1.48 1.48 0 0 1 .09.52 1.5 1.5 0 0 1 -1 1.41 1.4 1.4 0 0 1 -1 0 1.49 1.49 0 0 1 0-2.82 1.48 1.48 0 0 1 .5-.09 1.52 1.52 0 0 1 .5.08h.01a.5.5 0 0 0 .32-.94 2.46 2.46 0 0 0 -.32-.08v-13.56a.5.5 0 0 0 -1 0v13.55a2.5 2.5 0 0 0 0 4.9v2.55a.5.5 0 0 0 1 0v-2.55a2.5 2.5 0 0 0 1.84-3.32.5.5 0 0 0 -.64-.29zm-7-11a .5.5 0 0 0 -.29.64 1.48 1.48 0 1 1 -1.41-.98 1.47 1.47 0 0 1 .49.08h.01a.5.5 0 0 0 .33-.94 2.44 2.44 0 0 0 -.33-.09v-2.56a.5.5 0 0 0 -1 0v2.55a2.5 2.5 0 0 0 0 4.9v13.55a.5.5 0 0 0 1 0v-13.55a2.5 2.5 0 0 0 1.84-3.32.5.5 0 0 0 -.64-.29z" fill="#484848"></path>
                      </svg>
                    </div>
                    <div className="card__body">
                        <h4 className='card__title'>Your global preferences</h4>
                        <p style={{color:'black', textAlign:'left'}}>
                          Changing your language with how we communicate with you. You can change your region to see races closer to you.
                        </p>
                    </div>
                  </div>
                </Flex>

              </Flex>

            </Container>
          </AuthCheck>
        </LayoutAccount>
 
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

