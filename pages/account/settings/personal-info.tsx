import React, { useEffect, useState } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useForm, Controller } from 'react-hook-form';

import { Box, Flex, Heading, Container, Button, Input, Select } from '@chakra-ui/react';

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

export default function Settings({locale}) {
  const { t } = useTranslation('public');
  const auth = useAuth();

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
    } catch (err) {
      console.log(err)  
    }
  }

  useEffect(()=>{
    reset()
  },[edit])

  useEffect(()=>{
    setData(user?.attributes?user?.attributes:null)
  },[user])

  const breadLink = [
    {title:t("account-settings"), to:'/account/settings/', active:false},
    {title:t('settings-page.personal-info-title'), to:'/account/settings/personal-info', active:true }
  ]

  return (
    <Layout>
      <NextSeo
        title={t('settings-page.personal-info-title')}
        noindex={true}
      />
        <Section.Container id="settings" Background={Background} >
          <AuthCheck>
            <Container maxW='1500' flexWrap='wrap' px={[1,3,5,6]} pb={[1,2,3,5]} py={2}>
              
              <Breadcrumb links={breadLink} />

              <Box w={'100%'} my={4}>
                <Flex flexWrap='wrap' justifyContent='space-between'>
                  <Heading as="h1" >{t('settings-page.personal-info-title')}</Heading>
                </Flex>
              </Box>
              {!userData && '...loading...' }

              <Flex w='100%' flexWrap='wrap' mx={[0,2,3,4]}>

                <Box w={['100%',2/3]} >
                  <Flex flexWrap='wrap' className='card__base' style={{gap: '1rem'}} pl='4' mr={[0,2,4,5]} mb={3}>

                    {/*Member Name Edit Form*/}
                    <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                      <Flex flexWrap='wrap' w='100%'>
                        <h3 style={{marginBottom:'0.3em'}}> {t('Legal Name')} </h3>
                        <div style={{flexGrow:'1'}} />
                        <p 
                          style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                          onClick={()=>setEdit(edit === 'name' ?false:'name')}
                        >
                          <strong> {edit === 'name' ?'Cancel':'Edit'} </strong> 
                        </p>
                      </Flex>
                      {edit !== 'name'  &&  <p style={{marginLeft:'0.4em'}}>{userData?.given_name}  {userData?.family_name}</p> }
                      {edit === 'name' &&
                         <Flex
                            as='form' flexWrap='wrap'
                            onSubmit={handleSubmit(onSubmit)} 
                            w='100%'
                          >
                          <p style={{width:'100%', textAlign:'left',marginLeft:'0.4em'}}> This is the name you use to register for events </p>
                          <Box w={['100%', '50%']} px={[0,2]}>
                            <label htmlFor='name' >{t('signup.first_name')}</label>
                            <Input
                              id='name'
                              name='given_name'
                              {...register('GN')}
                              defaultValue={userData?.given_name}
                            />
                          </Box>

                          <Box w={['100%', '50%']} px={[0,2]}>
                            <label htmlFor='name'>{t('signup.last_name')}</label>
                            <Input
                              id='LastName'
                              name='family_name'
                              {...register('FN')}
                              defaultValue={userData?.family_name}
                            />
                          </Box>
                           <Box w='100%'>
                             <Button type='submit' bg='green' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                          </Box>
                        </Flex>
                      }
                    </Flex>

                    {/*Gender form*/}
                    <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                      <Flex flexWrap='wrap' w='100%'>
                        <h4 style={{marginBottom:'0.3em'}}> {t('signup.gender')} </h4>
                        <div style={{flexGrow:'1'}} />
                        <p 
                          style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                          onClick={()=>setEdit(edit === 'gender' ?false:'gender')}
                        >
                          <strong> {edit === 'gender' ?'Cancel':'Edit'} </strong> 
                        </p>
                      </Flex>
                      {edit !== 'gender' && edit !== 'gender' &&  <p style={{marginLeft:'0.4em'}}>{t(`signup.gender-data.${userData?.gender.toLowerCase()}`)}  </p> }
                      {edit === 'gender' &&
                         <Flex
                            as='form' flexWrap='wrap'
                            onSubmit={handleSubmit(onSubmit)} 
                            w='100%'
                          >
                            <Box w={['100%', '50%']} px={[0,2]}>
                              <label htmlFor='gender'>{t('signup.gender')}</label>
                              <Select
                                id='gender'
                                name='gender'
                                {...register('GE')}
                                defaultValue={userData?.gender.toLowerCase()}
                              >
                                <option value='m'>{t('signup.gender-data.m')}</option>
                                <option value='f'>{t('signup.gender-data.f')}</option>
                                <option value='n'>{t('signup.gender-data.n')}</option>
                                <option value='u'>{t('signup.gender-data.u')}</option>
                              </Select>
                            </Box>
                             <Box w='100%'>
                               <Button bg='green' type='submit' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                            </Box>
                          </Flex>
                        }
                      </Flex>

                      {/*Date of Birth*/}
                      <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                          <Flex flexWrap='wrap' w='100%'>
                            <h4 style={{marginBottom:'0.3em'}}> {t('signup.birthdate')} </h4>
                            <div style={{flexGrow:'1'}} />
                            <p 
                              style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                              onClick={()=>setEdit(edit === 'birthdate' ?false:'birthdate')}
                            >
                              <strong> {edit === 'birthdate' ?'Cancel':'Edit'} </strong> 
                            </p>
                          </Flex>
                          {edit !== 'birthdate' && edit !== 'birthdate' &&  <p style={{marginLeft:'0.4em'}}>{userData?.birthdate}  </p> }
                          {edit === 'birthdate' &&
                             <Flex
                                as='form' flexWrap='wrap'
                                onSubmit={handleSubmit(onSubmit)} 
                                w='100%'
                              >
                                <Box width={['100%', '50%']} px={[0,2]}>
                                  <label htmlFor='birthdate'>{t('signup.birthdate')}</label>
                                  <Input
                                    id='birthdate'
                                    name='birthdate'
                                    type='date'
                                    {...register('BD')}
                                    defaultValue={userData.birthdate}
                                  />
                                </Box>
                                 <Box w={'100%'}>
                                   <Button bg='ss_green' type='submit' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                                </Box>
                              </Flex>
                            }
                        </Flex>

                        {/*address*/}
                      <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                          <Flex flexWrap='wrap' w='100%'>
                            <h4 style={{marginBottom:'0.3em'}}> {t('signup.address')} </h4>
                            <div style={{flexGrow:'1'}} />
                            <p 
                              style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                              onClick={()=>setEdit(edit === 'address' ?false:'address')}
                            >
                              <strong> {edit === 'address' ?'Cancel':'Edit'} </strong> 
                            </p>
                          </Flex>
                          {edit !== 'address' && edit !== 'address' &&  
                            <p style={{marginLeft:'0.4em'}}>
                              {!userData?.['custom:address1'] ||  !userData?.['custom:country'] || !userData?.['custom:province']
                                ? 'Full address not provided'
                                :<> {userData?.['custom:address1']}, {userData?.['custom:city']} {userData?.['custom:province']} {userData?.['custom:country']} </>
                              } 
                             </p> 
                          }
                          {edit === 'address' &&
                             <Flex
                                as='form' flexWrap='wrap'
                                onSubmit={handleSubmit(onSubmit)} 
                                w='100%' sx={{gap:'0.5rem'}}
                              >
                                <Box width={['100%', '50%']} px={[0,2]}>
                                  <label htmlFor='country'>{t('signup.country')}</label>
                                  <Select
                                    id='country' name='country'
                                    {...register('A5')}
                                    defaultValue={userData['custom:country']}
                                  >
                                    {Object.entries(countries.getAlpha3Codes()).map(([c,cc],k)=> (
                                       <option value={c} key={c}> {countries.getName(cc, "en", {select: "official"})} </option>  
                                    ))}
                                  </Select>
                                </Box>

                                <Box width={['100%', '33.3%']} px={[0,2]}>
                                  <label htmlFor='A1'>{t('signup.address1')}</label>
                                  <Input
                                    id='A1'
                                    name='A1'
                                    placeholder={t('signup.address1-desc')}
                                    {...register('A1')}
                                    defaultValue={userData['custom:address1']}
                                  />
                                </Box>

                                <Box width={['100%', '33.3%']} px={[0,2]}>
                                  <label htmlFor='A2'>{t('signup.address2')}</label>
                                  <Input
                                    id='A2'
                                    name='A2'
                                    placeholder={t('signup.address2-desc')}
                                    {...register('A2')}
                                    defaultValue={userData['custom:address2']}
                                  />
                                </Box>

                                <Box width={['100%', '33.3%']} px={[0,2]}>
                                  <label htmlFor='A3'>{t('signup.city')}</label>
                                  <Input
                                    id='A3'
                                    name='A3'
                                    placeholder={t('signup.city-desc')}
                                    {...register('A3')}
                                    defaultValue={userData['custom:city']}
                                  />
                                </Box>

                                <Box width={['100%', '33.3%']} px={[0,2]}>
                                  <label htmlFor='A4'>{t('signup.state')}</label>

                                  <Input
                                    id='A4'
                                    name='A4'
                                    {...register('A4')}
                                    placeholder={t('signup.state-desc')}
                                    defaultValue={userData['custom:province']}
                                  />
                                </Box>

                                <Box width={['100%', '33.3%']} px={[0,2]}>
                                  <label htmlFor='A6'>{t('signup.zip')}</label>
                                  <Input
                                    id='A6'
                                    name='A6'
                                    {...register('A6')}
                                    placeholder={t('signup.zip-desc')}
                                    defaultValue={userData['custom:postal']}
                                  />
                                </Box>

                                 <Box width={['100%']}>
                                   <Button bg='green' type='submit' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                                </Box>
                              </Flex>
                            }
                        </Flex>
                  </Flex>
                </Box>

                <Flex w={['100%',1/3]} height='fit-content' >
                  <div  className="card_info" >
                    <div className="card__header" style={{marginTop:'1em'}}>
                      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '48px', width: '48px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor'}}>
                        <g stroke="none">
                        <path d="m39 15.999v28.001h-30v-28.001z" fillOpacity=".2"></path>
                        <path d="m24 0c5.4292399 0 9.8479317 4.32667079 9.9961582 9.72009516l.0038418.27990484v2h7c1.0543618 0 1.9181651.8158778 1.9945143 1.8507377l.0054857.1492623v32c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-34c-1.0543618 0-1.91816512-.8158778-1.99451426-1.8507377l-.00548574-.1492623v-32c0-1.0543618.81587779-1.9181651 1.85073766-1.9945143l.14926234-.0054857h7v-2c0-5.5228475 4.4771525-10 10-10zm17 14h-34v32h34zm-17 14c1.6568542 0 3 1.3431458 3 3s-1.3431458 3-3 3-3-1.3431458-3-3 1.3431458-3 3-3zm0 2c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1 1-.4477153 1-1-.4477153-1-1-1zm0-28c-4.3349143 0-7.8645429 3.44783777-7.9961932 7.75082067l-.0038068.24917933v2h16v-2c0-4.418278-3.581722-8-8-8z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="card__body">
                        <h4 className='card__title'>Which details can be edited?</h4>
                        <p style={{color:'black', textAlign:'left'}}>
                          Details Sportstats uses to verify your identity can be changed here. These details are used to help veify your results when claiming them.
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
