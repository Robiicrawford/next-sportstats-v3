import React, { useEffect } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { 
    Box, Flex, Text,
    Heading, Stack, SimpleGrid,
    Card, Button, Avatar,
    Select, Input, InputGroup, InputLeftElement,
    Tab, TabList, Tabs,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import LayoutAccount from '../../components/account/Layout'

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


export default function Settings({locale}) {
  const { t } = useTranslation('public');
  const auth = useAuth();

  const { loading, error, data } = useQuery(GET_TIMELINE, {variables: { id: parseInt(auth?.user?.attributes?.['custom:ssuid']) }, });

  console.log(data)
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
                  <Tab>{t('member:dashboard.friends')}</Tab>
                  <Tab>{t('member:dashboard.followers')}</Tab>
                  <Tab>{t('member:dashboard.find-friends')}</Tab>
                  <Tab>{t('member:dashboard.requests')}</Tab>
                </TabList>
              </Tabs>

              <Box px='3' py='4'>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<HiSearch color='gray.300' />}
                  />
                  <Input placeholder='Search Friends  ' />
                </InputGroup>
              </Box>
              
              <SimpleGrid px='3' py='5' columns={{ base: 1, md: 3 }} spacing="7">
                {data?.user?.following.userList.map((user)=> (
                  <Flex
                    direction="column"
                    alignItems="center"
                    rounded="md"
                    padding="8"
                    position="relative"
                    bg={useColorModeValue('white', 'gray.700')}
                    shadow={{ md: 'base' }}
                    key={user.id}
                  >
                    <Box position="absolute" inset="0" height="20" bg="green.600" roundedTop="inherit" />
                    <Avatar size="xl" name={user?.familyName+" "+user?.givenName} src={user.profilePhoto} />
                    <Text pb='3' fontWeight="bold">{user?.familyName} {user?.givenName}</Text>
                    <Button as={Link} href={`/profile/${user.id}`} variant="outline" colorScheme="blue" rounded="full" size="sm" width="full">
                      View Profile
                    </Button>
                  </Flex>
                ))}
              </SimpleGrid>
              
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

