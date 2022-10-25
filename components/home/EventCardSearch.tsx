import React from "react"
import Link from 'next/link'

import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

import styled from 'styled-components';
import { Box, Flex, Text, Image, Heading } from '@chakra-ui/react'

import ReactCountryFlag from "react-country-flag"


import {slugSet } from "../../utils/setSlug"

const getCountryISO2 = require("country-iso-3-to-2");

import ss from '../../public/images/icons/white_sportstats.png'


const Card = ({e}) => {
  const {t} = useTranslation();
  const { locale } = useRouter();

  return (
      <EventCard w='100%' p={[1,2]}  >
              <Link
                  href={`/event/${slugSet(e.info.name).toLowerCase()}`}
                  style={{marginTop:'0'}}
                  legacyBehavior> 
                  <Flex>
                      <Flex flexWrap='wrap' flex='1 1 20%' style={{position:'relative'}} >
                          <Image 
                              height={[55,84]} width={[60,110]}  
                              src={e.info.imageUrl?e.info.imageUrl:'../../public/images/icons/white_sportstats.png'} 
                              onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src='https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg';
                  }}
                          />

                                <Box sx={{position:'absolute' ,right:'0', bottom:'10px'}}> 
                                              {e.info.country&&(
                                                  <ReactCountryFlag 
                                                      svg 
                                                      countryCode={getCountryISO2(e.info.country)}
                                                      title={e.country}

                                                      style={{marginBottom:'0',width:'1.5em', height:'1.5em'}}
                                                  /> 
                                              )}
                                          </Box>
                          
                          </Flex>

                      <Flex flexWrap='wrap' display='flex' flex='1 1 80%' pl='5' >
                          <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                        w='100%'
                      >
                          {e.info.name}
                         </Box> 
                          <Box> 
                                  { new Date(
                                      e.info.date.slice(0,4)+'/'+e.info.date.slice(4,6)+'/'+e.info.date.slice(6,8)
                                      ).toLocaleDateString(locale, { month: 'long', day: 'numeric' }
                                  )} {" "}
                                  {new Date(
                                      e.info.date.slice(0,4)+'/'+e.info.date.slice(4,6)+'/'+e.info.date.slice(6,8)
                                  ).toLocaleDateString(locale, {year: 'numeric'})} 
                          </Box>

                              <Box
                      color='gray.500'
                      fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='xs'
                      w='100%'
                      textTransform='uppercase'
                      ml='2'
                    >
                                  {e.info.city} | {e.info.country}
                          </Box>

                      </Flex>

                  </Flex>
              </Link>
          </EventCard>
  );
}

export const EventCard = styled(Box)`
	cursor: pointer;
	border-bottom: 1px dashed black !important;
`

export default Card
