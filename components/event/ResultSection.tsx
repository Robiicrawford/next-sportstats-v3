import React, { useState, useEffect } from "react"

import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Index = ({data}) => {
  const { t } = useTranslation();

  return (
    <Flex flexWrap='wrap' mt='3' className='card__base' style={{borderRadius:'15px', border:'1px solid black'}} w='100%'  justifyContent='center' alignItems='center' >
      <Box w='100%' py={[2,3]} px={[2,4]} >
        <Heading color='black' style={{borderBottom:'1px solid black'}}>Results - {data?.info?.start_date.slice(0,10)}</Heading>
      </Box>

      <Flex flexWrap='wrap' justifyContent='left' w='100%' my='3' mx='4' >
        {data?.races?.map((r)=>(
          <Link href={`/results/${r.rid}`} style={{width:'100%', cursor:'pointer'}} key={r.id}>  
            <Box w={'100%'}  style={{borderBottom:'1px solid #fff'}} >
              <Text color='black' > <span className={`tag tag-status tag-${r.status}`}> {r.status} </span> {r.name} - {r.date}</Text>
            </Box>
          </Link>
        ))}
      </Flex>
    
    </Flex>
        
  )
}

export default Index