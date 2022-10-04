import React, { useState, useEffect } from "react"

import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import styled from "styled-components";
import { Box, Flex, Heading, Text, Center } from '@chakra-ui/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faInfo, faClock} from "@fortawesome/free-solid-svg-icons";

import md from 'markdown-it';


const Index = ({data}) => {
  const { t } = useTranslation();

  const handleShareClick = (event) => {
    event.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: `${data?.name} | ${'Sportstats'}`,
          text: `Check out results from ${data?.name} on Sportstats`,
          url: document.location.href,
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
    <Flex flexWrap='wrap' className='card__base' style={{borderRadius:'15px', border:'1px solid grey'}} w='100%'  justifyContent='center' alignItems='center' >
      
      <Flex w='100%'>

        <Flex flexWrap='wrap' w={['100%','50%','33%','25%']} justifyContent='center' >
          <Center w='100%' className="card__header" m='2' > 
            <img
              src={data?.imageUrl? data.imageUrl : 'https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg'}
              alt={data?.name}
              loading="lazy"
              className="card__image" width="480" height='500'
              style={{height:'100%', width:'auto'}}
            />
          </Center>
        </Flex>
        
        <Box w={['100%','50%','33%','75%']} my={[1,2]} pl='3'  color='#000'>
          <Heading textAlign='left' > {data?.name} </Heading>
          <Box
            w='100%'
            mt='1'
            fontWeight='semibold'
            lineHeight='tight'
            ml={['3','5']}
          >
            <div dangerouslySetInnerHTML={{ __html: md().render(data?.description) }} />
          </Box>
          
        </Box>
      </Flex>

      <Flex w='100%' bg='ss_green' px='10' pb={1} flexWrap='wrap' style={{borderRadius:' 0 0 15px 15px', borderTop:'2px solid black'}} justifyContent='flex-end'>
        
        <Box  sx={{ cursor:'pointer'}} bg='none' textAlign='center' onClick={handleShareClick}   > 
          <Box bg='white' w='70px' height='70px' textAlign='center' display='inline-block' p='3' style={{borderRadius:'50%', border:'1px solid black'}} mt={'-55px'}> 
            <FontAwesomeIcon icon={faShareAlt} size='2x' style={{color:'green'}}  />
          </Box>
          <Text display='block' w='100%' textAlign='center' color='white'  fontSize={'2em'}> Share </Text>
        </Box>
     
      </Flex>
          
    </Flex>
        
  )
}

export default Index