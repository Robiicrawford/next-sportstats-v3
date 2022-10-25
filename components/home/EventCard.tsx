import React from "react"
import NextLink from 'next/link'
import { useRouter } from "next/router";

import styled from 'styled-components';
import { Box, Flex, Text, Heading, Center,
	LinkBox, LinkOverlay
 } from '@chakra-ui/react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt} from "@fortawesome/free-solid-svg-icons";

import {slugSet } from "../../utils/setSlug"

import { LazyLoadImage } from "react-lazy-load-image-component";

const getCountryISO2 = require("country-iso-3-to-2");

const Card = ({e}) => {
	const { locale } = useRouter();

  const handleOnClick = (event) => {
  	event.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: `${e.info.name} | ${'Sportstats'}`,
          text: `Check out results from ${e.info.name}  on Sportstats`,
          url: document.location.href+`event/${slugSet(e.info.name).toLowerCase()}-results`,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch(error => {
          console.error('Something went wrong sharing the blog', error);
        });
    } else{
      console.log('share not supported')
    }
  };

  return (
      <EventCard flexWrap='wrap' className="card" as='article'>
       <Flex 
           flexWrap='wrap' px={[1,2,3]}  
           maxWidth={'100%'} mx={[3]} pb='3' 
           style={{cursor:'pointer'}}
       >
               
                   <Flex flexWrap='wrap' color='black' >
                           <Center  w='100%' height={['100px','150px']} pt='2' >
                               <LazyLoadImage 
                                   width='auto' height='100%'
                                   src={e.info?.imageUrl?e.info.imageUrl:'https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg'} 
                                   alt={e.info?.name}
                                   onError={({ currentTarget }) => {
                     currentTarget.onerror = null; // prevents looping
                     currentTarget.src='https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg';
                   }}
                                   loading="lazy"
                                   className="card__image"
                       effect="blur"
                               />
                      </Center>
                      <Box w='100%'>
                           <Text > 
                               { new Date(
                                   e.info?.date?.slice(0,4)+'/'+e.info?.date?.slice(4,6)+'/'+e.info?.date?.slice(6,8)
                                   ).toLocaleDateString(locale, { month: 'long', day: 'numeric' }
                               )} {" "}
                               {new Date(
                                   e.info?.date?.slice(0,4)+'/'+e.info?.date?.slice(4,6)+'/'+e.info?.date?.slice(6,8)
                               ).toLocaleDateString(locale, {year: 'numeric'})} 
                           </Text>
                           <Box  w='20%' h='1' bg='#0CAA56' />
                       </Box>
                       <NextLink
                           style={{maxWidth:'100%'}}
                           href={`/event/${e.slug}`}
                           passHref
                           legacyBehavior> 
                           <LinkOverlay
                               w='100%'
                         mt='1'
                         fontWeight='semibold'
                         as='h4'
                         lineHeight='tight'
                         noOfLines={1}
                         sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                       >
                                   {e.info?.name}
                           </LinkOverlay>
                         </NextLink>
                       <Box
                     mt='1'
                     fontWeight='semibold'
                     as='h5'
                     lineHeight='tight'
                     noOfLines={1}
                       sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                           
                   >
                               {e.info?.city}, {e.info?.state} | {e.info?.country}

                               <Box sx={{position:'absolute', right:'5px', bottom:'5px'}} className='shareButton'  onClick={handleOnClick} >
                         <FontAwesomeIcon icon={faShareAlt} size="lg" />
                       </Box>

                       </Box>

                   </Flex>
           </Flex>
       </EventCard>
  );
}

export const EventCard = styled(LinkBox)`
	max-width: 100%;
	transform: scale(1);
	cursor: pointer;
	border-radius: 10px;
	width: clamp(20rem, calc(20rem + 2vw), 20rem);
	transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s !important;
	.card__event {
		  display: flex;
		  flex-direction: column;
		 width: clamp(19rem, calc(19rem + 2vw), 19rem);
		  overflow: hidden;
		  box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
		  border-radius: 1em;
		  background: #ECE9E6;
		  background: linear-gradient(to right, #FFFFFF, #ECE9E6);
		  text-decoration:  none;
		  color: black;
	}
	@media only screen and (max-width: 480px) {
  	width: 100% !important;
	}
`

export default Card
