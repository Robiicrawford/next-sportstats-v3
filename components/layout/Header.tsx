import * as React from "react"

import Image from 'next/image'
import Link from 'next/link'

import styled from 'styled-components';
import { Box, Flex, Text, Spacer, useDisclosure  } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

import LanuageModal from './lanuageMenu';

import sportstats_logo from '../../public/images/sportstats_logo.png'


const  LanguageMenu = ()=> {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Dropbtn aria-label="change language" onClick={onOpen}>
        <FontAwesomeIcon icon={faGlobe} size="2x" aria-hidden="false" aria-label="Open Language Menu" />
      </Dropbtn>
     <LanuageModal open={isOpen} onClose={() => onClose()}/> 
    </>
  );
}

export default function Header({ header_color }) {

  return (
    <header 
      className="header" 
      style={{position:'absolute', top:'0', right:'0', width:'100%', zIndex:'12'}}
    > 
      <Flex
          px={2} pl={[2,5]} pt={2}
          color='white'
          bg={header_color?header_color:'rgb(23, 29, 37)'}
          w='100%'
          alignItems='center'
          flexWrap='wrap'
        >
          <Link
            href="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <Image 
              src={sportstats_logo}
              alt="Sportstats"
              height={75}
              width={400}
            />
          </Link>
          <Spacer   />
           
         <LanguageMenu />
          {/*  
          <Hide query='xs'>
            <Burger  />
          </Hide>

         <Dropbtn>
            <Burger open={isOpen} setOpen={setOpen} />
          </Dropbtn>
    */}
    </Flex>
  </header>
)}

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