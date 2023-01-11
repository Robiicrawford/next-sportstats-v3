import React, { Fragment, useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/router";

import { useTranslation } from 'next-i18next';

import Auth from '@aws-amplify/auth';
import { useAuth } from "../../hooks/use-auth";

import { useForm } from "react-hook-form"

import { 
	Box, Flex, Heading, Button, Divider, Spinner, Stack, Image, HStack ,Text, 
	Input, InputGroup, InputRightElement, FormErrorMessage, FormControl,
  useBreakpointValue
} from '@chakra-ui/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import sportstats_logo from '../../public/images/sportstats_logo.png'

const eye = <FontAwesomeIcon icon={faEye} size="lg" style={{color:'black'}}/>;
const eyex = <FontAwesomeIcon icon={faEyeSlash} size="lg" style={{color:'black'}}/>;


const LoginContent = (props) => {
	const auth = useAuth();
	const {t} = useTranslation();
	const router = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);
  
  const [show, setShow] = useState(false)

	const { register, handleSubmit, formState: { errors } } = useForm();
	
	
  const handleClick = () => setShow(!show)

  const onSubmit = async data => {
		setLoading(true)

    try{
      var user = await auth.signin(data.email.trim(), data['current-password'].trim()) ;
      if(user.attributes){
        router.push(`/profile/${user.attributes['custom:ssuid']}`)
      } else {
        setLoading(false)
        setError({cognito:user.message})
      }
    } catch(err){
      setLoading(false)
      setError({cognito:err.message})
    } 
	}

  const isError = ( error || auth.error || errors.email || errors.password) ? true : false ;

  return (
    <Stack 
      spacing="8" {...props}
    >
      {loading
        ? <Flex my={3} py={3} flexWrap='wrap' justifyContent="center"> <Spinner/> </Flex>
        :
          <FormControl
            color='black'
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            py={3} isInvalid={isError}

          >
            <Stack spacing="6">
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={{ base: 'xs', md: 'sm' }}>
                  Log in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Don't have an account?</Text>
                  <Button variant="link" colorScheme="blue" as={Link} href={'/sign-up'}>
                    Sign up
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            
            <Box w='100%' pb={1}>
              {errors?.password && <FormErrorMessage > Password is needed </FormErrorMessage> }
              {auth.error && !error?.cognito &&(<FormErrorMessage> {t('member:'+auth.error)} </FormErrorMessage> )}
              {error?.cognito &&  <FormErrorMessage > {error?.cognito} </FormErrorMessage> }
            </Box>
            
            <Box w='100%' mb='3' >
              <Input {...register('email',{required: true})} id='email' placeholder={t('public:signup.email')} /> 
              {errors?.email && <FormErrorMessage > Account Email is needed </FormErrorMessage> }
            </Box>

            <Box w='100%' >
              <InputGroup size='md'>
                            <Input
                              pr='4.5rem'
                              id='password'
                              type={show ? 'text' : 'password'}
                              placeholder={t('public:signup.enter-password')} 
                              {...register('current-password',{required: true})}
                            />
                            <InputRightElement width='4.5rem'>
                              <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? t('public:signup.hide') : t('public:signup.show')}
                              </Button>
                            </InputRightElement>
              </InputGroup>
              {errors?.email && <FormErrorMessage > Password is needed </FormErrorMessage> }
            </Box>

              <Button w='100%' mt='3' type='submit' variant="primary" >{t('common:continue')}</Button>
          
            </FormControl>
          }
          
          <Divider/>

          <Flex mb={1} w='100%' flexWrap='wrap'>
          
          
              <Box w='100%' px={2} mt={2} style={{textAlign:'center'}}>
                  <Link href={`/account/recover`}>
                       {t('public:signup.forgot-password')} 
                  </Link>
              </Box>
          
          </Flex>
    </Stack>
  );
}

export default LoginContent
