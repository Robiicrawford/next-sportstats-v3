import React, { useState, useEffect } from "react"

import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Index = ({data, master}) => {
  const { t } = useTranslation();

  return (
    <Flex flexWrap='wrap' mt='3' className='card__base' style={{borderRadius:'15px', border:'1px solid black'}} w='100%'   alignItems='center' >
      
      {/*<Box w='100%' py={[2,3]} px={[2,4]} >
        <Heading color='black' style={{borderBottom:'1px solid black'}}>Results - {data?.info?.start_date.slice(0,10)}</Heading>
      </Box>
*/}
      <Flex flexWrap='wrap'   w={['100%', '75%', '50%']} my='3' px='2' >
        {data?.races.map((r, i)=>(
          <Flex key={r.id} flexWrap='wrap' pt='1' w='100%' className='race-list' >
            <Link
              href={`/results/${r.rid}`}
              style={{cursor:'pointer !important', width:'100%'}}
            >  
              <Flex w={'100%'} flexWrap='wrap' className='resultLink'  sx={{ cursor:'pointer !important'}} justifyContent='space-between' >
                <Text color='black' sx={{cursor:'pointer'}} w='fit-content' mb='1' pb='1'  fontWeight='semibold' fontSize='1.2em'> 
                  <span className={`tag tag-status tag-${r.status} tag-main`} style={{marginLeft:'0.5em'}}> {r.status} </span>  -  {r.name}  
                </Text>
                 
              </Flex>
            </Link>
            {master.sid === 57 &&
              <Flex w='100%' pt='1' sx={{borderTop:'1px dotted black'}}>
                <Link
                  href={`/club-points/${r.rid}`}
                  style={{cursor:'pointer !important', marginBottom:'5px'}}
                > 
                  <span className={`tag tag-status tag-grey`} style={{marginLeft:'2em'}}> Club Points </span>
                </Link>
              </Flex>
            }
          </Flex>
        ))}

      </Flex>
    
    </Flex>
  );
}

export default Index