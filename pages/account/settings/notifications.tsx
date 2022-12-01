import React, { useEffect, useState } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useForm, Controller } from 'react-hook-form';

import { Box, Flex, Text, Heading, Container, Button, Checkbox } from '@chakra-ui/react';

import Layout from '../../../components/layout/Layout'
import Section from '../../../components/section';
import Triangle from '../../../components/triangle';
import Breadcrumb from '../../../components/breadcrumb';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';
import { useAuth, AuthCheck } from "../../../hooks/use-auth";


const subscriptions = [
  {id:'iRun', status:true},
  {id:'newsletter', status:true},
  {id:'importantInfo', status:true}
]
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
        `${process.env.NEXT_PUBLIC_MEMBER_URL}/updateSubscriptions.php`
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
    {title:t('settings-page.notifications-title'), to:'/account/settings/notifications', active:true }
  ]

  return (
    <Layout>
      <NextSeo
        title={t('settings-page.privacy-title')}
        noindex={true}
      />
        <Section.Container id="settings" Background={Background} >
          <AuthCheck>
            <Container maxW='1500' flexWrap='wrap' px={[1,3,5,6]} pb={[1,2,3,5]} py={2}>
              
              <Breadcrumb links={breadLink} />

              <Box w={'100%'} my={4}>
                <Flex flexWrap='wrap' justifyContent='space-between'>
                  <Heading as="h1" >{t('settings-page.notifications-title')}</Heading>
                </Flex>
              </Box>
              {!userData && '...loading...' }

              <Flex w='100%' flexWrap='wrap' mx={[0,2,3,4]}>

                <Box w={['100%',2/3]} >
                  <Flex flexWrap='wrap' className='card__base' style={{gap: '1rem'}} pl='4' mr={[0,2,4,5]} mb={3}>

                    {/*Member Name Edit Form*/}
                    <Flex flexWrap='wrap' w='100%' pb={[1]} sx={{borderBottom:'2px solid white'}}  >
                      <Flex flexWrap='wrap' w='100%'>
                        <h3 style={{marginBottom:'0.3em'}}> {t('settings-page.email-subscriptions')} </h3>
                        <div style={{flexGrow:'1'}} />
                        <p 
                          style={{textDecoration:'underline', cursor:'pointer', marginBottom:'0', marginRight:'0.5em'}} 
                          onClick={()=>setEdit(edit === 'email' ?false:'email')}
                        >
                          <strong> {edit === 'visibility' ?'Cancel':'Edit'} </strong> 
                        </p>
                      </Flex>
                        {edit !== 'email'  &&  <strong style={{marginLeft:'0.4em'}}> {t('settings-page.email-subscriptions')}</strong> }
                        {edit === 'email' &&
                           <Flex
                              as='form' flexWrap='wrap'
                              onSubmit={handleSubmit(onSubmit)} 
                              w='100%'
                            >
                            <Box w={['100%', '50%']} px={[0,2]}>
                              {subscriptions.map((i, p)=>
                                <div key={i.id}>
                                  <Flex flexWrap='wrap' >
                                    <Box w='60%'> <Text>{i.id} </Text> </Box>
                                    
                                      <Checkbox 
                                        id={"checkbox"+p} 
                                        colorScheme='green'
                                        sx={{borderColor:'black'}}
                                        defaultChecked={i.status}
                                       // name={i.id}
                                     //   onChange={handleUpdate}
                                      />
                                        
                                    <Box w='100%'>
                                      <Text >{t('settings-page.subscriptions.'+i.id)} </Text>
                                    </Box>
                                  </Flex>
                                  <hr style={{width:'100%', margin:'0.6em 0', borderBottom:' 1px solid green'}}/>
                                </div>
                              )}
                            </Box>

                           <Box w='100%'>
                             <Button type='submit' bg='green' sx={{marginLeft:'1em', marginTop:'0.8em', cursor:'pointer'}}> {t('common:save')}</Button>
                          </Box>
                        </Flex>
                      }
                    </Flex>

                  </Flex>
                </Box>

                <Flex w={['100%',1/3]} height='fit-content' >
                  <div  className="card_info" >
                   
                    <div className="card__body">
                        <h4 className='card__title'>Committed to privacy</h4>
                        <p style={{color:'black', textAlign:'left'}}>
                          Sportstats is committed to keeping your data protected. See details in our <Link href='/help/privacy-policy' style={{color:'black'}} > <strong>Privacy Policy.</strong></Link>
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
