import { Avatar, AvatarProps, Box, Flex, FlexProps, Button, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

import {PhotoUploadModal} from "../upload/PhotoUploadModal"
import { useAuth } from "../../hooks/use-auth";

interface CardWithAvatarProps extends FlexProps {
  avatarProps: AvatarProps
  action?: React.ReactNode
  ssuid: Int
}

export const CardWithAvatar = (props: CardWithAvatarProps) => {
  const { ssuid, action, avatarProps, children, ...rest } = props

  const auth = useAuth();

  return (
    <Flex
      position="relative"
      direction="column" height='fit-content'
      align={{ sm: 'center' }}
      maxW="2xl"
      mx='0'
      bg={useColorModeValue('white', 'gray.700')}
      shadow={{ sm: 'base' }}
      rounded={{ sm: 'lg' }}
      px={['0','4','6']}
      pb={{ base: '6', md: '8' }}
      {...rest}
    >
      <Avatar
        mt="-10"
        borderWidth="6px"
        borderColor={useColorModeValue('white', 'gray.700')}
        size={{base:"xl", lg:'2xl'}} 
        {...avatarProps}
        src={
          avatarProps.src?.split(":")[1]
            ? 'https://s3-us-west-2.amazonaws.com/ss-profile-pics/'+avatarProps.src.split(":")[1]
            :avatarProps.src
        }
      />
      {auth?.user && auth?.user.attributes?.['custom:ssuid'] == ssuid &&
        <PhotoUploadModal ssuid={ssuid} />
      }
      <Box position="absolute" top="4" insetEnd={{ base: '6', md: '8' }}>
        {action}
      </Box>
      {children}
    </Flex>
  )
}