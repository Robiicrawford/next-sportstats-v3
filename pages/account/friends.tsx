import React, { useEffect } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useQuery, useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { 
    Box, Flex, Text, Center,
    Heading, Stack, SimpleGrid,
    Card, ButtonGroup, Button, Avatar, Spinner,
    Select, Input, InputGroup, InputLeftElement,
    Tab, TabList, Tabs,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import LayoutAccount from '../../components/account/Layout'

import ProfileCard from '../../components/cards/ProfileCardViewLinkOnly'
import RequestCard from '../../components/cards/ProfileCardRequest'


import { HiSearch } from 'react-icons/hi'

import { useAuth, AuthCheck } from "../../hooks/use-auth";

const GET_TIMELINE = gql`
  query GetActivities($id: Int!) {
    user(id: $id) {
      id
      following {
        id
        userList {
          id
          givenName
          familyName
          profilePhoto
        }
      }
      followers {
        id
        requestUser {
          id
          familyName
          givenName
          profilePhoto
        }
        userList{
          id
          familyName
          givenName
          profilePhoto
        }
      }
    }
  }
`;

const SEARCH_MEMBERS = gql`
  query SearchMembers($searchData: String!, $page: Int!) {
    allMembers(searchData: $searchData, page: $page) {
      pageInfo {
        currentPage
        hasNextPage
      }
      users {
        id
        givenName
        profilePhoto
        familyName
      }
    }
  }
`;


export default function Settings({locale}) {
  const { t } = useTranslation('public');
  const auth = useAuth();

  const [view, setView] = React.useState('friends')
  const [input, setInput] = React.useState('')
  const [page, setPage] = React.useState({number:0, hasNext:false})

  const [displayData, setData] = React.useState([])

  const { loading, error, data, refetch } = useQuery(GET_TIMELINE, 
    {variables: { 
      id: parseInt(auth?.user?.attributes?.['custom:ssuid']) 
    },}
  );

  const [ getSearchData, { data: findUserData, called, fetchMore } ] = useLazyQuery(SEARCH_MEMBERS);

  // function to update the view and fetch data for the view
  const handleTabClick = (e) => {
    setView(e)
    setPage({number:0, hasNext:false})
    setInput('')
  }

  useEffect(()=>{
    if(!loading){
      if(view === 'find'){
        if (input.length >= 2 ) { 
          if (!called) {
            getSearchData({variables: {searchData:input, page:page.number }})
          } else{
            fetchMore({variables: {searchData:input, page:page.number }})
          }
        }
      }
    }
  },[view, input, page.number])

  useEffect(()=>{
    if(!loading){
      if(view === 'find' && findUserData?.allMembers?.users?.length > 8){
        setPage({...page, hasNext:true})
      } else if ( view === 'friends' && data?.user?.following.userList?.slice(page.number,page.number===0 ? 8 :page.number*8).length > 8) {
        setPage({...page, hasNext:true})
      } else if ( view === 'followers' && data?.user?.followers.userList?.slice(page.number,page.number===0 ? 8 :page.number*8).length > 8) {
        setPage({...page, hasNext:true})
      } else if ( view === 'requests' && data?.user?.followers.requestUser?.slice(page.number,page.number===0 ? 8 :page.number*8).length > 8) {
        setPage({...page, hasNext:true})
      }
    }
  },[findUserData, data])

  return (
    <Layout >
      <NextSeo
        title={`Dashboard`}
        noindex={true}
      />
        <AuthCheck>
        <LayoutAccount>
          <Stack spacing={{ base: '8', lg: '6' }} >
            <Stack
              spacing="4"
              direction={{ base: 'column', lg: 'row' }}
              justify="space-between"
              align={{ base: 'start', lg: 'center' }}
            >
              <Stack spacing="1">
                <Heading size={useBreakpointValue({ base: 'xs', lg: 'md' })} fontWeight="medium">
                  My Friends
                </Heading>
              </Stack>
                   
            </Stack>
            <Box 
              bg="bg-surface" 
              borderRadius="lg" 
              borderWidth="1px" 
              minH="300px" 
            >
              <Tabs variant="with-line" size='lg' mt='3' px='2'>
                <TabList>
                  <Tab onClick={()=>handleTabClick('friends')}>{t('member:dashboard.friends')}</Tab>
                  <Tab onClick={()=>handleTabClick('followers')}>{t('member:dashboard.followers')}</Tab>
                  <Tab onClick={()=>handleTabClick('find')}>{t('member:dashboard.find-friends')}</Tab>
                  <Tab onClick={()=>handleTabClick('requests')}>{t('member:dashboard.requests')}</Tab>
                </TabList>
              </Tabs>

              <Box px='3' py='4'>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<HiSearch color='gray.300' />}
                  />
                  <Input 
                    placeholder='Search Friends' 
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                  />
                </InputGroup>
              </Box>
                
              {loading && 
                <Center py='3'>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='2xl'
                  />
                </Center>
              }

              <SimpleGrid px='3' py='5' columns={{ base: 1, md: 4 }} spacing="7">
                {view === 'friends' && data?.user?.following.userList?.slice(page.number,page.number===0 ? 8 :page.number*8).map((user)=> (
                  <ProfileCard key={user.id} user={user} />
                ))}

                {view === 'followers' && data?.user?.followers.userList?.slice(page.number,page.number===0 ? 8 :page.number*8).map((user)=> (
                  <ProfileCard key={user.id} user={user} />
                ))}

                {input.length > 2 && view === 'find' && findUserData?.allMembers?.users?.slice(0 , 8).map((user)=> (
                  <ProfileCard key={user.id} user={user} />
                ))}


                {view === 'requests'  &&
                  data?.user?.followers.requestUser.length === 0 
                  ? <Text fontSize='2xl'> no requests </Text>
                  : data?.user?.followers.requestUser?.slice(page.number,page.number===0 ? 8 :page.number*8).map((user)=> (
                    <RequestCard key={user.id} user={user} />
                  ))
                }
              </SimpleGrid>

                <Center>
                  <ButtonGroup p='3' spacing='6' >
                    <Button onClick={()=>setPage({number:page.number-1, hasNext:false})} isDisabled={page.number===0?true:false} > Back </Button>
                    <Button onClick={()=>setPage({number:page.number+1, hasNext:false})} isDisabled={page.hasNext === true?false:true} > Next </Button>
                  </ButtonGroup>
                </Center>
        

            </Box>
          </Stack>
        </LayoutAccount>
      </AuthCheck>
    </Layout>
  );
}


export async function getStaticProps({locale}) {
    return {
      props: {
        isPassedToWithAuthenticator: true,
        ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation', 'member'], null, ['en', 'fr'])),
      },
   };
}

