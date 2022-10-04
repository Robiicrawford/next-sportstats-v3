import Head from 'next/head'
import Link from 'next/link'

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

import "swiper/css";
import "swiper/css/navigation";

import {slugSet } from "../../utils/setSlug"

function Master({ master }) {
  console.log(master)
  var title = `Sportstats - ${master?.info?.name}`
  console.log(title)
  return (
    <Layout header_color='black' >
      <Head>
        <title> {title} </title>
      </Head>

      <Section.Container id="series" Background={Background} >
        <Flex w='100%' flexWrap='wrap' px={['0','3','5']}>
          <HeroBanner data={master} setA={null} slug='test'/>

       
          <Flex flexWrap='wrap' className='card__base' w='100%' mt='4' pt={2} height='fit-content' bg='white' style={{borderRadius:'15px', border:'1px solid black'}} >
             
              <Box w='100%' py={[2,3]} px={[2,4]} >
                <Heading color='black' style={{borderBottom:'1px solid black'}}>{master?.events[0]?.name}</Heading>
              </Box>
             
              <Box w='100%' pt={[1,3]} px={[1,3]} mb={[2,4]} >
                {!master && <Text> ...LOADING... </Text>}
                <Text>
                  {master?.info.description}
                </Text>
              </Box>

              <Flex flexWrap='wrap' w='100%' px={[1,3]} pb={[2,3]}>
                <Heading w='100%'>Info</Heading>
                <Flex className="container" mx={[2,3,4]}>
                  {/*master?.eventv1?.links?.map((link, index)=> 
                    <EventLinkCard id={link.id} text={link} index={index} />
                  )*/}

                
                </Flex>
              </Flex>

          </Flex>

          {master?.sid &&
            <>
            

              <Box display='flex' w='100%' className='card__base' flexWrap='wrap'  sx={{borderRadius:'15px', flexDirection:'row'}} mt='4' >
                <Box
                  px='3'
                  as={Heading}
                >
                  Series Events
                </Box>
                <Link as='span' href={`/series/${master.series.slug}`}> view more </Link>
              </Box>

              <Flex flexWrap='wrap' w='100%' mt={[2,3]}  mb={[2,3,4]}>
                  {master?.series?.masterEvents &&
                      <Swiper
                        modules={[Navigation,Scrollbar]}
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
  // Call an external API endpoint to get posts
  const { data } = await client.query({
      query: gql`
        query Sportstats {
          masterEvents {
            masterEvents{
              id :mid
              slug
              info{
                name
                latestEventId
                date
              }
            }
          }
        }
      `,
    });

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
    fallback: true 
  }
}

// This also gets called at build time
export async function getStaticProps({ params, locale }) {
  // params contains the post `slug`.
  // If the route is like /posts/1, then params.slug is 1

  const query = gql`
    query Sportstats($slug: String!) {
      masterEvent(slug: $slug) {
            mid
            sid
            info{
              name
              description
              imageUrl
              country
            }
            events {
              id : eid
              eid
              date
              name
              city
            }
            series {
              id
              sid
              slug
              info {
                name
              }
             masterEvents {
                id: mid
                mid
                info {
                  name
                  date
                  imageUrl
                  country
                }
                events {
                  country
                  city
                }
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