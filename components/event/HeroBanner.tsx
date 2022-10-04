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
    <Flex flexWrap='wrap' className='card__base' style={{borderRadius:'15px', border:'1px solid black'}} w='100%'  justifyContent='center' alignItems='center' >
      <Flex w='100%' flexWrap='wrap' >
            <Flex flexWrap='wrap' w={['100%','50%','33%','25%']} justifyContent='center' >
               <Heading  className="card__header" > 
                  <Image
                    src={data?.info?.imageUrl? data.info.imageUrl : 'https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg'}
                    alt={data?.info?.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src='https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg';
                    }}
                    boxSize='200px'
                    objectFit='cover'
                    className="card__image" 
                    //width="380" height='250'
                    //style={{height:'100%', width:'auto'}}
                  />
              </Heading>
            </Flex>


            <Flex flexWrap='wrap' w={['100%','50%','33%','75%']} pl={['2','4']}>
             
              <Box w='100%' my={[1,2]}  color='#000'>
                <Heading textAlign='left'> {data?.info?.name} </Heading>
                <Box
                  mt='1'
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                  noOfLines={1}
                    sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                  
                >
                  {data?.events[0]?.city} | {countries.getName(data?.info?.country, "en", {select: "official"})}, 
                </Box>
                <Heading textAlign='left' >
                  <Select 
                    style={{
                      marginLeft:'1em', backgroundColor:'grey', 
                      borderRadius:'15px',
                      maxWidth:'550px'
                    }} 
                  //  defaultValue={data?.event?.id}
                    onChange={(e)=>{
                      setA(e.target.value)
                    }}
                  >  
                    
                    {data?.events?.map((e)=>
                      <option value={e.id} key={e.id}>{e.date} | {e.name} </option>
                    )}
                   </Select>
                </Heading>
              </Box>
              
              <Flex flexWrap='wrap' width={[1,1/2,2/3,3/4]}>
                
                
              </Flex>

            </Flex>
            
            <Flex w='100%' bg='ss_green' mt={['50px', 4]} pb={1} flexWrap='wrap' style={{borderRadius:' 0 0 15px 15px', borderTop:'1px solid black'}}>
             
              <Box w={[1,1/2, 1/3 ,1/4]}  />

              <Flex flexWrap='wrap' w={[1,3/4,3/4,1/3]} justifyContent='space-around'>
               
                <Link href={`/event/${slug}`} style={{textAlign:'center', textDecoration:'none'}} >
                  <Box    mx={2} mt={1} sx={{ cursor:'pointer'}} bg='none'   > 
                  
                    <Box bg='white' width='70px' height='70px' textAlign='center' display='inline-block' p={3} style={{borderRadius:'50%', border:'1px solid black'}} mt={'-55px'}> 
                      <FontAwesomeIcon icon={faInfo} size='2x' style={{color:'green'}}  />
                    </Box>

                    <Text display='block'  textAlign='center' color='white'  fontSize={'2em'}> Info </Text>
                   </Box>
                  
                </Link>

                <Link href={`/event/${slug}-results`} style={{textAlign:'center', textDecoration:'none'}} >
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