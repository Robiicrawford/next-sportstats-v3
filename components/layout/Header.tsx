import * as React from "react"

import Image from 'next/image'
import Link from 'next/link'

import styled from 'styled-components';
import { Box, Flex, Text, Spacer, useDisclosure, Show  } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

import LanuageModal from './lanuageMenu';
import AccountMenu from './AccountMenu';

import sportstats_logo from '../../public/images/sportstats_logo.png'

type HeaderType = {
    header_color?: string
    logo?: string
}

const  LanguageMenu = ()=> {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Dropbtn aria-label="change language" onClick={onOpen} mx='3'>
        <FontAwesomeIcon icon={faGlobe} size="2x" aria-hidden="false" aria-label="Open Language Menu" />
      </Dropbtn>
     <LanuageModal open={isOpen} onClose={() => onClose()}/> 
    </>
  );
}

export default function Header({ header_color, logo }:HeaderType) {
  header_color = header_color?header_color:'rgb(23, 29, 37)'
  
  console.log(logo)
  return (
    <header 
      className="header" 
      style={{
        position:(header_color !== 'none')?'relative':'absolute', 
        top:'0', right:'0', width:'100%', 
        zIndex:'12'
      }}
    > 
      <Flex
          px={2} pl={[2,5]} pt={2}
          color='white'
          style={{
            backgroundColor: header_color
          }}
          w='100%'
          alignItems='center'
          flexWrap='wrap'
        >
          <Box w={['65%', '25%']}>
            <Link href="/">

              <Image 
                src={logo?logo:sportstats_logo}
                alt="Sportstats"
                priority
              />

            </Link>
          </Box>
          <Spacer   />
           
         <LanguageMenu />
         
          <Show above='sm'>
            <AccountMenu  />
          </Show>
 {/*  
         <Dropbtn>
            <Burger open={isOpen} setOpen={setOpen} />
          </Dropbtn>
    */}
    </Flex>
  </header>
  );}

const Dropbtn = styled.i`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  color:#fff;
  margin-right: 1em;
  &:hover {
    background-color: grey;
    border-radius: 99999px;
  
  }
`;