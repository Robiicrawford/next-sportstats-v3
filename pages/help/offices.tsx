import React from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import Link from 'next/link'

import { 
  Box, Flex, Heading, Text, Center, SimpleGrid,
  Card, CardBody, CardFooter, Stack, Image, Badge,
  useColorModeValue
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

  
  const officeList = [
    { hq: true, name:'Sportstats East', 
      image: 'https://a.cdn-hotels.com/gdcs/production163/d857/cc29dd0e-f745-4507-80e1-6ae5a3532338.jpg',
      addressLine1: "155 Colonnade Rd. #18",
      addressLine2: "Ottawa, ON K2E 7K1 (Canada)",
      addressLine3: "",
      countryCode:'CA'
    },
    { hq: false, name:'Sportstats West', 
      image: 'https://d3exkutavo4sli.cloudfront.net/wp-content/uploads/2019/04/the_heights_on_austin_rendering_1.jpg',
      addressLine1: "118 - 250 Schoolhouse St",
      addressLine2: "Coquitlam, BC, V3K 6V7",
      addressLine3: "",
      countryCode:'CA'
    },
    { hq: false, name:'Sportstats USA', 
      image: 'https://www.mercyhealth.com/assets/images/medical-education/grand-rapids/grand-rapids-banner.jpg',
      addressLine1: "88 54th St. SW Suite 106",
      addressLine2: "Grand Rapids, MI 49548",
      addressLine3: "",
      countryCode:'US'
    },
    { hq: false, name:'Sportstats Quebec', 
      image: 'https://i0.wp.com/thevalemagazine.com/wp-content/uploads/2019/03/fairmont-le-ch%C3%A2teau-frontenac-que%CC%81bec-city-canada.jpg?fit=1200%2C800&ssl=1',
      addressLine1: "3075 Boul. Hamel, Bureau 109",
      addressLine2: "Quebec, QC, G1P 4C6",
      addressLine3: "",
      countryCode:'CA'
    },
    { hq: false, name:'Sportstats Asia', 
      image: 'https://www.trailsofindochina.com/wp-content/uploads/2018/04/Bangkok_header.jpg',
      addressLine1: "109 CCT Bldg 8th Floor,",
      addressLine2: "Surawong Rd, Bangrak",
      addressLine3: "",
      countryCode:'TH'
    },
    { hq: false, name:'Sportstats India', 
      image: 'https://static.toiimg.com/photo/50913699.cms',
      addressLine1: "Brigade Gateway,",
      addressLine2: "26/1 Dr. Rajkumar Road,",
      addressLine3: "Bangalore, 560055",
      countryCode:'IN'
    }
  ]

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
                {officeList.map((office)=>
                  <Card
                    direction={{ base: 'column', sm: 'column', md:'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg={useColorModeValue('white', 'gray.700')}
                    shadow={{ md: 'base' }}
                  >
                    <Image
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '220px' }}
                      maxH={{ base: '100%', sm: '100%' }}
                      style={{objectFit:'contain'}}
                      src={office.image}
                      alt={office.name}
                    />

                    <Stack>
                      <CardBody>
                        <Heading size='md'>
                          <ReactCountryFlag 
                            svg 
                            countryCode={office.countryCode}
                            title={office.countryCode}
                            style={{marginRight:'0.6em'}}
                          /> 

                          {office.name}
                          {office.hq === true &&
                            <Badge ml='1' colorScheme='green'>
                              HQ
                            </Badge>
                          }
                        </Heading>

                        <Text py='2'>
                          {office.addressLine1} <br/> {office.addressLine2}
                        </Text>
                      </CardBody>
                    </Stack>
                  </Card>
                )}

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
