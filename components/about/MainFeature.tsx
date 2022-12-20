import React, {useState, useEffect} from "react"

import { useTranslation } from 'next-i18next';

import { Flex, Box, SimpleGrid, Container, Center, Text, Heading, Image } from '@chakra-ui/react';


const HeroBackgroundImage = () => {

  const {t} = useTranslation('public');


  return (
   <Flex
      w='100%' py='4' justifyContent='center'
     position='relative' bg='white'
   >  
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" >
      <Center>
        <Image 
          boxSize='400px'
          src='https://treact.owaiskhan.me/static/media/stats-illustration.89e20edcbf2cccadc1f28b4a73a486ac.svg' 
          alt='Track Record' 
        />
      </Center>
      <Container flexWrap='wrap' h='fit-content'  m='auto' maxW='2xl'>
        <Text color='ss_green' fontSize='lg' fontWeight='bold' w='100%'> Our Track Record </Text>
        <Heading mb='3' > We have been doing this for <Text sx={{display:'inline'}} color='ss_green'> 30+ years. </Text> </Heading>
        <Text fontWeight='bold'>
          State of the art timing systems using technology from MyLaps (ChampionChip, ProChip and BibTag) and race|result. We always cater for each of your race age divisions, special categories, overall standings, teams and relays. Style your athletes experience with customized finishing certificates and access to finishline photos
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


