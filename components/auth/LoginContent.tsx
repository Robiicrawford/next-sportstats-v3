import React, { Fragment, useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/router";

import { useTranslation } from 'next-i18next';

import Auth from '@aws-amplify/auth';
import { useAuth } from "../../hooks/use-auth";

import { useForm } from "react-hook-form"

import { 
	Box, Flex, Heading, Button, Divider, Spinner, Stack, Image, HStack ,Text, 
	Input, InputGroup, InputRightElement, FormErrorMessage,
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

	const { register, handleSubmit, formState: { errors } } = useForm();
	
	
	const [loading, setLoading] = useState(false);

  
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  	const onSubmit = async data => {
		setLoading(true)
	  	var user = await auth.signin(data.email.trim(), data['current-password'].trim()) ;
	  	if(user){
	  		router.push('/app/home')
	  	}	  
	}

  return (
    <Stack 
      spacing="8" {...props}
    >
          {loading
              ? <Flex my={3} py={3} flexWrap='wrap' justifyContent="center"> <Spinner/> </Flex>
              :
      <Stack
       
          color='black'
                as='form'
                onSubmit={handleSubmit(onSubmit)}
                py={3}
      >
        <Stack spacing="6">
          {isMobile && 
            <Image 
              src={sportstats_logo}
              alt="Sportstats"
              priority
            />
          }
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
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
                      {auth.error && <FormErrorMessage> {t('member:'+auth.error)} </FormErrorMessage> }
                  
                  </Box>
              
                      <Box w='100%' mb='3' >
                           <Input {...register('email',{required: true})} placeholder={t('public:signup.email')} /> 
                          {errors?.email && ( <FormErrorMessage > Account Email is needed </FormErrorMessage> )}
                      </Box>

                          <InputGroup size='md'>
                            <Input
                              pr='4.5rem'
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

                  <Button w='100%' mt='3' type='submit' colorScheme='teal'>{t('common:continue')}</Button>
          
              </Stack>
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
