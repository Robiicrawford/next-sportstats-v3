import React, { useState, useEffect } from "react"

import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import styled from "styled-components";
import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faInfo, faClock} from "@fortawesome/free-solid-svg-icons";

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const Index = ({data, slug, setA}) => {
  const {  t} = useTranslation();

  console.log(data)

  const handleShareClick = (event) => {
    event.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: `${data?.info.name} | ${'Sportstats'}`,
          text: `Check out results from ${data?.info.name}  on Sportstats`,
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
    <Flex 
      flexWrap='wrap' mt='3' 
      className='card__base' 
      style={{borderRadius:'15px', border:'1px solid black', zIndex:'5'}} 
      w='100%'  justifyContent='center' alignItems='center' 
      h='fit-content'
    >
      <Flex w='100%' flexWrap='wrap' >
            <Flex flexWrap='wrap' w={['100%','50%','33%','25%']} justifyContent='center' >
               <Heading  className="card__header"   > 
                  <Image
                    src={data?.info.mlimg? `https://cdn-1.sportstats.one/img/master_logo/${data?.mid}_${data?.info.mlimg}.png` : 'https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg'}
                    alt={data?.info?.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src='https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg';
                    }}
                    mt='2'
                    ml='2'
                    width='auto'
                    height='250px'
                    objectFit='cover'
                    className="card__image" 
                    style={{borderRadius:'15px', border:'1px solid black'}}
                  />
              </Heading>
            </Flex>


            <Flex flexWrap='wrap' w={['100%','50%','33%','75%']} pl={['2','4']}>
             
              <Box my={[1,2]}  color='#000'>
                <Box
                  mt='1'
                  fontWeight='semibold'
                  as='h3'
                  fontSize={['36px']}
                  lineHeight='42px'
                  noOfLines={2}
                  mb='3'
                >
                  {data?.info?.city}, {data?.info?.state} | {countries.getName(data?.info?.country, "en", {select: "official"})}
                </Box>
                <Box  >
                  <Select 
                    style={{
                      marginLeft:'1em', backgroundColor:'grey', 
                      borderRadius:'15px',
                      maxWidth:'550px'
                    }} 
                    fontSize='14px'
                  //  defaultValue={data?.event?.id}
                    onChange={(e)=>{
                      setA(e.target.value)
                    }}
                  >  
                    
                    {data?.events?.map((e)=>
                      <option value={e.id} key={e.id}>{e.start_date.slice(0,10)} | {e.name} </option>
                    )}
                   </Select>
                </Box>
              </Box>
              
              <Flex flexWrap='wrap' width={['100%',1/2,1/2,1/3,3/4]}>
                
                
              </Flex>

            </Flex>
            
            <Flex w='100%' bg='ss_green' mt={['50px', 4]} pb={1} flexWrap='wrap' style={{borderRadius:' 0 0 15px 15px', borderTop:'1px solid black'}}>
             
              <Box w={['100%',1/2, 1/3 ,1/4]}  />

              <Flex flexWrap='wrap' w={['100%',3/4,3/4,1/3]} justifyContent='space-around'>
               
                <Link href={`#info`} style={{textAlign:'center', textDecoration:'none'}} >
                  <Box    mx={2} mt={1} sx={{ cursor:'pointer'}} bg='none'   > 
                  
                    <Box bg='white' width='70px' height='70px' textAlign='center' display='inline-block' p={3} style={{borderRadius:'50%', border:'1px solid black'}} mt={'-55px'}> 
                      <FontAwesomeIcon icon={faInfo} size='2x' style={{color:'green'}}  />
                    </Box>

                    <Text display='block'  textAlign='center' color='white'  fontSize={'2em'}> Info </Text>
                   </Box>
                  
                </Link>

                <Link href={`#results`} style={{textAlign:'center', textDecoration:'none'}} >
                  <Box    mx={2} mt={1} sx={{ cursor:'pointer'}} bg='none' textAlign='center'   > 
                  
                    <Box bg='white' width='70px' height='70px' textAlign='center' display='inline-block' p={3} style={{borderRadius:'50%', border:'1px solid black'}} mt={'-55px'}> 
                      <FontAwesomeIcon icon={faClock} size='2x' style={{color:'green'}}  />
                     </Box>

                    <Text display='block' textAlign='center' color='white'  fontSize={'2em'}> Results </Text>
                   </Box>
                  
                </Link>

                <Flex >
                  <Box    mx={2} mt={1} sx={{ cursor:'pointer'}} bg='none' textAlign='center' onClick={handleShareClick}  > 
                  
                    <Box bg='white' width='70px' height='70px' textAlign='center' display='inline-block' p={3} style={{borderRadius:'50%', border:'1px solid black'}} mt={'-55px'}> 
                      <FontAwesomeIcon icon={faShareAlt} size='2x' style={{color:'green'}}  />
                     </Box>

                    <Text display='block'  textAlign='center' color='white'  fontSize={'2em'}> Share </Text>
                   </Box>
                  
                </Flex>

              </Flex>
              

            </Flex>
      </Flex>
    </Flex>
        
  )
}

export default Index