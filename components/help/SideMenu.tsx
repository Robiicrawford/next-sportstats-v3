import React from "react"

import { useTranslation } from 'next-i18next';

import Link from 'next/link'

import { Flex, Heading, Stack } from '@chakra-ui/react';

const SideMenu = ({ active }) => {

  const {t} = useTranslation('public');

 
  return (
   
          <Flex 
            flexWrap='wrap' justifyContent='center' 
            className='card__base' px={[1,3,5]} pt={2} h='fit-content'
          > 
            <Heading w='100%' pb='1' sx={{borderBottom:'2px solid black', paddingRight:'2em', textAlign:'center'}}> SUPPORT </Heading>
            <Stack 
              spacing='14px'
              direction={['row','column']}
               py='3' w='100%'
            >
              
              <Link href='/help' className='help-menu' style={{color:active === 'faq'?'green':''}} >FAQ</Link>
              <Link href='/help/offices' className='help-menu' style={{color:active === 'offices'?'green':''}}  >Offices</Link>
              <Link href='/help/contact' className='help-menu' style={{color:active === 'contact'?'green':''}}>Contact</Link>
              <Link href='/help/privacy' className='help-menu' style={{color:active === 'privacy'?'green':''}} >Privacy Policy</Link>
              <Link href='/help/copyright' className='help-menu' style={{color:active === 'copyright'?'green':''}} >Copyright</Link>
            </Stack>

          </Flex>
    
  )
}

export default SideMenu