import React, {useState, useEffect} from "react"
import { NextSeo } from 'next-seo';

import Link from 'next/link'
import Script from "next/script";
import { useRouter } from "next/router";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useAuthenticator } from '@aws-amplify/ui-react';

import styled from "styled-components";
import { 
    Table, Thead, Tbody, Tr, Th, Td,
    Tab, TabList, Tabs,
    Flex, Box, Heading, Text, Button, Avatar,
    Stack, HStack, Icon, Wrap, VStack, StackDivider,
    IconButton, ButtonGroup,
    useColorModeValue
   } from '@chakra-ui/react';

import { HiCalendar, HiLink, HiLocationMarker, HiPencilAlt } from 'react-icons/hi'
import { FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa'
import { RiUserFollowFill } from 'react-icons/ri'

import { gql, useMutation } from "@apollo/client";
import {client} from "../../apollo/apollo-client";

import Layout from '../../components/layout/Layout'

import {CardWithAvatar} from "../../components/cards/ProfileCardWithAvatar"
import {msToTime} from '../../utils/formatTime'

import { useAuth } from "../../hooks/use-auth";

const FOLLOW_USER = gql`
  mutation unfollow($sid: Int!, $pid: Int!, $follow: Boolean!) {
    follow(currentUser: $sid, otherUser: $pid, follow: $follow ){
      following{
        id
        idList
      }
    }
  }
`;

function ResultPageInd({ data, ssuid }) {
  const { t } = useTranslation('public');
  const router = useRouter();
  const auth = useAuth();

  const [user_follow, { loading }] = useMutation(FOLLOW_USER);

  const handleFollow = async() =>{
    var run_follow = await user_follow({ 
      variables: {  
        sid: parseInt(auth?.user?.attributes?.['custom:ssuid']),  
        pid: parseInt(ssuid), 
        follow: data?.user?.followers.idList?.includes(parseInt(auth?.user?.attributes?.['custom:ssuid']) )  ? false:true
      } 
    });
    
    console.log(run_follow)
  }



  return (
    <Layout header_color='black' >
      <NextSeo
        title={`${data?.user?.info.givenName} ${data?.user?.info.familyName}`}
      />
      <Flex
          as="section" w='100%' pt='70px'
          direction={{ base: 'column', lg: 'row' }}
          minH="80vh" 
          bg="bg-canvas" 
          overflowY="auto" justifyContent='center'
          px='0' mx='0'
        pb={{ base: '3', md: '6', lg:'8' }}
        position='relative'  
      >
        <Box position="absolute" inset="0" height="32" bg="ss_green" />
         
         <CardWithAvatar
          maxW="100%"
          minW='70%'
          avatarProps={{
            src: `${data?.user?.info.profilePhoto}`,
            name: `${data?.user?.info.givenName} ${data?.user?.info.familyName}`,
          }}
          ssuid={ssuid}
          action={
            <ButtonGroup>

              {auth?.user && auth?.user.attributes?.['custom:ssuid'] == data?.user?.id ?
                  <Button 
                    size="sm" leftIcon={<HiPencilAlt />}
                    as={Link}
                    href={'/account/settings'}
                  >
                    Edit
                  </Button>
                :
                  <Button 
                    colorScheme='teal'
                    size="sm" leftIcon={<RiUserFollowFill />}
                    onClick={handleFollow}
                    isLoading={loading}
                  >
                    {data?.user?.followers.idList?.includes(parseInt(auth?.user?.attributes?.['custom:ssuid']) )  ? 'Following':'Follow'}
                  </Button>
              }

            </ButtonGroup>
          }
        >
          <Box textAlign={{ sm: 'center' }} px='3' pt="2" mb='6'>
            <Heading size="lg"  fontWeight="extrabold" letterSpacing="tight">
              {`${data?.user?.info.givenName} ${data?.user?.info.familyName}`}
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Team Zoot
            </Text>
            
          </Box>

           <Tabs size='lg' mt='5' colorScheme='red' >
            <TabList>
              <Tab>SUMMARY</Tab>
              <Tab>RESULTS</Tab>
              <Tab>AWARDS</Tab>
            </TabList>
          </Tabs>

          <Stack 
            direction={{ base: 'column', md: 'row' }}
            sx={{border:'10px solid green'}} 
            w='100%'  mx='0' px='0'
          >
            
            <Stack
              direction={{ base: 'column', sm: 'column' }}
              spacing={{ base: '1', sm: '6' }}
              my="4"
              ml='3'
              fontSize="sm"
              fontWeight="medium"
              justifyContent='center'
              minW='20%'
              color={useColorModeValue('blue.600', 'blue.300')}
            >
              <HStack>
                <Icon as={HiLocationMarker} />
                <Text>{`${data?.user?.info.city}, ${data?.user?.info.prov}, ${data?.user?.info.country}`}</Text>
              </HStack>
              <HStack>
                <ButtonGroup variant="ghost">
            
                  <IconButton _hover={{ bg: 'ss_green' }} color='black' target="_blank" as="a" href="https://www.facebook.com/sportstatsmedia/" aria-label="Facebook" icon={<FaFacebook fontSize="1.25rem" />} />
                  <IconButton _hover={{ bg: 'ss_green' }} color='black' target="_blank" as="a" href="https://www.twitter.com/sportstats" aria-label="Twitter" icon={<FaTwitter fontSize="1.25rem" />} />
                  <IconButton _hover={{ bg: 'ss_green' }} color='black' target="_blank" as="a" href="https://www.instagram.com/sportstatsworld" aria-label="Instagram" icon={<FaInstagram fontSize="1.25rem" />} />
                  <IconButton _hover={{ bg: 'ss_green' }} color='black' target="_blank" as="a" href="https://www.youtube.com/channel/UCrEE7G1Za12M2kUGRENTf_w" aria-label="Youtube" icon={<FaYoutube fontSize="1.25rem" />} />
               
                </ButtonGroup>
              </HStack>
              
            </Stack>

            
              <Stack 
                direction='row'
                divider={<StackDivider borderColor='gray.400' />}
                  spacing="10" 
                  sx={{flex:'1 1 auto'}}
                justifyContent='space-evenly'
                px='4'
              >
                       
                        <VStack
                          justifyContent='center'
                        >
                           <Text fontSize="md" mb='0' >
                             {data?.user?.followers.count}
                           </Text>
                           <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color={useColorModeValue('gray.600', 'gray.300')}
                          >
                            {t('member:dashboard.followers')}
                          </Text>
                        </VStack>

                        <VStack
                          justifyContent='center'
                        >
                           <Text fontSize="ms" mb='0' >
                             {data?.user?.info.totalRace}
                           </Text>
                           <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color={useColorModeValue('gray.600', 'gray.300')}
                          >
                            {t('public:races')}
                          </Text>
                        </VStack>

                        <VStack
                          justifyContent='center'
                        >
                           <Text fontSize="md" mb='0' >
                             {data?.user?.info.totalBadges}
                           </Text>
                           <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color={useColorModeValue('gray.600', 'gray.300')}
                          >
                            {t('member:dashboard.awards')}
                          </Text>
                        </VStack>

                </Stack>
      
          </Stack>
          <Stack 
            direction={{ base: 'column', sm: 'column' }}
            sx={{border:'10px solid green'}} 
            w='100%'
          >
            <Text mx='3' fontWeight='bold' fontSize='25'>Results</Text>
            
            <Box overflowX="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Event</Th>
                    <Th>Race</Th>
                    <Th>Time</Th>
                    <Th>Pos</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {claims.sort((a, b)=> new Date(b.RDT) - new Date(a.RDT) ).map((race, idx)=>
                    <Tr
                      sx={{
                        cursor:'pointer'
                      }}
                      _hover={{ bg: 'ss_green' }}
                      onClick={() => router.push(`/results/${race.RID}/${race.BIB}`)}
                      key={race.RID+"idx"+idx}
                    >
                      <Td>{race.EL} <br/> {race.RDT} </Td>
                      <Td>  {race.RL}</Td>
                      <Td>{msToTime(race.CD)}</Td>
                      <Td>{race.RO}</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>

            <ins 
              className="adsbygoogle"
               style={{display:"block"}}
               data-ad-client="ca-pub-6314308690124297"
               data-ad-slot="8954336761"
               data-ad-format="auto"
               data-full-width-responsive="true"
               
            >
            </ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});    
           </script>


          </Stack> 
          <Stack 
            direction={{ base: 'column', sm: 'column' }}
            sx={{border:'10px solid green'}} 
            w='100%'
          >
            <Text mx='3' fontWeight='bold' fontSize='25'>Awards</Text>
          </Stack>
        </CardWithAvatar>
        

      </Flex>

    </Layout>
  )
}

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)

    return {
      paths: [],
      fallback: 'blocking',
    }
  
}

