import NextLink  from 'next/link'
import { useTranslation } from 'next-i18next';

import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  Image
} from '@chakra-ui/react'
import * as React from 'react'
import { FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa'

import sportstats_logo from '../../public/images/sportstats_logo.png'


export default function Footer() {
  const { t } = useTranslation('app');
  return(

      <Container as="footer" role="contentinfo" minW='100%' bg='surface' color='white' m='0'>
        <Stack
          spacing="8" w='100%'
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          py={{ base: '12', md: '16' }}
        >
          <Stack spacing={{ base: '6', md: '8' }} align="start">
             <Image 
                src="https://d3thi7dfa7yqt1.cloudfront.net/images/ss-global.png"
                alt="Sportstats"
              />
            <Text color="white">Fast and accurate results</Text>
          </Stack>
          <Stack
            direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
            spacing={{ base: '12', md: '8' }} 
          >
            <Stack direction="row" spacing="8">
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" >
                  About
                </Text>
                <Stack spacing="3" shouldWrapChildren >
                  <Button variant="link" as={NextLink}  href='/about'  _hover={{ color: 'ss_green' }} color='#c2c7d5' >{t('public:help.topics.about-sportstats')}</Button>
                  <Button variant="link" _hover={{ color: 'ss_green' }} color='#c2c7d5'>Race Suppy</Button>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" >
                  Help
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button as={NextLink}  href='/help/privacy' variant="link"  _hover={{ color: 'ss_green' }} color='#c2c7d5'>{t('footer.privacy')} </Button>
                  <Button as={NextLink}  href='/help/terms-of-use'  variant="link" _hover={{ color: 'ss_green' }} color='#c2c7d5'>{t('footer.terms')}</Button>
                  <Button as={NextLink}  href='/help'  variant="link" _hover={{ color: 'ss_green' }} color='#c2c7d5'>{t('public:menu.help-center')} </Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing="4">
              <Text fontSize="sm" fontWeight="semibold" >
                Stay up to date
              </Text>
              <Stack maxW={{ lg: '360px' }}>
                <Input placeholder="Enter your name" w='100%'  required />
                <Stack direction={{ base: 'column', sm: 'row'}} maxW={{ lg: '360px' }}>
                  <Input placeholder="Enter your email"  type="email" required />
                  <Button colorScheme='green'  type="submit" flexShrink={0} >
                    Subscribe
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          pt="8"
          pb="12"
          justify="space-between"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
        >
          <Text fontSize="sm" color="white">
            &copy; {new Date().getFullYear()} Sportstats. All rights reserved.
          </Text>
          <ButtonGroup variant="ghost">
            
            <IconButton _hover={{ bg: 'ss_green' }} color='white' target="_blank" as="a" href="https://www.facebook.com/sportstatsmedia/" aria-label="Facebook" icon={<FaFacebook fontSize="1.25rem" />} />
            <IconButton _hover={{ bg: 'ss_green' }} color='white' target="_blank" as="a" href="https://www.twitter.com/sportstats" aria-label="Twitter" icon={<FaTwitter fontSize="1.25rem" />} />
            <IconButton _hover={{ bg: 'ss_green' }} color='white' target="_blank" as="a" href="https://www.instagram.com/sportstatsworld" aria-label="Instagram" icon={<FaInstagram fontSize="1.25rem" />} />
            <IconButton _hover={{ bg: 'ss_green' }} color='white' target="_blank" as="a" href="https://www.youtube.com/channel/UCrEE7G1Za12M2kUGRENTf_w" aria-label="Youtube" icon={<FaYoutube fontSize="1.25rem" />} />
         

          </ButtonGroup>
        </Stack>
      </Container>
  )
}
