import React, {useState} from "react"
import { useTranslation } from 'next-i18next';

import { Input, InputGroup, InputLeftElement, InputRightElement, Button } from '@chakra-ui/react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";


const SearchBox = () => {
	const {t} = useTranslation();
	const [words, setWords] = useState<any>('');

	const changeWords = (input) => {
		console.log('here')
    	setWords(input)
  	}

	return(
		<InputGroup flex='1 1 70%'>
            <InputLeftElement
              pointerEvents='none'
              children={<FontAwesomeIcon icon={faSearch} color='gray.300' />}
            />
            <Input 
              w='100%' bg='white' color='black' height={['50px']} 
              id='input_search'
             // sx={{borderRadius:'0 10px 10px 0'}}
              onChange={(e)=>changeWords(e.target.value)}
              autoComplete="off"
              placeholder={`${t('common:search-athlete')}...`} 
              value={words? words:''}   
            />
            <InputRightElement
              children={<Button h='1.75rem' size='sm' ><FontAwesomeIcon icon={faTimes} size='xl' color='red' onClick={()=>changeWords('')} /></Button>}
            />
        </InputGroup>
	)
}

export default SearchBox