import React, { useState, useEffect } from "react"

import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';


const link_url = (link) => {
  if(link.lt === 19) {
    return `/club-points/${link.lu}`
  }
  if(link.lt === 21) {
    return `/slots/${link.lu}`
  }
}

const Index = ({data, master}) => {
  const { t } = useTranslation();

  return (
    <Flex flexWrap='wrap' mt='3' className='card__base' style={{borderRadius:'15px', border:'1px solid black'}} w='100%'   alignItems='center' >

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

            {/* race links section, sits below main result link  */}
            {r?.links?.length > 0 && 
              <Flex w='100%' pt='1AA' gap='3' pl='3' sx={{borderTop:'1px dotted black'}}>
                {r.links.map((link) =>
                  <Link
                    key={link.id}
                    href={`${[19].includes(link.lt)?link_url(link):link.lu}`}
                    style={{cursor:'pointer !important', marginBottom:'5px'}}
                  > 
                    <span className={`tag tag-status tag-grey`} > 
                      {link.ll}
                    </span>
                  </Link>
                )}
              </Flex>
            }

          </Flex>
        ))}

      </Flex>
    
    </Flex>
  );
}

export default Index