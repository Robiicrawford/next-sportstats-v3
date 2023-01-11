///login landing page

import { NextSeo, OrganizationJsonLd } from 'next-seo';
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { 
	Avatar, Box, Center, Flex, Container,
	DarkMode, Heading, Icon, Stack, Text, 
	VStack, HStack , AvatarGroup, Image,
	useBreakpointValue, 
	useColorModeValue as mode 
} from '@chakra-ui/react'

import LoginContent from '../components/auth/LoginContent'

import Layout from '../components/layout/Layout'


export default function Home({sportstats, irun, locale}) {
  const { t } = useTranslation('common');

  

  return (
    <Layout >
      <NextSeo
        title={`Log In`}
      />
      
      <Flex
		    minH={{ base: 'auto', md: '100vh' }}
		    width="full"
		    bgGradient={useBreakpointValue({
		      md: mode(
		        'linear(to-r, ss_green 50%, white 50%)',
		        'linear(to-r, ss_green 50%, gray.900 50%)',
		      ),
		    })}
		  >
		    <Flex maxW="8xl" mx="auto" width="full">
		      <Box flex="1" display={{ base: 'none', md: 'block' }}>
		        <DarkMode>
		          <Flex direction="column" px={{ base: '4', md: '8' }} height="full" color="on-accent">
		           
		            <Flex flex="1" align="center">
		              <Stack spacing="8">
		                <Stack spacing="6">
		                  <Heading size={useBreakpointValue({ md: 'lg', xl: 'xl' })}>
		                    Start making your race come to life
		                  </Heading>
		                  <Text fontSize="lg" maxW="md" fontWeight="medium">
		                    Create an account and discover the worlds's best timing company.
		                  </Text>
		                </Stack>
		                <HStack spacing="4">
		                  <AvatarGroup
		                    size="md"
		                    max={useBreakpointValue({ base: 2, lg: 5 })}
		                    borderColor="on-accent"
		                  >
		                    <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
		                    <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
		                    <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
		                    <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
		                    <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
		                  </AvatarGroup>
		                  <Text fontWeight="medium">Join 100.000+ users</Text>
		                </HStack>
		              </Stack>
		            </Flex>
		            <Flex align="center" h="24">
		              <Text color="on-accent-subtle" fontSize="sm">
		                © 2022 Sportstats. All rights reserved.
		              </Text>
		            </Flex>
		          </Flex>
		        </DarkMode>
		      </Box>
		      <Center flex="1">
		      	<Container
					      maxW="md"
					      
					      bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
					      boxShadow={{ base: 'none', sm: mode('md', 'md-dark') }}
					      borderRadius={{ base: 'none', sm: 'xl' }}
					    >
			        <LoginContent
			          px={{ base: '4', md: '8' }}
			          py={{ base: '12', md: '48' }}
			          width="full"
			          maxW="md"
			        />
			       </Container>
		      </Center>
		    </Flex>
		  </Flex>

   
    </Layout>
  );
}

export async function getStaticProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      },
   };
}

