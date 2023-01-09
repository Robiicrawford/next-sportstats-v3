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


export const SignUpForm = () => {

  const handleNextStep = async () => {
    grecaptcha.enterprise.ready(function() {
      grecaptcha.enterprise.execute('6LcUReQjAAAAAC0gUWKYsWuPfyLoCFvk8ZsuFTte', {action: 'login'}).then(function(token) {
        console.log(token)
      });
    });
  }

  return (
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
              <FormLabel htmlFor="fname">First Name</FormLabel>
              <Input id="fname" type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="lname">Last Name</FormLabel>
              <Input id="lname" type="text" />
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
            <Stack spacing="4">
              <Button variant="primary" onClick={handleNextStep}>Sign up</Button>
            </Stack>

          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}