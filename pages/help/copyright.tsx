import React from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import Link from 'next/link'

import { Box, Flex, Heading, Text, Center, Stack , Container, StackDivider   } from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import Section from '../../components/section';
import Triangle from '../../components/triangle';

import SideMenu from '../../components/help/SideMenu';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRunning, faUserShield} from "@fortawesome/free-solid-svg-icons";


const IndexPage = ({ data }) => {
  const content = data?.allBuilderModels.oneHepCenter?.content;

  const {t} = useTranslation('public');
  const icons = {
    "about-sportstats":<FontAwesomeIcon icon={faUserCircle} size="lg" style={{margin:'0 0.1em'}}/>, 
    "your-account":<FontAwesomeIcon icon={faUserCircle} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
    'your-events':<FontAwesomeIcon icon={faRunning} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
    "terms-and-policies":<FontAwesomeIcon icon={faUserShield} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
  }
 

  return (
    <Layout>
      <NextSeo title={t("help.title")} />

      <Center bg='tomato' h='100px' color='white'>
        <Heading> {t("help.welcome")} </Heading>
      </Center >
      <Section.Container id="settings"  Background={Background} >
      
      
          <Flex flexWrap='wrap' justifyContent='center' gap='2em'  px={[1,3,5]} pt={2}>
            <SideMenu active='copyright' />


            <Flex
              w={['100%','60%']}
              flexWrap='wrap' height='fit-content'
              px={['1','6em']} className='card'
            >
              <Heading mb='4' pb='2' sx={{borderBottom:'3px solid black'}}>  Copyright </Heading>
              <p style={{paddingBottom:'1em'}}>
                No part of this web site may be reproduced, distributed, or transmitted in any form or by any means, including copying, recording, downloading or other electronic or mechanical methods, without the prior written permission of Sportstats, except certain non-commercial uses permitted by copyright law.
              </p>
              <p>
                For permission requests, contact Sportstats, Att: Permissions Coordinator.
              </p>
            </Flex>
          </Flex>
          
       


      </Section.Container>
     <Flex flexWrap='wrap' w='100%' color='#fff' pb={4} bg='black' sx={{position:'absolute', bottom:0}}>

           <Box w='100%' mt={1} textAlign='center' >
             <Heading mb={1} >Contact Us</Heading>
           </Box>
           <Box w='100%' mt={2} textAlign='center'>
             <Text mb={1}>
               {t('help.cant-find-help')} 
               <Link href={`/help/contact`} style={{marginLeft:'10px', borderBottom:'3px solid green'}}>
                 {t('help.contact-us')}
                </Link>
              </Text>
           </Box>
      </Flex>

    </Layout>
  )
}

export default IndexPage


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
      height={['35vh', '30vh']}
      width={['100vw', '100vw']}
      position="top-left"
    />

    <Triangle
      color="#0CAA56"
      height={['50vh', '55vh']}
      width={['70vw', '40vw']}
      position="bottom-left"
    />

    <Triangle
      color="#f0e6f6"
      height={['70vh', '55vh']}
      width={['100vw', '100vw']}
      position="bottom-right"
    />
  </>
);
