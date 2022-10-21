import Link from 'next/link'
import { NextSeo } from 'next-seo';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { 
  Center, Box, Button
} from '@chakra-ui/react';

import Layout from '../components/layout/Layout'

import Section from '../components/section';
import Triangle from '../components/triangle';

export default function FourOhFour({locale}) {
  const { t } = useTranslation('app');

  return (
    <Layout >
     <NextSeo
        title={`Sportstats - ${t('404.title')} `}
      />
        
      <Section.Container id="privacy" Background={Background} >
        <Center h='60ch'>
          <Box maxW='sm' borderWidth='1px' p='3' bg='#8f8f8f4f' borderRadius='lg' overflow='hidden'>
            <Box
              mt='1'
              fontWeight='semibold'
              as='h1'
              lineHeight='tight'
              noOfLines={1}
            >
              {t('404.title')}
            </Box>

            <Box as='span' py='4' color='gray.600' fontSize='sm'> {t('404.sub-text')} </Box>
            <Link href="/">
              <a>
                <Button mt='3'>{t('404.linl')}</Button>
              </a>
            </Link>
          </Box>
        </Center>
      </Section.Container>
  </Layout>
)}


export async function getStaticProps({locale}) {
    
    return {
      props: {
        ...(await serverSideTranslations(locale, ['app'], null, ['en', 'fr'])),
      },
   };
}

const Background = () => (
  <>
    <Triangle
      color="#f0e6f6"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />
   
      <Triangle
        color="#0CAA56"
        height={['38vh', '80vh']}
        width={['50vw', '30vw']}
      />

    <Triangle
      color="#000"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      position="top-right"
    />
    <Triangle
      color="#f0e6f6"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      position="bottom-right"
    />
  </>
);
