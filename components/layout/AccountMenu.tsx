import React, {useState}  from "react"
import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import styled from 'styled-components';
import { 
  Flex, Box,  Text, Avatar,
  MenuList, MenuGroup , MenuItem, MenuDivider,Menu, MenuButton,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  useDisclosure
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCog, faSignOutAlt, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'

import LoginContent from '../auth/LoginContent';

import { useAuth } from "../../hooks/use-auth";

const Header = () => {
  const auth = useAuth();

  const {t} = useTranslation('public');
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <>
    <Menu>

      <MenuButton 
        px={2} py={0.3} ml={[2,3,5,6]}
        sx={{border:'1px solid black', borderRadius:'25px', cursor:'pointer'}} 
        bg='white' 
      >
        <Flex p='1' >
          {auth.user?.attributes?.given_name
            ?
              <Avatar 
                size='sm'
                mr='2' 
                name={auth.user&& auth.user?.attributes?.given_name+" "+auth.user?.attributes?.family_name }
                src={
                  auth?.user?.attributes?.picture?.split(":")[1]
                    ? 'https://s3-us-west-2.amazonaws.com/ss-profile-pics/'+auth?.user?.attributes?.picture.split(":")[1]
                    :auth?.user?.attributes?.picture
                }
              />
            :
              <Avatar 
                size='sm'
                mr='2' bg='ss_green'
                src='https://bit.ly/broken-link'
              />
          }
   
          <StyledBurger aria-hidden="false" aria-label="open menu" >
            <div />
            <div />
            <div />
          </StyledBurger>
        </Flex>
      </MenuButton>

          <MenuList color='black' >

            <MenuGroup title='Profile'>
              {auth?.user ?
                <>
                  <Link href="/account"><MenuItem> { t('common:dashboard').toLowerCase() } </MenuItem></Link>
                  <Link href={`/profile/${auth.user?.attributes?.['custom:ssuid']}`}><MenuItem> My Profile </MenuItem></Link>
                  <Link href="/account/settings"><MenuItem> My Account </MenuItem></Link>
                </>
                : <MenuItem onClick={onOpen} >{ t('common:login') }</MenuItem>
              }
            </MenuGroup>
            
            <MenuDivider />
            <MenuGroup title='Help'>
              {auth.user && <MenuItem onClick={()=>auth.signout()}>{ t('common:logout') }</MenuItem> }
              <Link href="/help"><MenuItem>{ t('public:menu.help-center') }</MenuItem></Link>
            </MenuGroup>

          </MenuList>
   
    </Menu>

    <Modal isOpen={isOpen} onClose={onClose}  >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader >{ t('common:login') }</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LoginContent /> 
        </ModalBody>
      </ModalContent>
    </Modal>

  </>;
}

export default Header

export const StyledBurger = styled.span`
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 1.8rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  margin:auto 0;
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.20rem;
    background: black;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;