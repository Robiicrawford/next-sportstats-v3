import NextLink  from 'next/link'
import { useTranslation } from 'next-i18next';

import { Flex, Box, Heading, Text, Container, Button } from '@chakra-ui/react';

const ContactUsBanner = () => {

  const {t} = useTranslation('public');

  return (

     <Flex flexWrap='wrap' w='100%' color='#fff' pb={4} bg='black' >
     	<Container>
           <Box w='100%' mt={1} textAlign='center' >
             <Heading mb={1} >Contact Us</Heading>
           </Box>
           <Box w='100%' mt={2} textAlign='center'>
             <Text mb={1}>
               {t('help.cant-find-help')} 
               <Button as={NextLink} ml='2' sx={{borderBottom:'2px solid white'}} href='/help/contact' variant="link"  _hover={{ color: 'ss_green' }} color='#c2c7d5'> {t('help.contact-us')} </Button>
              </Text>
           </Box>
        </Container>
    </Flex>

  )
}

export default ContactUsBanner