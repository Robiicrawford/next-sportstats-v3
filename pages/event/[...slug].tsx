import React, {useState, useEffect} from "react"

import Head from 'next/head'
import Link from 'next/link'

import styled from 'styled-components';

import Layout from '../../components/layout/Layout'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { gql } from "@apollo/client";
import {client} from "../../apollo/apollo-client";

import { Flex, Box, Heading, Text } from '@chakra-ui/react';

import Section from '../../components/section';
import Triangle from '../../components/triangle';

import HeroBanner from "../../components/event/HeroBanner"

import { Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "../../components/home/EventCard"
import EventLinkCard from "../../components/event/EventLinkCard"
import ResultSection from "../../components/event/ResultSection"

import md from 'markdown-it';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {slugSet } from "../../utils/setSlug"

// import required modules
import { Pagination } from "swiper";

function Master({ master }) {
  console.log(master)
  const [links, setLinks ] = useState(null)

  var title = `Sportstats - ${master?.info?.name}`
  
  useEffect(()=>{
    if(master?.lastEvent && master?.lastEvent?.links){
      setLinks(master.lastEvent.links)
    }
  },[master])

  console.log(links)

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <Layout header_color='black' >
      <Head>
        <title> {title} </title>
      </Head>
        <Flex 
          w='100%'
          style={{
            position:'relative',
            display:'grid',
            top:'0',
            width: '100%',
            maxHeight: '50vh',
            minHeight: '450px',
            overflow: 'hidden',
            backgroundImage: `url('${master?.info?.mcimg? `https://cdn-1.sportstats.one/img/master_cover/${master?.mid}_${master?.info?.mcimg}.png`: 'https://cdn-1.sportstats.one/img/master_cover/sportstats_paper_full.jpg'}')`,
            backgroundSize: 'cover',
            backgroundPosition:'center'
          }}
          justifyContent='center'
          pt={['20px']}
        >
          <Heading fontSize={['54px','72px']}>{master?.info.name}</Heading>
        </Flex>
      
      <Section.Container id="series" Background={Background} >

        <Flex  w='100%' flexWrap='wrap' px={['0','3','5']} mt='-150px'>
          <HeroBanner data={master}  setA={null} slug='test'/>  
       
          <Flex as="a" id="info" flexWrap='wrap' className='card__base' w='100%' mt='4' pt={2} height='fit-content' bg='white' style={{borderRadius:'15px', border:'1px solid black'}} >
             
              <Box w='100%' py={[2,3]} px={[2,4]} >
                <Heading color='black' style={{borderBottom:'1px solid black'}}>{master?.info?.name}</Heading>
              </Box>
             
              <Box w='100%' pt={[1,3]} px={[1,3]} mb={[2,4]} >
                {!master && <Text> ...LOADING... </Text>}
                {master?.info.description&&
                  <Flex
                    w='92%'
                    ml={['3','5']}
                    mt='4'
                    justifyContent='center'
                  >
                    <Description style={{textAlign:'center'}} dangerouslySetInnerHTML={{ __html: md().render(master?.info.description) }} />
                  </Flex>
                }
             
              </Box>
              {links && links.length> 0 &&
                <Flex flexWrap='wrap' w='100%' px={[1,3]} pb={[2,3]}>
                  <Heading w='100%'>Info</Heading>
                  <Flex className="container" mx={[2,3,4]}>
                    {links && links?.map((link, index)=> 
                      <EventLinkCard key={link.id} id={link.id} text={link} index={index} />
                    )}
                  </Flex>
                </Flex>
              }

          </Flex>

          <Flex as="a" id="results" w='100%' flexWrap='wrap' >
            <ResultSection data={master.lastEvent} />
          </Flex>

          {master?.sid > 0 &&
            <>

              <Box display='flex' w='100%' className='card__base' flexWrap='wrap'  sx={{borderRadius:'15px', flexDirection:'row'}} mt='4' >
                <Box
                  px='3'
                  as={Heading}
                >
                  Series Events
                </Box>
                <Link href={`/series/${master.series.slug}`}> view more </Link>
              </Box>

              <Flex flexWrap='wrap' w='100%' mt={[2,3]}  mb={[3,4,8]}>
                  {master?.series?.masterEvents &&
                      <Swiper
                        modules={[Navigation,Scrollbar,Pagination]}
                        navigation
                        slidesPerView='auto'
                       slidesPerGroupAuto
                        spaceBetween={30}
                      >

                       {master?.series.masterEvents.map((event)=>
                          <SwiperSlide key={event.id} className="card card_swipe">
                            <Card key={event.id+'mastercard-results'} e={event}  />
                          </SwiperSlide>
                        )}

                       </Swiper>
                     }
              </Flex>
            </>
          }
        </Flex>
      </Section.Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)

  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  // Call an external API endpoint to get posts
  const { data } = await client.query({
      query: gql`
        query Sportstats {
          masterEvents {
            masterEvents{
              id
              mid
              slug
            }
          }
        }
      `,
    });
console.log(data.masterEvents.masterEvents)
  // Get the paths we want to pre-render based on posts
  const paths = data.masterEvents.masterEvents.map((master) => ({
    
    params: { 
      slug: [slugSet(master.info.name.toString())]
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
  // params contains the post `slug`.
  // If the route is like /posts/1, then params.slug is 1

  const query = gql`
    query Sportstats($slug: String!) {
      masterEvent(slug: $slug) {
        id
        mid
        sid
        info{
          id
          name
          description
          country
          state
          city
          mlimg
          mcimg
        }
        events {
          id
          eid
          start_date
          name
        }
        lastEvent{
          id
          eid
          info{
            name
            start_date
          }
          races{
            id
            rid
            name
            status
            date
          }
          links{
            id:lid
            lt
            la
            lu
            ll
            lo
          }
        }
      }
    }
  `;

  const { data } = await client.query({
      query: query,
      variables: {
        slug: params.slug[0]
      }
    });

  console.log(data)
  // Pass post data to the page via props
  return { 
    props: { 
    ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
    master: data.masterEvent
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 120, // In seconds
  }
}

export default Master

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

const Description = styled.div`
  width: 75%;
  h2 {
    font-size: 36px;
    line-height: 1.156;
    font-weight: 600;
    text-transform: none;
    margin-bottom: 20px;
    color: #000000;
  }
  p {
    font-size: 16px;
    line-height: 1.5;
  }
`;