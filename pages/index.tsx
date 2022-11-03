import { NextSeo } from 'next-seo';
import Link from 'next/link'
import Parser from "rss-parser";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Box, Flex, Image, Center, Show, Button, Container } from '@chakra-ui/react';

import { gql } from "@apollo/client";
import {client} from "../apollo/apollo-client";

import Layout from '../components/layout/Layout'

import Section from '../components/section';
import Triangle from '../components/triangle';

import SectionSlider from "../components/home/MainSection"; 
import Search from "../components/home/Search"; 

import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt} from "@fortawesome/free-solid-svg-icons";


import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper";

export default function Home({sportstats, irun, locale}) {
  const { t } = useTranslation('common');



  return (
    <Layout header_color='none'>
      <NextSeo
        title={`Home`}
      />
      <main style={{padding:'0'}} >
        
        <div 
          className='home_image'
          style={{
                  position:'relative',
                  display:'grid',
                  top:'0',
                  width: '100%',
                  maxHeight: '80vh',
                  minHeight: '450px',
                  overflow: 'hidden',
          }} 
        >
          
          <Show above='sm'>
            <video width="1414" autoPlay muted loop style={{display: 'block', height: '100%', width: '100vw', filter: 'grayscale(100%) brightness(80%) sepia(300%) hue-rotate(50deg) saturate(500%)'}} >
              <source src="https://d33vaoadodpfl.cloudfront.net/miami-cut.mp4" type="video/mp4"/>Please update your browser to support video
            </video>
          </Show>

          <Search />    
      
        </div>
          
        <Section.Container id="events" Background={Background} >
          <Box my='3'>
            <SectionSlider 
              data={sportstats?.recentEvents?.masterEvents}
              section={t('recent-results')}
              isLoadingSection={(sportstats?.recentEvents?.masterEvents)?false:true}
            />  
          </Box>
          <Box my='3'>
            <SectionSlider 
              data={sportstats?.upcomingEvents?.masterEvents}
              section={t('upcoming-event')}
              isLoadingSection={(sportstats?.upcomingEvents?.masterEvents)?false:true}
            /> 
          </Box> 

        </Section.Container>

        <Flex
          w='100%'
          flexWrap='wrap'
          pb='9'
          style={{
            backgroundImage:'url(https://cdn1.sportngin.com/attachments/photo/8e62-161281649/map_los_angeles_cropped_with_gradient.jpg)',
            backgroundSize:'cover'
          }}
          justifyContent='center'
        >
          <Box w='100%'> 
            <a target="_blank" href="https://www.irun.ca/">
              <Image
                src='https://irun.ca/wp-content/uploads/2017/06/logo_whiteOnRed_172x90.png'
                alt="iRun" title="iRun.CA Magazine"
                loading="lazy"
              />
            </a>
          </Box>
          <Center w='100%' color='white' fontWeight='semibold' as='h3' fontSize='48px'>{irun.description} </Center>
          <Box w={['100%', '75%']} className='container' justifyContent='center' >
            <Swiper
              modules={[Navigation, Pagination]}
   
              navigation
               slidesPerView={'auto'}
              spaceBetween={50}
               pagination={{
                clickable: true,
              }}
              
            >

            {irun?.items.slice(0, 6).map((item)=>
              <SwiperSlide 
                key={item.id} 
                className="card card_swipe"

              >
                          <a 
                            key={item.id}
                            className="card" 
                            href={item.link}
                            target="_blank"
                          >
                            <Box className="card__header" h={['100px','200px']}>
                              <LazyLoadImage 
                                src={item['content:encoded']?.match(/<img[^>]*\/?>/g)[0]?.split('src=')[1]?.replace(/"/g,'').split(/[ >]/)[0].replace(/"/g,'').split("?")[0].concat('?resize=640%2C350&ssl=1')}
                                alt="card__image" className="card__image" 
                                width='auto' height='200px'
                                loading="lazy"
                                effect="blur"
                              />
                            </Box>
                            <div className="card__body">
                              <Flex flexWrap='wrap'>
                                {item.categories?.slice(0,4).map((car)=>
                                  <span className="tag tag-blue" key={car}>{car}</span>
                                )}
                              </Flex>
                              <Box 
                                className='card__title'
                                noOfLines={2}
                                fontWeight='semibold'
                                as='h4'
                              >
                                {item.title}
                              </Box>
                              <Box 
                                className='card__content' style={{color:'black'}}
                                noOfLines={5}
                              >
                                {item.contentSnippet}
                              </Box>
                            </div>
                            <div className="card__footer">
                              <div className="user">
                                <div className="user__info" >
                                  <h5 style={{marginBottom:'0'}}>{item.creator}</h5>
                                  <small>{ new Date( item.isoDate).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' } )}</small>
                                </div>
                              </div>
                              
                            </div>
                          </a>
                </SwiperSlide>
              
              )}
            </Swiper>
          </Box>
        </Flex>

        <Flex
          w='100%'
         
          bg='black'
          flexWrap='wrap'
        >
          <Box w={['100%','50%']}>
            <Image
              src='https://cdn-1.sportstats.one/img/banners/true-north2.jpeg'
              alt='true north'
              loading="lazy"
            />
          </Box>
          <Box w={['100%','50%']}>
            <Container  flexWrap='wrap' color='white' py='6' centerContent h='100%' justifyContent='center' >
              <Box w='100%' py='4' justifyContent='center' textAlign='center'>
                <Image
                  src='https://cdn-1.sportstats.one/img/banners/true-north1.jpeg'
                  alt='true north medal'
                  loading="lazy"
                  height={200}
                  width={240}
                  display='inline-block'
                  style={{borderRadius:'15px'}}
                />
              </Box>
                <Box 
                  fontSize='22px'
                  mb='2'
                >
                  Nothing good ever remains stagnant; constantly evolving to be the best version of ourselves is in our very DNA. It is only fair that we developed a line of challenges, events, and products that meet the needs of you, the relentless athlete.  That's why we created True North Challenges.
                </Box>
                <a  href='https://truenorthchallenges.com/' target='_blank' > <Button mt='2' colorScheme='red' style={{border:'2px solid red'}} size='lg'>Learn More </Button> </a>
              
            </Container>
          </Box>
        </Flex>
        <Flex
          w='100%'
          height='40ch'
          style={{
            backgroundImage:'url(https://cdn1.sportngin.com/attachments/photo/af56-152517313/charlotte_map_gradient_large.jpg)',
            backgroundSize:'cover'
          }}
        >
        series llinks
        </Flex>
      </main>

    </Layout>
  );
}

export async function getStaticProps({locale}) {
    let parser = new Parser();
    let iRunFeed = await parser.parseURL("https://www.irun.ca/index.php/feed/");

    const { data } = await client.query({
      query: gql`
        query Countries {
          upcomingEvents {
            masterEvents {
              id
              mid
              slug
              info {
                id
                mid
                name
                date
                imageUrl
                country
                state
                city
              }
            }
          }
          recentEvents {
            masterEvents {
              id
              mid
              slug
              info {
                id
                mid
                name
                date
                imageUrl
                country
                city
              }
            }
          }
        }
      `,
    });

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
        sportstats: data,
        irun: iRunFeed
      },
   };
}

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
