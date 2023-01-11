// pages/account/index

// landing page of a users dashboard when they login

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
    Card, Avatar, SimpleGrid,
    Wrap, Tag,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import LayoutAccount from '../../components/account/Layout'

import ResultCard from '../../components/cards/ResultCardOverviewWithLink'
import ResultCardVR from '../../components/cards/ResultCardOverviewVR'

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

                <Stack spacing={{ base: '8', lg: '6' }} >
                  <Stack
                    spacing="4"
                    direction={{ base: 'column', lg: 'row' }}
                    justify="space-between"
                    align={{ base: 'start', lg: 'center' }}
                  >
                    <Stack spacing="1">
                      <Heading size={useBreakpointValue({ base: 'xs', lg: 'sm' })} fontWeight="medium">
                        My Events
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
                    <SimpleGrid px='3' py='5' columns={{ base: 1 }} spacing="7">
                      {claims.map((result)=>
                        result.RT === 10 ? <ResultCardVR result={result} />:<ResultCard result={result} />
                      )}
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
