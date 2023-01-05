import { Avatar, AvatarProps, Box, Flex, FlexProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

interface CardWithAvatarProps extends FlexProps {
  avatarProps: AvatarProps
  action?: React.ReactNode
}

export const CardWithAvatar = (props: CardWithAvatarProps) => {
  const { action, avatarProps, children, ...rest } = props
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
        size="xl" 
        {...avatarProps}
      />
      <Box position="absolute" top="4" insetEnd={{ base: '6', md: '8' }}>
        {action}
      </Box>
      {children}
    </Flex>
  )
}