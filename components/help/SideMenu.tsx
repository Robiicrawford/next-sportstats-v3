import React from "react"

import { useTranslation } from 'next-i18next';

import Link from 'next/link'

import { Box, Flex, Heading, Text, Center, Stack , Container, StackDivider   } from '@chakra-ui/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRunning, faUserShield} from "@fortawesome/free-solid-svg-icons";


const SideMenu = ({ data, active }) => {
  const content = data?.allBuilderModels.oneHepCenter?.content;

  const {t} = useTranslation('public');
  const icons = {
    "about-sportstats":<FontAwesomeIcon icon={faUserCircle} size="lg" style={{margin:'0 0.1em'}}/>, 
    "your-account":<FontAwesomeIcon icon={faUserCircle} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
    'your-events':<FontAwesomeIcon icon={faRunning} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
    "terms-and-policies":<FontAwesomeIcon icon={faUserShield} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
  }
 
  return (
   
      
          <Flex flexWrap='wrap' justifyContent='center' className='card__base' px={[1,3,5]} pt={2} h='fit-content'> 
            <Heading w='100%' pb='1' sx={{borderBottom:'2px solid black', paddingRight:'2em', textAlign:'center'}}> SUPPORT </Heading>
            <Stack 
              spacing='14px'w={['100%','20%']}
              direction={['row','column']}
               py='3' w='100%'
            >
              
              <Link href='/help' className='help-menu' style={{color:active === 'faq'?'green':''}} >FAQ</Link>
              <Link href='/help/offices' className='help-menu' style={{color:active === 'offices'?'green':''}}  >Offices</Link>
              <Link href='/help' className='help-menu'>Contact</Link>
              <Link href='/help/privacy' className='help-menu' style={{color:active === 'privacy'?'green':''}} >Privacy Policy</Link>
              <Link href='/help/copyright' className='help-menu' style={{color:active === 'copyright'?'green':''}} >Copyright</Link>
            </Stack>

          </Flex>
    
  )
}

export default SideMenu

