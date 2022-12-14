import {
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Box,
  Heading,
  HStack,
  Input,
  InputRightElement,
  InputGroup,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'

import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import { useForm } from "react-hook-form"

const passwordValidator = require('password-validator');
const schema = new passwordValidator();

  schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols();

export const SignUpForm = () => {
  const { t } = useTranslation('public');
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();

  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  const onSubmit = async data => {
    grecaptcha.enterprise.ready(function() {
      grecaptcha.enterprise.execute('6LcUReQjAAAAAC0gUWKYsWuPfyLoCFvk8ZsuFTte', {action: 'login'}).then(function(token) {

          console.log(token)
          // send token to backend to check is valid user 
          // backend will also check if the email is already in use for an account
          const response = null
          if(response?.ssud){
            // backend reutned a ssuid move onto step two 

          } else {
            // succesfull call from backend but problem with data 
            setError('email', { type: 'custom', message:'Account already in use' } )
          }
        
      });
    });
  }

  const formatPasswordValidateError = (errors) => {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] === 'min') {
        return t('signup.error.min') ;
      } else if (errors[i] === 'lowercase') {
        return t('signup.error.lowercase');
      } else if (errors[i] === 'uppercase') {
        return t('signup.error.uppercase');
      } else if (errors[i] === 'digits') {
        return t('signup.error.digits');
      } else if (errors[i] === 'symbols') {
        return t('signup.error.symbols');
      } else if (errors[i] === 'match') {
        return t('signup.error.match');
      } else if (errors[i] === 'Invalid code provided, please request a code again.'){
        return t('signup.error.Invalid code provided, please request a code again.');
      } else if(errors[i] === 'Email Exists'){
        return 'Email Exists'
      } 
    }
  };


  useEffect(()=> {

    if( watch('password')?.length > 1 && schema.validate(watch("password")?.trim(), { list: true } ) )
      setError('password', { type: 'custom', message:schema.validate(watch("password").trim(), { list: true } )}  )

  },[watch('password')])


  const isError = (  errors.email || errors.fname || errors.lname) ? true : false ;

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
          <FormControl 
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            isInvalid={isError}
          >

            <Box >
              <FormLabel htmlFor="fname">{t('signup.first_name')}</FormLabel>
              <Input id="fname"  {...register('fname',{required: true})} />
              {errors?.fname && <FormErrorMessage > First Name is needed </FormErrorMessage> }
            </Box>

            <Box>
              <FormLabel htmlFor="lname">{t('signup.last_name')}</FormLabel>
              <Input id="lname" {...register('lname',{required: true})} />
              {errors?.lname && <FormErrorMessage > Last Name is needed </FormErrorMessage> }
            </Box>

            <Box pb='4'>
              <FormLabel htmlFor="email">{t('signup.email')}</FormLabel>
              <Input id="email" type="email" {...register('email',{required: true})} />
              {errors?.email && <FormErrorMessage > Account Email is needed </FormErrorMessage> }
            </Box>

            <Stack spacing="4">
              <Button variant="primary" type='submit' >Sign up</Button>
            </Stack>

          </FormControl>
        </Stack>
      </Stack>
    </Container>
  )
}