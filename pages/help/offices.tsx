import React from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import Link from 'next/link'

import { 
  Box, Flex, Heading, Text, Center, SimpleGrid,
  Card, CardBody, CardFooter, Stack, Image, Badge 
} from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import Section from '../../components/section';
import Triangle from '../../components/triangle';
import ContactUsBanner from "../../components/help/ContactUsBanner"

import SideMenu from '../../components/help/SideMenu';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRunning, faUserShield} from "@fortawesome/free-solid-svg-icons";

import ReactCountryFlag from "react-country-flag"

const IndexPage = ({ data }) => {
  const content = data?.allBuilderModels.oneHepCenter?.content;

  const {t} = useTranslation('public');

 

  return (
    <Layout>
      <NextSeo title={t("help.title")} />

      <Center bg='tomato' h='100px' w='100%' color='white'>
        <Heading> {t("help.welcome")} </Heading>
      </Center >
      <Section.Container id="settings"  Background={Background} >
      
      
          <Flex 
            flexWrap='wrap' justifyContent='center' 
            gap='2em' pb='150px'  px={[1,3,5]} pt={2}
          >
            <SideMenu active='offices' />


            <Flex
              w={['100%','100%','60%']}
              flexWrap='wrap' height='fit-content'
              px={['1','6em']} className='card'
            >
              <Heading mb='4' pb='2' sx={{borderBottom:'3px solid black'}}>  Office Locations </Heading>
              <SimpleGrid columns={[1]} spacing={10} pb='5'>
                <Card
                  direction={{ base: 'column', sm: 'column', md:'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '220px' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    style={{objectFit:'contain'}}
                    src='https://a.cdn-hotels.com/gdcs/production163/d857/cc29dd0e-f745-4507-80e1-6ae5a3532338.jpg'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'>
                        <ReactCountryFlag 
                          svg 
                          countryCode='CA'
                          title='Canada'
                          style={{marginRight:'0.6em'}}
                        /> 

                        Sportstats East
                        
                        <Badge ml='1' colorScheme='green'>
                          HQ
                        </Badge>


                      </Heading>

                      <Text py='2'>
                        155 Colonnade Rd. #18 <br/>
                        Ottawa, ON K2E 7K1 (Canada)
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>
                
                <Card
                  direction={{ base: 'column', sm: 'column', md:'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '230px' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    src='https://d3exkutavo4sli.cloudfront.net/wp-content/uploads/2019/04/the_heights_on_austin_rendering_1.jpg'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'>
                        <ReactCountryFlag 
                          svg 
                          countryCode='CA'
                          title='Canada'
                          style={{marginRight:'0.6em'}}
                        /> 

                        Sportstats West

                      </Heading>

                      <Text py='2'>
                        118 - 250 Schoolhouse St, <br/>
                        Coquitlam, BC, V3K 6V7
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>

                <Card
                  direction={{ base: 'column', sm: 'column', md:'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '230px' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    src='https://www.mercyhealth.com/assets/images/medical-education/grand-rapids/grand-rapids-banner.jpg'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'>
                        <ReactCountryFlag 
                          svg 
                          countryCode='US'
                          title='USA'
                          style={{marginRight:'0.6em'}}
                        /> 

                        Sportstats USA

                        
                      </Heading>

                      <Text py='2'>
                        88 54th St. SW Suite 106 <br/>
                        Grand Rapids, MI 49548
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>

                 <Card
                  direction={{ base: 'column', sm: 'column', md:'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '230px' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    src='https://i0.wp.com/thevalemagazine.com/wp-content/uploads/2019/03/fairmont-le-ch%C3%A2teau-frontenac-que%CC%81bec-city-canada.jpg?fit=1200%2C800&ssl=1'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'>
                        <ReactCountryFlag 
                          svg 
                          countryCode='CA'
                          title='Canada'
                          style={{marginRight:'0.6em'}}
                        /> 

                        Sportstats Quebec

                      </Heading>

                      <Text py='2'>
                        3075 Boul. Hamel, Bureau 109 <br/>
                        Quebec, QC, G1P 4C6
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>


                <Card
                  direction={{ base: 'column', sm: 'column', md:'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '230px' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    src='https://www.trailsofindochina.com/wp-content/uploads/2018/04/Bangkok_header.jpg'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'>
                        <ReactCountryFlag 
                          svg 
                          countryCode='TH'
                          title='Thailand'
                          style={{marginRight:'0.6em'}}
                        /> 

                        Sportstats Asia

                      </Heading>

                      <Text py='2'>
                        109 CCT Bldg 8th Floor, <br/>
                        Surawong Rd, Bangrak
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>

                <Card
                  direction={{ base: 'column', sm: 'column', md:'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '230px' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    src='https://static.toiimg.com/photo/50913699.cms'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'>
                        <ReactCountryFlag 
                          svg 
                          countryCode='IN'
                          title='India'
                          style={{marginRight:'0.6em'}}
                        /> 

                        Sportstats India 

                      </Heading>

                      <Text py='2'>
                        Brigade Gateway,<br/>
                        26/1 Dr. Rajkumar Road, <br/>
                        Bangalore, 560055
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>

              </SimpleGrid>
            </Flex>
          </Flex>
          
       


      </Section.Container>
      
       <ContactUsBanner />

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
