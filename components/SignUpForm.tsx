import {
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

import Link from 'next/link'


export const SignUpForm = () => (
  <Container
    maxW="md"
    py={{ base: '0', sm: '8' }}
    px={{ base: '4', sm: '10' }}
    bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
    borderRadius={{ base: 'none', sm: 'xl' }}
  >
    <Stack spacing="8">
      <Stack spacing="6" align="center">
       {/* <Logo /> */}
        <Stack spacing="3" textAlign="center">
          <Heading size="xs">Create an account</Heading>
          <HStack justify="center" spacing="1">
            <Text color="muted">Already have an account?</Text>
            <Button variant="link" colorScheme="blue" as={Link} href={'/login'}>
              Log in
            </Button>
          </HStack>
        </Stack>
      </Stack>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="text" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" />
            <FormHelperText color="muted">At least 8 characters long</FormHelperText>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  </Container>
)