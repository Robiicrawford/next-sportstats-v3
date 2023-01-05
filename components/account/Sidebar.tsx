import { Flex, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'

import { useAuth } from "../../hooks/use-auth";

import { useTranslation } from 'next-i18next';

import Link from 'next/link'

import { 
    Box,
    Heading, Container, Button, 
    HStack, VStack,
    Card, Avatar,
    Wrap,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';

import {
  FiSettings,
  FiCamera,
  FiHome,
  FiAward,
  FiUser,
  FiBarChart2
} from 'react-icons/fi'

import {GiFinishLine} from 'react-icons/gi'

import { NavButton } from './NavButton'

export const Sidebar = () => {
  const {t} = useTranslation('member');
  const auth = useAuth();

  return(
    <Flex
      flex="1"
      bg="ss_green"
      color="on-accent"
      overflowY="auto"
      maxW={{ base: 'full', sm: 'xs' }}
      py={{ base: '6', sm: '8' }}
      px={{ base: '4', sm: '6' }}
    >
      <Stack spacing="1" width="full">
          <Card p='3'bg="bg-canvas">
                  <Stack
                    direction={{ base: 'column' }}
                    spacing={{ base: '3', md: '10' }}
                    align="flex-start"
                  >
                    <Stack 
                      spacing="4"  
                      direction={{ base: 'column', md: 'row' }}
                      as={Link}
                      href={`/profile/${auth?.user?.attributes?.['custom:ssuid']}`}
                    >
                      <Avatar
                        size="md"
                        name={auth.user&& auth.user?.attributes?.given_name+" "+auth.user?.attributes?.family_name }
                        src={auth?.user?.attributes?.picture}
                      />
                       <Text as="h2" fontWeight="bold" fontSize="xl">
                          {auth.user&& auth.user?.attributes?.given_name+" "+auth.user?.attributes?.family_name }
                        </Text>
                    </Stack>
                    <Box >
                       <Wrap shouldWrapChildren  spacing="10">
                       
                        <VStack
                          as={Link}
                          href={`/account/friends`}
                        >
                           <Text fontSize="md" mb='0' >
                             {auth?.user?.data.followers.count}
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
                          as={Link}
                          href={`/account`}
                        >
                           <Text fontSize="ms" mb='0' >
                             {auth?.user?.data.info.totalRace}
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
                          as={Link}
                          href={`/account/awards`}
                        >
                           <Text fontSize="md" mb='0' >
                             {auth?.user?.data.info.totalBadges}
                           </Text>
                           <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color={useColorModeValue('gray.600', 'gray.300')}
                          >
                            {t('dashboard.awards')}
                          </Text>
                        </VStack>

                      </Wrap>
                     
                      
                    </Box>
                  </Stack>
                </Card>

        <Stack spacing="8" shouldWrapChildren>
          <Stack spacing="1">
            <NavButton label={t('dashboard.home')} link='/account' icon={FiHome} />
            <NavButton label={t('dashboard.settings')} icon={FiSettings} link='/account/settings' aria-current="page" />
          </Stack>
          <Stack>
            <Text fontSize="sm" color="on-accent-muted" fontWeight="medium">
              {t('dashboard.my-stuff')}
            </Text>
            <Stack spacing="1">
              <NavButton label={t('dashboard.awards')} link='/account/awards' icon={FiAward} />
              <NavButton label={t('dashboard.photos')} link='/account/photos' icon={FiCamera} />
              <NavButton label={t('dashboard.friends')} link='/account/friends' icon={FiUser} />
              <NavButton label={t('dashboard.my-stats')} link='/account/stats' icon={FiBarChart2} />
            </Stack>
          </Stack>
          {/*<Stack>
            <Text fontSize="sm" color="on-accent-muted" fontWeight="medium">
              Social
            </Text>
            <Stack spacing="1">
              <NavButton label="Twitter" icon={FiTwitter} />
              <NavButton label="Instagram" icon={FiInstagram} />
              <NavButton label="Linkedin" icon={FiLinkedin} />
            </Stack> 
          </Stack>*/}
        </Stack>
      </Stack>
    </Flex>
  )
}