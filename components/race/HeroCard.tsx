import React, {useState, useEffect} from "react"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

import { Flex, Box, Image, Button } from '@chakra-ui/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown  } from "@fortawesome/free-solid-svg-icons";

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));


function HeroCard({ race }) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  return (
     <Flex 
      flexWrap='wrap' mt='3' 
      className='card__base' 
      style={{borderRadius:'15px', border:'1px solid black', zIndex:'5'}} 
      w='100%'  justifyContent='center' alignItems='center' 
      h='fit-content'
    >
      <Flex w='100%' flexWrap='wrap' >
        
          <Flex  w={['100%','50%','33%','25%']} justifyContent='center' textAlign="center">
             <Link href={`/event/${race?.master?.slug}`} >
                  <Image
                    src={race?.info.img?`${race.info.img}`: race?.event?.eimg?race?.event?.eimg:'https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg'}
                    alt={race?.info.name}
                    width='auto'
                    height='250px'
                    my='2' ml='2'
                    objectFit='cover'
                    className="card__image" 
                    style={{borderRadius:'15px', border:'1px solid black'}}
                  />
            </Link>
          </Flex>

          <Flex flexWrap='wrap' w={['100%','50%','66%','75%']}  alignContent='center'  pl={['2','4']} >
            <Link href={`/event/${race?.master?.slug}`} >
              <Box
                mt='1' w='100%'
                fontWeight='semibold'
                as='h3'
                fontSize={['36px']}
                lineHeight='42px'
                noOfLines={2}
                mb='3'
              >
                {race?.event?.name}
              </Box>
            </Link>
            <Box
              mt='1' w='100%'
              fontWeight='semibold'
              as='h3'
              fontSize={['36px']}
              lineHeight='42px'
              noOfLines={2}
              mb='3'
            >
              {race?.master?.city}, {race?.master?.state} | {countries.getName(race?.master?.country, 'en', {select: "official"})}
            </Box>

            <Box 
              fontSize={['30px']}
              w='100%'
            > 
                <Button mr='4' variant='outline' colorScheme='gray' size='lg'> {race?.info?.name} <FontAwesomeIcon icon={faAngleDown} style={{marginLeft:'0.5rem'}} /> </Button>
              { new Date(
                race.info?.date?.slice(0,4), race.info?.date?.slice(5,7), race.info?.date?.slice(8,10)
                ).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' }
              )} 
            </Box>

            
          
          </Flex>
      </Flex>  
    </Flex>
  )
}


export default HeroCard
