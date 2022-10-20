import React, { Fragment, useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/router";

import { useTranslation } from 'next-i18next';

import Auth from '@aws-amplify/auth';
import { useAuth } from "../../hooks/use-auth";

import { useForm } from "react-hook-form"

import { 
	Box, Flex, Heading, Button, Divider, Spinner,
	Input, InputGroup, InputRightElement, FormErrorMessage
} from '@chakra-ui/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} size="lg" style={{color:'black'}}/>;
const eyex = <FontAwesomeIcon icon={faEyeSlash} size="lg" style={{color:'black'}}/>;

const LoginContent = () => {
	const auth = useAuth();
	const {t} = useTranslation();
	const router = useRouter()

	const { register, handleSubmit, formState: { errors } } = useForm();
	
	
	const [loading, setLoading] = useState(false);

  
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  	const onSubmit = async data => {
		setLoading(true)
	  	var user = await auth.signin(data.email.trim(), data['current-password'].trim()) ;
	  	console.log(user)
	  	if(user){
	  		router.push('/app/home')
	  	}	  
	}

  return (
		<Flex flexWrap='wrap'  >
        	{loading
        		? <Flex my={3} py={3} flexWrap='wrap' justifyContent="center"> <Spinner/> </Flex>
        		:
	   	<Flex
	   		flexWrap='wrap'
	   		w='100%'
	    	color='black'
				  as='form'
				  onSubmit={handleSubmit(onSubmit)}
				  py={3}
			>
					<Box w='100%' pb={1}>
						
						{errors?.password && <FormErrorMessage > Password is needed </FormErrorMessage> }
						{auth.error && <FormErrorMessage> {t('member:'+useAuth.error)} </FormErrorMessage> }
					
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

					<Button w='100%' mt='3' type='submit'>{t('common:continue')}</Button>
			
				</Flex>
			}
			
			<Divider/>

			<Flex mb={1} w='100%' flexWrap='wrap'>
			
				<Box w='100%' px={2} mt={2}>
					
					<Heading as="h6" my={2}  mb={3}>{t('public:signup.title')}</Heading>
					
					<Link href={`/sign-up`}>
						<Button style={{width:'100%'}} color='black'>{t('common:sign-up')}</Button>
					</Link>
				</Box>
			
				<Box w='100%' px={2} mt={2} style={{textAlign:'center'}}>
					<Link href={`/app/account/recover`}>
						<a> {t('public:signup.forgot-password')} </a>
					</Link>
				</Box>
			
			</Flex>
    </Flex>
  )
}

export default LoginContent
