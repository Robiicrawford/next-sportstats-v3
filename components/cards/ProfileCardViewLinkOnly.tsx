import React from "react";
import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import { 
  Box, Flex, Text,
  Button, Avatar,
  useColorModeValue
} from '@chakra-ui/react';

export default function Settings({user}) {
  const { t } = useTranslation('public');

  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding="8"
      position="relative"
      bg={useColorModeValue('white', 'gray.700')}
      shadow={{ md: 'base' }}
    >
      <Box position="absolute" inset="0" height="20" bg="green.600" roundedTop="inherit" />
      <Avatar 
        size="xl" 
        name={user?.givenName+" "+user?.familyName} 
        src={
          user?.profilePhoto?.split(":")[1]
          ? 'https://s3-us-west-2.amazonaws.com/ss-profile-pics/'+user.profilePhoto.split(":")[1]
          :user.profilePhoto
        } 
      />
      <Text pb='3' fontWeight="bold">{user?.givenName} {user?.familyName}</Text>
      <Button as={Link} href={`/profile/${user.id}`} variant="outline" colorScheme="blue" rounded="full" size="sm" width="full">
        View Profile
      </Button>
    </Flex>

  );
}
