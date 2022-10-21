import React, {useState, useEffect} from "react"
import { useRouter } from 'next/router'
import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Flex, Center, Box,InputGroup, InputLeftElement,  Input, Button } from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'

import Section from '../../components/section';
import Triangle from '../../components/triangle';

import HeroCard from '../../components/series/HeroCard'

import { useLazyQuery, gql } from "@apollo/client";
import {client} from "../../apollo/apollo-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'
import {slugSet } from "../../utils/setSlug"

import SectionSlider from "../../components/home/MainSection"; 

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

const GET_MASTEREVENT_SERIES = gql`
  query GetSeries($id: String, $page: Int, $limit: Int, $searchData: String) {
    series(id: $id, page: $page, limit: $limit, searchData: $searchData) {
        id
        sid
        slug
        pageInfo{
          currentPage
          hasNextPage
        }
        masterEvents {
          id
          mid
          slug
          info {
            id
            name
            date
            country
            state
            city
          }
        }
      }
  }
`;

function SeriesPage({ series }) {
  const router = useRouter()
  const { t } = useTranslation('common');
  const [events, setEvents] = useState(null)
  const [words, setWords] = useState('')

  const [getSeriesEvents, { loading, data: seriesSearchResult, refetch  }] = useLazyQuery(GET_MASTEREVENT_SERIES);

  const handleWord = (e)=>{
    var words_format = (e.target.value.length > 0 )?e.target.value.trim():null;
    setWords(words_format)
    if(seriesSearchResult){
      refetch({ id: series.sid.toString(), page: 0, limit: 15, searchData: words_format} )
    }else {
      getSeriesEvents({ variables: { id: series.sid.toString(), page: 0, limit: 15, searchData: words_format} })
    }
  }


  useEffect(()=>{
    if(seriesSearchResult ){
      if(seriesSearchResult.series.masterEvents.length === 0){
        setEvents([])
      } else {
        setEvents(seriesSearchResult.series.masterEvents)
      }
    }
  },[seriesSearchResult])

  useEffect(()=>{
    if(words === ''){
      setEvents(series?.masterEvents)
    }
  },[words])

  useEffect(()=>{
    if(!series){
      router.push('/404')
    }
  },[])

  if(!series){
    return <div> ... error on page ... </div>
  }

  return (
    <Layout header_color='black' >
      <Head>
        <title> {`Sportstats - ${series?.info?.name}`} </title>
      </Head>
      <Section.Container id="series" Background={Background} >

        <Flex w='100%' mt={['0','3']} px={['0','3','5']}>
          <Center w='100%' flexWrap='wrap'>
            <HeroCard data={series?.info}/>
            
            <Box
              w='100%' mt='4' px='2'
              sx={{border:'2px solid black', borderRadius:'15px'}}
              fontWeight='semibold'
              fontSize='large'
              as='h3'
              lineHeight='tight'
              bg='white'
            > 
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<FontAwesomeIcon icon={faSearch} color='gray.300' />}
                />
                <Input 
                  placeholder={t('common:search-event')}
                  value={words}
                  variant='flushed'
                  onChange={handleWord}
                />
                <Button onClick={()=>setWords('')}>Clear</Button>
              </InputGroup>
            </Box>

           <Box my='3' w='100%' >

              <SectionSlider 
                data={events}
                section={t('recent-results')}
                isLoadingSection={(events)?false:true}
              /> 

            </Box>

          </Center>
        </Flex>

      </Section.Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get all series
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

    const res = await fetch('https://admin.sportstats.ca/event_master/adminapi.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "cmd": "getSeries",
        "opt": "list", 
        'idToken': 'apS3gn4%nv^gjBEQF12!!b15'
      }) 
    });

  const series_list = await res.json()
  // Get the paths we want to pre-render based on series_list
  const paths = series_list.data.series.map((series) => ({
    
    params: { 
      slug: slugSet(series.sl)
    }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { 
    paths, 
    fallback: 'blocking'
  }
}

// This also gets called at build time
export async function getStaticProps({ params, locale }) {
  // params contains the series `slug`.
  // If the route is like /series/1, then params.slug is 1

  const query = gql`
    query Sportstats($slug: String!) {
      series(slug: $slug) {
        id
        sid
        slug
        info {
          name
          logo
          description
        }
        links {
          id: lid
          lt
          lo
          ll
          lu
        }
        masterEvents {
          id
          mid
          info {
            name
            date
            imageUrl
            country
            city
          }
          events {
            id
            eid
          }
        }
      }
    }
  `;

  const { data } = await client.query({
      query: query,
      variables: {
        slug: params.slug
      }
    });

  // Pass post data to the page via props
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      series: data.series
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
