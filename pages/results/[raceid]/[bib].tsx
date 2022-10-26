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

  console.log(result)
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



export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)

 
    return {
      paths: [],
      fallback: 'blocking',
    }
  
}

// This also gets called at build time
export async function getStaticProps({ params, locale }) {
  // params contains the series `slug`.
  // If the route is like /series/1, then params.slug is 1

  const query = gql`
    query GetProfileResults($bib: String!, $rid: Int!) {
      result(bib: $bib, rid: $rid) {
        id
        rid
        bib
        name
        givenName
        familyName
        country
        state
        city
        oRank
        gRank
        cRank
        cat
        gender
        status
        OT
        user{
          id
          ssuid
        }
      }
    }
  `;

  const { data } = await client.query({
      query: query,
      variables: {
        bib: params.bib.toString(),
        rid: parseInt(params.raceid)
      }
    });

  console.log(data)
  // Pass post data to the page via props
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      result: data.result,
      revalidate: 160, // In seconds
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
