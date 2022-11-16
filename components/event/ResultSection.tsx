import React, { useState, useEffect } from "react"

import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Index = ({data, master}) => {
  const { t } = useTranslation();

  return (
    <Flex flexWrap='wrap' mt='3' className='card__base' style={{borderRadius:'15px', border:'1px solid black'}} w='100%'  justifyContent='center' alignItems='center' >
      <Box w='100%' py={[2,3]} px={[2,4]} >
        <Heading color='black' style={{borderBottom:'1px solid black'}}>Results - {data?.info?.start_date.slice(0,10)}</Heading>
      </Box>

      <Flex flexWrap='wrap'  justifyContent='left' w='100%' my='3' mx='4' >
        {data?.races?.map((r)=>(
          <Flex key={r.id} flexWrap='wrap' w='100%' sx={{borderBottom:'1px dotted black'}}>
            <Link
              href={`/results/${r.rid}`}
              style={{cursor:'pointer !important'}}
            >  
              <Box as='a' w={'100%'} className='resultLink'  sx={{ cursor:'pointer !important'}} >
                <Text color='black' sx={{cursor:'pointer'}} w='fit-content' mb='1' pb='1' > 
                   {r.date.split(" ")[0]} - {r.name}  <span className={`tag tag-status tag-${r.status}`} style={{marginLeft:'2em'}}> {r.status} </span> </Text> 
              </Box>
            </Link>
            {master.sid === 57 &&
              <Link
                href={`/club-points/${r.rid}`}
                style={{cursor:'pointer !important'}}
              > 
                <span className={`tag tag-status tag-red`} style={{marginLeft:'2em'}}> Club Points </span>
              </Link>
            }
          </Flex>
        ))}

      </Flex>
    
    </Flex>
  );
}

export default Index