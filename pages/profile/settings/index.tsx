import { NextSeo } from 'next-seo';
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Box, Flex, Image, Center, Heading, Container } from '@chakra-ui/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faIdCard, faShieldAlt, faBell, faEye, faSlidersH, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import Layout from '../../../components/layout/Layout'
import Section from '../../../components/section';
import Triangle from '../../../components/triangle';

import { useAuth } from "../../../hooks/use-auth";

export default function Home({locale}) {
  const { t } = useTranslation('public');

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
          
          <Box w='100%' my={[2,4]}>
            <Heading as="h1" >{t('your-settings')}</Heading>
            <h3 style={{marginLeft:'1em'}}> 
              {auth.user?.attributes.given_name} {auth.user?.attributes.family_name}, {auth.user?.attributes.email} - 
              <Link style={{color:'white'}} href={`/profile/${auth.user?.attributes['custom:ssuid']}/${auth.user?.attributes.family_name}`} > Go To Profile </Link>
            </h3>
          </Box>

          <Container  maxW='2x1' px={['', '15em', '25em']} justifyContent='center' flexDirection='row' className='container' centerContent style={{gap:'1.2em'}} >
            {routes.map((node, p)=>
          
                <Link href={node.link}>
                  <a>
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
                  </a>
                </Link>
            )}
          </Container>
        </Section.Container>
    </Layout>
  )
}


export async function getStaticProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      },
   };
}

const Background = () => (
  <>
    <Triangle
      color="#f0e6f6"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      position="top-left"
    />

    <Triangle
      color="#0CAA56"
      height={['30vh', '15vh']}
      width={['70vw', '40vw']}
      position="bottom-left"
    />

    <Triangle
      color="#f0e6f6"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      position="bottom-right"
    />
  </>
);
