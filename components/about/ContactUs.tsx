import React, {useState, useEffect} from "react"
import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import { 
  Flex, Box, SimpleGrid, 
  Container, Center, Text, 
  Heading, Image, Icon, Button 
} from '@chakra-ui/react';

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
      w='100%' h='100%'  py={['5','10','5em']} 
      justifyContent='center'
     position='relative' bg='white' flexWrap='wrap'
   >  
    <Container flexWrap='wrap' h='fit-content' py='6' m='auto' >
    
      <SimpleGrid  columns={{ base: 1, md: 2 }}  mt={['10','0']} pt='3'  gap="6" color='white'>
        <Flex flexWrap='wrap'  height='fit-content' m='auto' color='black'>
          <Text color='ss_green' fontSize='lg' fontWeight='bold' w='100%'> Contact Us </Text>
          <Heading mb='3' color='black' > Feel free to <Text sx={{display:'inline'}} color='ss_green'> get in touch </Text> with us. </Heading>
          <Text fontWeight='500' mb='3'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
          <Link href='/help/contact'>
            <Button colorScheme='green' >Contact Us</Button>
          </Link>
        </Flex>

        <Center>
          <Image 
            boxSize='400px'
            src='https://treact.owaiskhan.me/static/media/email-illustration.84fb82b841c197337a4bc2c1e660d5a0.svg' 
            alt='contact us' 
          />
        </Center>
      </SimpleGrid>

    </Container>
   

    <Icon 
        viewBox="0 0 600 600" 
        w='8em'
        h='8em'
        sx={{
          position:'absolute',
          bottom:0,
          right:0,
          color:'green',
          opacity:'0.25',
          zIndex:'1',
          transform:  'translate(36.67%,2em) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)'
        }}
      >  
      <g transform="translate(300,300)">
          <path
            d="M86.4,-125.7C108.9,-102.5,122,-73.2,149.6,-37.1C177.2,-0.9,219.4,42,223.6,86.1C227.8,130.3,194.2,175.6,150.6,200.7C107,225.9,53.5,231,5.2,223.8C-43.1,216.7,-86.2,197.3,-109.5,165.6C-132.8,133.8,-136.3,89.6,-138.8,52.1C-141.4,14.6,-143,-16.2,-147,-61.4C-151,-106.6,-157.5,-166.1,-133.4,-188.8C-109.3,-211.5,-54.7,-197.2,-11.4,-181.6C31.9,-166,63.9,-148.9,86.4,-125.7Z"
            fill="grey"/>
        </g>
    </Icon>
   </Flex>
  )
}

export default HeroBackgroundImage


