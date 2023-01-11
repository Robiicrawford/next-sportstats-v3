import React, {useState, useEffect} from "react"

import { useTranslation } from 'next-i18next';

import { Flex, Box, SimpleGrid, Container, Center, Text, Heading, Icon } from '@chakra-ui/react';

import Image from 'next/image'

import sportstats_logo from '../../public/about/test.jpeg'


const HeroBackgroundImage = () => {

  const {t} = useTranslation('public');


  return (
   <Flex
      w='100%' py='4' justifyContent='center'
     position='relative' bg='white'
   >  
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" >
      <Center>
        <Box
          p='4'
          maxW='400px'
          sx={{borderRadius:'2em', position:'relative'}}
        >
          <Image 
          //  boxSize='400px'
            style={{borderRadius:'1em', zIndex:'2', position:'relative'}}
            src={sportstats_logo} 
            alt='Track Record' 
          />
           <Icon 
              viewBox="0 0 1034.95 831.61"
              //viewBox="0 0 600 600" 
              w='100%'
              h='100%'
              sx={{
                position:'absolute',
                bottom:0,
                left:0,
              //  right:0,
                color:'#0CAA56',
               // opacity:'0.25',
                zIndex:'1',
                transform:  'translate(16.67%,2.3em) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)'
              }}
            >  
              <defs xmlns="http://www.w3.org/2000/svg">
                <linearGradient id="eb1b6581-0e6c-46f0-8ed9-49203ffc7122" x1="1924.49" y1="836.62" x2="1924.49" y2="217.05" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#0CAA56" stop-opacity="0.25"/>
                  <stop offset="0.54" stop-color="#0CAA56" stop-opacity="0.12"/>
                  <stop offset="1" stop-color="#0CAA56" stop-opacity="0.1"/>
                </linearGradient>
              </defs>
              <path xmlns="http://www.w3.org/2000/svg" d="M683.84,129.27C617.49,127.36,554.3,109.52,494,90S373.84,48.89,309.08,38.55c-41.65-6.65-89.28-7.59-122.84,11C153.94,67.44,143.51,98.33,137.9,127c-4.23,21.56-6.71,44.26,4.86,64.44,8,14,22.29,25.79,32.15,39.21,34.3,46.71,10.06,104.3-27.12,149.9-17.44,21.39-37.67,41.8-51.13,64.57S77,494,88.75,517.2c11.67,23,39.48,40.31,69.61,52.48,61.19,24.7,133.3,31.77,203.61,35.78,155.64,8.86,312.12,5,468.18,1.18,57.75-1.42,115.76-2.86,172.58-10.3,31.55-4.13,64.12-10.68,87-26.5,29.08-20.08,36.28-54.09,16.8-79.27-32.68-42.24-123-52.73-145.89-98.06-12.58-24.95.34-52.75,18.61-75.89,39.2-49.64,104.91-93.19,108.37-149.93,2.37-39-29.21-78-78.05-96.44-51.19-19.33-122.18-16.9-160,15.1C810.76,118.29,742.42,131,683.84,129.27Z" transform="translate(-82.53 -34.2)" fill="#0CAA56" opacity="0.1"/>
              
              <ellipse xmlns="http://www.w3.org/2000/svg" cx="435.45" cy="802.29" rx="290.75" ry="29.32" fill="#0CAA56" opacity="0.2"/>

          </Icon>
        </Box>
      </Center>
      <Container flexWrap='wrap' h='fit-content'  m='auto' maxW='2xl'>
        <Text color='ss_green' fontSize='lg' fontWeight='bold' w='100%'> Our Track Record </Text>
        <Heading mb='3' > We have been doing this for <Text sx={{display:'inline'}} color='ss_green'> 30+ years. </Text> </Heading>
        <Text fontWeight='bold'>
          Using state of the art timing systems from technology leaders MyLaps (ChampionChip, ProChip and BibTag) and race|result, we build a timing solution specifically suited to your race and each of your race age divisions, special categories, overall standings, teams and relays. Style your athletes experience with customized finishing certificates and access to finish line photos.
        </Text>

        <SimpleGrid columns={{ base: 3, md: 3 }} gap="1" my='6' >
          <Box>
            <Text fontWeight='bold' fontSize='2xl'> 400+ </Text>
            <Text color='ss_green' fontWeight='bold'> Clients </Text>
          </Box>
          <Box>
            <Text fontWeight='bold' fontSize='2xl'> 1000+ </Text>
            <Text color='ss_green' fontWeight='bold'> Events </Text>
          </Box>
          <Box>
            <Text fontWeight='bold' fontSize='2xl'> 35+ </Text>
            <Text color='ss_green' fontWeight='bold'> Countries </Text>
          </Box>
        </SimpleGrid>

      </Container>
      
    </SimpleGrid>
   </Flex>
  )
}

export default HeroBackgroundImage


