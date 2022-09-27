import React from "react"


import styled from 'styled-components';
import { Box, Flex, Text, Heading, Center } from '@chakra-ui/react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt} from "@fortawesome/free-solid-svg-icons";


import {slugSet } from "../../utils/setSlug"

import Link from 'next/link'

import ss from '../../public/images/icons/white_sportstats.png'

import { LazyLoadImage } from "react-lazy-load-image-component";

const getCountryISO2 = require("country-iso-3-to-2");

const Card = ({e}) => {

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
   <EventCard flexWrap='wrap' className="card" >
   	<Flex flexWrap='wrap' px={[1,2,3]}  maxWidth={'100%'} mx={[3]} pb='3' >
			<Link style={{maxWidth:'100%'}} href={`/event/${slugSet(e.info?.name).toLowerCase()}-results`} > 
				<Flex flexWrap='wrap' color='black' >
						<Center  w='100%' height={['100px','150px']} >
							<LazyLoadImage 
								width='auto' height='100%' maxHeight={['100px','150px']}  
								src={e.info?.imageUrl?e.info.imageUrl:ss} 
								alt={e.info?.name}
								loading="lazy"
								className="card__image"
          			effect="blur"
								
							/>
				   </Center>
				   <Box w='100%'>
				    	<Text > 
				    		{ new Date(
				    			e.info?.date.slice(0,4)+'/'+e.info?.date.slice(4,6)+'/'+e.info?.date.slice(6,8)
				    			).toLocaleDateString('en-CA', { month: 'long', day: 'numeric' }
				    		)} {" "}
				    		{new Date(
				    			e.info?.date.slice(0,4)+'/'+e.info?.date.slice(4,6)+'/'+e.info?.date.slice(6,8)
				    		).toLocaleDateString('en-CA', {year: 'numeric'})} 
				    	</Text>
				    	<Box  w='20%' h='1' bg='#0CAA56' />
				    </Box>
				    <Box w='100%'>
				    
				    		{e.info?.name}
				    </Box>
				    <Flex flexWrap='wrap' w='100%' > 
				    	
				    	<Text 
				    		w={'100%'}
				    		sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
				    		color='black'
				    	> 
				    		{e.events[0]?.city} | {e.events[0]?.country}

				    		<Box sx={{position:'absolute', right:'5px', bottom:'5px'}} className='shareButton'  onClick={handleOnClick} >
		              <FontAwesomeIcon icon={faShareAlt} size="lg" />
		            </Box>

				    	</Text>
				    </Flex>

				</Flex>
			</Link>
		</Flex>
	</EventCard>
  )
}

export const EventCard = styled(Flex)`
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
