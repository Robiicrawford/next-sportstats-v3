import React, { useEffect } from "react";
import { NextSeo } from 'next-seo';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next';

import { 
    Box, Flex, Image, Center, 
    Heading, Container, Button, 
    Text, Stack, HStack, VStack,
    Card, Avatar, Icon,
    Wrap, Tag,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';

import { FiDownloadCloud } from 'react-icons/fi'
import { Navbar } from '../../components/account/Navbar'
import { Sidebar } from '../../components/account/Sidebar'

import { useAuth, AuthCheck } from "../../hooks/use-auth";

export default function Settings({children}) {
  const { t } = useTranslation('public');
  const router = useRouter()
  const auth = useAuth();

  const isDesktop = useBreakpointValue({ base: false, lg: true })

  return (

        <Flex
          as="section" w='100%'
          direction={{ base: 'column', lg: 'row' }}
          height="100vh"
          bg="bg-canvas" 
          overflowY="auto"
        >
          {isDesktop ? <Sidebar /> : <Navbar />}
          <Box bg="ss_green" pt={{ base: '0', lg: '3' }} flex="1">
            <Box 
              bg="bg-canvas" 
              borderTopLeftRadius={{ base: 'none', lg: '2rem' }} 
              height="full"
            >
              <Container py="8" height="full">
                {children}
              </Container>
            </Box>
          </Box>
        </Flex>
 
  );
}

