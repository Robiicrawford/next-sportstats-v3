import React from "react"

import { useTranslation } from 'next-i18next';

import Link from 'next/link'

import { Flex, Heading, Stack, Tab, TabList, Tabs } from '@chakra-ui/react';

const SideMenu = ({ active }) => {

  const {t} = useTranslation('public');

 
  return (
   
          <Flex 
            flexWrap='wrap' justifyContent='center' 
            className='card__base' px={[1,3,5]} pt={2} h='fit-content'
          > 
            <Heading w='100%' pb='1' sx={{borderBottom:'2px solid black', paddingRight:'2em', textAlign:'center'}}> SUPPORT </Heading>
            <Stack 
              spacing="24" 
              shouldWrapChildren
              direction={{base:'row', md:'column'}}
               py='3' w='100%'
            >
              <Tabs size={'2xl'} index={active}  variant="with-line"  align='end' w='100%' orientation="vertical" isFitted>
                <TabList w='100%' >
                  <Tab as={Link} href='/help' className='help-menu' style={{color:active === 0?'green':''}} >FAQ</Tab>
                  <Tab as={Link}  href='/help/offices' className='help-menu' style={{color:active === 1?'green':''}}  >Offices</Tab>
                  <Tab as={Link} href='/help/contact' className='help-menu' style={{color:active === 2?'green':''}}>Contact</Tab>
                  <Tab as={Link}  href='/help/privacy' className='help-menu' style={{color:active === 3?'green':''}} >Privacy Policy</Tab>
                  <Tab as={Link}  href='/help/copyright' className='help-menu' style={{color:active === 4?'green':''}} >Copyright</Tab>
                </TabList>
              </Tabs>

            </Stack>

          </Flex>
    
  )
}

export default SideMenu