const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      followers{
        id
        count
        idList
      }
      info{
        givenName
        familyName
        profilePhoto
        visibility
        country
        city
        prov
        totalRace
        totalBadges
      }
    }
  }
`;
// This also gets called at build time
export async function getStaticProps({ params, locale }) {
  // params contains the series `slug`.
  // If the route is like /series/1, then params.slug is 1

  const { data } = await client.query({
      query: GET_USER,
      variables: {
        id: parseInt(params.ssuid)
      }
    });

  // Pass post data to the page via props
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation', 'member'], null, ['en', 'fr'])),
      revalidate: 1, // In seconds
      ssuid: parseInt(params.ssuid),
      data: data
    } 
  }
}

export default ResultPageInd


const claims =
  [
    {
      "EID": 4177,
      "EL": "Winterlude Triathlon",
      "RID": 17257,
      "RL": "Individual Results",
      "RDT": "2001-02-11",
      "RT": 10,
      "RD": 18000,
      "BIB": "153",
      "ANF": "MARC",
      "ANL": "ROY",
      "RO": 107,
      "AG": "M",
      "AC": "M30-39",
      "AL1": "Ottawa",
      "AL2": "ON",
      "AL3": "CAN",
      "CD": "4739000"
    },
    {
      "EID": 3656,
      "EL": "Belwood Triathlon & Duathlon",
      "RID": 14964,
      "RL": "Try a Tri Results",
      "RDT": "2001-08-04",
      "RT": 2,
      "RD": 13000,
      "BIB": "844",
      "ANF": "MARC",
      "ANL": "ROY",
      "RO": 3,
      "AG": "M",
      "AC": "M30-39",
      "AL1": "Ottawa",
      "AL2": "ON",
      "AL3": "CAN",
      "CD": "2230000"
    },
    {
      "EID": 948,
      "EL": "National Capital Triathlon, Duathlon & 8km Run",
      "RID": 2348,
      "RL": "1/2 Ironman Triathlon Results",
      "RDT": "2001-09-01",
      "RT": 2,
      "RD": 113100,
      "BIB": "321",
      "ANF": "MARC",
      "ANL": "ROY",
      "RO": 34,
      "AG": "M",
      "AC": "M30-34",
      "AL1": "Ottawa",
      "AL2": "ON",
      "AL3": "CAN",
      "CD": "19079000"
    },
  ]