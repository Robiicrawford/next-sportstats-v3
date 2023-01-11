import React, {useState, useEffect} from "react"

import { useTranslation } from 'next-i18next';

import { Flex, Box, SimpleGrid, Center, Text, Heading } from '@chakra-ui/react';


const HeroBackgroundImage = () => {

  const {t} = useTranslation('public');

  return (
   <Flex
      w='100%' minH='60vh' mt='0' pt='0' justifyContent='center'
     position='relative'
   >  
    <Box 
      w='100%' h='100%'
      position='absolute'
      sx={{
        zIndex:'-1',
        filter: 'brightness(50%)',
        backgroundImage: "https://ironman.kleecks-cdn.com/cdn1/attachments/photo/b355-175945084/im703_coeur_dalene_3.jpg",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    />
        
      <SimpleGrid columns={{ base: 1, md: 2 }} mt={['10','0']} pt='3'  gap="6" color='white'>
        <Flex flexWrap='wrap'  height='fit-content' m='auto'>
          <Text w='100%' pt='2' fontWeight='400' sx={{borderLeft:'4px solid lightblue'}} pl='1'> Fast and accurate results </Text>
          <Heading>
            <span>Hire the best</span>
            <br />
            <Box
             px='30px' bg='ss_green' ml='-3'
             sx={{border:'4px solid transpant'}}
              className='cutout'
            > <div className='content'> Timing Team. </div></Box>
          </Heading>

        </Flex>

        <Flex flexWrap='wrap' bg='transparent'>
          <Box
            w='100%'
            h='fit-content'
            flexWrap='wrap'
            m='auto'
            sx={{
            
              paddingTop: '0px !important'
            }}
          >
             <div
              //className={className}
              style={{
                position: "relative",
                background: "transparent",
                paddingBottom: "56.25%" /* 16:9 */,
                paddingTop: 25,
                height: 0
              }}
            >
              <iframe
                title="Embeded Video"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%"
                }}
                src={'https://cdn-1.sportstats.one/video/the-new-sportstats-world.mp4'}
                frameBorder="0"
              />
            </div>
          </Box> 
        </Flex>
      </SimpleGrid>
   </Flex>
  )
}

export default HeroBackgroundImage


