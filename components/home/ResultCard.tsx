import React from "react"
import Link from 'next/link'

import {useTranslation} from 'next-i18next';

import styled from 'styled-components';
import { 
	Box, Flex, Text, Image, Heading, Button, Center,
	Wrap, WrapItem, Avatar, Badge
 } from '@chakra-ui/react'

import ReactCountryFlag from "react-country-flag"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight} from "@fortawesome/free-solid-svg-icons";

import {slugSet } from "../../utils/setSlug"

const getCountryISO2 = require("country-iso-3-to-2");

const Card = ({e}) => {
  const {t, language} = useTranslation();
  const region = (language == 'en') ? 'en-US' : language ;
  return (
    <EventCard w='100%' p={[1,2]} >
			<Link href={`/results/${e.race.id}/${e.bib}`} style={{marginTop:'0'}}> 
				<Flex flexWrap='wrap' w='100%' >

					<Flex flexWrap='wrap' flex='1 1 15%' style={{position:'relative'}}>
						<Center w='100%'>
								<Avatar name={e.givenName+" "+e.familyName} src={e.user.profilePhoto} />	
								
				          <Box sx={{position:'absolute' ,right:'0', bottom:'10px'}}> 
										{e.country&&(
									    	<ReactCountryFlag 
												svg 
												countryCode={getCountryISO2(e.country)}
												title={e.country}

												style={{marginBottom:'0',width:'1.6em', height:'1.6em'}}
											/> 
										)}
									</Box>
				    </Center>
					</Flex>

					<Flex flexWrap='wrap' flex='1 1 85%' justifyContent='center'>
				
						<Box
		          mt='1'
		          fontWeight='semibold'
		          as='h4'
		          lineHeight='tight'
		          noOfLines={1}
		        >
							{e.masterEvent.info.name} 	{' - '}
							{ new Date(
								e.race.date.split("-")[1]+'/'+e.race.date.split("-")[2]+'/'+e.race.date.split("-")[0]
								).toLocaleDateString(region, {year: 'numeric', month: 'short', day: 'numeric' }
							)} 
						</Box> 
						
						<Text w='100%' textAlign={['center','center']} sx={{whiteSpace:'nowrap', overflow:'hidden'}}>
							{e.givenName} {e.familyName} | {e.race.name}
						</Text>

						<Box display='flex' alignItems='baseline'>
							<Box
		            color='gray.500'
		            fontWeight='semibold'
		            letterSpacing='wide'
		            fontSize='xs'
		            textTransform='uppercase'
		            ml='2'
		          >
								{e.cat} - {e.officialTime}
							</Box>
							<Badge borderRadius='full' ml='2' px='2' colorScheme='teal'>
		            New
		          </Badge>
		        </Box>

					</Flex>

				</Flex>
				
			</Link>
		</EventCard>
  )
}

export const EventCard = styled(Flex)`
	transform: scale(1);
	cursor: pointer;
	border-bottom: 1px dashed black !important;
`

export default Card
