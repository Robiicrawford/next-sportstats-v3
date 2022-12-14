import React, {useState, useEffect} from "react"

import { useTranslation } from 'next-i18next';

import { 
  Flex, Box, SimpleGrid, 
  Container, Center, Text, 
  Heading, Image, Icon 
} from '@chakra-ui/react';

import { Avatar } from '@chakra-ui/react'

import { FaTwitter, FaRegClock, FaCertificate, FaChartBar, FaAward } from 'react-icons/fa'

const HeroBackgroundImage = () => {

  const {t} = useTranslation('public');


  const services = [
    {name:'Timing & Result Services', bio:"Accurate timing and professional results management services for your road race events. Trust our experienced team to capture your participants' finish times and provide comprehensive online results in real-time.", icon:<FaRegClock/>},
    {name:'Marketing & Promotion', bio:'Boost your business and increase revenue with our comprehensive marketing and promotion strategies. From email campaigns to social media, our team will help you reach your target audience and drive sales. ', icon:<FaTwitter/>},
    {name:'Race Supply', bio:'Recognize and reward your participants with our custom designed medals and bibs. Our high quality, durable products will make your road race a memorable and successful event.', icon:<FaAward/>},
    {name:'Online Advertising', bio:'Maximize your online presence and increase brand awareness with our effective and efficient online advertising solutions. From targeting the right audience to delivering measurable results, we can help your business succeed in the digital age.', icon:<FaTwitter/>},
    {name:'Data & Participant Management', bio:'Easily integrate and manage data with other service providers using our flexible and customizable platform. From registration to results and everything in between, our platform will provide the seamless flow of data you need to create a smooth and efficient event experience for all involved.', icon:<FaCertificate/>},
    {name:'Race Series/Points', bio:'Efficiently manage series points and standings with our intuitive and automated platform. Accurately track and display results and participant progress throughout the series, providing an fair and enjoyable experience for everyone involved', icon:<FaChartBar/>}
  ]

  return (
   <Flex
      w='100%' h='100%'  py={['5','10','5em']} 
      justifyContent='center'
     position='relative' bg='white' flexWrap='wrap'
   >  
    <Heading w='100%' textAlign='center'> Our Professional <Text color='ss_green' sx={{display:'inline'}}> Services </Text> </Heading>
   
    <Container flexWrap='wrap' h='fit-content' py='6' m='auto' >
    
        <SimpleGrid columns={{ base: 1, md: 3 }} mt='5' spacing="4em" w='100%'>
          {services.map((user) => 
              <Flex
                key={user.name}
                direction="column"
                alignItems="center"
                rounded="md"
                padding="8"
                position="relative"
                sx={{border:'2px dashed green'}}
                shadow={{ md: 'base' }}
              >
                 <Avatar 
                  size="xl" mb='2'
                  bg='none' color='black' sx={{border:'2px solid green'}}
      
                  icon={user.icon}
                />
                <Text color='ss_green' textAlign='center' fontWeight='bold' fontSize='2xl'> {user.name} </Text>
                <Text pt='2'> {user.bio} </Text>
              </Flex>
          )}
        </SimpleGrid>

    </Container>
   

    <Icon 
        viewBox="0 0 600 600" 
        w='16em'
        h='16em'
        sx={{
          position:'absolute',
          bottom:0,
          right:0,
          color:'green',
          opacity:'0.25',
          transform:  'translate(36.67%,3em) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)'
        }}
      >  
      <g transform="translate(300,300)">
        <path d="M125,-160.4C159.9,-146.7,184.6,-107.3,178.8,-70.9C173.1,-34.4,137,-0.8,128.8,47.3C120.7,95.5,140.6,158.2,123.8,198.4C107,238.6,53.5,256.3,5.4,248.9C-42.7,241.5,-85.4,208.9,-112.7,172.1C-140,135.3,-151.8,94.2,-146.3,59.7C-140.8,25.1,-117.9,-2.9,-104,-30.1C-90.1,-57.3,-85,-83.7,-69.1,-103.5C-53.3,-123.4,-26.6,-136.7,9.2,-149.4C45.1,-162,90.1,-174,125,-160.4Z" fill="darkgreen" />
      </g>
    </Icon>
   </Flex>
  )
}

export default HeroBackgroundImage


