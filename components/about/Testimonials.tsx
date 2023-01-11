//about  Testimonials section

import React, {useState, useEffect} from "react"

import { useTranslation } from 'next-i18next';

import { Flex, Box, SimpleGrid, Container, Center, Text, Heading, Image, Avatar, Stack } from '@chakra-ui/react';

import { Icon, Card, CardFooter, IconButton } from '@chakra-ui/react'

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Navigation } from "swiper";

const Testimonials = () => {

  const {t} = useTranslation('public');

  const [thumbsSwiper, setThumbsSwiper] = useState(0);
  const defaultTestimonials = [
    {
      imageSrc:
        "https://www.stjude.org/get-involved/fitness-fundraisers/memphis-marathon/register/_jcr_content/image.img.800.high.jpg/1663968112974.jpg",
      profileImageSrc:
        "https://images.squarespace-cdn.com/content/v1/56c0b287859fd03b65eb5e8a/1465910308895-6E1CO3NWSCY9SJRGS3A9/St._Judes_Logo_child_only.jpg",
      quote:
        "Sportstats is one of the central reasons our event provides a successful participant experience. They provide so much more than just timing services; they have a friendly, helpful attitude and always give positive responses to our many requests of them. Sportstats brings over 30 years of experience helping us run a successful event year after year!",
      customerName: "Jayla Hubbard",
      customerTitle: "Specialist – Fitness – Registration & Logistics ALSAC – The fundraising and awarenes"
    },
    {
      imageSrc:
        "https://wabano.com/wp-content/uploads/2022/04/iStock-459240817-1-scaled.jpg",
      profileImageSrc:
        "https://www.runottawa.ca/wp-content/uploads/2016/04/Run_Ottawa_EN_Reversed.jpg",
      quote:
        "We are so pleased to have Sportstats as our timing partner.  Great timing is an art form that should be a seamless piece of our participant's event experience.  Knowing that the team from Sportstats is onsite, ontime and ready to go makes all of us at Run Ottawa breathe a little easier on race day.  One less thing to think about or worry about!",
      customerName: "Ian Fraser",
      customerTitle: "Race Director, Run Ottawa"
    }
  ];


  return (
   <Flex
      w='100%' h='100%' py='4' justifyContent='center'
     position='relative'  mb='6' 
   >  
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" >
      <Container flexWrap='wrap' h='fit-content'  m='auto' maxW='2xl'>
        <Text color='ss_green' fontSize='lg' fontWeight='bold' w='100%'> Testimonials </Text>
        <Heading mb='3' > Our Clients <Text sx={{display:'inline'}} color='ss_green'> Love Us. </Text> </Heading>
        <Text fontWeight='500'> Here are what some of our amazing customers are saying about our timing professionals. </Text>
      	
      	<Box mt='8'>
      		<Swiper
      			loop={true}
      			onSlideChange={(e)=>setThumbsSwiper(e.realIndex)}
               slidesPerView={1}
               modules={[Navigation]}
               navigation={{
			      nextEl: '.review-swiper-button-next',
			      prevEl: '.review-swiper-button-prev',
			    }}
            >
				{defaultTestimonials.map((user) => 
					<SwiperSlide
						key={user.customerName}
					>
			              <Flex
			                
			                direction="column"
			                alignItems="center"
			                rounded="md"
			                padding="8"
			                position="relative"
			              >
			              	<Text py='3' fontSize='2xl'> 
			              		<Icon viewBox="0 0 24 24" mt="-3">  
			              			<path fill="#0CAA56" d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
			              		</Icon>
			              		{user.quote} 
			              		<Icon viewBox="0 0 24 24" mt="-3">  
			              			<path fill="#0CAA56" d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 013.5-3.5c1.073 0 2.099.49 2.748 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C4.591 12.322 3.17 10.841 3.17 9a3.5 3.5 0 013.5-3.5c1.073 0 2.099.49 2.748 1.179z"/>
			              		</Icon>
			              	</Text>
			              	<Stack
						        direction={{ base: 'column', md: 'row' }}
						        spacing={{ base: '3', md: '10' }} w='100%'
						        align="flex-start"
						      >
				                 <Avatar 
				                  size="xl" mb='2'
				                  bg='none' color='black' 
				                  src={user.profileImageSrc}
				                />
				                <Stack
							        direction={{ base: 'column', md: 'column' }}
							        spacing={{ base: '2', md: '2' }} w='100%'
							        align="flex-start"
							     >
					                <Text color='ss_green' w='100%' fontWeight='bold' fontSize='2xl'> {user.customerName} </Text>
					                <Text > {user.customerTitle} </Text>
					            </Stack>
				            </Stack>
			                
			              </Flex>
			    	</SwiperSlide>    
			    )}
		     </Swiper>
      	</Box>

      </Container>
      <Container 
      	flexWrap='wrap' h='100%' m='auto' maxW='2xl'
      	as={Center}
      >
        <Center w='100%'>
      		<Card 
      			maxW='md'
      			position='relative'
      			h='fit-content'
      			w='100%'
      			m='auto'
      		>
			 
					  <Image
					  	sx={{borderRadius:'10px'}}
					    objectFit='cover'
					    w='100%'
					    minH='30em'
					    maxH='30em'
					    src={defaultTestimonials[thumbsSwiper].imageSrc}
					    alt='Chakra UI'
					  />

					  <CardFooter
					  	position='absolute'
					    justify='space-between'
					    flexWrap='wrap'
					    bg='white'
					    gap='5'
					    sx={{
					    	bottom:0,
					    	right:0,
					    	zIndex:1,
					    	borderRadius:'40px 0 0 0'
					    }}
					  >
					  	
					  	<IconButton 
					  		flex='1' aria-label='Next Slide' 
					  		colorScheme='green' 
					  		isRound={true} icon={<FaChevronLeft />} 
					  		className='review-swiper-button-prev'
					  	/>
					    
					    <IconButton 
					    	flex='1' aria-label='Next Slide' 
					    	colorScheme='green' isRound={true} 
					    	icon={<FaChevronRight />} 
					    	className='review-swiper-button-next'
					    />
					     
					  </CardFooter>
					</Card>
				</Center>

      </Container>
      
    </SimpleGrid>

    <Icon 
    	viewBox="0 0 600 600" 
    	w='8em'
    	h='8em'
    	sx={{
    		position:'absolute',
    		bottom:0,
    		left:0,
    		color:'green',
    		opacity:'0.25',
    		transform:  'translate(-70%,0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)'
    	}}
    >  
		<g transform="translate(300,300)">
		    <path
		      d="M153.6,-239C199.1,-209.8,236,-167.2,258.4,-118C280.9,-68.9,288.9,-13.1,281.2,40.4C273.5,93.9,250.1,145.2,214.7,186.1C179.3,226.9,131.9,257.4,80,272.6C28.2,287.8,-28.2,287.8,-80,272.6C-131.9,257.4,-179.3,226.9,-214.7,186.1C-250.1,145.2,-273.5,93.9,-281.2,40.4C-288.9,-13.1,-280.9,-68.9,-258.4,-118C-236,-167.2,-199.1,-209.8,-153.6,-239C-108.1,-268.3,-54.1,-284.1,0,-284.1C54.1,-284.1,108.1,-268.3,153.6,-239Z"
		      fill="currentColor"/>
		  </g>	
	</Icon>

	

   </Flex>
  )
}

export default Testimonials


