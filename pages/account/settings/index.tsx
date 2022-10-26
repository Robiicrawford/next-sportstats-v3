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
        title={`Settings`}
        noindex={true}
      />
        <Section.Container id="settings" Background={Background} >
          <AuthCheck>
           

            <Container maxW='1500' flexWrap='wrap' px={[1,3,5,6]} pb={[1,2,3,5]} py={2} sx={{display:'flex', flexDirection:'row', gap:'1em'}} justifyContent='center'>
              <Box w='100%' my={[2,4]}>
                <Heading as="h1" >{t('your-settings')}</Heading>
                <h3 style={{marginLeft:'1em'}}> 
                  {auth.user?.attributes?.given_name} {auth.user?.attributes?.family_name}, {auth.user?.attributes?.email} - 
                  <Link style={{color:'white'}} href={`/profile/${auth.user?.attributes?.['custom:ssuid']}/${auth.user?.attributes?.family_name}`} > Go To Profile </Link>
                </h3>
              </Box>

              {routes.map((node, p)=>
            
                  <Link href={node.link} key={node.title} >

                    <Box className="card"  >
                      <Box className="card__header" h={['50px','50px']} ml='3' mt='3'>
                        <FontAwesomeIcon className="card__image"  style={{color:'#383'}} icon={node.icon} size="2xl"/>
                      </Box>

                      <div className="card__body" style={{paddingTop:'0.1em'}} >
                       
                        <Box 
                          className='card__title'
                          noOfLines={2}
                          fontWeight='semibold'
                          as='h4'
                        >
                          {t('settings-page.'+node.title)}
                          <FontAwesomeIcon style={{color:'#383', marginLeft:'8px'}} icon={faCaretRight} size="sm"  />
                        </Box>

                         <Box 
                          className='card__content' style={{color:'black'}}
                          noOfLines={4}
                        >
                          {t('settings-page.'+node.desc)}
                        </Box>

                      </div>

                    </Box>

                  </Link>
              )}
            </Container>

            <Box w='100%' textAlign='center' sx={{borderTop:'1px solid black'}} my='3' py='3'>
                <Button onClick={()=>auth.signout()} bg='ss_green'>{t('common:logout')} </Button>
            </Box>

            <Box w='100%' textAlign='center'>
              <Text textAlign='center'>{t('settings-page.deactivate-desc')} </Text>
              <Link href='/account/deactivate'> <Button> {t('settings-page.deactivate')} </Button> </Link>
            </Box>
          </AuthCheck>
        </Section.Container>
 
    </Layout>
  );
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
