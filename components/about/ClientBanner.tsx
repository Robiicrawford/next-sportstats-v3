import React, {useState, useEffect} from "react"

import { Flex, Image } from '@chakra-ui/react';

const HeroBackgroundImage = () => {


  return (
   <Flex
      w='100%' mt='0' justifyContent='center'
     position='relative' bg='white' flexWrap='wrap'
   >  
    <Image
      src='https://www.sportstats.ca/javax.faces.resource/images/companies.jpg.xhtml?ln=default&v=1_5_2'
    />
   </Flex>
  )
}

export default HeroBackgroundImage


