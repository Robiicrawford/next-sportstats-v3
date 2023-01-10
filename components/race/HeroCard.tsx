import React, {useState, useEffect} from "react"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

import { 
  Flex, Box, Image, Button, Text,
  Center
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown  } from "@fortawesome/free-solid-svg-icons";

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));


function HeroCard({ race }) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Results to View</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w='100%' flexWrap='wrap'>
              {race?.event?.races.map((r)=>
                <Link
                  href={`/results/${r.rid}`} 
                  style={{width:'100%'}}
                  key={r.rid}
                >
                  <Box w='100%' px={[1,2]} py={2} style={{borderBottom:'1px solid black'}} >
                      <Text > <span className={`tag tag-status tag-${r.status}`}> {r.status} </span> {r.name} | {r.date.slice(0,10)}</Text>
                  </Box>
                </Link>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>

       <Flex 
        flexWrap='wrap' mt={['1','2','2','3']} 
        className='card__base' 
        sx={{
          borderRadius:'15px 15px 0 0 ', 
          border:'1px solid black', 
          zIndex:'5',
          borderBottom:'20px solid green'
        }} 
        w='100%'  justifyContent='center' alignItems='center' 
        h='fit-content'
      >
        <Flex w='100%' direction={{base:'column', md:'row'}} >
          
            <Flex  w={['100%','50%','33%','25%']} justifyContent='center' textAlign="center">
               <Link href={`/event/${race?.master?.slug}`} >
                    <Image
                      src={race?.info?.img?`${race.info.img}`: race?.event?.eimg?race?.event?.eimg:'https://ss-event-images.s3.us-west-2.amazonaws.com/ss_triathlon.jpeg'}
                      alt={race?.info?.name}
                      width='auto'
                      height={['120px','250px']}
                      my='2' ml='2'
                      objectFit='cover'
                      className="card__image" 
                      style={{borderRadius:'15px', border:'1px solid black'}}
                    />
              </Link>
            </Flex>

            <Box 
              justifyContent='center'
              my='auto'
              w={['100%','50%','66%','75%']}  
              px={['1','2','4']} 
            >

              <Center as={Link} href={`/event/${race?.master?.slug}`} >
                <Box
                  mt='1'
                  fontWeight='semibold'
                  as='h1'
                  fontSize='2xl'
                  noOfLines={2}
                  lineHeight='tight'
                  mb='3'
                >
                  {race?.event?.name}
                </Box>
              </Center>

              <Center
                
                color='#718096'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='lg'
              >
                {race?.master?.city}, {race?.master?.state} | {countries.getName(race?.master?.country, 'en', {select: "official"})}
              </Center>

              <Center 
                fontSize='lg'
                my='2'
              > 
                  <Button 
                    mr={['0','4']} variant='outline' colorScheme='gray' size='sm'

                    onClick={onOpen}
                    w={['100%','auto']}
                  > 
                     { new Date(
                        race?.info?.date?.slice(0,4), race?.info?.date?.slice(5,7), race?.info?.date?.slice(8,10)
                        ).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' }
                      )} 
                        {' - '}
                    {race?.info?.name} <FontAwesomeIcon icon={faAngleDown} style={{marginLeft:'0.5rem'}} /> 
                  </Button>
              </Center>
            
            </Box>

        </Flex>  
      </Flex>
    </>
  )
}


export default HeroCard
