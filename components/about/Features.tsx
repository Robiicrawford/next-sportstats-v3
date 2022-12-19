import React, {useState, useEffect} from "react"

import { useTranslation } from 'next-i18next';

import { Flex, Box, SimpleGrid, Container, Center, Text, Heading, Image } from '@chakra-ui/react';

import { Avatar } from '@chakra-ui/react'

import { FaTwitter, FaRegClock, FaCertificate, FaChartBar, FaAward } from 'react-icons/fa'

const HeroBackgroundImage = () => {

  const {t} = useTranslation('public');


  const services = [
    {name:'Timing Clocks', bio:'Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.', icon:<FaRegClock/>},
    {name:'Race Day Changes', bio:'Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.', icon:<FaTwitter/>},
    {name:'Race Supply', bio:'Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.', icon:<FaAward/>},
    {name:'Online Advertising', bio:'Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.', icon:<FaTwitter/>},
    {name:'Finisher Certificates', bio:'Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.', icon:<FaCertificate/>},
    {name:'Race Series/Points', bio:'Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel.', icon:<FaChartBar/>}
  ]

  return (
   <Flex
      w='100%' h='100%'  mt='0' py={['5','10','5em']} justifyContent='center'
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
                <Text color='ss_green' fontWeight='bold' fontSize='2xl'> {user.name} </Text>
                <Text pt='2'> {user.bio} </Text>
              </Flex>
          )}
        </SimpleGrid>

    </Container>
      
   </Flex>
  )
}

export default HeroBackgroundImage


