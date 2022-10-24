import React, {useState, useEffect} from "react"
import { NextSeo } from 'next-seo';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Flex, Center, Box,InputGroup, InputLeftElement,  Input, Button } from '@chakra-ui/react';

import Layout from '../../../components/layout/Layout'

import Section from '../../../components/section';
import Triangle from '../../../components/triangle';

import { useLazyQuery, gql } from "@apollo/client";
import {client} from "../../../apollo/apollo-client";

import {slugSet } from "../../../utils/setSlug"



function SeriesPage({ result }) {
  const { t } = useTranslation('common');

  return (
    <Layout header_color='black' >
      <NextSeo
        title={`Home`}
      />
      <Section.Container id="series" Background={Background} >

        test

      </Section.Container>
    </Layout>
  )
}



// This also gets called at build time
export async function getStaticProps({ params, locale }) {
  // params contains the series `slug`.
  // If the route is like /series/1, then params.slug is 1

  const query = gql`
    query GetProfileResults($bib: String!, $raceid: String!) {
      result(bib: $bib, raceId: $raceid) {
        id
        bib
        status
        givenName
        familyName
        cat
        cRank
        gRank
        oRank
        gender
        officialTime : OT
        country
        user {
          id
          ssuid
          info {
            profilePhoto
          }
        }
        coldata{
          id: CID
          CID
          RC
          RG
          RO
          CD
          TOD
          ST
        }
      }
    }
  `;

  {/*const { data } = await client.query({
      query: query,
      variables: {
        bib: params.bib.toString(),
        raceid: params.raceid.toString()
      }
    });
*/}

  // Pass post data to the page via props
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      results: 'test',
      revalidate: 30, // In seconds
    } 
  }
}

export default SeriesPage


const Background = () => (
  <>
    <Triangle
      color="#f0e6f6"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />
   
      <Triangle
        color="#0CAA56"
        height={['38vh', '80vh']}
        width={['50vw', '30vw']}
      />

    <Triangle
      color="#000"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      position="top-right"
    />
    <Triangle
      color="#f0e6f6"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      position="bottom-right"
    />
  </>
);
