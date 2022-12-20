import React, { useEffect } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { 
    Box, Flex,
    Heading, Container, Button, 
    Text, Stack, HStack, VStack,
    Card, Avatar,
    Wrap, Tag,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import LayoutAccount from '../../components/account/Layout'

import { useAuth, AuthCheck } from "../../hooks/use-auth";

export default function Settings({locale}) {
  const { t } = useTranslation('public');
  const router = useRouter()
  const auth = useAuth();

  const isDesktop = useBreakpointValue({ base: false, lg: true })

  return (
    <Layout >
      <NextSeo
        title={`Dashboard`}
        noindex={true}
      />
        <AuthCheck>
        <LayoutAccount>

                <Card p='3' mb='3'>
                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: '3', md: '10' }}
                    align="flex-start"
                  >
                    <Stack spacing="4">
                      <Avatar
                        size="2xl"
                        name={auth.user&& auth.user?.attributes?.given_name+" "+auth.user?.attributes?.family_name }
                        src={auth?.user?.attributes?.picture}
                      />
                    </Stack>
                    <Box>
                      <Stack spacing={{ base: '1', md: '2' }} direction={{ base: 'column', md: 'row' }}>
                        <Text as="h2" fontWeight="bold" fontSize="xl">
                          {auth.user&& auth.user?.attributes?.given_name+" "+auth.user?.attributes?.family_name }
                        </Text>
                        
                      </Stack>
                       <Wrap shouldWrapChildren my="4" spacing="10">
                       
                        <VStack>
                           <Text fontSize="3xl" mb='0' >0</Text>
                           <Text
                            fontSize="2xl"
                            fontWeight="medium"
                            color={useColorModeValue('gray.600', 'gray.300')}
                          >
                            Awards
                          </Text>
                        </VStack>

                        <VStack>
                           <Text fontSize="3xl" mb='0' >0</Text>
                           <Text
                            fontSize="2xl"
                            fontWeight="medium"
                            color={useColorModeValue('gray.600', 'gray.300')}
                          >
                            Races
                          </Text>
                        </VStack>

                        <VStack>
                           <Text fontSize="3xl" mb='0' >0</Text>
                           <Text
                            fontSize="2xl"
                            fontWeight="medium"
                            color={useColorModeValue('gray.600', 'gray.300')}
                          >
                            Followers
                          </Text>
                        </VStack>

                      </Wrap>
                     
                      <Wrap shouldWrapChildren mt="5" color={useColorModeValue('gray.600', 'gray.300')}>
                        {['Triathlon', 'Running'].map((tag) => (
                          <Tag key={tag} color="inherit" px="3">
                            {tag}
                          </Tag>
                        ))}
                      </Wrap>
                    </Box>
                  </Stack>
                </Card>

                <Stack 
                  spacing={{ base: '8', lg: '6' }} 
                 
                >
                  <Stack
                    spacing="4"
                    direction={{ base: 'column', lg: 'row' }}
                    justify="space-between"
                    align={{ base: 'start', lg: 'center' }}
                  >
                    <Stack spacing="1">
                      <Heading size={useBreakpointValue({ base: 'xs', lg: 'sm' })} fontWeight="medium">
                        Recent Events
                      </Heading>
                      <Text color="muted">All your events at a glance</Text>
                    </Stack>
                   
                  </Stack>
                  <Box 
                    bg="bg-surface" 
                    borderRadius="lg" 
                    borderWidth="1px" 
                    minH="300px" 
                  >
                      event cards here
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
        ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      },
   };
}

