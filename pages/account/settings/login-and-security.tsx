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
  const [edit, setEdit] = useState(false)

  const { register, setValue, handleSubmit, control, watch, reset } = useForm();

  const onSubmit = async (data) =>{
    console.log(user)
    var body = {
      ...data,
      SSUID: userData['custom:ssuid'],
    }
    try{
      var send_update = await fetch(
        `${process.env.NEXT_PUBLIC_MEMBER_URL}`
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
    {title:t('settings-page.login-info-title'), to:'/account/settings/login-and-security', active:true }
  ]

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
                  <div  className="card_info" height='fit-content' >
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
